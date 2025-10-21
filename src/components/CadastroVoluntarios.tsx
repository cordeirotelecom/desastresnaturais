'use client';

import React, { useState, useEffect } from 'react';
import { voluntarioAPI, type Voluntario, type HabilidadeVoluntario, type ChamadoVoluntario } from '@/services/volunteer-api';
import AvisoDadosFicticios from '@/components/AvisoDadosFicticios';

/**
 * Sistema Completo de Cadastro de Voluntários
 * Com validação, mapa interativo e gestão completa
 */
export default function CadastroVoluntarios() {
  const [etapa, setEtapa] = useState<'lista' | 'cadastro' | 'detalhes' | 'chamados'>('lista');
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [chamados, setChamados] = useState<ChamadoVoluntario[]>([]);
  const [voluntarioSelecionado, setVoluntarioSelecionado] = useState<Voluntario | null>(null);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    genero: 'prefiro não informar' as const,
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: 'RS',
    profissao: '',
    escolaridade: 'médio' as const,
    diasDisponiveis: [] as string[],
    horarios: 'flexível' as const,
    contatoEmergenciaNome: '',
    contatoEmergenciaTelefone: '',
    contatoEmergenciaParentesco: '',
  });

  const [habilidades, setHabilidades] = useState<HabilidadeVoluntario[]>([]);
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    const todos = voluntarioAPI.buscarVoluntarios({});
    setVoluntarios(todos);
    
    const chamadosAtivos = voluntarioAPI.obterChamadosAtivos();
    setChamados(chamadosAtivos);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro do campo
    if (erros[name]) {
      setErros(prev => {
        const novosErros = { ...prev };
        delete novosErros[name];
        return novosErros;
      });
    }
  };

  const buscarCEP = async (cep: string) => {
    if (cep.length === 8 || (cep.length === 9 && cep.includes('-'))) {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            rua: data.logradouro || prev.rua,
            bairro: data.bairro || prev.bairro,
            cidade: data.localidade || prev.cidade,
            estado: data.uf || prev.estado,
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const adicionarHabilidade = (tipo: string, nivel: string) => {
    const novaHabilidade: HabilidadeVoluntario = {
      tipo: tipo as any,
      nivel: nivel as any,
    };
    setHabilidades(prev => [...prev, novaHabilidade]);
  };

  const removerHabilidade = (index: number) => {
    setHabilidades(prev => prev.filter((_, i) => i !== index));
  };

  const validarFormulario = (): boolean => {
    const novosErros: { [key: string]: string } = {};

    if (!formData.nome || formData.nome.length < 3) {
      novosErros.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.cpf) {
      novosErros.cpf = 'CPF é obrigatório';
    }

    if (!formData.email || !formData.email.includes('@')) {
      novosErros.email = 'Email inválido';
    }

    if (!formData.telefone || formData.telefone.length < 10) {
      novosErros.telefone = 'Telefone inválido';
    }

    if (!formData.cep) {
      novosErros.cep = 'CEP é obrigatório';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      const resultado = await voluntarioAPI.cadastrarVoluntario({
        nome: formData.nome,
        cpf: formData.cpf,
        email: formData.email,
        telefone: formData.telefone,
        dataNascimento: new Date(formData.dataNascimento),
        genero: formData.genero,
        endereco: {
          cep: formData.cep,
          rua: formData.rua,
          numero: formData.numero,
          complemento: formData.complemento,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          latitude: 0,
          longitude: 0,
        },
        habilidades,
        experiencias: [],
        profissao: formData.profissao,
        escolaridade: formData.escolaridade,
        disponibilidade: {
          diasDaSemana: formData.diasDisponiveis as any[],
          horarios: formData.horarios,
          tipoAtuacao: [],
        },
        contatoEmergencia: {
          nome: formData.contatoEmergenciaNome,
          telefone: formData.contatoEmergenciaTelefone,
          parentesco: formData.contatoEmergenciaParentesco,
        },
      });

      if (resultado.sucesso) {
        alert('✅ Voluntário cadastrado com sucesso!');
        carregarDados();
        setEtapa('lista');
        // Limpar form
        setFormData({
          nome: '', cpf: '', email: '', telefone: '', dataNascimento: '',
          genero: 'prefiro não informar', cep: '', rua: '', numero: '',
          complemento: '', bairro: '', cidade: '', estado: 'RS',
          profissao: '', escolaridade: 'médio', diasDisponiveis: [],
          horarios: 'flexível', contatoEmergenciaNome: '',
          contatoEmergenciaTelefone: '', contatoEmergenciaParentesco: '',
        });
        setHabilidades([]);
      } else {
        alert(`❌ Erro: ${resultado.erro}`);
      }
    } catch (error) {
      alert('❌ Erro ao cadastrar voluntário');
    } finally {
      setLoading(false);
    }
  };

  const formatarCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatarTelefone = (tel: string) => {
    return tel.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const estatisticas = voluntarioAPI.obterEstatisticas();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Aviso de Dados Fictícios */}
        <div className="mb-6">
          <AvisoDadosFicticios 
            tipo="warning"
            mensagem="Os voluntários exibidos nesta página são FICTÍCIOS para demonstração. Em produção, serão cadastros reais de voluntários verificados pela Defesa Civil e organizações parceiras."
          />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">👥 Sistema de Voluntários</h1>
          <p className="text-green-100 text-lg">
            Cadastro, Gestão e Coordenação de Voluntários para Desastres Naturais
          </p>
          <p className="text-sm text-green-200 mt-2">
            ⚖️ Baseado em DHS - Desenvolvimento Harmônico e Sustentável
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm font-semibold">Total de Voluntários</p>
            <p className="text-4xl font-bold text-green-600">{estatisticas.totalVoluntarios}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm font-semibold">Voluntários Ativos</p>
            <p className="text-4xl font-bold text-blue-600">{estatisticas.ativos}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
            <p className="text-gray-600 text-sm font-semibold">Aguardando Aprovação</p>
            <p className="text-4xl font-bold text-orange-600">{estatisticas.pendentes}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm font-semibold">Horas Trabalhadas</p>
            <p className="text-4xl font-bold text-purple-600">{estatisticas.totalHoras.toLocaleString()}</p>
          </div>
        </div>

        {/* Navegação */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-wrap border-b">
            <button
              onClick={() => setEtapa('lista')}
              className={`px-6 py-4 font-semibold transition-colors ${
                etapa === 'lista'
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📋 Lista de Voluntários
            </button>
            <button
              onClick={() => setEtapa('cadastro')}
              className={`px-6 py-4 font-semibold transition-colors ${
                etapa === 'cadastro'
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ➕ Novo Cadastro
            </button>
            <button
              onClick={() => setEtapa('chamados')}
              className={`px-6 py-4 font-semibold transition-colors ${
                etapa === 'chamados'
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📢 Chamados Ativos ({chamados.length})
            </button>
          </div>

          <div className="p-8">
            {/* LISTA DE VOLUNTÁRIOS */}
            {etapa === 'lista' && (
              <div>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="🔍 Buscar voluntário por nome, cidade ou habilidade..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  />
                </div>

                {voluntarios.filter(v => 
                  v.nome.toLowerCase().includes(filtro.toLowerCase()) ||
                  v.endereco.cidade.toLowerCase().includes(filtro.toLowerCase()) ||
                  v.habilidades.some(h => h.tipo.toLowerCase().includes(filtro.toLowerCase()))
                ).length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-xl">Nenhum voluntário encontrado</p>
                    <button
                      onClick={() => setEtapa('cadastro')}
                      className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      ➕ Cadastrar Primeiro Voluntário
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {voluntarios
                      .filter(v => 
                        v.nome.toLowerCase().includes(filtro.toLowerCase()) ||
                        v.endereco.cidade.toLowerCase().includes(filtro.toLowerCase()) ||
                        v.habilidades.some(h => h.tipo.toLowerCase().includes(filtro.toLowerCase()))
                      )
                      .map(voluntario => (
                        <div
                          key={voluntario.id}
                          className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border-l-4 border-green-600 hover:shadow-2xl transition-shadow cursor-pointer"
                          onClick={() => {
                            setVoluntarioSelecionado(voluntario);
                            setEtapa('detalhes');
                          }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">{voluntario.nome}</h3>
                              <p className="text-sm text-gray-600">{voluntario.profissao}</p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                                voluntario.status === 'ativo'
                                  ? 'bg-green-500'
                                  : voluntario.status === 'pendente'
                                  ? 'bg-orange-500'
                                  : 'bg-gray-500'
                              }`}
                            >
                              {voluntario.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">📍</span>
                              <span>{voluntario.endereco.cidade}, {voluntario.endereco.estado}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">📞</span>
                              <span>{formatarTelefone(voluntario.telefone)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">⏰</span>
                              <span>{voluntario.horasTrabalhadas}h trabalhadas</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t">
                            <p className="text-xs text-gray-600 mb-2 font-semibold">Habilidades:</p>
                            <div className="flex flex-wrap gap-2">
                              {voluntario.habilidades.slice(0, 3).map((hab, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                                >
                                  {hab.tipo}
                                </span>
                              ))}
                              {voluntario.habilidades.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                  +{voluntario.habilidades.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* CADASTRO DE NOVO VOLUNTÁRIO */}
            {etapa === 'cadastro' && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Dados Pessoais */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Dados Pessoais</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                          erros.nome ? 'border-red-500' : 'border-gray-300 focus:border-green-600'
                        }`}
                        placeholder="João da Silva"
                      />
                      {erros.nome && <p className="text-red-500 text-sm mt-1">{erros.nome}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CPF *
                      </label>
                      <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                          erros.cpf ? 'border-red-500' : 'border-gray-300 focus:border-green-600'
                        }`}
                        placeholder="000.000.000-00"
                        maxLength={14}
                      />
                      {erros.cpf && <p className="text-red-500 text-sm mt-1">{erros.cpf}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                          erros.email ? 'border-red-500' : 'border-gray-300 focus:border-green-600'
                        }`}
                        placeholder="joao@email.com"
                      />
                      {erros.email && <p className="text-red-500 text-sm mt-1">{erros.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                          erros.telefone ? 'border-red-500' : 'border-gray-300 focus:border-green-600'
                        }`}
                        placeholder="(51) 99999-9999"
                        maxLength={15}
                      />
                      {erros.telefone && <p className="text-red-500 text-sm mt-1">{erros.telefone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Data de Nascimento *
                      </label>
                      <input
                        type="date"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Gênero
                      </label>
                      <select
                        name="genero"
                        value={formData.genero}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      >
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                        <option value="prefiro não informar">Prefiro não informar</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">📍 Endereço</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CEP *
                      </label>
                      <input
                        type="text"
                        name="cep"
                        value={formData.cep}
                        onChange={(e) => {
                          handleInputChange(e);
                          buscarCEP(e.target.value);
                        }}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                          erros.cep ? 'border-red-500' : 'border-gray-300 focus:border-green-600'
                        }`}
                        placeholder="00000-000"
                        maxLength={9}
                      />
                      {erros.cep && <p className="text-red-500 text-sm mt-1">{erros.cep}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Rua
                      </label>
                      <input
                        type="text"
                        name="rua"
                        value={formData.rua}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                        placeholder="Rua Principal"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Número
                      </label>
                      <input
                        type="text"
                        name="numero"
                        value={formData.numero}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                        placeholder="123"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Bairro
                      </label>
                      <input
                        type="text"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                        placeholder="Centro"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                        placeholder="Porto Alegre"
                      />
                    </div>
                  </div>
                </div>

                {/* Dados Profissionais */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">💼 Dados Profissionais</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Profissão
                      </label>
                      <input
                        type="text"
                        name="profissao"
                        value={formData.profissao}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                        placeholder="Ex: Enfermeiro(a)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Escolaridade
                      </label>
                      <select
                        name="escolaridade"
                        value={formData.escolaridade}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      >
                        <option value="fundamental">Ensino Fundamental</option>
                        <option value="médio">Ensino Médio</option>
                        <option value="superior">Ensino Superior</option>
                        <option value="pós-graduação">Pós-Graduação</option>
                        <option value="mestrado">Mestrado</option>
                        <option value="doutorado">Doutorado</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contato de Emergência */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">🚨 Contato de Emergência</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        name="contatoEmergenciaNome"
                        value={formData.contatoEmergenciaNome}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                        placeholder="Nome do contato"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="contatoEmergenciaTelefone"
                        value={formData.contatoEmergenciaTelefone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                        placeholder="(51) 99999-9999"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Parentesco
                      </label>
                      <input
                        type="text"
                        name="contatoEmergenciaParentesco"
                        value={formData.contatoEmergenciaParentesco}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                        placeholder="Ex: Mãe, Esposo(a)"
                      />
                    </div>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => setEtapa('lista')}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Cadastrando...' : '✅ Cadastrar Voluntário'}
                  </button>
                </div>
              </form>
            )}

            {/* DETALHES DO VOLUNTÁRIO */}
            {etapa === 'detalhes' && voluntarioSelecionado && (
              <div>
                <button
                  onClick={() => setEtapa('lista')}
                  className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
                >
                  ← Voltar para lista
                </button>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">{voluntarioSelecionado.nome}</h2>
                      <p className="text-gray-600">{voluntarioSelecionado.profissao}</p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
                        voluntarioSelecionado.status === 'ativo'
                          ? 'bg-green-500'
                          : voluntarioSelecionado.status === 'pendente'
                          ? 'bg-orange-500'
                          : 'bg-gray-500'
                      }`}
                    >
                      {voluntarioSelecionado.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-4">📋 Informações Pessoais</h3>
                      <div className="space-y-3 text-sm">
                        <div><span className="font-semibold">CPF:</span> {formatarCPF(voluntarioSelecionado.cpf)}</div>
                        <div><span className="font-semibold">Email:</span> {voluntarioSelecionado.email}</div>
                        <div><span className="font-semibold">Telefone:</span> {formatarTelefone(voluntarioSelecionado.telefone)}</div>
                        <div><span className="font-semibold">Escolaridade:</span> {voluntarioSelecionado.escolaridade}</div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-4">📍 Endereço</h3>
                      <div className="text-sm">
                        <p>{voluntarioSelecionado.endereco.rua}, {voluntarioSelecionado.endereco.numero}</p>
                        <p>{voluntarioSelecionado.endereco.bairro}</p>
                        <p>{voluntarioSelecionado.endereco.cidade} - {voluntarioSelecionado.endereco.estado}</p>
                        <p className="mt-2">CEP: {voluntarioSelecionado.endereco.cep}</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-4">🎯 Habilidades</h3>
                      <div className="flex flex-wrap gap-2">
                        {voluntarioSelecionado.habilidades.map((hab, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {hab.tipo} ({hab.nivel})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-4">📊 Estatísticas</h3>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-semibold">Horas Trabalhadas:</span> {voluntarioSelecionado.horasTrabalhadas}h</div>
                        <div><span className="font-semibold">Atendimentos:</span> {voluntarioSelecionado.atendimentos}</div>
                        <div><span className="font-semibold">Avaliação Média:</span> ⭐ {voluntarioSelecionado.mediaAvaliacao.toFixed(1)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CHAMADOS ATIVOS */}
            {etapa === 'chamados' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">📢 Chamados de Voluntários Ativos</h2>
                
                {chamados.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-xl">Nenhum chamado ativo no momento</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {chamados.map(chamado => (
                      <div
                        key={chamado.id}
                        className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-bold text-lg">{chamado.titulo}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                              chamado.urgencia === 'crítica'
                                ? 'bg-red-500'
                                : chamado.urgencia === 'alta'
                                ? 'bg-orange-500'
                                : chamado.urgencia === 'média'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                          >
                            {chamado.urgencia.toUpperCase()}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-4">{chamado.descricao}</p>

                        <div className="space-y-2 text-sm">
                          <div><span className="font-semibold">📍 Local:</span> {chamado.localidade.cidade}</div>
                          <div>
                            <span className="font-semibold">👥 Vagas:</span>{' '}
                            {chamado.voluntariosInscritos.length}/{chamado.numeroVoluntarios}
                          </div>
                          <div>
                            <span className="font-semibold">🎯 Habilidades:</span>{' '}
                            {chamado.habilidadesNecessarias.join(', ')}
                          </div>
                        </div>

                        <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                          🙋 Inscrever-se
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
