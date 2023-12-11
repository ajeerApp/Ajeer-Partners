import { defineNuxtPlugin } from "#app";
import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig()

  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: runtimeConfig.googleMapKey,
      libraries: "places", // This is required if you use the Autocomplete plugin
    },
    autobindAllEvents: true,
  });
});
