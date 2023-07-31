<template>
    <div class="main-header-div">
        <div class="container-header">
            <div class="logo-name-div">
                <img class="image-logo" src="@/assets/images/icons/diagram-project-solid.svg" alt="Logo">
                <span class="name-app">{{ t('nameApp') }}</span>
            </div>
            <div class="setting-icon-div">
                <img @click="openSettingMenu" class="gear-image" src="@/assets/images/icons/gear-solid.svg" alt="Setting">
                <img @click="openMenu" class="gear-image" src="@/assets/images/icons/bars-solid.svg" alt="Menu">

                <Transition name="top-show">
                    <div class="menu-setting-div" v-if="isOpenMenu">
                        <router-link @click="closeMenu" class="router" :to="{ name: `ListDevice` }">{{ t('deviceList')
                        }}</router-link>
                        <router-link v-if="tokenStore.roles == `Admin`" @click="closeMenu" class="router"
                            :to="{ name: `CreateDevice` }">{{ t('createDevice')
                            }}</router-link>
                        <router-link v-if="tokenStore.roles == `Admin`" @click="closeMenu" class="router"
                            :to="{ name: `ListSensor` }">{{ t('sensorList')
                            }}</router-link>
                        <router-link v-if="tokenStore.roles == `Admin`" @click="closeMenu" class="router"
                            :to="{ name: `CreateSensor` }">{{ t('createSensor')
                            }}</router-link>
                        <router-link v-if="tokenStore.roles == `Admin`" @click="closeMenu" class="router"
                            :to="{ name: `ListUser` }">{{ t('users')
                            }}</router-link>
                        <router-link v-if="tokenStore.roles == `Admin`" @click="closeMenu" class="router"
                            :to="{ name: `CreateUser` }">{{ t('createUser')
                            }}</router-link>
                        <router-link @click="logout" class="router" :to="{ name: `Login` }">{{ t('logout')
                        }}</router-link>
                    </div>
                </Transition>



                <Transition name="top-show">
                    <div class="menu-setting-div" v-if="isOpenMenuSetting">
                        <div class="change-theme-div">
                            <span class="title">{{ t('mode') }}</span>
                            <div class="div-main-toggle-button" @click="changeTheme()">
                                <div class="div-circle-toggle" :class="!isDarkMode ? `on` : ``">
                                    <img v-if="isDarkMode" src="@/assets/images/icons/sun-solid.svg" alt="Sun"
                                        class="xmark-image" />
                                    <img v-if="!isDarkMode" src="@/assets/images/icons/moon-solid.svg" alt="Moon"
                                        class="check-image" />
                                </div>
                            </div>
                        </div>

                        <div class="change-language-div">
                            <span class="title">{{ t('language') }}</span>
                            <div class="div-main-toggle-button" @click="changeLanguage()">
                                <div class="div-circle-toggle" :class="!isPersianLanguage ? `on` : ``">
                                    <img v-if="!isPersianLanguage" src="@/assets/images/iran-flag.png" alt="Flag Iran"
                                        class="xmark-image" />
                                    <img v-if="isPersianLanguage" src="@/assets/images/uk-flag.png" alt="Flag UK"
                                        class="check-image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>




<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useTokenStore } from "@/stores/TokenStore";


const { t, locale } = useI18n({ useScope: 'global' })
const tokenStore = useTokenStore()



const isDarkMode = ref(false)
function changeTheme() {
    isDarkMode.value = !isDarkMode.value
    if (isDarkMode.value) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}


const isPersianLanguage = ref(true)
function changeLanguage() {
    isPersianLanguage.value = !isPersianLanguage.value
    if (isPersianLanguage.value) {
        setTimeout(() => {
            locale.value = 'fa'
            document.body.style.direction = 'rtl'
        }, 2000);
    } else {
        setTimeout(() => {
            locale.value = 'en'
            document.body.style.direction = 'ltr'
        }, 2000);
    }
}

const isOpenMenuSetting = ref(false)

function openSettingMenu() {
    if (isOpenMenu.value) {
        isOpenMenu.value = false
    }
    isOpenMenuSetting.value = !isOpenMenuSetting.value
}

const isOpenMenu = ref(false)
function openMenu() {
    if (isOpenMenuSetting.value) {
        isOpenMenuSetting.value = false
    }
    isOpenMenu.value = !isOpenMenu.value
}

function closeMenu() {
    isOpenMenu.value = false
}


function logout() {
    isOpenMenu.value = false
    tokenStore.logOut()
}
</script>



<style lang="scss" scoped>
@import "TheHeader.scss";
</style>