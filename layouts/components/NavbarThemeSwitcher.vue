<script setup>
const themes = [
  {
    name: 'system',
    icon: 'tabler-device-laptop',
  },
  {
    name: 'light',
    icon: 'tabler-sun-high',
  },
  
]
</script>

<template>
  <ThemeSwitcher :themes="themes" />
</template>
