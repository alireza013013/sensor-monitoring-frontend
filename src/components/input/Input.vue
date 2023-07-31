<template>
    <div v-if="val" class="main-text-field-div">
        <div class="options-verify-div">
            <span class="title" v-if="title">{{ title }}</span>
        </div>
        <img v-if="iconPlaceholder" class="icon-input" :src="iconPlaceholder" alt="Icon Input">
        <input :class="{ 'has-icon': iconPlaceholder }" :pattern="pattern" :disabled="disable" :type="type" :value="value"
            @input="emitValue" :placeholder="placeholder" class="textfield" />
        <span :class="{ 'text-error': errorText && errorText.length > 0 }" v-if="errorText && errorText?.length > 0">{{
            errorText
        }}</span>
    </div>
</template>

<script setup lang="ts">
import InputValidators from "@/plugins/validators";
import { computed } from "vue";

interface TextFieldInterface {
    title?: string;
    placeholder?: string;
    iconPlaceholder?: string;
    value: any;
    isValidated?: boolean;
    errorText?: string;
    type: string;
    disable?: boolean;
    min?: number,
    max?: number,
    typeValidation?: number,
    isVerified?: "verified" | "unverified",
    pattern?: string
}


const {
    lenghtValidation,
    emailValidation,
    passwordValidation,
    minLenghtValidation,
    maxLenghtValidation,
    exactLenghtValidation,
    numberAndExactLengthValidation,
    isNumberValidation
} =
    InputValidators();


const props = defineProps<TextFieldInterface>();
const emit = defineEmits(['update:value', 'update:isValidated', 'update:errorText', 'onSend']);

const val = computed((e) => {
    if (props.value) {
        emitValue(e, props.value)
    }
    return true
})

function emitValue(e: Event, value?: string) {
    let inputValue;
    if (value) {
        inputValue = value
    } else {
        inputValue = (e.target as HTMLInputElement).value
    }
    emit('update:value', inputValue)
    switch (props.typeValidation) {
        case 1:
            let resultPasswordValidation: [string, Boolean] = passwordValidation(inputValue);
            emit("update:errorText", resultPasswordValidation[0])
            emit('update:isValidated', resultPasswordValidation[1])
            break;
        case 2:
            let resultEmailValidation: [string, Boolean] = emailValidation(inputValue);
            emit("update:errorText", resultEmailValidation[0])
            emit('update:isValidated', resultEmailValidation[1])
            break;
        case 3:
            let resultBetweenLenghtValidation: [string, Boolean] = lenghtValidation(props.title!, inputValue, props.min!, props.max!);
            emit("update:errorText", resultBetweenLenghtValidation[0])
            emit('update:isValidated', resultBetweenLenghtValidation[1])
            break;
        case 4:
            let resultMinLenghtValidation: [string, Boolean] = minLenghtValidation(props.title!, inputValue, props.min!);
            emit("update:errorText", resultMinLenghtValidation[0])
            emit('update:isValidated', resultMinLenghtValidation[1])
            break;
        case 5:
            let resultMaxLenghtValidation: [string, Boolean] = maxLenghtValidation(props.title!, inputValue, props.max!);
            emit("update:errorText", resultMaxLenghtValidation[0])
            emit('update:isValidated', resultMaxLenghtValidation[1])
            break;
        case 6:
            let resultExactLenghtValidation: [string, Boolean] = exactLenghtValidation(props.title!, inputValue, props.min!);
            emit("update:errorText", resultExactLenghtValidation[0])
            emit('update:isValidated', resultExactLenghtValidation[1])
            break;
        case 8:
            let resultExactLenghtAndNumberValidation: [string, Boolean] = numberAndExactLengthValidation(inputValue, props.min!, props.title!);
            emit("update:errorText", resultExactLenghtAndNumberValidation[0])
            emit('update:isValidated', resultExactLenghtAndNumberValidation[1])
            break;
        case 9:
            let resultIsNumberValidation: [string, Boolean] = isNumberValidation(inputValue, props.title!);
            emit("update:errorText", resultIsNumberValidation[0])
            emit('update:isValidated', resultIsNumberValidation[1])
            break;
        default:
            break;
    }
}

</script>

<style lang="scss">
@import "Input.scss";
</style>
