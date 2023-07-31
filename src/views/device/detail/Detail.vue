<template>
    <div class="main-sensor-related-list-div">
        <div class="container-div">
            <div class="contain-device-information-div">
                <div class="card-information-device-div">
                    <div class="information-div">
                        <div class="title-subtitle-div">
                            <span class="title">{{ t('deviceModel') }} :</span>
                            <span class="subtitle"> {{ device?.deviceModel }}
                            </span>
                        </div>

                        <div class="title-subtitle-div">
                            <span class="title">{{ t('phoneNumber') }} :</span>
                            <span class="subtitle"> {{ device?.phoneNumber }}
                            </span>
                        </div>

                        <div class="title-subtitle-div">
                            <span class="title">{{ t('registerDate') }} :</span>
                            <span class="subtitle"> {{ device?.registerDate?.split("T")[0] }}
                            </span>
                        </div>


                        <div class="title-subtitle-div">
                            <span class="title">{{ t('simCardCharge') }} :</span>
                            <span class="subtitle"> {{ device?.simCardCharge }}
                            </span>
                        </div>

                        <div class="title-subtitle-div">
                            <span class="title">{{ t('owner') }} :</span>
                            <span class="subtitle"> {{ device?.user?.firstName + " " + device?.user?.lastName }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="map-div">
                    <Map v-if="device?.latPosition && device?.lngPosition" :initiale-location="{
                        lat: device?.latPosition,
                        lng: device?.lngPosition
                    }" :allow-change-possition="false" />
                </div>
            </div>
            <div class="table-sensor-div">
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
                            {{ t('numberSensor') }} : <span class="text-count-sensor" v-if="locale == `en`">{{
                                totalCountSensorsForShow }}</span>
                            <span class="text-count-sensor" v-if="locale == `fa`">{{
                                totalCountSensorsForShow.toLocaleString("fa") }}</span>
                        </span>
                    </div>
                </div>
                <div class="main-table-div">
                    <div v-if="sensorsForShow.length > 0 || isLoading" class="scroll-table-div">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="title-header-table">
                                        {{ t('number') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('portName') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('kindPort') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('sensorNickName') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('kind') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('unitMeasurement') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('view') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="!isLoading" v-for="(sensor, index) in sensorsForShow" :key="index"
                                    class="tr-body-table">
                                    <td class="td-body-table" v-if="locale == `en`">
                                        {{ ((pagePagination - 1) * countItemPerPageTable) + (index + 1) }}
                                    </td>
                                    <td class="td-body-table" v-if="locale == `fa`">
                                        {{ (((pagePagination - 1) * countItemPerPageTable) + (index +
                                            1)).toLocaleString("fa") }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ getEnumTitle(sensor.portName, PortName, portNames, locale as string) }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ getEnumTitle(sensor.portKind, PortType, portTypes, locale as string) }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ sensor.templateSensor?.nickName }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ getEnumTitle(sensor.templateSensor?.kind as number, SensorType, sensorTypes,
                                            locale as
                                            string) }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ sensor.templateSensor?.unitMeasurement }}
                                    </td>
                                    <td class="td-body-table">
                                        <router-link :to="{ name: 'InformationSensor', params: { id: sensor.id } }"><img
                                                class="eye-icon" src="@/assets/images/icons/eye-solid.svg"
                                                alt="See More"></router-link>
                                    </td>

                                </tr>

                                <tr v-if="isLoading" class="tr-body-skeleton" v-for="item in countItemPerPageTable">
                                    <td class="td-body-skeleton" v-for="index in 7">
                                        <div class="skeleton-div">

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="sensorsForShow.length == 0 && !isLoading" class="contain-no-item-div">
                        <img class="box-image" src="@/assets/images/icons/box-open-solid.svg" alt="Box Empty">
                        <span class="text-no-item">{{ t('notFoundData') }}</span>
                    </div>
                </div>
                <div class="bottom-of-table-div" :class="locale == `fa` ? `rtl-div` : ``">
                    <button v-if="(totalCountSensorsForShow > 0)" :class="pagePagination === 1 ? `disable-btn` : ``"
                        class="button-pagination-div" @click="prePageTable">
                        <img class="arrow-icon" src="@/assets/images/icons/chevron-left-solid.svg" alt="Back Button">
                    </button>
                    <span class="number-page-table" v-if="(totalCountSensorsForShow > 0)"
                        :class="locale == `fa` ? `rtl-span` : ``"><span v-if="(pagePagination < 10)">0{{ pagePagination
                        }}</span><span v-if="(pagePagination >= 10)">{{ pagePagination }}</span>/ <span
                            v-if="(Math.ceil(totalCountSensorsForShow / countItemPerPageTable) < 10)">0{{
                                Math.ceil(totalCountSensorsForShow
                                    / countItemPerPageTable)
                            }}</span> <span v-if="(Math.ceil(totalCountSensorsForShow / countItemPerPageTable) >= 10)">{{
    Math.ceil(totalCountSensorsForShow
        / countItemPerPageTable)
}}</span></span>
                    <button v-if="(totalCountSensorsForShow > 0)" :class="pagePagination === Math.ceil(totalCountSensorsForShow / countItemPerPageTable)
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
import { PortName, portNames, PortType, portTypes, SensorType, sensorTypes } from "@/enums"
import { API } from '@/plugins/api';
import { getEnumTitle } from '@/plugins/EnumMapper';
import { useRoute } from 'vue-router';
import Map from '@/components/map/Map.vue';
import { toast } from "@/plugins/toast"





const { t, locale } = useI18n({ useScope: 'global' })




onMounted(() => {
    getDeviceDetail();
})

const router = useRoute();
function getDeviceDetail() {
    isLoading.value = true
    axios.get(API.device.user.detail(router.params.id as string)).then((response) => {
        isLoading.value = false
        device.value = response.data
        sensors.value = response.data.sensors
    }).catch((error) => {
        isLoading.value = false
        toast.error(t('errorText'), t('error'))
    })
}


const isLoading = ref(false);

const searchValue = ref("");

const sensors = ref<Sensor[]>([])
const device = ref<Device>()

const sensorsForShow = computed(() => {
    let slicedList: Sensor[] = [];
    let searchList: Sensor[] = sensors.value
    searchList = searchList.filter((item) => item.portKind.toString().toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()) || item.portName.toString().toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()));
    totalCountSensorsForShow.value = searchList.length;
    slicedList = searchList.slice(
        (pagePagination.value - 1) * countItemPerPageTable.value,
        pagePagination.value * countItemPerPageTable.value
    );
    return slicedList;
});

const countItemPerPageTable = ref(10);
const pagePagination = ref(1);
const totalCountSensorsForShow = ref(10)

function prePageTable() {
    if (pagePagination.value != 1) {
        pagePagination.value -= 1;
    }
}

function nextPageTable() {
    if (pagePagination.value != Math.ceil(totalCountSensorsForShow.value / countItemPerPageTable.value)) {
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
@import "Detail.scss";
</style>