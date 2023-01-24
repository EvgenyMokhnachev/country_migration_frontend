<template>
  <span>{{ countryName }}</span>
</template>

<script lang="ts">
import Vue, {defineComponent} from "vue";
import countriesApi from "~/repositories/countries/CountriesApi";
import PaginationResponse from "~/repositories/PaginationResponse";
import CountriesList from "~/repositories/countries/CountriesList";
import Country from "~/repositories/countries/Country";

export default defineComponent({

  props: {
    countryId: {
      required: true
    }
  },

  watch: {
    countryId() {
      this.fetchData();
    }
  },

  data() {
    return {
      countryName: ''
    }
  },

  methods: {
    async fetchData() {
      try {
        let countryPagination = await countriesApi.get();
        let country = countryPagination.items.find(country => country.id == this.countryId);
        this.countryName = country.name;
      } catch (e) {
        console.log(e);
      }
    }
  },

  mounted() {
    this.fetchData();
  },

})
</script>
