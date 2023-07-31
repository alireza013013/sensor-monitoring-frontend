<template>
    <div class="main-container-div">
        <TheHeader />
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import TheHeader from '../theHeader/TheHeader.vue'

</script>

<style lang="scss" scoped>
@import "TheContainer.scss";
</style>
