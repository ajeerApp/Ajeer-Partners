<script setup>
import fawriIconImage from '@images/icons/order-types/fawri.svg'
import scheduledIconImage from '@images/icons/order-types/scheduled.svg'
import { GoogleMap, Marker } from "vue3-google-map";

const fawriIcon = useGenerateImageVariant(fawriIconImage)
const scheduledIcon = useGenerateImageVariant(scheduledIconImage)
const center = { lat: 24.7136, lng:46.6753};
const iconsSteps = [
  {
    title: 'Order Details',
    icon: 'custom-address',
  },
  {
    title: 'Choose Date',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },

]

const currentStep = ref(0)
const isFawri = ref(true)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: 'johndoe',
  email: 'john.doe@email.com',
  password: 'johndoe@J2',
  cPassword: 'johndoe@J2',
  order: '123',
  firstName: 'John',
  lastName: 'Doe',
  service: 'Heater',
  language: 'English',
  address: '98 Borough bridge Road, Birmingham',
  landmark: 'Borough bridge',
  pincode: '658921',
  city: 'Birmingham',
  twitter: 'https://twitter.com/abc',
  facebook: 'https://facebook.com/abc',
  googlePlus: 'https://plus.google.com/abc',
  linkedIn: 'https://linkedin.com/abc',
  date:null
})

const onSubmit = () => {
  console.log(formData.value)
}
</script>

<template>
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
                    Order Details
                  </h6>
                  <p class="mb-0">
                    Enter your Order Details
                  </p>
                </VCol>


                <VCol cols="12" md="12">
                  <AppSelect v-model="formData.order" label="Order" placeholder="Select Order" :items="['12345']" />
                </VCol>


              </VRow>
            </VWindowItem>

            <VWindowItem>
              <VRow>
                <VCol cols="12">
                  <h6 class="text-h6 font-weight-medium">
                    Choose Date
                  </h6>
                  <p class="mb-0">
                    Setup Date
                  </p>
                </VCol>
                <VCol cols="12">
                  <VRow>
                    <VCol cols="6" >
                      <VRadioGroup class="time-bar" :class="[isFawri?'active-style':'']" for="on-demand" @click="isFawri=true">
                        <VRow>
                          <VCol cols="2">
                            <img class="img-bar" :src="fawriIcon" alt="fawri">
                          </VCol>
                          <VCol>
                            <span class="text-middle">Fawri</span>
                          </VCol>
                        </VRow>
                        <span class="filter">

                        </span>
                      </VRadioGroup>
                    </VCol>


                    <VCol cols="6">
                      <VRadioGroup class="time-bar" for="calendar" @click="isFawri=false" :class="[!isFawri?'active-style':'']">
                        <span class="filter">
                          <VRow>
                            <VCol cols="2">
                              <img class="img-bar" :src="scheduledIcon" alt="home.scheduled">
                            </VCol>
                            <VCol>
                              <span class="text-middle">Calender </span>
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
                <AppDateTimePicker
                  v-model="formData.date"
                  placeholder="Select Date and time"
                  :config="{ enableTime: true, dateFormat: 'Y-m-d H:i',inline:true }"
                 v-if="!isFawri"
                      />
                </VRow>
            </VWindowItem>

            <VWindowItem>
              <VRow>
                <VCol cols="12">
                  <h6 class="text-h6 font-weight-medium">
                    Address
                  </h6>
                  <p class="mb-0">
                   Enter or Choose Your Address.
                  </p>
                </VCol>
                <VCol
                cols="12"
                md="12"
              >
                <AppTextField
                  v-model="formData.location"
                  placeholder="Location"
                  label="Location"
                />
              </VCol>
                <VCol cols="12" md="12">
                  <GoogleMap api-key="AIzaSyDIfHvUwp5JuGnAO6LP7yu_iK0ntHuH8to" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap>
                </VCol>

              </VRow>
            </VWindowItem>



          </VWindow>

          <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
            <VBtn color="secondary" variant="tonal" :disabled="currentStep === 0" @click="currentStep--">
              <VIcon icon="tabler-arrow-left" start class="flip-in-rtl" />
              Previous
            </VBtn>

            <VBtn v-if="iconsSteps.length - 1 === currentStep" color="success" append-icon="tabler-check"
              @click="onSubmit">
              Place Order
            </VBtn>

            <VBtn v-else @click="currentStep++">
              Next

              <VIcon icon="tabler-arrow-right" end class="flip-in-rtl" />
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VCol>
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
</style>
