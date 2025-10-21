'use client';

import { useState } from 'react';
import { 
  getTodosDocumentos, 
  getTodosCursos, 
  getCursosGratuitos,
  type DocumentoOficial,
  type CursoTreinamento 
} from '@/data/recursos-oficiais';

export default function RecursosOficiaisPage() {
  const [abaAtiva, setAbaAtiva] = useState<'documentos' | 'treinamentos'>('documentos');
  const [filtroDocCategoria, setFiltroDocCategoria] = useState<string>('todos');
  const [filtroCursoNivel, setFiltroCursoNivel] = useState<string>('todos');
  const [apenasGratuitos, setApenasGratuitos] = useState(true);

  const todosDocumentos = getTodosDocumentos();
  const todosCursos = apenasGratuitos ? getCursosGratuitos() : getTodosCursos();

  const documentosFiltrados = filtroDocCategoria === 'todos'
    ? todosDocumentos
    : todosDocumentos.filter(d => d.categoria === filtroDocCategoria);

  const cursosFiltrados = filtroCursoNivel === 'todos'
    ? todosCursos
    : todosCursos.filter(c => c.nivel === filtroCursoNivel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl p-8 rounded-2xl mb-8 border border-blue-100">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            📚 Recursos Oficiais
          </h1>
          <p className="text-gray-700 text-lg">
            Documentos, manuais, leis e cursos gratuitos de órgãos governamentais e instituições reconhecidas
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white/60 backdrop-blur-sm shadow-lg p-2 rounded-xl mb-8 flex gap-2">
          <button
            onClick={() => setAbaAtiva('documentos')}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition ${
              abaAtiva === 'documentos'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            📄 Documentos Oficiais ({todosDocumentos.length})
          </button>
          <button
            onClick={() => setAbaAtiva('treinamentos')}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition ${
              abaAtiva === 'treinamentos'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🎓 Cursos e Treinamentos ({todosCursos.length})
          </button>
        </div>

        {/* DOCUMENTOS */}
        {abaAtiva === 'documentos' && (
          <>
            {/* Filtros Documentos */}
            <div className="glass p-6 rounded-xl mb-6">
              <h3 className="font-bold mb-4">Filtrar por Categoria:</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFiltroDocCategoria('todos')}
                  className={`px-4 py-2 rounded-lg transition ${
                    filtroDocCategoria === 'todos'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFiltroDocCategoria('juridico')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filtroDocCategoria === 'juridico'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  ⚖️ Jurídico
                </button>
                <button
                  onClick={() => setFiltroDocCategoria('tecnico')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filtroDocCategoria === 'tecnico'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  🔧 Técnico
                </button>
                <button
                  onClick={() => setFiltroDocCategoria('operacional')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filtroDocCategoria === 'operacional'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  📋 Operacional
                </button>
                <button
                  onClick={() => setFiltroDocCategoria('educativo')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filtroDocCategoria === 'educativo'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  📖 Educativo
                </button>
                <button
                  onClick={() => setFiltroDocCategoria('normativo')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filtroDocCategoria === 'normativo'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  📜 Normativo
                </button>
              </div>
            </div>

            {/* Grid Documentos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {documentosFiltrados.map((doc) => (
                <div key={doc.id} className="bg-white shadow-lg hover:shadow-2xl transition rounded-xl p-6 border border-gray-200">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">
                        {doc.tipo === 'pdf' ? '📄' :
                         doc.tipo === 'video' ? '🎥' :
                         doc.tipo === 'manual' ? '📘' :
                         doc.tipo === 'cartilha' ? '📕' :
                         doc.tipo === 'lei' ? '⚖️' :
                         doc.tipo === 'protocolo' ? '📋' : '📄'}
                      </span>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{doc.titulo}</h3>
                        <p className="text-sm text-gray-600 font-medium">{doc.orgao}</p>
                      </div>
                    </div>
                    <span className={`badge ${
                      doc.relevancia === 'essencial' ? 'badge-danger' :
                      doc.relevancia === 'recomendado' ? 'badge-warning' :
                      'badge-info'
                    }`}>
                      {doc.relevancia === 'essencial' ? '⭐ Essencial' :
                       doc.relevancia === 'recomendado' ? '👍 Recomendado' :
                       '📌 Complementar'}
                    </span>
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-700 text-sm mb-4">
                    {doc.descricao}
                  </p>

                  {/* Metadados */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-gray-50 border border-gray-200 p-2 rounded">
                      <span className="text-gray-600 font-medium">Tipo:</span> <span className="text-gray-800 font-semibold">{doc.tipo.toUpperCase()}</span>
                    </div>
                    {doc.tamanho && (
                      <div className="bg-gray-50 border border-gray-200 p-2 rounded">
                        <span className="text-gray-600 font-medium">Tamanho:</span> <span className="text-gray-800 font-semibold">{doc.tamanho}</span>
                      </div>
                    )}
                    <div className="bg-gray-50 border border-gray-200 p-2 rounded">
                      <span className="text-gray-600 font-medium">Publicado:</span> <span className="text-gray-800 font-semibold">{new Date(doc.dataPublicacao).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2 rounded">
                      <span className="text-gray-600 font-medium">Categoria:</span> <span className="text-gray-800 font-semibold capitalize">{doc.categoria}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doc.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 border border-blue-300 px-2 py-1 rounded-full text-blue-800 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Botão Download */}
                  <a
                    href={doc.urlDownload}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary text-center block"
                  >
                    ⬇️ Baixar Documento
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {/* TREINAMENTOS */}
        {abaAtiva === 'treinamentos' && (
          <>
            {/* Filtros Treinamentos */}
            <div className="glass p-6 rounded-xl mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Filtrar Cursos:</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={apenasGratuitos}
                    onChange={(e) => setApenasGratuitos(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-green-600 font-semibold">Apenas Gratuitos</span>
                </label>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFiltroCursoNivel('todos')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filtroCursoNivel === 'todos'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Todos os Níveis
                </button>
                <button
                  onClick={() => setFiltroCursoNivel('basico')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filtroCursoNivel === 'basico'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  🟢 Básico
                </button>
                <button
                  onClick={() => setFiltroCursoNivel('intermediario')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filtroCursoNivel === 'intermediario'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  🟡 Intermediário
                </button>
                <button
                  onClick={() => setFiltroCursoNivel('avancado')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filtroCursoNivel === 'avancado'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  🔴 Avançado
                </button>
              </div>
            </div>

            {/* Grid Cursos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cursosFiltrados.map((curso) => (
                <div key={curso.id} className="bg-white shadow-lg hover:shadow-2xl transition rounded-xl p-6 border border-gray-200">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{curso.titulo}</h3>
                      <p className="text-sm text-gray-600 font-medium mb-1">{curso.instituicao}</p>
                      <p className="text-xs text-gray-500 font-medium">{curso.plataforma}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {curso.gratuito && (
                        <span className="badge badge-success">✓ Gratuito</span>
                      )}
                      {curso.certificado && (
                        <span className="badge badge-info">🎓 Certificado</span>
                      )}
                    </div>
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-700 text-sm mb-4">
                    {curso.descricao}
                  </p>

                  {/* Metadados */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                    <div className="bg-gray-50 border border-gray-200 p-2 rounded text-center">
                      <p className="text-gray-600 text-xs font-medium">Duração</p>
                      <p className="text-gray-800 font-bold">{curso.duracao}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-2 rounded text-center">
                      <p className="text-gray-600 text-xs font-medium">Carga Horária</p>
                      <p className="text-gray-800 font-bold">{curso.cargaHoraria}</p>
                    </div>
                    <div className={`p-2 rounded text-center border ${
                      curso.nivel === 'basico' ? 'bg-green-50 border-green-300' :
                      curso.nivel === 'intermediario' ? 'bg-yellow-50 border-yellow-300' :
                      'bg-red-50 border-red-300'
                    }`}>
                      <p className="text-gray-600 text-xs font-medium">Nível</p>
                      <p className={`font-bold capitalize ${
                        curso.nivel === 'basico' ? 'text-green-700' :
                        curso.nivel === 'intermediario' ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>{curso.nivel}</p>
                    </div>
                  </div>

                  {/* Público Alvo */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 font-semibold mb-2">Público Alvo:</p>
                    <div className="flex flex-wrap gap-2">
                      {curso.publicoAlvo.map((publico, idx) => (
                        <span key={idx} className="text-xs bg-purple-100 border border-purple-300 px-2 py-1 rounded-full text-purple-800 font-medium">
                          {publico}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Conteúdo Programático (expansível) */}
                  <details className="mb-4">
                    <summary className="cursor-pointer text-sm font-bold text-blue-600 mb-2 hover:text-blue-700">
                      📚 Ver Conteúdo Programático ({curso.conteudoProgramatico.length} módulos)
                    </summary>
                    <ul className="mt-2 space-y-1 text-sm">
                      {curso.conteudoProgramatico.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="text-green-600 mt-1 font-bold">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  {/* Botão Inscrição */}
                  <a
                    href={curso.urlInscricao}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary text-center block"
                  >
                    {curso.gratuito ? '🎓 Inscreva-se Gratuitamente' : '📝 Mais Informações'}
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Footer com Aviso */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mt-8 border-l-4 border-blue-500 shadow-lg">
          <h4 className="font-bold text-blue-700 mb-2">ℹ️ Importante</h4>
          <p className="text-gray-700 text-sm">
            Todos os links levam a sites oficiais de órgãos governamentais e instituições reconhecidas. 
            Verifique sempre a validade e aplicabilidade dos documentos para sua região e contexto específico.
          </p>
        </div>
      </div>
    </div>
  );
}
