<script setup>
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import misc404 from '@images/pages/404.png'
import miscMaskDark from '@images/pages/misc-mask-dark.png'
import miscMaskLight from '@images/pages/misc-mask-light.png'

const router = useRouter();
const route = useRoute();
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})


const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)


defineOptions({
  inheritAttrs: false,
})

const isDev = process.dev

const errToShow = computed(() => {
  const is404 = props.error?.statusCode === 404 || props.error.message?.includes('404')
  const is500 = props.error?.statusCode === 500 


  if (is404) {
    return {
      title: 'Page Not Found',
      description: 'We couldn\'t find the page you are looking for.',
    }
  }


  else if (is500) {
    return {
      title: 'Server Error',
      description: 'Please wait a while and refresh, If the issue isn\'t resvolved contact support team.',
    }
  }

  else if (isDev) {
    return {
      title: props.error?.statusMessage,
      description: props.error.message,
    }
  }

  return {
    title: 'Oops! Something went wrong.',
    description: 'We are working on it and we\'ll get it fixed as soon as we can',
  }
})
// const subDomain = useCookie('subDomain')

// watch(() => getSubDomain(), () => {
// console.log("getSubDomain()",subDomain)
// }, { immediate: true })

const handleError = () => {
  router.push(`/saudiceramics/gst`)
}
</script>

<template>
  <NuxtLayout name="blank">
    <div class="misc-wrapper">
      <ErrorHeader
        :status-code="props.error.statusCode"
        :title="errToShow.title"
        :description="errToShow.description"
      />
          
      <div
        v-if="isDev"
        style="max-inline-size: 80dvw; overflow-x: scroll;"
        v-html="error.stack"
      />

      <VBtn
        class="mb-12"
        @click="handleError"
      >
        Back to Home
      </VBtn>

      <!-- 👉 Image -->
      <div class="misc-avatar w-100 text-center">
        <VImg
          :src="misc404"
          alt="Coming Soon"
          :max-width="200"
          class="mx-auto"
        />
      </div>

      <VImg
        :src="authThemeMask"
        class="misc-footer-img d-none d-md-block"
      />
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
