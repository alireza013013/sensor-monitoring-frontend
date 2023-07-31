import type { Sensor } from "@/models"

interface SensorTemplate {
    id?: string,
    code?: string,
    registerDate?: string,
    sensors?: Sensor[]
    nickName: string
    kind: number
    unitMeasurement: string
}



export default SensorTemplate