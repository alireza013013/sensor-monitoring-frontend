import { authToken } from "@/stores/Storage";
import type { Token, TokenStorage } from "@/models";
import { defineStore } from "pinia";

let token_storage: TokenStorage | null = authToken.get();

export const useTokenStore = defineStore({
    id: "TokenStore",
    state: () => ({
        accessToken: token_storage ? token_storage.token.accessToken : "",
        accessTokenExpireIn: token_storage ? token_storage.token.accessTokenExpireIn : "",
        refreshToken: token_storage ? token_storage.token.refreshToken : "",
        refreshTokenExpireIn: token_storage ? token_storage.token.refreshTokenExpireIn : "",
        roles: token_storage ? token_storage.token.roles : "",
        isValidated: token_storage ? token_storage.isValidated : false,
        isValidationRequestLoading: false,
    }),
    getters: {},
    actions: {
        signIn(token: Token) {
            this.isValidated = true;
            this.accessToken = token.accessToken;
            this.accessTokenExpireIn = new Date().getTime() + (token.accessTokenExpireIn - 1) * 60 * 1000;
            this.refreshToken = token.refreshToken;
            this.refreshTokenExpireIn = new Date().getTime() + token.refreshTokenExpireIn * 60 * 1000;
            this.roles = token.roles;
            const setTimeToken: Token = {
                accessToken: this.accessToken,
                accessTokenExpireIn: this.accessTokenExpireIn,
                refreshToken: this.refreshToken,
                refreshTokenExpireIn: this.refreshTokenExpireIn,
                roles: this.roles,
            }
            let tokenStorage: TokenStorage = {
                token: setTimeToken,
                isValidated: this.isValidated
            }
            authToken.set(tokenStorage)
        },
        logOut() {
            authToken.remove()
            token_storage = null;
            this.$reset()
        },
    },
});
