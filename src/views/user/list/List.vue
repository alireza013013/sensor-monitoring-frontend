<template>
    <div class="main-user-list-div">
        <div class="container-div">
            <div class="table-user-div">
                <div class="top-of-table-div">
                    <div class="container-top-table-div">
                        <div class="cotain-button-extra-option-div">
                            <div class="icon-search-div" :class="isOpenSearchBox ? `open-search-div` : ``">
                                <img @click="openInputSearchBox" class="search-close-image" v-if="!isOpenSearchBox"
                                    src="@/assets/images/icons/search-icon.svg" alt="Search">
                                <img @click="closeInputSearchBox" class="search-close-image" v-if="isOpenSearchBox"
                                    src="@/assets/images/icons/xmark-solid.svg" alt="Close" />
                                <input v-model="searchValue" type="text" class="input-search"
                                    :class="isOpenSearchBox ? `open-input-search` : ``" />
                            </div>
                            <button class="extra-option-table-button">
                                <img class="image-button-extra" src="@/assets/images/icons/print-solid.svg" alt="Print">
                            </button>
                        </div>
                        <span class="text-count-user">
                            {{ t('numberUser') }} : <span class="text-count-user" v-if="locale == `en`">{{
                                totalCountUsersForShow }}</span>
                            <span class="text-count-user" v-if="locale == `fa`">{{
                                totalCountUsersForShow.toLocaleString("fa") }}</span>
                        </span>
                    </div>
                </div>
                <div class="main-table-div">
                    <div v-if="usersForShow.length > 0 || isLoading" class="scroll-table-div">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="title-header-table">
                                        {{ t('number') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('firstName') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('lastName') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('username') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('registerDate') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('role') }}
                                    </th>
                                    <th class="title-header-table">
                                        {{ t('devices') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="!isLoading" v-for="(user, index) in usersForShow" :key="index"
                                    class="tr-body-table">
                                    <td class="td-body-table" v-if="locale == `en`">
                                        {{ ((pagePagination - 1) * countItemPerPageTable) + (index + 1) }}
                                    </td>
                                    <td class="td-body-table" v-if="locale == `fa`">
                                        {{ (((pagePagination - 1) * countItemPerPageTable) + (index +
                                            1)).toLocaleString("fa") }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ user.firstName }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ user.lastName }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ user.userName }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ user.registerDate?.split("T")[0] }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ user.role }}
                                    </td>
                                    <td class="td-body-table">
                                        {{ user.devices?.length }}
                                    </td>
                                </tr>

                                <tr v-if="isLoading" class="tr-body-skeleton" v-for="item in countItemPerPageTable">
                                    <td class="td-body-skeleton" v-for="index in 7">
                                        <div class="skeleton-div">

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="usersForShow.length == 0 && !isLoading" class="contain-no-item-div">
                        <img class="box-image" src="@/assets/images/icons/box-open-solid.svg" alt="Box Empty">
                        <span class="text-no-item">{{ t('notFound') }}</span>
                    </div>
                </div>
                <div class="bottom-of-table-div" :class="locale == `fa` ? `rtl-div` : ``">
                    <button v-if="(totalCountUsersForShow > 0)" :class="pagePagination === 1 ? `disable-btn` : ``"
                        class="button-pagination-div" @click="prePageTable">
                        <img class="arrow-icon" src="@/assets/images/icons/chevron-left-solid.svg" alt="Back Button">
                    </button>
                    <span class="number-page-table" v-if="(totalCountUsersForShow > 0)"
                        :class="locale == `fa` ? `rtl-span` : ``"><span v-if="(pagePagination < 10)">0{{ pagePagination
                        }}</span><span v-if="(pagePagination >= 10)">{{ pagePagination }}</span>/ <span
                            v-if="(Math.ceil(totalCountUsersForShow / countItemPerPageTable) < 10)">0{{
                                Math.ceil(totalCountUsersForShow
                                    / countItemPerPageTable)
                            }}</span> <span v-if="(Math.ceil(totalCountUsersForShow / countItemPerPageTable) >= 10)">{{
    Math.ceil(totalCountUsersForShow
        / countItemPerPageTable)
}}</span></span>
                    <button v-if="(totalCountUsersForShow > 0)" :class="pagePagination === Math.ceil(totalCountUsersForShow / countItemPerPageTable)
                        ? `disable-btn`
                        : ``
                        " class="button-pagination-div" @click="nextPageTable">
                        <img class="arrow-icon" src="@/assets/images/icons/chevron-right-solid.svg" alt="Next Button">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from "axios";
import { useI18n } from 'vue-i18n'
import { API } from '@/plugins/api';
import { toast } from "@/plugins/toast";
import type { User } from "@/models"

const { t, locale } = useI18n({ useScope: 'global' })




onMounted(() => {
    getUsers();
})

function getUsers() {
    isLoading.value = true
    axios.get(API.user.index).then((response) => {
        users.value = response.data
        isLoading.value = false
    }).catch((error) => {
        isLoading.value = false
        toast.error(t('errorText'), t('error'))
    })
}


const isLoading = ref(false);

const searchValue = ref("");

const users = ref<User[]>([])

const usersForShow = computed(() => {
    let slicedList: User[] = [];
    let searchList: User[] = users.value
    searchList = searchList.filter((item) => item.userName?.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()) || item.lastName?.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()) || item.firstName?.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()));
    totalCountUsersForShow.value = searchList.length;
    slicedList = searchList.slice(
        (pagePagination.value - 1) * countItemPerPageTable.value,
        pagePagination.value * countItemPerPageTable.value
    );
    return slicedList;
});

const countItemPerPageTable = ref(10);
const pagePagination = ref(1);
const totalCountUsersForShow = ref(10)

function prePageTable() {
    if (pagePagination.value != 1) {
        pagePagination.value -= 1;
    }
}

function nextPageTable() {
    if (pagePagination.value != Math.ceil(totalCountUsersForShow.value / countItemPerPageTable.value)) {
        pagePagination.value += 1;
    }
}



const isOpenSearchBox = ref(false)

function openInputSearchBox() {
    isOpenSearchBox.value = true
}

function closeInputSearchBox() {
    isOpenSearchBox.value = false
}


</script>





<style lang="scss" scoped>
@import "List.scss";
</style>