import type { User, Sensor } from "@/models"

interface Device {
    code?: string,
    id?: string,
    registerDate?: string,
    deviceModel: string
    phoneNumber: string
    IMEIModem: string
    simCardCharge: string
    nickName: string
    latPosition: number
    lngPosition: number
    sensors: Sensor[],
    userId?: string,
    user?: User
}



export default Device;