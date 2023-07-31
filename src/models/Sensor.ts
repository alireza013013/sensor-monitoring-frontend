import type { PacketDecoder, SensorTemplate } from "@/models"

interface Sensor {
    TemplateSensorId: string,
    portName: number,
    portKind: number,
    packetDecoderRequests: PacketDecoder[]
    templateSensor?: SensorTemplate
    code?: string,
    id?: string,
    registerDate?: string,
}

export default Sensor