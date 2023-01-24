<template>
  <div>
    <MovementsCalculationList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import {defineComponent} from "vue";
import MovementsCalculationList from "~/components/MovementsCalculationList.vue";

export default defineComponent({
  components: {MovementsCalculationList}
})
</script>
