<template>
  <v-app>
    <v-main class="main_wrap">
      <Nuxt/>
    </v-main>

    <Alerts />
  </v-app>
</template>

<style>
.main_wrap {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
}
</style>

<script>
import Alerts from "~/components/Alerts.vue";

export default {
  name: 'auth',

  components: {Alerts},

  data() {
    return {

    }
  }
}
</script>
