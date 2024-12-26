const TOKEN_KEY = 'cool_bi_token';

const setToken = (token: string): void => {
    if (!token) {
        throw new Error('Token cannot be empty');
    }
    localStorage.setItem(TOKEN_KEY, token);
}

const getToken = ():string => {
    return localStorage.getItem(TOKEN_KEY) || ''
}

const clearToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
}

export { setToken, getToken, clearToken };
