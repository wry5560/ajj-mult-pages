<template>
  <span>
      <keep-alive >
        <router-view v-if="keepAlive"/>
      </keep-alive>
      <router-view v-if="!keepAlive"/>
    </span>
</template>

<script>
  export default {
    name: 'RouteView',
    computed: {
      keepAlive () {
        return this.$route.meta.keepAlive
      }
    },
  }
</script>