<script setup>
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
    default: false,
  },
  title:{
    type:String,
    required:true
  },
  message:{
    type:String,
    required:true
  }
})

const emit = defineEmits(['update:isDialogVisible'])


const isAuthAppDialogVisible = ref(false)


</script>

<template>
  <VDialog
    max-width="500"
    :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <VCard class="pa-5 pa-sm-8">
      <VCardItem class="text-center">
        <VCardTitle class="text-h3 mb-5">
      {{ title }}
        </VCardTitle>
        <VCardSubtitle>
          <span class="text-base">
          {{ message }}
          </span>
        </VCardSubtitle>
      </VCardItem>

      <VCardText>

        <div class="d-flex gap-4 justify-center">
          <VBtn
            color="secondary"
            variant="tonal"
            @click="$emit('update:isDialogVisible', false)"
          >
            Close
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <AddAuthenticatorAppDialog
    v-model:isDialogVisible="isAuthAppDialogVisible"
    :auth-code="props.authAppCode"
  />
  <EnableOneTimePasswordDialog
    v-model:isDialogVisible="isSmsDialogVisible"
    :mobile-number="props.smsCode"
  />
</template>

<style lang="scss">
.auth-method-card {
  &.card-list .v-list-item {
    padding-block: 20px !important;
    padding-inline: 30px !important;
  }

  .v-list-item--active:not(.v-list-group__header) {
    background-color: transparent !important;
    color: rgb(var(--v-theme-primary)) !important;

    .v-list-item__overlay{
      opacity: 0;
    }
  }

  &.responsive-card {
    .v-list-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;

      .v-list-item__prepend {
        svg {
          margin: 0;
        }
      }
    }
  }
}
</style>
