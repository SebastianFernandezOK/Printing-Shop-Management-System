// authProvider básico para React Admin
const apiUrl = '/api';

export const authProvider = {
    login: async ({ username, password }: { username: string; password: string }) => {
        // Usar formato x-www-form-urlencoded para OAuth2PasswordRequestForm
        const body = new URLSearchParams();
        body.append('username', username);
        body.append('password', password);
        const request = new Request(`${apiUrl}/login`, {
            method: 'POST',
            body,
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
        });
        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Login failed');
        }
        const { token } = await response.json();
        localStorage.setItem('auth', token);
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('auth') ? Promise.resolve() : Promise.reject();
    },
    checkError: (error: any) => {
        if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
    getIdentity: () => Promise.resolve({
        id: 'user',
        fullName: 'Usuario',
    }),
};
