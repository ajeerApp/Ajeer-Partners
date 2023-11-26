import Vue from 'vue';
import VueGoogleMaps from 'vue3-google-maps';
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDIfHvUwp5JuGnAO6LP7yu_iK0ntHuH8to',
        libraries: 'places',

    },
    installComponents: true

});
