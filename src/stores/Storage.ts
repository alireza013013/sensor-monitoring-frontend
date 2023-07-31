import type { TokenStorage } from "@/models";

export const authToken = {
    key: 'TOKEN_STORAGE',
    get: function (): TokenStorage | null {
        const data = localStorage.getItem(authToken.key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    },
    set: (value: TokenStorage) => {
        localStorage.setItem(authToken.key, JSON.stringify(value));
    },
    remove: () => {
        localStorage.removeItem(authToken.key);
    },
};