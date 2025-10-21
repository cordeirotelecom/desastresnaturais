/**
 * API Service - Integração com APIs Governamentais
 * Sistema de Gestão de Desastres Naturais - MP-RS
 */

// Tipos de dados
export interface WeatherStation {
  id: string;
  nome: string;
  uf: string;
  latitude: number;
  longitude: number;
  temperatura: number;
  umidade: number;
  pressao: number;
  vento: number;
  chuva: number;
  timestamp: string;
}

export interface Alert {
  id: string;
  tipo: 'enchente' | 'incendio' | 'deslizamento' | 'vendaval' | 'seca';
  nivel: 'baixo' | 'medio' | 'alto' | 'critico';
  municipio: string;
  descricao: string;
  timestamp: string;
  latitude?: number;
  longitude?: number;
}

export interface RiverLevel {
  id: string;
  nome: string;
  municipio: string;
  nivel_atual: number;
  nivel_alerta: number;
  nivel_critico: number;
  vazao: number;
  timestamp: string;
}

/**
 * INMET - Instituto Nacional de Meteorologia
 * Dados meteorológicos em tempo real
 */
export class INMETService {
  private static readonly BASE_URL = 'https://apitempo.inmet.gov.br/estacao';
  
  /**
   * Busca dados de todas as estações do RS
   */
  static async getStationsRS(): Promise<WeatherStation[]> {
    try {
      // Em produção, usar a API real do INMET
      // const response = await fetch(`${this.BASE_URL}/dados/RS`);
      // const data = await response.json();
      
      // Dados simulados enquanto não temos as chaves de API
      return this.getMockWeatherData();
    } catch (error) {
      console.error('Erro ao buscar dados do INMET:', error);
      return this.getMockWeatherData();
    }
  }

  /**
   * Busca dados de uma estação específica
   */
  static async getStation(stationId: string): Promise<WeatherStation | null> {
    try {
      const stations = await this.getStationsRS();
      return stations.find(s => s.id === stationId) || null;
    } catch (error) {
      console.error('Erro ao buscar estação:', error);
      return null;
    }
  }

  /**
   * Dados mock para desenvolvimento
   */
  private static getMockWeatherData(): WeatherStation[] {
    return [
      {
        id: 'A801',
        nome: 'Porto Alegre',
        uf: 'RS',
        latitude: -30.0346,
        longitude: -51.2177,
        temperatura: 18.5,
        umidade: 78,
        pressao: 1013.2,
        vento: 12.3,
        chuva: 2.4,
        timestamp: new Date().toISOString()
      },
      {
        id: 'A802',
        nome: 'Canoas',
        uf: 'RS',
        latitude: -29.9177,
        longitude: -51.1869,
        temperatura: 16.8,
        umidade: 82,
        pressao: 1015.1,
        vento: 8.7,
        chuva: 0.0,
        timestamp: new Date().toISOString()
      },
      {
        id: 'A803',
        nome: 'Pelotas',
        uf: 'RS',
        latitude: -31.7683,
        longitude: -52.3410,
        temperatura: 20.2,
        umidade: 71,
        pressao: 1012.8,
        vento: 15.4,
        chuva: 0.8,
        timestamp: new Date().toISOString()
      },
      {
        id: 'A804',
        nome: 'Caxias do Sul',
        uf: 'RS',
        latitude: -29.1634,
        longitude: -51.1797,
        temperatura: 14.3,
        umidade: 85,
        pressao: 1018.5,
        vento: 10.2,
        chuva: 5.6,
        timestamp: new Date().toISOString()
      }
    ];
  }
}

/**
 * ANA - Agência Nacional de Águas
 * Monitoramento de níveis de rios
 */
export class ANAService {
  private static readonly BASE_URL = 'https://www.snirh.gov.br/hidroweb/rest/api/documento';

  /**
   * Busca níveis dos rios do RS
   */
  static async getRiverLevelsRS(): Promise<RiverLevel[]> {
    try {
      // Em produção, usar a API real da ANA
      // const response = await fetch(`${this.BASE_URL}/niveis/RS`);
      // const data = await response.json();
      
      return this.getMockRiverData();
    } catch (error) {
      console.error('Erro ao buscar dados da ANA:', error);
      return this.getMockRiverData();
    }
  }

  /**
   * Dados mock para desenvolvimento
   */
  private static getMockRiverData(): RiverLevel[] {
    return [
      {
        id: 'RIO001',
        nome: 'Rio Guaíba',
        municipio: 'Porto Alegre',
        nivel_atual: 3.2,
        nivel_alerta: 3.0,
        nivel_critico: 4.0,
        vazao: 850,
        timestamp: new Date().toISOString()
      },
      {
        id: 'RIO002',
        nome: 'Rio dos Sinos',
        municipio: 'Novo Hamburgo',
        nivel_atual: 2.1,
        nivel_alerta: 3.5,
        nivel_critico: 5.0,
        vazao: 420,
        timestamp: new Date().toISOString()
      },
      {
        id: 'RIO003',
        nome: 'Rio Taquari',
        municipio: 'Lajeado',
        nivel_atual: 4.8,
        nivel_alerta: 4.0,
        nivel_critico: 6.0,
        vazao: 1200,
        timestamp: new Date().toISOString()
      }
    ];
  }
}

/**
 * Defesa Civil RS
 * Alertas oficiais do estado
 */
export class DefesaCivilService {
  /**
   * Busca alertas ativos
   */
  static async getActiveAlerts(): Promise<Alert[]> {
    try {
      // Em produção, usar a API real da Defesa Civil
      return this.getMockAlerts();
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
      return this.getMockAlerts();
    }
  }

  /**
   * Dados mock para desenvolvimento
   */
  private static getMockAlerts(): Alert[] {
    return [
      {
        id: 'ALT001',
        tipo: 'enchente',
        nivel: 'alto',
        municipio: 'Porto Alegre',
        descricao: 'Nível do Guaíba em elevação. Risco de alagamento na zona norte.',
        timestamp: new Date().toISOString(),
        latitude: -30.0346,
        longitude: -51.2177
      },
      {
        id: 'ALT002',
        tipo: 'vendaval',
        nivel: 'medio',
        municipio: 'Região Metropolitana',
        descricao: 'Temporal com ventos de até 70 km/h previsto para as próximas 6 horas.',
        timestamp: new Date().toISOString()
      },
      {
        id: 'ALT003',
        tipo: 'incendio',
        nivel: 'critico',
        municipio: 'Vale do Taquari',
        descricao: 'Foco de incêndio ativo na região rural. Evacuação preventiva em andamento.',
        timestamp: new Date().toISOString(),
        latitude: -29.3628,
        longitude: -50.8762
      }
    ];
  }
}

/**
 * Serviço Unificado
 * Combina dados de todas as APIs
 */
export class UnifiedAPIService {
  /**
   * Busca todos os dados relevantes
   */
  static async getAllData() {
    try {
      const [weather, rivers, alerts] = await Promise.all([
        INMETService.getStationsRS(),
        ANAService.getRiverLevelsRS(),
        DefesaCivilService.getActiveAlerts()
      ]);

      return {
        weather,
        rivers,
        alerts,
        lastUpdate: new Date().toLocaleString('pt-BR')
      };
    } catch (error) {
      console.error('Erro ao buscar dados unificados:', error);
      throw error;
    }
  }

  /**
   * Verifica se há alertas críticos
   */
  static async hasCriticalAlerts(): Promise<boolean> {
    const alerts = await DefesaCivilService.getActiveAlerts();
    return alerts.some(alert => alert.nivel === 'critico');
  }

  /**
   * Busca pontos de risco (rios acima do nível de alerta)
   */
  static async getRiskPoints(): Promise<RiverLevel[]> {
    const rivers = await ANAService.getRiverLevelsRS();
    return rivers.filter(river => river.nivel_atual >= river.nivel_alerta);
  }
}
