#!/usr/bin/env node

import { apiClient } from './services/api-client.js';
import { API_CONFIG } from './config/api-config.js';

console.error('🚀 Iniciando Insure AI MCP Client...');
console.error(`📡 Conectando a API: ${API_CONFIG.BASE_URL}`);

// Implementación manual del protocolo MCP
process.stdin.on('data', async (data) => {
  try {
    const message = JSON.parse(data.toString());
    
    // Log para debugging
    console.error('📨 Mensaje recibido:', JSON.stringify(message, null, 2));

    if (message.method === 'initialize') {
      const response = {
        jsonrpc: '2.0',
        id: message.id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {}
          },
          serverInfo: {
            name: 'insure-ai-mcp-client',
            version: '1.0.0',
            description: 'MCP cliente para consumir APIs de Insure AI'
          }
        }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
    }
    else if (message.method === 'tools/list') {
      const response = {
        jsonrpc: '2.0',
        id: message.id,
        result: {
          tools: [
            {
              name: 'add-client',
              description: 'Agrega un nuevo cliente a través de la API',
              inputSchema: {
                type: 'object',
                properties: {
                  nombre: { type: 'string', description: 'Nombre completo del cliente' },
                  tipo_documento: { type: 'string', description: 'Tipo de documento' },
                  numero_documento: { type: 'string', description: 'Número de documento' },
                  direccion: { type: 'string', description: 'Dirección del cliente' },
                  telefono: { type: 'string', description: 'Teléfono de contacto' },
                  email: { type: 'string', description: 'Email del cliente' },
                  fecha_registro: { type: 'string', description: 'Fecha de registro (YYYY-MM-DD)' },
                  estado: { type: 'string', description: 'Estado del cliente' }
                },
                required: ['nombre', 'tipo_documento', 'numero_documento']
              }
            },
            {
              name: 'get-client-by-document',
              description: 'Obtiene información de cliente por número de documento',
              inputSchema: {
                type: 'object',
                properties: {
                  numero_documento: { type: 'string', description: 'Número de documento del cliente' }
                },
                required: ['numero_documento']
              }
            },
            {
              name: 'add-cultivo',
              description: 'Agrega un nuevo cultivo a través de la API',
              inputSchema: {
                type: 'object',
                properties: {
                  cliente_id: { type: 'number', description: 'ID del cliente dueño del cultivo' },
                  nombre: { type: 'string', description: 'Nombre del cultivo' },
                  hectareas: { type: 'number', description: 'Área en hectáreas' },
                  departamento: { type: 'string', description: 'Departamento donde se encuentra' },
                  municipio: { type: 'string', description: 'Municipio donde se encuentra' },
                  latitud: { type: 'number', description: 'Latitud geográfica' },
                  longitud: { type: 'number', description: 'Longitud geográfica' },
                  altitud: { type: 'number', description: 'Altitud sobre el nivel del mar' },
                  zona_altitudinal: { type: 'string', description: 'Zona altitudinal' },
                  fecha_siembra: { type: 'string', description: 'Fecha de siembra (YYYY-MM-DD)' },
                  estado: { type: 'string', description: 'Estado del cultivo' }
                },
                required: ['cliente_id', 'nombre', 'hectareas']
              }
            },
            {
              name: 'get-cultivos-by-cliente',
              description: 'Obtiene todos los cultivos de un cliente',
              inputSchema: {
                type: 'object',
                properties: {
                  cliente_id: { type: 'number', description: 'ID del cliente' }
                },
                required: ['cliente_id']
              }
            },
            {
              name: 'get-all-cultivos',
              description: 'Obtiene todos los cultivos registrados',
              inputSchema: {
                type: 'object',
                properties: {}
              }
            },
            {
              name: 'nearest-punto-espacial',
              description: 'Encuentra el punto espacial más cercano a unas coordenadas',
              inputSchema: {
                type: 'object',
                properties: {
                  latitud: { type: 'number', description: 'Latitud de referencia' },
                  longitud: { type: 'number', description: 'Longitud de referencia' }
                },
                required: ['latitud', 'longitud']
              }
            },
            {
              name: 'get-historicos-clima',
              description: 'Obtiene históricos de clima para una ubicación',
              inputSchema: {
                type: 'object',
                properties: {
                  latitud: { type: 'number', description: 'Latitud de la ubicación' },
                  longitud: { type: 'number', description: 'Longitud de la ubicación' }
                },
                required: ['latitud', 'longitud']
              }
            },
            {
              name: 'add-seguro',
              description: 'Crea un nuevo seguro para un cultivo',
              inputSchema: {
                type: 'object',
                properties: {
                  cliente_id: { type: 'number', description: 'ID del cliente' },
                  cultivo_id: { type: 'number', description: 'ID del cultivo' },
                  tipo_cobertura: { type: 'string', description: 'Tipo de cobertura' },
                  suma_asegurada: { type: 'number', description: 'Suma asegurada' },
                  prima: { type: 'number', description: 'Prima del seguro' },
                  monto_pagado: { type: 'number', description: 'Monto pagado' },
                  fecha_pago: { type: 'string', description: 'Fecha de pago (YYYY-MM-DD)' },
                  metodo_pago: { type: 'string', description: 'Método de pago' },
                  fecha_inicio: { type: 'string', description: 'Fecha de inicio (YYYY-MM-DD)' },
                  fecha_fin: { type: 'string', description: 'Fecha de fin (YYYY-MM-DD)' },
                  estado: { type: 'string', description: 'Estado del seguro' }
                },
                required: ['cliente_id', 'cultivo_id', 'tipo_cobertura']
              }
            },
            {
              name: 'get-seguros-by-cliente',
              description: 'Obtiene todos los seguros de un cliente',
              inputSchema: {
                type: 'object',
                properties: {
                  cliente_id: { type: 'number', description: 'ID del cliente' }
                },
                required: ['cliente_id']
              }
            },
            {
              name: 'get-seguros-by-cultivo',
              description: 'Obtiene todos los seguros de un cultivo',
              inputSchema: {
                type: 'object',
                properties: {
                  cultivo_id: { type: 'number', description: 'ID del cultivo' }
                },
                required: ['cultivo_id']
              }
            }
          ]
        }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
    }
    else if (message.method === 'tools/call') {
      const { name, arguments: args } = message.params;
      
      try {
        let result;
        
        switch (name) {
          case 'add-client':
            result = await apiClient.addClient(args);
            break;
          
          case 'get-client-by-document':
            result = await apiClient.getClientByDocument(args.numero_documento);
            break;
          
          case 'add-cultivo':
            result = await apiClient.addCultivo(args);
            break;
          
          case 'get-cultivos-by-cliente':
            result = await apiClient.getCultivosByCliente(args.cliente_id);
            break;
          
          case 'get-all-cultivos':
            result = await apiClient.getAllCultivos();
            break;
          
          case 'nearest-punto-espacial':
            result = await apiClient.nearestPuntoEspacial(args.latitud, args.longitud);
            break;
          
          case 'get-historicos-clima':
            result = await apiClient.getHistoricosClima(args.latitud, args.longitud);
            break;
          
          case 'add-seguro':
            result = await apiClient.addSeguro(args);
            break;
          
          case 'get-seguros-by-cliente':
            result = await apiClient.getSegurosByCliente(args.cliente_id);
            break;
          
          case 'get-seguros-by-cultivo':
            result = await apiClient.getSegurosByCultivo(args.cultivo_id);
            break;
          
          default:
            throw new Error(`Herramienta no encontrada: ${name}`);
        }

        const response = {
          jsonrpc: '2.0',
          id: message.id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2)
              }
            ]
          }
        };
        process.stdout.write(JSON.stringify(response) + '\n');
        
      } catch (error) {
        console.error(`❌ Error en herramienta ${name}:`, error.message);
        
        const errorResponse = {
          jsonrpc: '2.0',
          id: message.id,
          error: {
            code: -32000,
            message: error.message
          }
        };
        process.stdout.write(JSON.stringify(errorResponse) + '\n');
      }
    }
  } catch (error) {
    console.error('❌ Error procesando mensaje:', error);
    
    // Responder con error genérico si no tenemos un ID de mensaje
    if (message && message.id) {
      const errorResponse = {
        jsonrpc: '2.0',
        id: message.id,
        error: {
          code: -32700,
          message: 'Parse error'
        }
      };
      process.stdout.write(JSON.stringify(errorResponse) + '\n');
    }
  }
});

// Mantener el proceso vivo y manejar señales
process.stdin.resume();
process.on('SIGINT', () => {
  console.error('🛑 Apagando servidor...');
  process.exit(0);
});
process.on('SIGTERM', () => {
  console.error('🛑 Apagando servidor...');
  process.exit(0);
});

console.error('✅ Servidor MCP listo para recibir mensajes');