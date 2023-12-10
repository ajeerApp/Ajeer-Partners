<script setup>
import fawriIconImage from '@images/icons/order-types/fawri.svg'
import scheduledIconImage from '@images/icons/order-types/scheduled.svg'
import {useI18n} from 'vue-i18n'
import Error from '../error.vue'
import { useLocationStore } from '@/stores/location';

// definePageMeta({
//   middleware: 'auth'
// })
const locationStore=useLocationStore()
const i18n =useI18n()
const fawriIcon = useGenerateImageVariant(fawriIconImage)
const scheduledIcon = useGenerateImageVariant(scheduledIconImage)
const center = ref(locationStore.getLocation);
const api = useRuntimeConfig().public.apiBaseUrl
const orders=ref([])
const errorObject=ref({
  status:false
})
const mapMarkers=ref([ locationStore.getLocation])
// const fullDate=null

const iconsSteps = [
  {
    title: i18n.t('Order Details'),
    icon: 'custom-address',
  },
  {
    title:i18n.t("Choose Date"),
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

const formData = ref({
  order:null,
  date:null,
  time:null
})


const onSubmit = () => {
  //assign date and time
  assignDate()
  console.log("formData",formData.value)
}

//set place in using search places input
const setPlace=(place) =>{
        let location = place.geometry.location;
        center.value = location;
        mapMarkers.value = [location];
    }

//assign date and time
const assignDate=()=>{
  if (isFawri.value) {
    const todayDate = new Date();
    formData.value.date= getDateFormat(todayDate);
    formData.value.time=getCurrentTime()
  }
  else {
var date=formData.value.date
formData.value.date=formData.value.date.substring(0,formData.value.date.indexOf(' '))
formData.value.time=date.substring(date.indexOf(' ') + 1)

console.log("formData.value.time",formData.value.time)
  }
}
/**
 * get date format of yyyy-mm-dd
 * @param date in calender
 */
const getDateFormat=(date)=>{
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
const getCurrentTime=()=> {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Convert to 12-hour format and determine AM/PM
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  // Add leading zeros to single-digit minutes and seconds
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Construct the formatted time string
  const formattedTime = `${hours}:${minutes}:${seconds} ${period}`;

  return formattedTime;
}
//call api on component mount
 onMounted(async ()=>{
  try {
    const response = await fetch(`${api}/orders`)
    if (response.ok) {
      const data = await response.json();
      console.log('result',data)
       for(var i=0;i<data.length;i++){
        orders.value.push(data[i].id)
       }
    } else {
      console.error('Error checking:', response.statusText);
    }
  } catch (error) {
    errorObject.value.status=true;
    errorObject.value={
      "statusCode":500,
    }

  }
})
</script>

<template>
<div v-if="errorObject.status==false">
    <!-- 👉 Stepper -->
    <div class="mb-6">
    <AppStepper v-model:current-step="currentStep" :items="iconsSteps" />
  </div>
  <VCol cols="12" sm="6" md="6" :style="'margin:auto'">
    <VCard>
      <VCardText>
        <!-- 👉 stepper content -->
        <VForm>
          <VWindow v-model="currentStep" class="disable-tab-transition">
            <VWindowItem>
              <VRow>
                <VCol cols="12">
                  <h6 class="text-h6 font-weight-medium">
                    {{ $t("Order Details") }}
                  </h6>
                  <p class="mb-0">
                   {{ $t("Enter your Order Details") }}
                  </p>
                </VCol>


                <VCol cols="12" md="12">
                  <AppSelect v-model="formData.order" :label="$t('Order')" :placeholder="$t('Select Order')" :items="orders" />
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
                <VCol cols="12" >
                  <VRow>
                    <VCol cols="12" md="6">
                      <VRadioGroup class="time-bar" :class="[isFawri ? 'active-style' : '']" for="on-demand"
                        @click="isFawri = true">
                        <VRow>
                          <VCol cols="2">
                            <img class="img-bar" :src="fawriIcon" alt="fawri">
                          </VCol>
                          <VCol >
                            <span class="text-middle">{{ $t("Fawri") }}</span>
                          </VCol>
                        </VRow>
                        <span class="filter">

                        </span>
                      </VRadioGroup>
                    </VCol>


                    <VCol cols="12" md="6">
                      <VRadioGroup class="time-bar" for="calendar" @click="isFawri = false"
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
                  :config="{ enableTime: true, dateFormat: 'Y-m-d h:i:s K', inline: true ,useSeconds:true}" v-if="!isFawri" />
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
                  <GMapAutocomplete
                  class="autocomplete-map"
       :placeholder='$t("Enter or Choose Your Address.")'
       @place_changed="setPlace"
    >
  </GMapAutocomplete>
                </VCol>
                <VCol cols="12" md="12">
                  <GMapMap
      :center="center"
      :zoom="15"
      map-type-id="terrain"
      style="width:100%; height: 400px"
  >
  <GMapMarker
        v-for="(marker, index) in mapMarkers"
        :key="index"
        :position="marker"
        :clickable="true"
        :draggable="true"
        @click="center=m"


      />
  </GMapMap>
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

            <VBtn v-else @click="currentStep++">
              {{ $t("Next") }}

              <VIcon icon="tabler-arrow-right" end class="flip-in-rtl" />
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VCol>

    <!-- 👉 Get currenct location -->
<GeoLocation/>
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
.autocomplete-map{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
