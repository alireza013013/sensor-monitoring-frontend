export const API = {
    templateSensor: {
        index: "TemplateSensor",
    },
    device: {
        admin: {
            index: "Device/Admin",
            detail: (code: string) => `Device/Admin/${code}`,
        },
        user: {
            index: "Device",
            detail: (code: string) => `Device/${code}`,
        }
    },
    sensor: {
        detail: (code: string) => `Sensor/${code}`,
    },
    determinedValue: {
        detail: `Sensor/determinedValues`,
        exel: (code: string) => `Sensor/GenerateExel/${code}`,
    },
    user: {
        index: "User",
        login: "User/Login",
        register: "User/Register",
    }
};
