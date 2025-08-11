import { fetchUtils, DataProvider } from 'react-admin';

const apiUrl = '/api'; // Usar proxy para desarrollo
const httpClient = fetchUtils.fetchJson;

// Adapt id_usuario, id_cliente, id_troquelado, id_orden_trabajo, id_sistema_impresion to id for React Admin
const mapId = (data: any, resource?: string) => {
    if (Array.isArray(data)) {
        return data.map(item => {
            if (resource === 'ordenes_trabajo' && item.id_orden_trabajo !== undefined) {
                return { ...item, id: item.id_orden_trabajo };
            }
            if (resource === 'controles_preprensa' && item.id_control_preprensa !== undefined) {
                return { ...item, id: item.id_control_preprensa };
            }
            return {
                ...item,
                id: item.id_usuario !== undefined ? item.id_usuario
                    : item.id_cliente !== undefined ? item.id_cliente
                    : item.id_troquelado !== undefined ? item.id_troquelado
                    : item.id_orden_trabajo !== undefined ? item.id_orden_trabajo
                    : item.id_sistema_impresion !== undefined ? item.id_sistema_impresion
                    : item.id_etapa !== undefined ? item.id_etapa
                    : item.id_control_preprensa !== undefined ? item.id_control_preprensa
                    : item.id,
            };
        });
    }
    if (resource === 'ordenes_trabajo' && data.id_orden_trabajo !== undefined) {
        return { ...data, id: data.id_orden_trabajo };
    }
    if (resource === 'controles_preprensa' && data.id_control_preprensa !== undefined) {
        return { ...data, id: data.id_control_preprensa };
    }
    return {
        ...data,
        id: data.id_usuario !== undefined ? data.id_usuario
            : data.id_cliente !== undefined ? data.id_cliente
            : data.id_troquelado !== undefined ? data.id_troquelado
            : data.id_orden_trabajo !== undefined ? data.id_orden_trabajo
            : data.id_sistema_impresion !== undefined ? data.id_sistema_impresion
            : data.id_etapa !== undefined ? data.id_etapa
            : data.id_control_preprensa !== undefined ? data.id_control_preprensa
            : data.id,
    };
};

export const userDataProvider: DataProvider = {
    getList: (resource, params) => {
        const { page = 1, perPage = 10 } = params.pagination || {};
        const query = `?page=${page}&perPage=${perPage}`;
        return httpClient(`${apiUrl}/${resource}/${query}`).then(({ json }) => {
            // Si la respuesta es un array (como en troquelados), adaptarla
            let data;
            let total;
            if (Array.isArray(json)) {
                data = mapId(json, resource);
                total = json.length;
            } else {
                data = mapId(json.data, resource);
                total = json.total;
            }
            if (resource === 'ordenes_trabajo') {
                console.log('DEBUG ordenes_trabajo options:', data);
            }
            if (resource === 'users') {
                console.log(`getList [${resource}] options:`, data.map(d => ({ id: d.id, ...d })));
            }
            return {
                data,
                total,
            };
        });
    },
    getOne: (resource, params) => {
        let id = params.id;
        // Para controles_preprensa, el id real es id_control_preprensa
        if (resource === 'controles_preprensa' && typeof params.id !== 'undefined') {
            id = params.id;
        }
        return httpClient(`${apiUrl}/${resource}/${id}`).then(({ json }) => {
            let data = { ...json };
            // Forzar mapeo de id para recursos con id personalizado
            if (resource === 'users' && data.id_usuario !== undefined) {
                data.id = data.id_usuario;
            } else if (resource === 'ordenes_trabajo' && data.id_orden_trabajo !== undefined) {
                data.id = data.id_orden_trabajo;
            } else if (resource === 'clientes' && data.id_cliente !== undefined) {
                data.id = data.id_cliente;
            } else if (resource === 'troquelados' && data.id_troquelado !== undefined) {
                data.id = data.id_troquelado;
            } else if (resource === 'sistemas' && data.id_sistema_impresion !== undefined) {
                data.id = data.id_sistema_impresion;
            } else if (resource === 'etapas' && data.id_etapa !== undefined) {
                data.id = data.id_etapa;
            } else if (resource === 'controles_preprensa' && data.id_control_preprensa !== undefined) {
                data.id = data.id_control_preprensa;
            }
            return { data };
        });
    },
    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: {
                ...json,
                id: json.id_control_preprensa !== undefined ? json.id_control_preprensa : json.id,
            },
        })),
    update: (resource, params) => {
        let id = params.id;
        if (resource === 'users' && params.data.id_usuario !== undefined) {
            id = params.data.id_usuario;
        }
        return httpClient(`${apiUrl}/${resource}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: mapId(json),
        }));
    },
    delete: (resource, params) => {
        let id = params.id;
        if (resource === 'users' && params.previousData && params.previousData.id_usuario !== undefined) {
            id = params.previousData.id_usuario;
        }
        return httpClient(`${apiUrl}/${resource}/${id}`, {
            method: 'DELETE',
        }).then(() => ({
            data: (params.previousData ?? { id: params.id }) as any,
        }));
    },
    getMany: () => Promise.resolve({ data: [] }),
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    updateMany: () => Promise.resolve({ data: [] }),
    deleteMany: (resource, params) => {
        // El backend no soporta deleteMany nativo, así que hacemos varias peticiones DELETE
        return Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        ).then(() => ({ data: params.ids }));
    },
    // Otros métodos pueden ser implementados según necesidad
};
