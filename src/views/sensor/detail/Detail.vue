<template>
    <div class="main-sensor-information-div">
        <div class="container-div">
            <div class="contain-information-sensor">
                <div class="card-information-div">
                    <div class="information-div">
                        <div class="title-subtitle-div">
                            <span class="title">{{ t('sensorNickName') }} :</span>
                            <span class="subtitle"> {{ sensor?.templateSensor?.nickName }}
                            </span>
                        </div>
                        <div class="title-subtitle-div">
                            <span class="title">{{ t('unitMeasurement') }} :</span>
                            <span class="subtitle"> {{ sensor?.templateSensor?.unitMeasurement }}
                            </span>
                        </div>
                        <div class="title-subtitle-div">
                            <span class="title">{{ t('kind') }} :</span>
                            <span class="subtitle" v-if="sensor?.templateSensor?.kind"> {{
                                getEnumTitle(sensor?.templateSensor?.kind as number, SensorType,
                                    sensorTypes, locale as string) }}
                            </span>
                        </div>
                        <div class="title-subtitle-div">
                            <span class="title">{{ t('portName') }} :</span>
                            <span class="subtitle" v-if="sensor?.portName"> {{
                                getEnumTitle(sensor?.portName as number, PortName,
                                    portNames, locale as string) }}
                            </span>
                        </div>
                        <div class="title-subtitle-div">
                            <span class="title">{{ t('kindPort') }} :</span>
                            <span class="subtitle" v-if="sensor?.portKind != null && sensor.portKind != undefined"> {{
                                getEnumTitle(sensor?.portKind as number, PortType,
                                    portTypes, locale as string) }}
                            </span>
                        </div>
                        <div class="title-subtitle-div">
                            <span class="title">{{ t('registerDate') }} :</span>
                            <span class="subtitle" v-if="sensor?.registerDate"> {{
                                sensor.registerDate.split("T")[0] }}
                            </span>
                        </div>
                    </div>
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
                            {{ t('numberData') }} : <span class="text-count-sensor" v-if="locale == `en`">{{
                                totalPropertiesForShow
                            }}</span>
                            <span class="text-count-sensor" v-if="locale == `fa`">{{
                                totalPropertiesForShow.toLocaleString("fa")
                            }}</span>
                        </span>
                    </div>
                </div>
                <div class="main-table-div">
                    <div v-if="propertiesForShow.length > 0 || isLoading" class="scroll-table-div">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="title-header-table">
                                        {{ t('number') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('nameProperty') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('kindProperty') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('startByte') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('view') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="!isLoading" v-for="(value, index) in propertiesForShow" :key="index"
                                    class="tr-body-table">
                                    <td class="td-body-table">
                                        {{ ((pagePagination - 1) * countItemPerPageTable) + (index + 1) }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ value.nameProperty }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ getEnumTitle(value.kindProperty, KindProperty, kindProperties, locale as string)
                                        }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ value.startByte }}
                                    </td>
                                    <td class="td-body-table">
                                        <router-link :to="{ name: 'DetermindedValueList', params: { id: value.id } }"><img
                                                class="eye-icon" src="@/assets/images/icons/eye-solid.svg"
                                                alt="See More"></router-link>
                                    </td>
                                </tr>

                                <tr v-if="isLoading" class="tr-body-skeleton" v-for="item in countItemPerPageTable">
                                    <td class="td-body-skeleton" v-for="index in 5">
                                        <div class="skeleton-div">

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="propertiesForShow.length == 0 && !isLoading" class="contain-no-item-div">
                        <img class="box-image" src="@/assets/images/icons/box-open-solid.svg" alt="Box Empty">
                        <span class="text-no-item">{{ t('notFoundData') }}</span>
                    </div>
                </div>
                <div class="bottom-of-table-div" :class="locale == `fa` ? `rtl-div` : ``">
                    <button v-if="(totalPropertiesForShow > 0)" :class="pagePagination === 1 ? `disable-btn` : ``"
                        class="button-pagination-div" @click="prePageTable">
                        <img class="arrow-icon" src="@/assets/images/icons/chevron-left-solid.svg" alt="Back Button">
                    </button>
                    <span class="number-page-table" v-if="(totalPropertiesForShow > 0)"><span
                            v-if="(pagePagination < 10)">0{{ pagePagination }}</span><span v-if="(pagePagination >= 10)">{{
                                pagePagination }}</span>/ <span
                            v-if="(Math.ceil(totalPropertiesForShow / countItemPerPageTable) < 10)">0{{
                                Math.ceil(totalPropertiesForShow
                                    / countItemPerPageTable)
                            }}</span> <span v-if="(Math.ceil(totalPropertiesForShow / countItemPerPageTable) >= 10)">{{
    Math.ceil(totalPropertiesForShow
        / countItemPerPageTable)
}}</span></span>
                    <button v-if="(totalPropertiesForShow > 0)" :class="pagePagination === Math.ceil(totalPropertiesForShow / countItemPerPageTable)
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
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import { useRoute } from "vue-router";
import { PortName, PortType, SensorType, portNames, portTypes, sensorTypes, KindProperty, kindProperties } from "@/enums"
import type { Sensor, PacketDecoder } from "@/models"
import { API } from "@/plugins/api"
import { getEnumTitle } from '@/plugins/EnumMapper';
import { toast } from "@/plugins/toast"

const { t, locale } = useI18n({ useScope: 'global' })

onMounted(() => {
    getInformationSensor();
})

const router = useRoute();

function getInformationSensor() {
    isLoading.value = true
    axios.get(API.sensor.detail(router.params.id as string)).then((response) => {
        let sensorRequest: Sensor = {
            portKind: response.data.portKind,
            portName: response.data.portName,
            TemplateSensorId: response.data.templateSensorId,
            templateSensor: response.data.templateSensor,
            code: response.data.code,
            id: response.data.id,
            registerDate: response.data.registerDate,
            packetDecoderRequests: response.data.packetDecoderRequests
        }
        sensor.value = sensorRequest
        properties.value = response.data.packetDecoders
        isLoading.value = false
    }).catch((error) => {
        isLoading.value = false
        toast.error(t('errorText'), t('error'))
    })
}

const tableHeaders: string[] = [
    "Number",
    "Raw Value",
    "Final Value",
    "Date Determined",
]

const isLoading = ref(false);
const searchValue = ref("");
const sensor = ref<Sensor>()
const properties = ref<PacketDecoder[]>([])

const propertiesForShow = computed(() => {
    let slicedList: PacketDecoder[] = [];
    let searchList: PacketDecoder[] = properties.value
    searchList = searchList.filter((item) => item.nameProperty.toString().toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()));
    totalPropertiesForShow.value = searchList.length;
    slicedList = searchList.slice(
        (pagePagination.value - 1) * countItemPerPageTable.value,
        pagePagination.value * countItemPerPageTable.value
    );
    return slicedList;
});

const countItemPerPageTable = ref(10);
const pagePagination = ref(1);
const totalPropertiesForShow = ref(10)

function prePageTable() {
    if (pagePagination.value != 1) {
        pagePagination.value -= 1;
    }
}

function nextPageTable() {
    if (pagePagination.value != Math.ceil(totalPropertiesForShow.value / countItemPerPageTable.value)) {
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