<template>
    <div class="main-sensor-list-div">
        <div class="container-div">
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
                                        {{ t('sensorNickName') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('kind') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('unitMeasurement') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('registerDate') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('numberSensor') }}
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
                                        {{ sensor.nickName }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ getEnumTitle(sensor.kind as number, SensorType, sensorTypes, locale as string) }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ sensor.unitMeasurement }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ sensor.registerDate?.split("T")[0] }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ sensor.sensors?.length }}
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
                        <span class="text-no-item">{{ t('notFound') }}</span>
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
import type { SensorTemplate } from '@/models';
import { SensorType, sensorTypes } from "@/enums"
import { getEnumTitle } from '@/plugins/EnumMapper';
import { API } from '@/plugins/api';
import { toast } from "@/plugins/toast"


const { t, locale } = useI18n({ useScope: 'global' })




onMounted(() => {
    getSensors();
})

function getSensors() {
    isLoading.value = true
    axios.get(API.templateSensor.index).then((response) => {
        sensors.value = response.data
        isLoading.value = false
    }).catch((error) => {
        isLoading.value = false
        toast.error(t('errorText'), t('error'))
    })
}


const isLoading = ref(false);

const searchValue = ref("");

const sensors = ref<SensorTemplate[]>([])

const sensorsForShow = computed(() => {
    let slicedList: SensorTemplate[] = [];
    let searchList: SensorTemplate[] = sensors.value
    searchList = searchList.filter((item) => item.nickName.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()));
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
@import "List.scss";
</style>