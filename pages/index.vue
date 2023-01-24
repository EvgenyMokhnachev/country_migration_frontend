<template>
  <div>
    <MovementsList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import {defineComponent} from "vue";
import MovementsList from "~/components/MovementsList.vue";

export default defineComponent({
  components: {MovementsList}
})
</script>
