<script setup>
import fawriIconImage from '@images/icons/order-types/fawri.svg'
import scheduledIconImage from '@images/icons/order-types/scheduled.svg'
import { useI18n } from 'vue-i18n'
import Error from '../error.vue'
import { useLocationStore } from '@/stores/location';
import {getUserOrders, isAuthenticated} from '@/utils/auth-user';

const runtimeConfig = useRuntimeConfig()
const ordersStore = getUserOrders();
const ordersData = computed(() => ordersStore)
const orders = computed(() => {
  if(isAuthenticated() && getUserOrders()) {
    // Check if ordersData is an array
    if (Array.isArray(ordersStore)) {
      return ordersStore.map(order => order.id);
    }
    // Check if ordersData is an object (a single order)
    else if (ordersStore && typeof ordersStore === 'object') {
      return [ordersStore.id]; // Return an array with a single order's id
    }
  }
  // Return an empty array if ordersData is neither an array nor an object
  return [];
});
const refVForm = ref()
const locationStore = useLocationStore()
const i18n = useI18n()
const fawriIcon = useGenerateImageVariant(fawriIconImage)
const scheduledIcon = useGenerateImageVariant(scheduledIconImage)
const center = ref(locationStore.getLocation);
const errorObject = ref({
  status: false
})
const isValidForm = ref(false)
const mapMarkers = ref([locationStore.getLocation])
const alertDialogTitle=ref('')
const alertDialogMessage=ref('')

const iconsSteps = [
  {
    title: i18n.t('Order Details'),
    icon: 'custom-address',
  },
  {
    title: i18n.t("Choose Date"),
    icon: 'custom-wizard-social-link',
  },
  {
    title: i18n.t('Address'),
    icon: 'custom-wizard-address',
  },
  {
    title: i18n.t('Review & Submit'),
    icon: 'custom-wizard-submit',
  },

]

const currentStep = ref(0)
const isFawri = ref(true)
const isCPasswordVisible = ref(false)
const isActiveStepValidValue = ref(true)
const defaultDateTime=ref(null)
const formData = ref({
  order: null,
  date: null,
  time: null,
  lat:null,
  lng:null
})

const errors = ref({
  order: undefined,
  date: undefined,
})
const isAlertDialogOpen = ref(false)

const onSubmit = () => {
  //assign date and time
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid){
      isValidForm.value = true
    assignDate()
    //if no location is selected
   if(!formData.value.lat||!formData.value.lng){
    alertDialogTitle.value="Select Location !"
    alertDialogMessage.value="Please, Select Location On map or Search Your Address"
    isAlertDialogOpen.value=true

   }
   else {
    placeOrder()
}
   }
  })
}

const placeOrder=(async()=>{

 // Construct the order data
 const orderData = {
    service_id: 120,
    partner_order_id: formData.value.order,
    payment_method_id: 8, // Add or modify as needed
    is_using_balance: false
  };
  Object.assign(orderData,formData.value)
  console.log("orderData",orderData)

  // Fetch the bearer token from local storage
  let tokenData =null
  if (localStorage.getItem('tokenData')) {
     tokenData = JSON.parse(localStorage.getItem('tokenData'));

            }
            console.log("tokenData",tokenData.access_token)
  if (!tokenData) {
    // Handle the case where the token is not available
    console.error('Bearer token not found');
    return;
  }

  try {
    const nuxtApp = useNuxtApp()
    // Make the POST request
    const response = await nuxtApp.$apiFetch('/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`
      },
      body: {
        "order":orderData
      }
    });

    // Handle the response
    if(response.success){
      alertDialogTitle.value="Success "
      alertDialogMessage.value="Order has been placed successfully !"
      isAlertDialogOpen.value=true

    }
  } catch (error) {
    // Handle any errors that occur during the fetch
    alertDialogTitle.value = "Error "
    alertDialogMessage.value = error.error

    isAlertDialogOpen.value = true

  }
})

//validation
const checkValueForValidation = (value) => {
  if (value) {
    isValidForm.value = true
    isActiveStepValidValue.value = true
    return true
  }
  else {
    isValidForm.value = false
    isActiveStepValidValue.value = false
  return false;

  }

}
//these watchers are made for validation of inputs
//validate order
watch(() => formData.value.order, () => {
  if(checkValueForValidation(formData.value.order)){
    orderPreviewData.value[0].data=formData.value.order
  }
},{immediate:true})

//when isFwari is as it is (true) assign default date
watch(() => isFawri.value == false, () => {
  if(checkValueForValidation(formData.value.date)){
  }
},{immediate:true})


//validate date
watch(() => formData.value.date, () => {
  if(checkValueForValidation(formData.value.date)){
    // orderPreviewData.value[1].data=formData.value.date
  }
},{immediate:true})



const getAddressInString=(async(lat,lng)=>{
  console.log("lat",lat,"long",lng)
  try {
    let latitude=lat?lat:locationStore.getLocation.lat
    let longitude=lng?lng:locationStore.getLocation.lng

    await loadGoogleMapsApi(runtimeConfig.public.googleMapKey);
    const result = await reverseGeocode({ lat: latitude, lng: longitude });
  //  const city = result.address_components.find(component => component.types.includes('locality'))?.long_name;
  //  const street = result.address_components.find(component => component.types.includes('route'))?.long_name;
    orderPreviewData.value[2].data=result.formatted_address
  } catch (error) {
    console.error(error);
  }
})


//set place in using search places input
const setPlace = (place) => {
  let location = place.geometry.location;
  center.value = location;
  mapMarkers.value = [location];
  formData.value.lat=location.lat()
  formData.value.lng=location.lng()
  getAddressInString(location.lat(),location.lng())
  console.log("set place",location.lat(),location.lng())

}
//set marker
const setMarker=(position)=> {
    mapMarkers.value = [position.latLng];
    formData.value.lat=position.latLng.lat()
    formData.value.lng=position.latLng.lng()
  getAddressInString(position.latLng.lat(),position.latLng.lng())
    }

const changeMarkerLocation= (evt)=>{
  formData.value.lat=evt.latLng.lat()
  formData.value.lng=evt.latLng.lng()
  getAddressInString(evt.latLng.lat(),evt.latLng.lng())

    }

//assign date and time
const assignDate = () => {
  if (isFawri.value) {
    const todayDate = new Date();
    formData.value.date = getDateFormat(todayDate);
    formData.value.time = getCurrentTime()
    orderPreviewData.value[1].data=formData.value.date+formData.value.time 
  }
  else {
  var fullDateTime = formData.value.date;
  console.log("Original dateTime:", fullDateTime);

  // Split the date and time
  formData.value.date = fullDateTime.substring(0, fullDateTime.indexOf(' '));
  formData.value.time = formatTime(fullDateTime.substring(fullDateTime.indexOf(' ') + 1));
  console.log("Formatted time:", formData.value.time);

  orderPreviewData.value[1].data = formData.value.date + ' ' + formData.value.time;
}
}
const formatTime=(timeString)=> {
  // Split time into components
  const parts = timeString.split(':');

  // Ensure hours, minutes, and seconds are two digits
  const hours = parts[0].length === 1 ? '0' + parts[0] : parts[0];
  const minutes = parts[1].length === 1 ? '0' + parts[1] : parts[1];
  let seconds = parts[2].substr(0, 2); // Extract seconds without AM/PM part
  seconds = seconds.length === 1 ? '0' + seconds : seconds;
  const amPm = parts[2].substr(2); // Extract AM/PM part

  return `${hours}:${minutes}:${seconds} ${amPm}`;
}
/**
 * get date format of yyyy-mm-dd
 * @param date in calender
 */
const getDateFormat = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

//get currenct time
const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Convert to 12-hour format and determine AM/PM
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // Convert '0' hour to '12'

  // Add leading zeros to single-digit hours, minutes, and seconds
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Construct the formatted time string
  const formattedTime = `${hours}:${minutes}:${seconds} ${period}`;

  return formattedTime;
}


//order Preview prepare
const checkReview=()=>{
    assignDate()
    getAddressInString()
}
const orderPreviewData= ref([
  {
    title:'Order',
    data:null,
    icon: 'tabler-number',
    color: 'primary',
  },
  {
    title:'Date',
    data:null,
    icon: 'tabler-calendar-event',
    color: 'info',
  },
  {
    title:'Location',
    data:null,
    icon: 'tabler-map-pin-filled',
    color: 'success',
  },
])





onMounted(async() => {
 
})
</script>

<template>
  <div v-if="errorObject.status == false">
    <!-- 👉 Stepper -->
    <div class="mb-6">
      <AppStepper v-model:current-step="currentStep" :items="iconsSteps" :isActiveStepValid="isActiveStepValidValue" />
    </div>
    <VCol cols="12" sm="6" md="6" :style="'margin:auto'">
      <VCard>
        <VCardText>
          <!-- 👉 stepper content -->
          <VForm ref="refVForm">
            <VWindow v-model="currentStep" class="disable-tab-transition">
              <VWindowItem>
                <VListItemTitle class="me-4">
                              <div class="d-flex flex-column">
                                <h6 class="text-h6 font-weight-medium">
                                {{$t('Order Details')}}
                                </h6>
                                <div>
                                  <p class="mb-0">
                                    {{$t('Selected Order Details')}}
                                  </p>
                                </div>
                              </div>
                            </VListItemTitle>


        <!-- 👉 Orders  -->
        <VCard class="mb-6 mt-4"  v-for="order in ordersData">
          <VCardText class="d-flex flex-column gap-y-6" v-for="product in order.products">
            <!-- <div class="text-body-1 text-high-emphasis font-weight-medium">
              {{$t('Orders')}}
            </div> -->

            <div class="d-flex align-center">
              <VAvatar
                :image="product.image"
                class="me-3"
              />
              <div>
                <div class="text-body-1 font-weight-medium">
                  {{ product.name }}
                </div>
                <div class="d-flex flex-column">
                <span class="text-sm text-disabled"> {{$t('Order:')}} #{{  order.id}}</span>
                <span class="text-sm text-disabled"> {{$t('Status:')}} {{  $t(order.delivery_status)}}</span>
                </div>

              </div>
            </div>


          </VCardText>
        </VCard>
                <VRow class="mt-5">

                  <VCol cols="12" md="12">
                    <AppSelect v-model="formData.order" :label="$t('Order')" :placeholder="$t('Select Order')" v-if="orders" :items="orders"  :rules="[requiredValidator]"
                      :error-messages="errors.order"/>
                    <!-- <AppTextField v-model="formData.order" :label="$t('Order')" :rules="[requiredValidator]"
                      :type="number" :error-messages="errors.order" /> -->

                  </VCol>


                </VRow>
              </VWindowItem>

              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      {{ $t("Choose Date") }}
                    </h6>
                    <p class="mb-0">
                      {{ $t("Setup Date") }}
                    </p>
                  </VCol>
                  <VCol cols="12">
                    <VRow>
                      <VCol cols="12" md="6">
                        <VRadioGroup class="time-bar" :class="[isFawri ? 'active-style' : '']" for="on-demand"
                          @click="isFawri = true">
                          <VRow>
                            <VCol cols="2">
                              <img class="img-bar" :src="fawriIcon" alt="fawri">
                            </VCol>
                            <VCol>
                              <span class="text-middle">{{ $t("Fawri") }}</span>
                            </VCol>
                          </VRow>
                          <span class="filter">

                          </span>
                        </VRadioGroup>
                      </VCol>


                      <VCol cols="12" md="6">
                        <VRadioGroup class="time-bar" for="calendar" @click="isFawri = false;"
                          :class="[!isFawri ? 'active-style' : '']">
                          <span class="filter">
                            <VRow>
                              <VCol cols="2">
                                <img class="img-bar" :src="scheduledIcon" alt="home.scheduled">
                              </VCol>
                              <VCol>
                                <span class="text-middle">{{ $t("Calender") }} </span>
                                <!-- <span class="text-middle" ></span> -->
                              </VCol>
                            </VRow>
                          </span>
                        </VRadioGroup>
                      </VCol>
                    </VRow>
                  </VCol>
                </VRow>
                <VRow class="d-flex justify-center">
                  <AppDateTimePicker v-model="formData.date" :placeholder="$t('Select Date and time')"
                    :config="{ enableTime: true, dateFormat: 'Y-m-d h:i:s K', inline: true, useSeconds: true }"
                    v-if="!isFawri" :rules="[requiredValidator]" :error-messages="errors.date" />
                </VRow>
              </VWindowItem>

              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      {{ $t("Address") }}
                    </h6>
                  </VCol>
                  <VCol cols="12" md="12">
                    <GMapAutocomplete class="autocomplete-map" :placeholder='$t("Enter or Choose Your Address.")'
                      @place_changed="setPlace">
                    </GMapAutocomplete>
                  </VCol>
                  <VCol cols="12" md="12">
                    <GMapMap :center="center" :zoom="15" map-type-id="terrain" style="width:100%; height: 400px"
                      @click="setMarker">
                      <GMapMarker v-for="(marker, index) in mapMarkers" :key="index" :position="marker" :clickable="true"
                        :draggable="true" @dragend="changeMarkerLocation"/>
                    </GMapMap>
                  </VCol>

                </VRow>
              </VWindowItem>

              <!-- Review -->
              <VWindowItem>
                <VRow>
                  <VCol cols="12" class="m-0 p-0">
                      <VCardItem title="Order Preview">
                        <template #append>
                          <MoreBtn />
                        </template>
                      </VCardItem>

                      <VCardText>
                        <VList class="card-list">
                          <VListItem v-for="(item, index) in orderPreviewData" :key="index">
                            <template #prepend>
                              <VAvatar rounded variant="tonal" :color="item.color">
                                <VIcon :icon="item.icon" size="24" />
                              </VAvatar>
                            </template>

                            <VListItemTitle class="me-4">
                              <div class="d-flex flex-column">
                                <div class="font-weight-medium text-truncate">
                                  {{ item.title }}
                                </div>
                                <div>
                                  <VChip variant="tonal" color="secondary" label>
                                    {{ item.data }}
                                  </VChip>
                                </div>
                              </div>
                            </VListItemTitle>
                          </VListItem>
                        </VList>
                      </VCardText>
                  </VCol>
                </VRow>


              </VWindowItem>

            </VWindow>

            <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
              <VBtn color="secondary" variant="tonal" :disabled="currentStep === 0" @click="currentStep--">
                <VIcon icon="tabler-arrow-left" start class="flip-in-rtl" />
                {{ $t("Previous") }}
              </VBtn>

              <VBtn v-if="iconsSteps.length - 1 === currentStep" color="success" append-icon="tabler-check"
                @click="onSubmit">
                {{ $t("Place Order") }}
              </VBtn>

              <VBtn v-else @click="currentStep++;checkReview()" :disabled="!isValidForm">
                {{ $t("Next") }}

                <VIcon icon="tabler-arrow-right" end class="flip-in-rtl" />
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Get currenct location -->
    <GeoLocation />

        <!-- 👉 Enable When Location is null -->
        <AlertMessage v-model:isDialogVisible="isAlertDialogOpen"  :title="alertDialogTitle" :message="alertDialogMessage"/>
  </div>
  <error :error="errorObject" v-else></error>
</template>


<style scoped>
.gap-25 {
  gap: 25px;
}

.d-none {
  display: none;
}

.img-bar {
  width: 30px;
}

.text-middle {
  vertical-align: middle;
  padding: 5px 5px;

}

.time-bar {
  cursor: pointer;
  border: 2px solid;
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  place-content: center;
}

.time-delivery {
  padding: 0px .5px;
}

.active-style {
  color: #1270a5;
  box-shadow: 0 8px 30px 0 rgb(59 59 59 / 20%);
}

input[type="radio"].radiobtn:checked+label>span>img {
  filter: invert(20%) sepia(277%) saturate(6961%) hue-rotate(186deg) brightness(88%) contrast(86%);
}


input[type="radio"].radiobtn:hover+label>span>img {
  filter: invert(20%) sepia(277%) saturate(6961%) hue-rotate(186deg) brightness(88%) contrast(86%);
}

[dir="ltr"] .char-count {
  position: absolute;
  bottom: 2%;
  right: 5%;
  color: #b4b3b3;
}

[dir="rtl"] .char-count {
  position: absolute;
  bottom: 2%;
  left: 5%;
  color: #b4b3b3;
}

.autocomplete-map {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
