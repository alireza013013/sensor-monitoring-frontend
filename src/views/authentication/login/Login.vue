<template>
    <div class="main-login-div">
        <Loading v-if="isLoading" />
        <div class="container-login">
            <div class="header-div">
                <span class="text-header">{{ t('nameApp') }}</span>
            </div>

            <div class="input-container">
                <Input v-model:error-text="errorTextUsername" v-model:is-validated="isValidateUsername"
                    :type-validation="TypeValidation.BetweenLength" :min="5" :max="20" :placeholder="t('username')"
                    type="text" :title="t('username')" v-model:value="username" />

                <Input :title="t('password')" :type-validation="TypeValidation.Password" type="password"
                    v-model:value="password" v-model:is-validated="isValidatePassword" :placeholder="t('password')"
                    v-model:error-text="errorTextPassword" />


                <button @click="login" class="login-btn">
                    {{ t('login') }}
                </button>
            </div>
        </div>
    </div>
</template>





<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Input from '@/components/input/Input.vue';
import Loading from "@/components/loading/Loading.vue"
import { TypeValidation } from "@/enums"
import { toast } from "@/plugins/toast"
import type { User, Token } from "@/models"
import axios from 'axios';
import { API } from "@/plugins/api"
import { useRouter } from 'vue-router';
import { useTokenStore } from "@/stores/TokenStore";


const { t, locale } = useI18n({ useScope: 'global' })
const tokenStore = useTokenStore()
const router = useRouter()

const username = ref<string>("")
const errorTextUsername = ref<string>("")
const isValidateUsername = ref<boolean>(false)

const password = ref<string>("")
const errorTextPassword = ref<string>("")
const isValidatePassword = ref<boolean>(false)

const isLoading = ref<boolean>(false)

function login() {
    if (!isValidatePassword.value) {
        toast.warning(t('completeInformation'), t('danger'))
        return
    }
    if (!isValidateUsername.value) {
        toast.warning(t('completeInformation'), t('danger'))
        return
    }

    isLoading.value = true
    let user: User = {
        userName: username.value,
        password: password.value
    }
    axios.post(API.user.login, user).then((response) => {
        const token: Token = {
            accessToken: response.data.token,
            refreshToken: response.data.refreshToken,
            accessTokenExpireIn: response.data.tokenExpiresInMinutes,
            refreshTokenExpireIn: 10000,
            roles: response.data.role,
        }
        tokenStore.signIn(token)
        router.push("/dashboard")
        toast.success(t('successText'), t('successfully'))
        isLoading.value = false
    }).catch((error) => {
        toast.error(t('wrongInput'), t('error'))
        isLoading.value = false
    })

}


</script>





<style lang="scss" scoped>
@import "Login.scss";
</style>