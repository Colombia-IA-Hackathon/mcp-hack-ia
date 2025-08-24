import axios from 'axios';
import { API_CONFIG } from '../config/api-config.js';

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async request(method, endpoint, data = null, params = null) {
    try {
      const config = {
        method,
        url: endpoint
      };

      if (data) {
        config.data = data;
      }

      if (params) {
        config.params = params;
      }

      const response = await this.client(config);
      return response.data;
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error.response?.data || error.message);
      throw new Error(error.response?.data?.detail || error.message);
    }
  }

  // Cliente endpoints
  async addClient(clientData) {
    return this.request('post', API_CONFIG.ENDPOINTS.ADD_CLIENT, clientData);
  }

  async getClientByDocument(numero_documento) {
    return this.request('get', `${API_CONFIG.ENDPOINTS.GET_CLIENT_BY_DOCUMENT}/${numero_documento}`);
  }

  // Cultivo endpoints
  async addCultivo(cultivoData) {
    return this.request('post', API_CONFIG.ENDPOINTS.ADD_CULTIVO, cultivoData);
  }

  async getCultivosByCliente(cliente_id) {
    return this.request('get', `${API_CONFIG.ENDPOINTS.GET_CULTIVOS_BY_CLIENTE}/${cliente_id}`);
  }

  async getAllCultivos() {
    return this.request('get', API_CONFIG.ENDPOINTS.GET_ALL_CULTIVOS);
  }

  // Geo endpoints
  async nearestPuntoEspacial(latitud, longitud) {
    return this.request('post', API_CONFIG.ENDPOINTS.NEAREST_PUNTO_ESPACIAL, {
      latitud,
      longitud
    });
  }

  async getHistoricosClima(latitud, longitud) {
    return this.request('post', API_CONFIG.ENDPOINTS.HISTORICOS_CLIMA, {
      latitud,
      longitud
    });
  }

  // Seguro endpoints
  async addSeguro(seguroData) {
    return this.request('post', API_CONFIG.ENDPOINTS.ADD_SEGURO, seguroData);
  }

  async getSegurosByCliente(cliente_id) {
    return this.request('get', API_CONFIG.ENDPOINTS.GET_SEGUROS_BY_CLIENTE, null, { cliente_id });
  }

  async getSegurosByCultivo(cultivo_id) {
    return this.request('get', API_CONFIG.ENDPOINTS.GET_SEGUROS_BY_CULTIVO, null, { cultivo_id });
  }
}

export const apiClient = new ApiClient();