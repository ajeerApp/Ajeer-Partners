
<script setup>
import { useLocationStore } from '@core/stores/location';
const useLocation =useLocationStore()

onMounted(()=>{
    const success = (position) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
console.log("lat",latitude,"long",longitude)
      useLocation.updateLocation(latitude,longitude)
    };

    const error = (err) => {
      console.log(err)
    };

    // This will open permission popup
    navigator.geolocation.getCurrentPosition(success, error);
})

</script>


<template>
    
</template>

