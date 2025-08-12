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
            if (resource === 'controles_prensa' && item.id_control_prensa !== undefined) {
                return { ...item, id: item.id_control_prensa };
            }
            if (resource === 'maquinas' && item.id_maquina !== undefined) {
                return { ...item, id: item.id_maquina };
            }
            if (resource === 'controles_postprensa' && item.id_control_post_prensa !== undefined) {
                return { ...item, id: item.id_control_post_prensa };
            }
            if (resource === 'controles_calidad' && item.id_control_calidad !== undefined) {
                return { ...item, id: item.id_control_calidad };
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
    if (resource === 'controles_prensa' && data.id_control_prensa !== undefined) {
        return { ...data, id: data.id_control_prensa };
    }
    if (resource === 'maquinas' && data.id_maquina !== undefined) {
        return { ...data, id: data.id_maquina };
    }
    if (resource === 'controles_postprensa' && data.id_control_post_prensa !== undefined) {
        return { ...data, id: data.id_control_post_prensa };
    }
    if (resource === 'controles_calidad' && data.id_control_calidad !== undefined) {
        return { ...data, id: data.id_control_calidad };
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
            let data;
            let total;
            if (Array.isArray(json)) {
                data = mapId(json, resource);
                total = json.length;
            } else {
                data = mapId(json.data, resource);
                total = json.total;
            }
            if (resource === 'users') {
                data = data.map((u: any) => ({ ...u, id: u.id_usuario !== undefined ? u.id_usuario : u.id }));
            }
            return {
                data,
                total,
            };
        });
    },
    getOne: (resource, params) => {
        let id = params.id;
        if (resource === 'controles_preprensa' && typeof params.id !== 'undefined') {
            id = params.id;
        }
        return httpClient(`${apiUrl}/${resource}/${id}`).then(({ json }) => {
            let data = { ...json };
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
            } else if (resource === 'controles_prensa' && data.id_control_prensa !== undefined) {
                data.id = data.id_control_prensa;
            } else if (resource === 'maquinas' && data.id_maquina !== undefined) {
                data.id = data.id_maquina;
            } else if (resource === 'controles_postprensa' && data.id_control_post_prensa !== undefined) {
                data.id = data.id_control_post_prensa;
            } else if (resource === 'controles_calidad' && data.id_control_calidad !== undefined) {
                data.id = data.id_control_calidad;
            }
            return { data };
        });
    },
    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: resource === 'controles_postprensa' && json.id_control_post_prensa !== undefined
                ? { ...json, id: json.id_control_post_prensa }
                : resource === 'maquinas' && json.id_maquina !== undefined
                    ? { ...json, id: json.id_maquina }
                    : resource === 'users' && json.id_usuario !== undefined
                        ? { ...json, id: json.id_usuario }
                        : resource === 'controles_prensa' && json.id_control_prensa !== undefined
                            ? { ...json, id: json.id_control_prensa }
                            : resource === 'controles_calidad' && json.id_control_calidad !== undefined
                                ? { ...json, id: json.id_control_calidad }
                                : { ...json, id: json.id_control_preprensa !== undefined ? json.id_control_preprensa : json.id },
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
            data: resource === 'controles_postprensa' && json.id_control_post_prensa !== undefined
                ? { ...json, id: json.id_control_post_prensa }
                : resource === 'maquinas' && json.id_maquina !== undefined
                    ? { ...json, id: json.id_maquina }
                    : resource === 'users' && json.id_usuario !== undefined
                        ? { ...json, id: json.id_usuario }
                        : resource === 'controles_prensa' && json.id_control_prensa !== undefined
                            ? { ...json, id: json.id_control_prensa }
                            : resource === 'controles_calidad' && json.id_control_calidad !== undefined
                                ? { ...json, id: json.id_control_calidad }
                                : mapId(json),
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
            data: (params.previousData && params.previousData.id_usuario !== undefined)
                ? { ...params.previousData, id: params.previousData.id_usuario }
                : (params.previousData ?? { id: params.id }) as any,
        }));
    },
    getMany: (resource, params) => {
        // Si tu API no soporta /resource?ids=1,2,3, emula con Promise.all(getOne)
        return Promise.all(params.ids.map(id =>
            httpClient(`${apiUrl}/${resource}/${id}`).then(({ json }) => {
                // Mapeo de id para recursos personalizados
                if (resource === 'clientes' && json.id_cliente !== undefined) {
                    return { ...json, id: json.id_cliente };
                }
                if (resource === 'users' && json.id_usuario !== undefined) {
                    return { ...json, id: json.id_usuario };
                }
                if (resource === 'ordenes_trabajo' && json.id_orden_trabajo !== undefined) {
                    return { ...json, id: json.id_orden_trabajo };
                }
                if (resource === 'troquelados' && json.id_troquelado !== undefined) {
                    return { ...json, id: json.id_troquelado };
                }
                if (resource === 'sistemas' && json.id_sistema_impresion !== undefined) {
                    return { ...json, id: json.id_sistema_impresion };
                }
                if (resource === 'etapas' && json.id_etapa !== undefined) {
                    return { ...json, id: json.id_etapa };
                }
                if (resource === 'controles_prensa' && json.id_control_prensa !== undefined) {
                    return { ...json, id: json.id_control_prensa };
                }
                if (resource === 'maquinas' && json.id_maquina !== undefined) {
                    return { ...json, id: json.id_maquina };
                }
                if (resource === 'controles_postprensa' && json.id_control_post_prensa !== undefined) {
                    return { ...json, id: json.id_control_post_prensa };
                }
                if (resource === 'controles_calidad' && json.id_control_calidad !== undefined) {
                    return { ...json, id: json.id_control_calidad };
                }
                return { ...json, id: json.id };
            })
        )).then(data => ({ data }));
    },
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
