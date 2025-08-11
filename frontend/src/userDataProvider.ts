import { fetchUtils, DataProvider } from 'react-admin';

const apiUrl = '/api'; // Usar proxy para desarrollo
const httpClient = fetchUtils.fetchJson;

// Adapt id_usuario, id_cliente, id_troquelado, id_orden_trabajo, id_sistema_impresion to id for React Admin
const mapId = (data: any) => {
    if (Array.isArray(data)) {
        return data.map(item => ({
            ...item,
            id: item.id_usuario !== undefined ? item.id_usuario
                : item.id_cliente !== undefined ? item.id_cliente
                : item.id_troquelado !== undefined ? item.id_troquelado
                : item.id_orden_trabajo !== undefined ? item.id_orden_trabajo
                : item.id_sistema_impresion !== undefined ? item.id_sistema_impresion
                : item.id_etapa !== undefined ? item.id_etapa
                : item.id_control_preprensa !== undefined ? item.id_control_preprensa
                : item.id,
        }));
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
            if (Array.isArray(json)) {
                return {
                    data: mapId(json),
                    total: json.length,
                };
            }
            // Si la respuesta es paginada (data, total)
            return {
                data: mapId(json.data),
                total: json.total,
            };
        });
    },
    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: mapId(json),
        })),
    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: mapId(json),
        })),
    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: mapId(json),
        })),
    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(() => ({
            data: (params.previousData ?? { id: params.id }) as any,
        })),
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
