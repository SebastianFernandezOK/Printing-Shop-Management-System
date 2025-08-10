import { useEffect, useState } from 'react';

export interface Rol {
    id_rol: number;
    nombre: string;
    descripcion?: string;
}

export function useRoles() {
    const [roles, setRoles] = useState<Rol[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        fetch('/api/roles/')
            .then(res => {
                if (!res.ok) throw new Error('Error al obtener roles');
                return res.json();
            })
            .then(data => setRoles(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { roles, loading, error };
}
