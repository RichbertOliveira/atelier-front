<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
const defaultLayout = 'default'
export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    },
  },
}
</script>
<style lang="scss">
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  zoom: 85%;
}
</style>
