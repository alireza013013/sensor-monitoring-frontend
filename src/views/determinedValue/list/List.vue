<template>
    <div class="main-sensor-information-div">
        <div class="container-div">
            <div class="contain-information-sensor">
                <div class="card-information-div">
                    <div class="information-div">
                        <div class="title-subtitle-div" v-if="packetDecoder">
                            <span class="title">{{ t('nameProperty') }} :</span>
                            <span class="subtitle"> {{ packetDecoder.nameProperty }}
                            </span>
                        </div>
                        <div class="title-subtitle-div" v-if="sensor">
                            <span class="title">{{ t('sensorNickName') }} :</span>
                            <span class="subtitle"> {{ sensor?.templateSensor?.nickName }}
                            </span>
                        </div>
                        <div class="title-subtitle-div" v-if="sensor">
                            <span class="title">{{ t('kind') }} :</span>
                            <span class="subtitle" v-if="sensor?.templateSensor?.kind"> {{
                                getEnumTitle(sensor?.templateSensor?.kind as number, SensorType,
                                    sensorTypes, locale as string) }}
                            </span>
                        </div>
                        <div class="title-subtitle-div" v-if="sensor">
                            <span class="title">{{ t('portName') }} :</span>
                            <span class="subtitle" v-if="sensor?.portName"> {{
                                getEnumTitle(sensor?.portName as number, PortName,
                                    portNames, locale as string) }}
                            </span>
                        </div>
                        <div class="title-subtitle-div" v-if="sensor">
                            <span class="title">{{ t('kindPort') }} :</span>
                            <span class="subtitle" v-if="sensor?.portKind"> {{
                                getEnumTitle(sensor?.portKind as number, PortType,
                                    portTypes, locale as string) }}
                            </span>
                        </div>
                        <div class="title-subtitle-div" v-if="sensor">
                            <span class="title">{{ t('registerDate') }} :</span>
                            <span class="subtitle" v-if="sensor?.registerDate"> {{
                                sensor.registerDate.split("T")[0] }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="chart-div">
                    <Line v-if="chartLoaded" :data="finalData" :options="options" />
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
                                <input @input="onUrlInput" v-model="searchValue" type="text" class="input-search"
                                    :class="isOpenSearchBox ? `open-input-search` : ``" />
                            </div>
                            <button @click="exportExel" class="extra-option-table-button">
                                <img class="image-button-extra" src="@/assets/images/icons/file-excel-solid.svg" alt="Exel">
                            </button>
                            <!-- <button class="extra-option-table-button">
                                <img class="image-button-extra" src="@/assets/images/icons/print-solid.svg" alt="Print">
                            </button> -->
                        </div>
                        <span class="text-count-sensor">
                            {{ t('numberData') }} : <span class="text-count-sensor" v-if="locale == `en`">{{
                                totalDeterminedValueForShow
                            }}</span>
                            <span class="text-count-sensor" v-if="locale == `fa`">{{
                                totalDeterminedValueForShow.toLocaleString("fa")
                            }}</span>
                        </span>
                        <div class="dropdown-count">
                            <DropdownInput :title="t('countDataTable')" placeholder="100"
                                v-model:selected-option="selectedCountShowPerPage" :options="countShowPerPageOption" />
                        </div>
                    </div>
                </div>
                <div class="main-table-div">
                    <div v-if="determinedValues.length > 0 || isLoading" class="scroll-table-div">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="title-header-table">
                                        {{ t('number') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('finalValue') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('dateDetermined') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('registerDate') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="!isLoading" v-for="(value, index) in determinedValues" :key="index"
                                    class="tr-body-table">
                                    <td class="td-body-table">
                                        {{ ((pagePagination - 1) * (selectedCountShowPerPage.payload as number)) + (index +
                                            1) }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ value.value }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ value.dateTimeDetermined }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ value.registerDate }}
                                    </td>

                                </tr>

                                <tr v-if="isLoading" class="tr-body-skeleton"
                                    v-for="item in (selectedCountShowPerPage.payload as number)">
                                    <td class="td-body-skeleton" v-for="index in 4">
                                        <div class="skeleton-div">

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="determinedValues.length == 0 && !isLoading" class="contain-no-item-div">
                        <img class="box-image" src="@/assets/images/icons/box-open-solid.svg" alt="Box Empty">
                        <span class="text-no-item">{{ t('notFoundData') }}</span>
                    </div>
                </div>
                <div class="bottom-of-table-div" :class="locale == `fa` ? `rtl-div` : ``">
                    <button v-if="(totalDeterminedValueForShow > 0)" :class="pagePagination === 1 ? `disable-btn` : ``"
                        class="button-pagination-div" @click="prePageTable">
                        <img class="arrow-icon" src="@/assets/images/icons/chevron-left-solid.svg" alt="Back Button">
                    </button>
                    <span class="number-page-table" v-if="(totalDeterminedValueForShow > 0)"><span
                            v-if="(pagePagination < 10)">0{{ pagePagination }}</span><span v-if="(pagePagination >= 10)">{{
                                pagePagination }}</span>/ <span
                            v-if="(Math.ceil(totalDeterminedValueForShow / (selectedCountShowPerPage.payload as number)) < 10)">0{{
                                Math.ceil(totalDeterminedValueForShow
                                    / (selectedCountShowPerPage.payload as number))
                            }}</span> <span
                            v-if="(Math.ceil(totalDeterminedValueForShow / (selectedCountShowPerPage.payload as number)) >= 10)">{{
                                Math.ceil(totalDeterminedValueForShow
                                    / (selectedCountShowPerPage.payload as number))
                            }}</span></span>
                    <button v-if="(totalDeterminedValueForShow > 0)" :class="pagePagination === Math.ceil(totalDeterminedValueForShow / (selectedCountShowPerPage.payload as number))
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
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import { useRoute } from "vue-router";
import { PortName, PortType, SensorType, portNames, portTypes, sensorTypes } from "@/enums"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import type { Sensor, DeterminedValue, PacketDecoder, DropDownInputOptionInterface } from '@/models'
import { API } from "@/plugins/api"
import { getEnumTitle } from '@/plugins/EnumMapper';
import { toast } from "@/plugins/toast"
import DropdownInput from '@/components/dropdownInput/DropdownInput.vue'


const { t, locale } = useI18n({ useScope: 'global' })


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            ticks: {
                color: '#00b6ff',
            },
            title: {
                display: true,
                text: 'Date',
                color: '#00b6ff',
                font: {
                    family: 'Comic Sans MS',
                    size: 20,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
                padding: { top: 20, left: 0, right: 0, bottom: 0 }
            }
        },
        y: {
            ticks: {
                color: '#00b6ff',
            },
            title: {
                display: true,
                text: 'Value',
                color: '#00b6ff',
                font: {
                    family: 'Comic Sans MS',
                    size: 20,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
                padding: { top: 20, left: 0, right: 0, bottom: 0 }
            }
        },
    }
}


const finalData = ref<{
    labels: string[],
    datasets: [
        {
            label: string,
            backgroundColor: string,
            borderColor: string,
            tension: number,
            data: number[],
            pointStyle: any,
            // pointRadius: number,
            // pointHoverRadius: number
        }
    ]
}>({
    labels: [],
    datasets: [
        {
            label: 'Fianl Value',
            backgroundColor: '#00b6ff',
            borderColor: "#00b6ff",
            tension: 0.4,
            data: [],
            pointStyle: false,
            // pointRadius: 6,
            // pointHoverRadius: 10
        }
    ]
})

const chartLoaded = ref(false)


onMounted(() => {
    getDeterminedValue();
})

const router = useRoute();

function getDeterminedValue() {
    isLoading.value = true;
    determinedValues.value = []
    finalData.value.labels = []
    finalData.value.datasets[0].data = []
    chartLoaded.value = false
    let pagination;
    if (searchValue.value != "") {
        pagination = {
            id: router.params.id as string,
            pageNumber: pagePagination.value,
            countPage: (selectedCountShowPerPage.value.payload as number),
            SearchValue: parseFloat(searchValue.value)
        }
    } else {
        pagination = {
            id: router.params.id as string,
            pageNumber: pagePagination.value,
            countPage: (selectedCountShowPerPage.value.payload as number)
        }
    }
    axios.post(API.determinedValue.detail, pagination).then((response) => {
        for (let index = 0; index < response.data.determinedValues.length; index++) {
            const element = response.data.determinedValues[index];
            let determinedValue: DeterminedValue = {
                code: element.id,
                dateTimeDetermined: element.dateTimeDetermined,
                value: element.value,
                registerDate: element.registerDate
            }
            finalData.value.labels.push(element.dateTimeDetermined)
            finalData.value.datasets[0].data.push(element.value)
            determinedValues.value.push(determinedValue)
        }
        totalDeterminedValueForShow.value = response.data.totalCount
        // packetDecoder.value = response.data[0].packetDecoder
        // sensor.value = response.data[0].packetDecoder.packetSensor
        chartLoaded.value = true
        isLoading.value = false
    }).catch((error) => {
        isLoading.value = false
        toast.error(t('errorText'), t('error'))
    })
}

function exportExel() {
    axios.get(API.determinedValue.exel(router.params.id as string)).then((response) => {
        const url = URL.createObjectURL(new Blob([response.data], {
            type: 'application/vnd.ms-excel'
        }))
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Exel Data");
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success(t('fileExport'), t('successfully'))
    }).catch((error) => {
        toast.error(t('errorText'), t('error'))
    })
}


const isLoading = ref(false);
const searchValue = ref("");
const inputUrlEventWaitTimeoutId = ref<any>(0);
const sensor = ref<Sensor>()
const determinedValues = ref<DeterminedValue[]>([])
const packetDecoder = ref<PacketDecoder>()
const pagePagination = ref(1);
const totalDeterminedValueForShow = ref(0)

const countShowPerPageOption = ref<DropDownInputOptionInterface[]>([
    {
        payload: 50,
        title: "50"
    },
    {
        payload: 100,
        title: "100"
    },
    {
        payload: 200,
        title: "200"
    },
    {
        payload: 500,
        title: "500"
    },
])
const selectedCountShowPerPage = ref<DropDownInputOptionInterface>(countShowPerPageOption.value[1])

function onUrlInput(event: any) {
    if (inputUrlEventWaitTimeoutId.value != 0) {
        clearTimeout(inputUrlEventWaitTimeoutId.value);
    }
    inputUrlEventWaitTimeoutId.value = setTimeout(() => {
        pagePagination.value = 1
        getDeterminedValue()
    }, 600);
}

watch(() => selectedCountShowPerPage.value, () => {
    pagePagination.value = 1
    getDeterminedValue()
})

function prePageTable() {
    if (pagePagination.value != 1) {
        pagePagination.value -= 1;
        getDeterminedValue()
    }
}

function nextPageTable() {
    if (pagePagination.value != Math.ceil(totalDeterminedValueForShow.value / (selectedCountShowPerPage.value.payload as number))) {
        pagePagination.value += 1;
        getDeterminedValue()
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