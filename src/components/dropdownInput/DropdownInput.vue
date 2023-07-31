<template>
    <div class="main-dropdown-div">
        <span class="title">{{ title }}</span>
        <div class="dropdown" @click="openDropDown" :class="props.isDisabled ? `disable` : ``">
            <span class="item-placeholder" v-if="props.selectedOption == undefined ||
                props.selectedOption == null ||
                props.selectedOption?.title == ``
                ">{{ placeholder }}</span>
            <span class="item-selected" v-if="props.selectedOption?.title !== ``">{{
                selectedOption?.title
            }}</span>
            <img v-if="!isDisabled" class="arrow-img" :class="isShowOptionDropDown ? `rotated-arrow` : ``"
                src="@/assets/images/icons/chevron-down-solid.svg" alt="Arrow Down" />
        </div>
        <div class="option-dropdown-div" v-if="isShowOptionDropDown" v-click-outside-dropdown="onClickOutside">
            <div class="input-search-div" v-if="hasSearchBox">
                <Input :placeholder="t('search')" type="text" v-model:value="searchValue" />
            </div>
            <span class="text-select" v-if="props.titleBoxOption">{{
                titleBoxOption
            }}</span>
            <span v-if="filterListDropDown.length !== 0" class="option-text" v-for="item in filterListDropDown"
                @click="changeOptionDropDown(item)">{{ item.title }}</span>
            <span @click="isShowOptionDropDown = !isShowOptionDropDown" class="es-options" v-else>{{ t('notFoundData')
            }}</span>
        </div>
        <span class="text-error" v-if="hasError">یکی از موارد باید انتخاب شود.</span>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import vClickOutside from "click-outside-vue3";
import type { DropDownInputOptionInterface } from "@/models";
import Input from "../input/Input.vue";
import { useI18n } from 'vue-i18n'

interface DropDownInputInterface {
    title?: string;
    options: DropDownInputOptionInterface[];
    selectedOption: DropDownInputOptionInterface | undefined;
    placeholder: string;
    isDisabled?: boolean;
    titleBoxOption?: string;
    hasError?: boolean;
    hasSearchBox?: boolean;
}

const { t, locale } = useI18n({ useScope: 'global' })

const props = defineProps<DropDownInputInterface>();
const emit = defineEmits(["update:selectedOption", "update:hasError"]);
const vClickOutsideDropdown = vClickOutside.directive;
const isShowOptionDropDown = ref(false);
const searchValue = ref<string>("");

function openDropDown() {
    if (!props.isDisabled) {
        searchValue.value = "";
        isShowOptionDropDown.value = !isShowOptionDropDown.value;
    }
    return;
}

function changeOptionDropDown(selectedItem: DropDownInputOptionInterface) {
    emit("update:selectedOption", selectedItem);
    emit("update:hasError", false);
    isShowOptionDropDown.value = false;
    searchValue.value = "";
}

const onClickOutside = () => {
    isShowOptionDropDown.value = false;
    searchValue.value = "";
};

const filterListDropDown = computed(() => {
    let filteredList = props.options.filter((item) =>
        item.title.includes(searchValue.value)
    );
    return filteredList;
});
</script>

<style lang="scss">
@import "DropdownInput.scss";
</style>
