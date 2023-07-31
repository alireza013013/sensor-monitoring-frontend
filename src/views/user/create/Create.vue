<template>
    <div class="main-create-device-div">
        <Loading v-if="isLoading" />
        <div class="container-div">
            <div class="title-btn-save-div">
                <h1 class="title">{{ t('createUser') }}</h1>
                <button @click="createUser" class="btn-form">
                    {{ t('save') }}
                </button>
            </div>
            <div class="row-input">
                <Input v-model:error-text="errorTextFirstName" v-model:is-validated="isValidateFirstName"
                    :type-validation="TypeValidation.BetweenLength" :min="2" :max="50" placeholder="Ali" type="text"
                    :title="t('firstName')" v-model:value="firstName" />
                <Input v-model:error-text="errorTextLastName" v-model:is-validated="isValidateLastName"
                    :type-validation="TypeValidation.BetweenLength" :min="2" :max="50" placeholder="Ahmadi" type="text"
                    :title="t('lastName')" v-model:value="lastName" />
            </div>


            <div class="row-input">
                <Input v-model:error-text="errorTextUserName" v-model:is-validated="isValidateUserName"
                    :type-validation="TypeValidation.BetweenLength" :min="2" :max="50" placeholder="Alireza123456"
                    type="text" :title="t('username')" v-model:value="userName" />
                <Input v-model:error-text="errorTextPassword" v-model:is-validated="isValidatePassword"
                    :type-validation="TypeValidation.Password" placeholder="@FR21165aq" type="text" :title="t('password')"
                    v-model:value="password" />
            </div>
            <div class="row-input">
                <DropdownInput :title="t('role')" placeholder="User" v-model:selected-option="selectedRoles"
                    :options="rolesOption" />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import Input from '@/components/input/Input.vue';
import DropdownInput from '@/components/dropdownInput/DropdownInput.vue'
import Loading from "@/components/loading/Loading.vue"
import { TypeValidation, Role, roles } from "@/enums"
import type { DropDownInputOptionInterface, User } from "@/models"
import { createEnumValues } from "@/plugins/EnumMapper"
import { useI18n } from 'vue-i18n'
import { toast } from "@/plugins/toast"
import axios from 'axios';
import { API } from "@/plugins/api"
import { useRouter } from 'vue-router';


const { t, locale } = useI18n({ useScope: 'global' })

const router = useRouter()

const firstName = ref<string>("")
const errorTextFirstName = ref<string>("")
const isValidateFirstName = ref<boolean>(false)

const lastName = ref<string>("")
const errorTextLastName = ref<string>("")
const isValidateLastName = ref<boolean>(false)

const userName = ref<string>("")
const errorTextUserName = ref<string>("")
const isValidateUserName = ref<boolean>(false)

const password = ref<string>("")
const errorTextPassword = ref<string>("")
const isValidatePassword = ref<boolean>(false)

const rolesOption = ref<DropDownInputOptionInterface[]>(createEnumValues(Role, roles, locale.value as string))
const selectedRoles = ref<DropDownInputOptionInterface>()


const isLoading = ref<boolean>(false)

function createUser() {
    if (isValidateFirstName.value && isValidateLastName.value && isValidateUserName.value && isValidatePassword.value && selectedRoles.value) {
        isLoading.value = true
        let user: User = {
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            password: password.value,
            role: selectedRoles.value.payload == 1 ? "Admin" : "User"
        }
        axios.post(API.user.register, user).then((response) => {
            toast.success(t('successText'), t('successfully'))
            isLoading.value = false
            router.push({ name: "ListUser" })
        }).catch((error) => {
            toast.error(t('errorText'), t('error'))
            isLoading.value = false
        })
    } else {
        toast.warning(t('completeInformation'), t('danger'))
    }
}

watch(() => locale.value, () => {
    rolesOption.value = []
    rolesOption.value = createEnumValues(Role, roles, locale.value as string)
})


</script>

<style scoped lang="scss">
@import "Create.scss";
</style>