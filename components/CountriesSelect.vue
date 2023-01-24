<template>
  <v-select :multiple="false"
            :label="label || 'Выберите страну'"
            :items="items"
            v-model="selectedItem"
            item-value="id"
            item-text="name"
            return-object
  >
  </v-select>
</template>

<script lang="ts">
import Vue, {defineComponent} from "vue";
import countriesApi from "~/repositories/countries/CountriesApi";
import PaginationResponse from "~/repositories/PaginationResponse";
import CountriesList from "~/repositories/countries/CountriesList";
import Country from "~/repositories/countries/Country";

export default defineComponent({

  props: {
    value: {
    },
    label: {
    }
  },

  data() {
    return {
      items: [],
      selectedItem: undefined,
    }
  },

  watch: {
    selectedItem(newVal, oldVal) {
      this.$emit('input', this.selectedItem);
    },
  },

  methods: {
    async fetchData() {
      let countriesPagination: PaginationResponse<Country>
          = await countriesApi.get();

      this.items = countriesPagination.items;
    }
  },

  mounted() {
    this.fetchData();
  }

})
</script>
