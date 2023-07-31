<template>
    <div class="main-create-device-div">
        <Loading v-if="isLoading" />
        <div class="container-div">
            <div class="title-btn-save-div">
                <h1 class="title">{{ t('createSensor') }}</h1>
                <button @click="createSensor" class="btn-form">
                    {{ t('save') }}
                </button>
            </div>
            <div class="row-input">
                <Input v-model:error-text="errorTextSensorNickName" v-model:is-validated="isValidateSensorNickName"
                    :type-validation="TypeValidation.BetweenLength" :min="5" :max="50" placeholder="My Sensor" type="text"
                    :title="t('sensorNickName')" v-model:value="sensorNickName" />

                <DropdownInput :title="t('kind')" placeholder="Temperate" :has-search-box="true"
                    v-model:selected-option="selectedSensorTypes" :options="sensorTypesOption" />
            </div>

            <div class="row-input">
                <Input v-model:error-text="errorTextUnitMeasurement" v-model:is-validated="isValidateUnitMeasurement"
                    :type-validation="TypeValidation.BetweenLength" :min="1" :max="50" placeholder="Kg" type="text"
                    :title="t('unitMeasurement')" v-model:value="unitMeasurement" />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import Input from '@/components/input/Input.vue';
import DropdownInput from '@/components/dropdownInput/DropdownInput.vue'
import Loading from "@/components/loading/Loading.vue"
import { TypeValidation, SensorType, sensorTypes } from "@/enums"
import type { DropDownInputOptionInterface, SensorTemplate } from "@/models"
import { createEnumValues } from "@/plugins/EnumMapper"
import { useI18n } from 'vue-i18n'
import { toast } from "@/plugins/toast"
import axios from 'axios';
import { API } from "@/plugins/api"
import { useRouter } from 'vue-router';


const { t, locale } = useI18n({ useScope: 'global' })

const router = useRouter()
const sensorNickName = ref<string>("")
const errorTextSensorNickName = ref<string>("")
const isValidateSensorNickName = ref<boolean>(false)

const sensorTypesOption = ref<DropDownInputOptionInterface[]>(createEnumValues(SensorType, sensorTypes, locale.value as string))
const selectedSensorTypes = ref<DropDownInputOptionInterface>()

const unitMeasurement = ref<string>("")
const errorTextUnitMeasurement = ref<string>("")
const isValidateUnitMeasurement = ref<boolean>(false)

const isLoading = ref<boolean>(false)

function createSensor() {
    if (isValidateSensorNickName.value && isValidateUnitMeasurement.value && selectedSensorTypes.value) {
        isLoading.value = true
        let templateSensor: SensorTemplate = {
            kind: selectedSensorTypes.value.payload as number,
            nickName: sensorNickName.value,
            unitMeasurement: unitMeasurement.value
        }
        axios.post(API.templateSensor.index, templateSensor).then((response) => {
            toast.success(t('successText'), t('successfully'))
            isLoading.value = false
            router.push({ name: "ListSensor" })
        }).catch((error) => {
            toast.error(t('errorText'), t('error'))
            isLoading.value = false
        })
    } else {
        toast.warning(t('completeInformation'), t('danger'))
    }
}



</script>

<style scoped lang="scss">
@import "Create.scss";
</style>