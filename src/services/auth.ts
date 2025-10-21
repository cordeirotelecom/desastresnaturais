// ==================== SERVIÇO DE AUTENTICAÇÃO ====================
// Sistema completo de autenticação com JWT, 3 perfis e proteção de rotas

export type UserRole = 'vitima' | 'voluntario' | 'autoridade';

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  role: UserRole;
  fotoPerfil?: string;
  cpf?: string;
  dataNascimento?: string;
  endereco?: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  // Campos específicos para Voluntário
  especialidades?: string[];
  disponibilidade?: string;
  veiculoProprio?: boolean;
  // Campos específicos para Autoridade
  orgao?: string; // 'MP' | 'Policia' | 'DefesaCivil' | 'Bombeiros'
  matricula?: string;
  cargo?: string;
  // Metadata
  criadoEm: Date;
  atualizadoEm: Date;
  ativo: boolean;
  emailVerificado: boolean;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  telefone?: string;
  cpf?: string;
  role: UserRole;
  // Campos específicos para Voluntário
  especialidades?: string[];
  veiculoProprio?: boolean;
  // Campos específicos para Autoridade
  orgao?: string;
  matricula?: string;
  cargo?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  error?: string;
}

// ==================== DADOS MOCKADOS (Simular Banco de Dados) ====================

const mockUsers: User[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@vitima.com',
    telefone: '(51) 99999-1111',
    role: 'vitima',
    cpf: '123.456.789-00',
    endereco: {
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'Porto Alegre',
      estado: 'RS',
      cep: '90000-000'
    },
    criadoEm: new Date('2024-01-15'),
    atualizadoEm: new Date('2024-01-15'),
    ativo: true,
    emailVerificado: true
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@voluntario.com',
    telefone: '(51) 99999-2222',
    role: 'voluntario',
    cpf: '987.654.321-00',
    especialidades: ['medico', 'primeiros-socorros'],
    veiculoProprio: true,
    disponibilidade: 'tempo-integral',
    criadoEm: new Date('2024-02-10'),
    atualizadoEm: new Date('2024-02-10'),
    ativo: true,
    emailVerificado: true
  },
  {
    id: '3',
    nome: 'Dr. Carlos Oliveira',
    email: 'carlos@autoridade.com',
    telefone: '(51) 99999-3333',
    role: 'autoridade',
    cpf: '456.789.123-00',
    orgao: 'DefesaCivil',
    matricula: 'DC-12345',
    cargo: 'Coordenador Regional',
    criadoEm: new Date('2024-01-01'),
    atualizadoEm: new Date('2024-01-01'),
    ativo: true,
    emailVerificado: true
  }
];

// Senhas mockadas (em produção, usar bcrypt)
const mockPasswords: Record<string, string> = {
  'joao@vitima.com': '123456',
  'maria@voluntario.com': '123456',
  'carlos@autoridade.com': '123456'
};

// ==================== FUNÇÕES DE AUTENTICAÇÃO ====================

// Simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Gerar token JWT simples (em produção, usar biblioteca jwt)
const generateToken = (user: User): string => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
  };
  return btoa(JSON.stringify(payload));
};

// Decodificar token
export const decodeToken = (token: string): any => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

// Validar token
export const validateToken = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return false;
  return decoded.exp > Date.now();
};

// LOGIN
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  await delay(800); // Simular delay de rede

  const { email, senha } = credentials;

  // Validações
  if (!email || !senha) {
    return {
      success: false,
      message: 'Email e senha são obrigatórios',
      error: 'CAMPOS_OBRIGATORIOS'
    };
  }

  // Buscar usuário
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return {
      success: false,
      message: 'Email ou senha incorretos',
      error: 'CREDENCIAIS_INVALIDAS'
    };
  }

  // Verificar senha
  if (mockPasswords[email] !== senha) {
    return {
      success: false,
      message: 'Email ou senha incorretos',
      error: 'CREDENCIAIS_INVALIDAS'
    };
  }

  // Verificar se usuário está ativo
  if (!user.ativo) {
    return {
      success: false,
      message: 'Conta desativada. Entre em contato com o suporte.',
      error: 'CONTA_DESATIVADA'
    };
  }

  // Gerar token
  const token = generateToken(user);

  return {
    success: true,
    message: 'Login realizado com sucesso!',
    user,
    token
  };
};

// REGISTRO
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  await delay(1000); // Simular delay de rede

  // Validações
  if (!data.nome || !data.email || !data.senha) {
    return {
      success: false,
      message: 'Nome, email e senha são obrigatórios',
      error: 'CAMPOS_OBRIGATORIOS'
    };
  }

  if (data.senha !== data.confirmarSenha) {
    return {
      success: false,
      message: 'As senhas não coincidem',
      error: 'SENHAS_NAO_COINCIDEM'
    };
  }

  if (data.senha.length < 6) {
    return {
      success: false,
      message: 'A senha deve ter no mínimo 6 caracteres',
      error: 'SENHA_CURTA'
    };
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      success: false,
      message: 'Email inválido',
      error: 'EMAIL_INVALIDO'
    };
  }

  // Verificar se email já existe
  if (mockUsers.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    return {
      success: false,
      message: 'Este email já está cadastrado',
      error: 'EMAIL_JA_EXISTE'
    };
  }

  // Validações específicas por role
  if (data.role === 'voluntario' && (!data.especialidades || data.especialidades.length === 0)) {
    return {
      success: false,
      message: 'Selecione pelo menos uma especialidade',
      error: 'ESPECIALIDADE_OBRIGATORIA'
    };
  }

  if (data.role === 'autoridade' && (!data.orgao || !data.matricula)) {
    return {
      success: false,
      message: 'Órgão e matrícula são obrigatórios para autoridades',
      error: 'DADOS_AUTORIDADE_INCOMPLETOS'
    };
  }

  // Criar novo usuário
  const newUser: User = {
    id: String(mockUsers.length + 1),
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    role: data.role,
    cpf: data.cpf,
    especialidades: data.especialidades,
    veiculoProprio: data.veiculoProprio,
    orgao: data.orgao,
    matricula: data.matricula,
    cargo: data.cargo,
    criadoEm: new Date(),
    atualizadoEm: new Date(),
    ativo: true,
    emailVerificado: false
  };

  // Adicionar aos dados mockados
  mockUsers.push(newUser);
  mockPasswords[data.email] = data.senha;

  // Gerar token
  const token = generateToken(newUser);

  return {
    success: true,
    message: 'Cadastro realizado com sucesso!',
    user: newUser,
    token
  };
};

// LOGOUT
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }
};

// OBTER USUÁRIO ATUAL
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('auth_token');
  if (!token || !validateToken(token)) {
    return null;
  }

  const userData = localStorage.getItem('user_data');
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
};

// SALVAR DADOS DE AUTENTICAÇÃO
export const saveAuthData = (user: User, token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
  }
};

// VERIFICAR SE ESTÁ AUTENTICADO
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('auth_token');
  return token !== null && validateToken(token);
};

// VERIFICAR ROLE DO USUÁRIO
export const hasRole = (requiredRole: UserRole | UserRole[]): boolean => {
  const user = getCurrentUser();
  if (!user) return false;

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }

  return user.role === requiredRole;
};

// ATUALIZAR PERFIL
export const updateProfile = async (userId: string, updates: Partial<User>): Promise<AuthResponse> => {
  await delay(500);

  const userIndex = mockUsers.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return {
      success: false,
      message: 'Usuário não encontrado',
      error: 'USER_NOT_FOUND'
    };
  }

  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updates,
    atualizadoEm: new Date()
  };

  const updatedUser = mockUsers[userIndex];

  // Atualizar localStorage
  saveAuthData(updatedUser, localStorage.getItem('auth_token') || '');

  return {
    success: true,
    message: 'Perfil atualizado com sucesso!',
    user: updatedUser
  };
};

// RECUPERAR SENHA
export const recoverPassword = async (email: string): Promise<AuthResponse> => {
  await delay(800);

  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    // Por segurança, não revelar se o email existe
    return {
      success: true,
      message: 'Se o email estiver cadastrado, você receberá as instruções de recuperação.'
    };
  }

  // Em produção, enviar email com link de reset
  console.log('Email de recuperação enviado para:', email);

  return {
    success: true,
    message: 'Instruções de recuperação enviadas para seu email.'
  };
};

// OBTER USUÁRIOS POR ROLE (admin)
export const getUsersByRole = (role: UserRole): User[] => {
  return mockUsers.filter(u => u.role === role);
};

// ESTATÍSTICAS DE USUÁRIOS
export const getUserStats = () => {
  return {
    total: mockUsers.length,
    vitimas: mockUsers.filter(u => u.role === 'vitima').length,
    voluntarios: mockUsers.filter(u => u.role === 'voluntario').length,
    autoridades: mockUsers.filter(u => u.role === 'autoridade').length,
    ativos: mockUsers.filter(u => u.ativo).length,
    emailsVerificados: mockUsers.filter(u => u.emailVerificado).length
  };
};
