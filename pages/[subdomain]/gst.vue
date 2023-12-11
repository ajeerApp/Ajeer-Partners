<script setup>

import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import saudiCermics from '@images/pages/saudi-ceramics.png'
import ajeerLogo from '@images/pages/ajeer-logo-blue.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { getSubDomain } from '@/utils/sub-domain';

import { useAuth } from '~/stores/auth';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'blank',
})

const form = ref({
  mobile: '536940265',
})

const refVForm = ref()
const isPasswordVisible = ref(false)
// const partner = useGenerateImageVariant(saudiCermics, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const partner = useGenerateImageVariant(saudiCermics)
const ajeerLogoBg = useGenerateImageVariant(ajeerLogo)
// const api = useRuntimeConfig().public.apiBaseUrl+'/users'
const config = useRuntimeConfig()
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const checkbox = ref(false);
const router = useRouter();
const authStore = useAuth();
const subDomain = getSubDomain();

const mobile = ref("501234567");

// TODO, add front validation
const login = async () => {
  console.log('submit login button clicked, and login function fired');
  try {
    await authStore.login({
      mobile: mobile.value,
    });
    router.push(`create-order`);
  } catch (error) {
    console.error(error);
  }
};

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      login()
  })
}

</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VCol
      md="8"
      class="d-none d-md-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VRow class="d-flex justify-center">
            <VCol cols="12">
              <VCardText>
                <VRow  class="d-flex justify-center">
                  <VNodeRenderer cols="6"
                                 :nodes="themeConfig.app.logo"
                                 class=""
                  />
                  <h4 cols="6" class="text-h4 mb-1 d-flex align-center justify-center">
                    {{ $t('in partner with') }}
                  </h4>
                </VRow>

              </VCardText>
            </VCol>
            <VCol cols="3">
              <VImg
                max-width="300"
                :src="partner"
                class="auth-illustration mb-2"
              />
            </VCol>
            <!-- <VCol cols="3" >
              <VImg
              max-width="300"
              :src="ajeerLogoBg"
              class="auth-illustration mb-2"
            />
            </VCol> -->
          </VRow>
        </div>

        <VImg
          class="auth-footer-mask"
          :src="authThemeMask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-2"
      >
        <VCardText>
          <VRow class="d-flex justify-center">
            <VCol cols="col-3">
              <VNodeRenderer
                :nodes="themeConfig.app.logo"
                class="mb-2"
              />
            </VCol>
            <VCol cols="col-3" class="d-block d-md-none">
              <VImg
                :style="{ 'height': '150px' }"
                :src="partner"
                class="auth-illustration mb-2"
              />
            </VCol>
          </VRow>

          <h4 class="text-h4 mb-1">
            {{ $t("Welcome to") }} <span class="text-capitalize">{{themeConfig.app.title}}</span>! 👋🏻
          </h4>
          <p class="mb-0">
            {{ $t("Please enter your mobile number") }}
          </p>
        </VCardText>
        <VCardText>
          <VForm ref="refVForm"
                 @submit.prevent="onSubmit">
            <VRow>
              <!-- mobile -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.mobile"
                  autofocus
                  :label="$t('Mobile')"
                  type="number"
                  placeholder="e.g 5xxxxxxxx"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">

                <VBtn
                  block
                  type="submit"
                >
                  {{ $t("Check") }}
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>{{ $t("Ajeer building a better tomorrow.") }}</span>
              </VCol>


            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
