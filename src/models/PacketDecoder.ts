import type { Sensor, DeterminedValue } from "@/models"

interface PacketDecoder {
    id?: string,
    code?: string,
    registerDate?: string
    byteNumbers: number[]
    kindProperty: number
    nameProperty: string,
    startByte: number,
    packetSensor?: Sensor
    sensorId?: string
    determinedValues?: DeterminedValue[]
}

export default PacketDecoder