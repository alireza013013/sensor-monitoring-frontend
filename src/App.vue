<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.css";
@import "@/assets/fontDocument.css";

body {
  font-family: "Shabnam", sans-serif !important;
  overflow: auto;
  direction: rtl;
}


.mosha__toast__content .mosha__toast__content__text {
  font-size: 14px;
  font-family: "Shabnam", sans-serif !important;
}

.mosha__toast__content .mosha__toast__content__description {
  font-size: 14px;
  font-family: "Shabnam", sans-serif !important;
}

.mosha__toast {
  display: flex;
  align-items: center;
  z-index: 20000;

  &.warning {
    background-color: #d2dd3b !important;
  }

  &.info {
    background-color: #282C52 !important;
  }

  &.success {
    background-color: #04ad00 !important;
  }
}



html[data-theme='dark'] {
  --main-color: #100720;
  --container-table: #31087B;
  --white-color: #1d122f;
  --black-color: #fff;
  --tr-body-table-background: #133b76;
  --tr-body-table-skelton: #133b76;
  --content-table-color: #53ef6c;
  --button-control-table-color: #fff;
  --filter-icon-table: invert(98%) sepia(97%) saturate(1135%) hue-rotate(55deg) brightness(99%) contrast(89%);
  ;
  --filter-button-control-table: invert(100%) sepia(0%) saturate(26%) hue-rotate(32deg) brightness(106%) contrast(106%);
  --background-scrollbar: #53ef6c;
  --scrollbar-color: #133b76;
  --error-text: #ff3838;
  --placeholder-color: #b0ecba60;
}


html[data-theme='light'] {
  --main-color: #f1f0f8;
  --container-table: #d4d4d4;
  --white-color: #ffff;
  --black-color: #000;
  --tr-body-table-background: #c0d7f8;
  --tr-body-table-skelton: #c0d7f8;
  --content-table-color: #08343d;

  --button-control-table-color: #08343d;
  --filter-icon-table: invert(18%) sepia(20%) saturate(1605%) hue-rotate(143deg) brightness(89%) contrast(98%);
  --filter-button-control-table: invert(18%) sepia(20%) saturate(1605%) hue-rotate(143deg) brightness(89%) contrast(98%);

  --background-scrollbar: #08343d;
  --scrollbar-color: #c0d7f8;
  --error-text: rgb(255, 58, 58);
  --placeholder-color: #20373b6e;
}
</style>
