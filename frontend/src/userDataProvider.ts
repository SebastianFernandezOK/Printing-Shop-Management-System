import { fetchUtils, DataProvider } from 'react-admin';

const apiUrl = '/api'; // Usar proxy para desarrollo
const httpClient = fetchUtils.fetchJson;

// Adapt id_usuario to id for React Admin
const mapUserId = (data: any) => {
    if (Array.isArray(data)) {
        return data.map(item => ({ ...item, id: item.id_usuario }));
    }
    return { ...data, id: data.id_usuario };
};

export const userDataProvider: DataProvider = {
    getList: (resource, params) => {
        const { page = 1, perPage = 10 } = params.pagination || {};
        const query = `?page=${page}&perPage=${perPage}`;
        return httpClient(`${apiUrl}/${resource}/${query}`).then(({ json }) => ({
            data: mapUserId(json.data),
            total: json.total,
        }));
    },
    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: mapUserId(json),
        })),
    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: mapUserId(json),
        })),
    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: mapUserId(json),
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
