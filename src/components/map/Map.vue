<template>
    <div class="title-map-div">
        <span class="title" v-if="title">{{ title }}</span>
        <div ref="map" class="map"></div>
    </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { latLng } from "leaflet";
import L from 'leaflet';
import locationIcon from "@/assets/images/icons/location-dot-solid.svg"

interface MapInterface {
    title?: string;
    allowChangePossition: boolean
    initialeLocation?: latLng
}

const props = defineProps<MapInterface>();
const emit = defineEmits(['sendPossition']);



const zoom = ref(15);
const currentCenter = ref(latLng(35.546505, 51.129791));

const map = ref<any>()
const marker = ref<any>()
const iconLocationForMap = ref<any>()

onMounted(() => {
    iconLocationForMap.value = L.icon({
        iconUrl: locationIcon,
        iconSize: [38, 95],
    });
    initializeMap()
})

function initializeMap() {
    const mapLayer = L.map(map.value).setView(currentCenter.value, zoom.value);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
    }).addTo(mapLayer);
    map.value = mapLayer;
    map.value.on('click', onMapClick);

    if (!props.allowChangePossition) {
        map.value.panTo(props.initialeLocation);
        let latlng = [props.initialeLocation.lat, props.initialeLocation.lng];
        if (marker.value) {
            map.value.removeLayer(marker.value);
        }
        marker.value = L.marker(latlng, { icon: iconLocationForMap.value }).addTo(map.value);
    }
}

function onMapClick(e) {
    if (props.allowChangePossition) {
        let latlng = [e.latlng.lat, e.latlng.lng];
        if (marker.value) {
            map.value.removeLayer(marker.value);
        }
        addMarker(latlng);
    }
}

function addMarker(latlng: any) {
    let latLngObject = latLng(latlng[0], latlng[1])
    marker.value = L.marker(latlng, { icon: iconLocationForMap.value }).addTo(map.value);
    emit("sendPossition", latLngObject)
}


</script>




<style scoped lang="scss">
@import "Map.scss";
</style>