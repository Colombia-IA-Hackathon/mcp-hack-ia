import dotenv from 'dotenv';

dotenv.config();

export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000',
  TIMEOUT: parseInt(process.env.API_TIMEOUT) || 10000,
  ENDPOINTS: {
    ADD_CLIENT: '/add-client',
    GET_CLIENT_BY_DOCUMENT: '/get-client-by-document',
    ADD_CULTIVO: '/add-cultivo',
    GET_CULTIVOS_BY_CLIENTE: '/get-cultivos-by-cliente',
    GET_ALL_CULTIVOS: '/get-all-cultivos',
    NEAREST_PUNTO_ESPACIAL: '/nearest-punto-espacial',
    HISTORICOS_CLIMA: '/historicos-clima',
    ADD_SEGURO: '/add-seguro',
    GET_SEGUROS_BY_CLIENTE: '/get-seguros-by-cliente',
    GET_SEGUROS_BY_CULTIVO: '/get-seguros-by-cultivo'
  }
};