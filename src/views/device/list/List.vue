<template>
    <div class="main-device-list-div">
        <div class="container-div">
            <div class="table-device-div">
                <div class="top-of-table-div">
                    <div class="container-top-table-div">
                        <div class="cotain-button-extra-option-div">
                            <div class="icon-search-div" :class="isOpenSearchBox ? `open-search-div` : ``">
                                <img @click="openInputSearchBox" class="search-close-image" v-if="!isOpenSearchBox"
                                    src="@/assets/images/icons/search-icon.svg" alt="Search">
                                <img @click="closeInputSearchBox" class="search-close-image" v-if="isOpenSearchBox"
                                    src="@/assets/images/icons/xmark-solid.svg" alt="Close" />
                                <input v-model="searchValue" type="text" class="input-search"
                                    :class="isOpenSearchBox ? `open-input-search` : ``" />
                            </div>
                            <button class="extra-option-table-button">
                                <img class="image-button-extra" src="@/assets/images/icons/print-solid.svg" alt="Print">
                            </button>
                        </div>
                        <span class="text-count-sensor">
                            {{ t('numberDevice') }} : <span class="text-count-sensor" v-if="locale == `en`">{{
                                totalCountDevicesForShow }}</span>
                            <span class="text-count-sensor" v-if="locale == `fa`">{{
                                totalCountDevicesForShow.toLocaleString("fa") }}</span>
                        </span>
                    </div>
                </div>
                <div class="main-table-div">
                    <div v-if="devicesForShow.length > 0 || isLoading" class="scroll-table-div">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="title-header-table">
                                        {{ t('number') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('deviceModel') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('phoneNumber') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('simCardCharge') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('numberSensor') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('owner') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('registerDate') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('view') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="!isLoading" v-for="(device, index) in devicesForShow" :key="index"
                                    class="tr-body-table">
                                    <td class="td-body-table" v-if="locale == `en`">
                                        {{ ((pagePagination - 1) * countItemPerPageTable) + (index + 1) }}
                                    </td>
                                    <td class="td-body-table" v-if="locale == `fa`">
                                        {{ (((pagePagination - 1) * countItemPerPageTable) + (index +
                                            1)).toLocaleString("fa") }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ device.deviceModel }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ device.phoneNumber }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ device.simCardCharge }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ device.sensors.length }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ device.user?.firstName + " " + device.user?.lastName }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ device.registerDate?.split("T")[0] }}
                                    </td>
                                    <td class="td-body-table">
                                        <router-link :to="{ name: 'DetailDevice', params: { id: device.id } }"><img
                                                class="eye-icon" src="@/assets/images/icons/eye-solid.svg"
                                                alt="See More"></router-link>
                                    </td>

                                </tr>

                                <tr v-if="isLoading" class="tr-body-skeleton" v-for="item in countItemPerPageTable">
                                    <td class="td-body-skeleton" v-for="index in 8">
                                        <div class="skeleton-div">

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="devicesForShow.length == 0 && !isLoading" class="contain-no-item-div">
                        <img class="box-image" src="@/assets/images/icons/box-open-solid.svg" alt="Box Empty">
                        <span class="text-no-item">{{ t('notFoundData') }}</span>
                    </div>
                </div>
                <div class="bottom-of-table-div" :class="locale == `fa` ? `rtl-div` : ``">
                    <button v-if="(totalCountDevicesForShow > 0)" :class="pagePagination === 1 ? `disable-btn` : ``"
                        class="button-pagination-div" @click="prePageTable">
                        <img class="arrow-icon" src="@/assets/images/icons/chevron-left-solid.svg" alt="Back Button">
                    </button>
                    <span class="number-page-table" v-if="(totalCountDevicesForShow > 0)"
                        :class="locale == `fa` ? `rtl-span` : ``"><span v-if="(pagePagination < 10)">0{{ pagePagination
                        }}</span><span v-if="(pagePagination >= 10)">{{ pagePagination }}</span>/ <span
                            v-if="(Math.ceil(totalCountDevicesForShow / countItemPerPageTable) < 10)">0{{
                                Math.ceil(totalCountDevicesForShow
                                    / countItemPerPageTable)
                            }}</span> <span v-if="(Math.ceil(totalCountDevicesForShow / countItemPerPageTable) >= 10)">{{
    Math.ceil(totalCountDevicesForShow
        / countItemPerPageTable)
}}</span></span>
                    <button v-if="(totalCountDevicesForShow > 0)" :class="pagePagination === Math.ceil(totalCountDevicesForShow / countItemPerPageTable)
                        ? `disable-btn`
                        : ``
                        " class="button-pagination-div" @click="nextPageTable">
                        <img class="arrow-icon" src="@/assets/images/icons/chevron-right-solid.svg" alt="Next Button">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from "axios";
import { useI18n } from 'vue-i18n'
import type { Device, Sensor } from "@/models"
import { API } from '@/plugins/api';
import { toast } from "@/plugins/toast"
import { useTokenStore } from "@/stores/TokenStore";


const { t, locale } = useI18n({ useScope: 'global' })
const tokenStore = useTokenStore()



onMounted(() => {
    if (tokenStore.roles == "Admin") {
        getDevicesAdmin();
    } else if (tokenStore.roles == "User") {
        getDevicesUser()
    }
})

function getDevicesAdmin() {
    isLoading.value = true
    axios.get(API.device.admin.index).then((response) => {
        isLoading.value = false
        devices.value = response.data
    }).catch((error) => {
        isLoading.value = false
        toast.error(t('errorText'), t('error'))
    })
}

function getDevicesUser() {
    isLoading.value = true
    axios.get(API.device.user.index).then((response) => {
        isLoading.value = false
        devices.value = response.data
    }).catch((error) => {
        isLoading.value = false
        toast.error(t('errorText'), t('error'))
    })
}


const isLoading = ref(false);

const searchValue = ref("");

const devices = ref<Device[]>([])

const devicesForShow = computed(() => {
    let slicedList: Device[] = [];
    let searchList: Device[] = devices.value
    searchList = searchList.filter((item) => item.deviceModel.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()) || item.phoneNumber.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()));
    totalCountDevicesForShow.value = searchList.length;
    slicedList = searchList.slice(
        (pagePagination.value - 1) * countItemPerPageTable.value,
        pagePagination.value * countItemPerPageTable.value
    );
    return slicedList;
});

const countItemPerPageTable = ref(10);
const pagePagination = ref(1);
const totalCountDevicesForShow = ref(10)

function prePageTable() {
    if (pagePagination.value != 1) {
        pagePagination.value -= 1;
    }
}

function nextPageTable() {
    if (pagePagination.value != Math.ceil(totalCountDevicesForShow.value / countItemPerPageTable.value)) {
        pagePagination.value += 1;
    }
}



const isOpenSearchBox = ref(false)

function openInputSearchBox() {
    isOpenSearchBox.value = true
}

function closeInputSearchBox() {
    isOpenSearchBox.value = false
}

</script>



<style lang="scss" scoped>
@import "List.scss";
</style>