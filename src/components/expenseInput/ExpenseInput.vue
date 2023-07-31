<template>
    <div class="main-expense-input-div">
        <span class="title" v-if="title">{{ title }}</span>
        <div class="chip-inputs-div">
            <div class="contain-inputs-div">
                <Input :placeholder="placeholderMainInput" v-model:is-validated="isValidTitleValue"
                    v-model:value="titleValue" type="text" :type-validation="TypeValidation.MinLength" :min="1" />

                <button @click="addItemToList" class="btn-add">
                    <img class="image-btn" src="@/assets/images/icons/plus-solid.svg" alt="Plus">
                </button>
            </div>
            <div class="chip-div" v-for="item in expences">
                <span>{{ item.value }} </span>
                <div @click="remove(item.code)" class="button-remove-div">
                    <img src="@/assets/images/icons/xmark-solid.svg" alt="Remove">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Input from '@/components/input/Input.vue';
import { TypeValidation } from '@/enums';
import { toast } from "@/plugins/toast"
import { useI18n } from 'vue-i18n'


interface ExpenceInputInterface {
    title?: string;
    placeholderMainInput?: string;
    expences: {
        value: string,
        code: string
    }[],
}

const { t, locale } = useI18n({ useScope: 'global' })
const props = defineProps<ExpenceInputInterface>();
const emit = defineEmits(['update:totalPrice']);
const titleValue = ref<string>("")
const isValidTitleValue = ref<boolean>(false)


function addItemToList() {
    if (titleValue.value.length > 0) {
        let expense = {
            value: titleValue.value.trim(),
            code: Math.random().toString()
        }
        props.expences.push(expense)
        titleValue.value = ""
    } else {
        toast.warning(t('completeInformation'), t('danger'))
    }
}

function remove(code?: string) {
    if (code) {
        const index = props.expences.findIndex((item) => item.code == code);
        if (index > -1) {
            props.expences.splice(index, 1);
        }
    }
}
</script>

<style scoped lang="scss">
@import "ExpenseInput.scss";
</style>