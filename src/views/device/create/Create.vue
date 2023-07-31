<template>
    <div class="main-create-device-div">
        <Loading v-if="isLoading" />
        <Modal v-if="isShowModalAddProperty">
            <div class="main-add-packet-modal">
                <h1 class="title-modal">
                    {{ t('addProperty') }}
                </h1>

                <div class="row-input">
                    <ExpenseInput :expences="byteNumbers" :title="t('byteNumbers')" placeholder-main-input="10" />

                    <DropdownInput :title="t('kindProperty')" placeholder="INT32"
                        v-model:selected-option="selectedKindProperty" :options="kindPropertyOption" />
                </div>
                <div class="row-input">
                    <Input v-model:error-text="errorTextStartByte" v-model:is-validated="isValidateStartByte"
                        :type-validation="TypeValidation.Number" placeholder="10" type="text" :title="t('startByte')"
                        v-model:value="startByte" />

                    <Input v-model:error-text="errorTextNameProperty" v-model:is-validated="isValidateNameProperty"
                        :type-validation="TypeValidation.BetweenLength" placeholder="My Property" type="text"
                        :title="t('nameProperty')" v-model:value="nameProperty" :min="4" :max="50" />
                </div>
                <div class="buttons-modal">
                    <button v-if="!isEditProperty" @click="saveProperty" class="btn-form">
                        {{ t('save') }}
                    </button>
                    <button v-if="isEditProperty" @click="confirmEditProperty" class="btn-form">
                        {{ t('edit') }}
                    </button>
                    <button @click="closePropetyModal" class="btn-form">
                        {{ t('cancel') }}
                    </button>
                </div>
            </div>
        </Modal>
        <div class="container-div">
            <div class="title-btn-save-div">
                <h1 class="title">{{ t('createDevice') }}</h1>
                <button @click="createDevice" class="btn-form">
                    {{ t('save') }}
                </button>
            </div>
            <div class="row-input">
                <Input v-model:error-text="errorTextDeviceModel" v-model:is-validated="isValidateDeviceModel"
                    :type-validation="TypeValidation.BetweenLength" :min="5" :max="50" placeholder="ARTU_51" type="text"
                    :title="t('deviceModel')" v-model:value="deviceModel" />

                <Input v-model:error-text="errorTextPhoneNumber" v-model:is-validated="isValidatePhoneNumber"
                    :type-validation="TypeValidation.NumberAndExactLength" :min="11" placeholder="09123456789" type="text"
                    :title="t('phoneNumber')" v-model:value="phoneNumber" />
            </div>

            <div class="row-input">
                <Input v-model:error-text="errorTextIMEIModem" v-model:is-validated="isValidateIMEIModem"
                    :type-validation="TypeValidation.BetweenLength" :min="5" :max="50" placeholder="123456789" type="text"
                    :title="t('imeiModel')" v-model:value="IMEIModem" />

                <Input v-model:error-text="errorTextSimCardCharge" v-model:is-validated="isValidateSimCardCharge"
                    :type-validation="TypeValidation.Number" placeholder="09123456789" type="text"
                    :title="t('simCardCharge')" v-model:value="simCardCharge" />
            </div>


            <div class="row-input">
                <Input class="special-input" v-model:error-text="errorTextDeviceNickName"
                    v-model:is-validated="isValidateDeviceNickName" :type-validation="TypeValidation.BetweenLength" :min="5"
                    :max="50" placeholder="My Device" type="text" :title="t('deviceNickName')"
                    v-model:value="deviceNickName" />

                <DropdownInput :title="t('owner')" placeholder="Ali Ahmadi" :has-search-box="true"
                    v-model:selected-option="selectedUser" :options="usersOption" />
            </div>

            <div class="row-input">
                <div class="map-div">
                    <Map :allow-change-possition="true" @send-possition="changePossition" :title="t('possition')" />
                </div>
            </div>



            <div class="form-create-port-div">
                <div class="title-btn-save-div">
                    <span class="subtitle-form">{{ t('connectPort') }}</span>
                    <button v-if="!isEditModePort" @click="addSensor" class="btn">{{ t('save') }}</button>
                    <button v-if="isEditModePort" @click="submitEditSensor" class="btn">{{ t('edit') }}</button>
                </div>
                <div class="row-input">
                    <DropdownInput :title="t('sensor')" placeholder="حسگر دما" :has-search-box="true"
                        v-model:selected-option="selectedSensorTemplate" :options="sensorTemplatesOption" />

                    <DropdownInput :title="t('portName')" placeholder="A" :has-search-box="true"
                        v-model:selected-option="selectedPortNames" :options="portNamesOption" />
                </div>
                <div class="row-input">
                    <DropdownInput :title="t('kindPort')" placeholder="مودباس" :has-search-box="true"
                        v-model:selected-option="selectedPortTypes" :options="portTypesOption" />
                </div>
                <div class="properties-div">
                    <div class="card-property" v-for="(property, index) in properties" :key="index">
                        <span class="title">{{ t('byteNumbers') }} : <span class="suntitle"> <template
                                    v-for="number in property.byteNumbers">{{ number }},</template>
                            </span></span>

                        <span class="title">{{ t('kindProperty') }} : <span class="suntitle">
                                {{ getEnumTitle(property.kindProperty, KindProperty, kindProperties, locale as string) }}
                            </span></span>

                        <span class="title">{{ t('nameProperty') }} : <span class="suntitle"> {{ property.nameProperty }}
                            </span></span>

                        <span class="title">{{ t('startByte') }} : <span class="suntitle"> {{ property.startByte }}
                            </span></span>

                        <div class="button-controll-div">
                            <button @click="editProperty(property)" class="btn-controll">
                                <img class="image-button" src="@/assets/images/icons/pen-solid.svg" alt="Edit">
                            </button>

                            <button @click="deleteProperty(property)" class="btn-controll">
                                <img class="image-button" src="@/assets/images/icons/trash-solid.svg" alt="Delete">
                            </button>
                        </div>
                    </div>
                    <div @click="openModalAddProperty" class="add-card-property">
                        <img class="plus-icon" src="@/assets/images/icons/plus-solid.svg" alt="Add">
                        <span class="add-property-text">
                            {{ t('add') }}
                        </span>
                    </div>
                </div>
            </div>

            <h2 class="subtitle" v-if="sensors.length > 0">{{ t('ports') }}</h2>

            <div class="cards-sensor-connected-div">
                <div class="card-sensor" v-for="(sensor, index) in sensors" :key="index">
                    <div class="information-div">
                        <span class="title">{{ t('sensor') }} : <span class="suntitle"> {{
                            sensorTemplatesOption.filter((item) => item.payload == sensor.TemplateSensorId)[0].title
                        }}
                            </span></span>
                        <span class="title">{{ t('kindPort') }} : <span class="suntitle">{{
                            getEnumTitle(sensor.portKind, PortType, portTypes, locale as string) }}</span></span>
                        <span class="title">{{ t('portName') }} : <span class="suntitle">{{
                            getEnumTitle(sensor.portName, PortName, portNames, locale as string) }}</span></span>
                    </div>
                    <div class="image-div">
                        <img :class="true ? `active` : `deactive`" class="image" src="@/assets/images/icons/plug-solid.svg"
                            alt="Plug">
                    </div>
                    <div class="button-controll-div">
                        <button @click="editPort(sensor)" class="btn-controll">
                            <img class="image-button" src="@/assets/images/icons/pen-solid.svg" alt="Edit">
                        </button>

                        <button @click="deletePort(sensor)" class="btn-controll">
                            <img class="image-button" src="@/assets/images/icons/trash-solid.svg" alt="Delete">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import Input from '@/components/input/Input.vue';
import DropdownInput from '@/components/dropdownInput/DropdownInput.vue'
import Map from '@/components/map/Map.vue';
import Loading from "@/components/loading/Loading.vue"
import { TypeValidation, PortType, portTypes, PortName, portNames, SensorType, sensorTypes, KindProperty, kindProperties } from "@/enums"
import type { DropDownInputOptionInterface, SensorTemplate, Device, User, PacketDecoder } from "@/models"
import { createEnumValues, getEnumTitle } from "@/plugins/EnumMapper"
import { useI18n } from 'vue-i18n'
import type Sensor from '@/models/Sensor';
import type { latLng } from "leaflet";
import { toast } from "@/plugins/toast"
import axios from 'axios';
import { API } from "@/plugins/api"
import { useRouter } from 'vue-router';
import Modal from "@/components/modal/Modal.vue"
import ExpenseInput from "@/components/expenseInput/ExpenseInput.vue"

const { t, locale } = useI18n({ useScope: 'global' })

const router = useRouter()
const deviceModel = ref<string>("")
const errorTextDeviceModel = ref<string>("")
const isValidateDeviceModel = ref<boolean>(false)

const phoneNumber = ref<string>("")
const errorTextPhoneNumber = ref<string>("")
const isValidatePhoneNumber = ref<boolean>(false)

const IMEIModem = ref<string>("")
const errorTextIMEIModem = ref<string>("")
const isValidateIMEIModem = ref<boolean>(false)

const simCardCharge = ref<string>("")
const errorTextSimCardCharge = ref<string>("")
const isValidateSimCardCharge = ref<boolean>(false)

const deviceNickName = ref<string>("")
const errorTextDeviceNickName = ref<string>("")
const isValidateDeviceNickName = ref<boolean>(false)

const latLngPossition = ref<latLng>()

const portTypesOption = ref<DropDownInputOptionInterface[]>(createEnumValues(PortType, portTypes, locale.value as string))
const selectedPortTypes = ref<DropDownInputOptionInterface>()

const portNamesOption = ref<DropDownInputOptionInterface[]>(createEnumValues(PortName, portNames, locale.value as string))
const selectedPortNames = ref<DropDownInputOptionInterface>()

const sensorTemplatesOption = ref<DropDownInputOptionInterface[]>([])
const selectedSensorTemplate = ref<DropDownInputOptionInterface>()


const sensors = ref<Sensor[]>([])
const selectedSensorForEdit = ref<Sensor>()
const isEditModePort = ref<boolean>(false)

const users = ref<User[]>([])
const usersOption = ref<DropDownInputOptionInterface[]>([])
const selectedUser = ref<DropDownInputOptionInterface>()

const isLoading = ref<boolean>(false)

const properties = ref<PacketDecoder[]>([])
const isShowModalAddProperty = ref<boolean>(false)

const nameProperty = ref<string>("")
const errorTextNameProperty = ref<string>("")
const isValidateNameProperty = ref<boolean>(false)

const startByte = ref<string>("")
const errorTextStartByte = ref<string>("")
const isValidateStartByte = ref<boolean>(false)

const kindPropertyOption = ref<DropDownInputOptionInterface[]>(createEnumValues(KindProperty, kindProperties, locale.value as string))
const selectedKindProperty = ref<DropDownInputOptionInterface>()

const isEditProperty = ref<boolean>(false)
const selectedPropertyForEdit = ref<PacketDecoder>()

const byteNumbers = ref<{
    value: string,
    code: string
}[]>([]);

function changePossition(newPossition: latLng) {
    latLngPossition.value = newPossition
}

function addSensor() {
    if (selectedSensorTemplate.value && selectedPortNames.value && selectedPortTypes.value && properties.value.length > 0) {
        let sensor: Sensor = {
            TemplateSensorId: selectedSensorTemplate.value.payload as string,
            portKind: selectedPortTypes.value?.payload as number,
            portName: selectedPortNames.value?.payload as number,
            packetDecoderRequests: [...properties.value]
        }
        sensors.value.push(sensor)
        portNamesOption.value = portNamesOption.value.filter((item) => item.payload != selectedPortNames.value?.payload)
        selectedPortNames.value = undefined
        selectedPortTypes.value = undefined
        selectedSensorTemplate.value = undefined
        properties.value = []
        toast.success(t('successText'), t('successfully'))
    } else {
        toast.warning(t('completeInformation'), t('danger'))
    }
}

function deletePort(sensor: Sensor) {
    sensors.value = sensors.value.filter((item) => item.portName != sensor.portName)
    portNamesOption.value.push({
        payload: sensor.portName,
        title: getEnumTitle(sensor.portName, PortName, portNames, locale.value as string)
    })
    toast.success(t('successText'), t('successfully'))
}

function editPort(sensor: Sensor) {
    isEditModePort.value = true
    selectedSensorForEdit.value = sensor
    selectedPortNames.value = {
        payload: sensor.portName,
        title: getEnumTitle(sensor.portName, PortName, portNames, locale.value as string)
    }
    selectedPortTypes.value = {
        payload: sensor.portKind,
        title: getEnumTitle(sensor.portKind, PortType, portTypes, locale.value as string)
    }
    selectedSensorTemplate.value = {
        payload: sensor.TemplateSensorId,
        title: sensorTemplatesOption.value.filter((item) => item.payload == sensor.TemplateSensorId)[0].title
    }
    properties.value = sensor.packetDecoderRequests
}

function submitEditSensor() {
    if (selectedSensorTemplate.value && selectedPortNames.value && selectedPortTypes.value && selectedSensorForEdit.value && properties.value.length > 0) {
        if (selectedSensorForEdit.value.portName != selectedPortNames.value?.payload) {
            portNamesOption.value.push({
                payload: selectedSensorForEdit.value.portName,
                title: getEnumTitle(selectedSensorForEdit.value.portName, PortName, portNames, locale.value as string)
            })
            portNamesOption.value = portNamesOption.value.filter((item) => item.payload != selectedPortNames.value?.payload)

        }
        selectedSensorForEdit.value.portKind = selectedPortTypes.value?.payload as number
        selectedSensorForEdit.value.portName = selectedPortNames.value?.payload as number
        selectedSensorForEdit.value.TemplateSensorId = selectedSensorTemplate.value.payload as string
        selectedSensorForEdit.value.packetDecoderRequests = [...properties.value]
        selectedPortNames.value = undefined
        selectedPortTypes.value = undefined
        selectedSensorTemplate.value = undefined
        selectedSensorForEdit.value = undefined
        properties.value = []
        isEditModePort.value = false
        toast.success(t('successText'), t('successfully'))
    } else {
        toast.warning(t('completeInformation'), t('danger'))
    }
}

function createDevice() {
    if (isValidateDeviceModel.value && isValidatePhoneNumber.value && isValidateIMEIModem.value && isValidateSimCardCharge.value && isValidateDeviceNickName.value && latLngPossition.value && sensors.value.length > 0 && selectedUser.value) {
        isLoading.value = true
        let device: Device = {
            deviceModel: deviceModel.value,
            IMEIModem: IMEIModem.value,
            nickName: deviceNickName.value,
            phoneNumber: phoneNumber.value,
            simCardCharge: simCardCharge.value,
            latPosition: latLngPossition.value.lat,
            lngPosition: latLngPossition.value.lng,
            sensors: sensors.value,
            userId: selectedUser.value.payload as string
        }
        axios.post(API.device.admin.index, device).then((response) => {
            isLoading.value = false
            toast.success(t('successText'), t('successfully'))
            router.push({ name: "ListDevice" })
        }).catch((error) => {
            isLoading.value = false
            toast.error(t('errorText'), t('error'))
        })
    } else {
        toast.warning(t('completeInformation'), t('danger'))
    }
}


watch(() => locale.value, () => {
    portTypesOption.value = []
    portTypesOption.value = createEnumValues(PortType, portTypes, locale.value as string)
})

onMounted(async () => {
    await getTemplateSensor()
    await getUsers()
})

async function getTemplateSensor() {
    isLoading.value = true
    try {
        const response = await axios.get(API.templateSensor.index)
        for (let index = 0; index < response.data.length; index++) {
            const element: SensorTemplate = response.data[index];
            const optionDropDownSensorTemplate: DropDownInputOptionInterface = {
                payload: element.id as string,
                title: element.nickName + " - " + getEnumTitle(element.kind, SensorType, sensorTypes, locale.value as string)
            }
            sensorTemplatesOption.value.push(optionDropDownSensorTemplate)
        }
        isLoading.value = false
    } catch (error) {
        isLoading.value = false
        toast.error(t('errorText'), t('error'))
    }
}

async function getUsers() {
    isLoading.value = true
    try {
        const response = await axios.get(API.user.index)
        users.value = response.data
        for (let index = 0; index < users.value.length; index++) {
            const element: User = users.value[index];
            const optionDropDownUser: DropDownInputOptionInterface = {
                payload: element.id as string,
                title: element.lastName + " - " + element.userName
            }
            usersOption.value.push(optionDropDownUser)
        }
        isLoading.value = false
    } catch (error: any) {
        isLoading.value = false
        toast.error(t('errorText'), t('error'))
    }
}


function openModalAddProperty() {
    isShowModalAddProperty.value = true
}

function closePropetyModal() {
    isEditProperty.value = false
    isShowModalAddProperty.value = false
    selectedKindProperty.value = undefined
    byteNumbers.value = []
    nameProperty.value = ""
    startByte.value = ""
}

function saveProperty() {
    if (byteNumbers.value.length > 0 && selectedKindProperty.value && isValidateStartByte.value && isValidateNameProperty.value) {
        let byteNumbersInNumber: number[] = [];
        byteNumbers.value.forEach(element => {
            byteNumbersInNumber.push(Number(element.value))
        });
        let proprty: PacketDecoder = {
            id: Math.random().toString(),
            byteNumbers: byteNumbersInNumber,
            kindProperty: selectedKindProperty.value.payload as number,
            nameProperty: nameProperty.value,
            startByte: Number(startByte.value)
        }
        properties.value.push(proprty)
        isShowModalAddProperty.value = false
        selectedKindProperty.value = undefined
        byteNumbers.value = []
        nameProperty.value = ""
        startByte.value = ""
    } else {
        toast.warning(t('completeInformation'), t('danger'))
    }
}

function confirmEditProperty() {
    if (byteNumbers.value.length > 0 && selectedKindProperty.value && isValidateStartByte.value && isValidateNameProperty.value) {
        if (selectedPropertyForEdit.value) {
            let byteNumbersInNumber: number[] = [];
            byteNumbers.value.forEach(element => {
                byteNumbersInNumber.push(Number(element.value))
            });
            selectedPropertyForEdit.value.byteNumbers = byteNumbersInNumber
            selectedPropertyForEdit.value.kindProperty = selectedKindProperty.value.payload as number
            selectedPropertyForEdit.value.nameProperty = nameProperty.value
            selectedPropertyForEdit.value.startByte = Number(startByte.value)
            isShowModalAddProperty.value = false
            selectedKindProperty.value = undefined
            byteNumbers.value = []
            nameProperty.value = ""
            startByte.value = ""
            selectedKindProperty.value = undefined
            isEditProperty.value = false
        }
    } else {
        toast.warning(t('completeInformation'), t('danger'))
    }
}


function editProperty(property: PacketDecoder) {
    isEditProperty.value = true
    isShowModalAddProperty.value = true
    selectedKindProperty.value = {
        payload: property.kindProperty,
        title: getEnumTitle(property.kindProperty as number, KindProperty, kindProperties, locale.value as string)
    }
    nameProperty.value = property.nameProperty
    startByte.value = property.startByte.toString()
    property.byteNumbers.forEach(element => {
        let byteNumberExpence = {
            code: Math.random().toString(),
            value: element.toString()
        }
        byteNumbers.value.push(byteNumberExpence)
    });
    selectedPropertyForEdit.value = property
}

function deleteProperty(property: PacketDecoder) {
    properties.value = properties.value.filter((item) => item.id != property.id)
    toast.success(t('successText'), t('successfully'))
}

</script>




<style scoped lang="scss">
@import "Create.scss";
</style>