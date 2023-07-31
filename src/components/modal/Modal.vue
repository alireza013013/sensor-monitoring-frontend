<template>
    <div class="main-modal-div">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted} from "vue";

onMounted(() => {
    document.body.classList.add('open-modal')
})

onUnmounted(() => {
    document.body.classList.remove('open-modal')
})
</script>

<style lang="scss" scoped>
@import "Modal.scss";
</style>
