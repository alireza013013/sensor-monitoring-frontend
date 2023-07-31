import { createToast } from "mosha-vue-toastify";


export const toast = {
    success: (text: string, title: string) => {
        createToast({
            title: title,
            description: text
        },
            {
                position: 'top-center',
                type: "success",
                transition: 'slide',
                timeout: 3000,
            })
    },
    warning: (text: string, title: string) => {
        createToast({
            title: title,
            description: text
        },
            {
                position: 'top-center',
                type: "warning",
                transition: 'slide',
                timeout: 3000,
            })
    },
    error: (text: string, title: string) => {
        createToast({
            title: title,
            description: text
        },
            {
                position: 'top-center',
                type: "danger",
                transition: 'slide',
                timeout: 3000,
            })
    },
    info: (text: string, title: string) => {
        createToast({
            title: title,
            description: text
        },
            {
                position: 'top-center',
                type: "info",
                transition: 'slide',
                timeout: 3000,
            })
    },
}