<template>
  <div class="movements_list">
    <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        hide-default-footer
    >
      <template v-slot:item.countryId="{ item }">
        <CountryLabel :countryId="item.countryId" />
      </template>

      <template v-slot:top>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <DatePickerInput label="С даты" v-model="filter.from" />
            </v-col>
            <v-col cols="12" sm="6">
              <DatePickerInput label="По дату" v-model="filter.to" />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import movementApi from "~/repositories/movements/MovementApi";
import PaginationResponse from "~/repositories/PaginationResponse";
import Movement from "~/repositories/movements/Movement";
import alertsService, {Alert} from "~/services/AlertsService";
import TravelCalculation from "~/repositories/movements/TravelCalculation";
import CountryLabel from "~/components/CountryLabel.vue";
import MovementFilter from "~/repositories/movements/MovementFilter";

export default defineComponent({
  components: {CountryLabel},

  data() {
    return {
      headers: [
        {
          text: 'Страна',
          align: 'start',
          sortable: true,
          value: 'countryId',
        },
        { text: 'Дней пребывания', value: 'days', sortable: false },
      ],

      items: [],

      filter: {
        from: '',
        to: ''
      }
    }
  },

  watch: {
    "filter.from"(newWal) {
      console.log('filter.from', this.filter.from);
      this.fetchData();
    },
    "filter.to"(newWal) {
      console.log('filter.to', this.filter.to);
      this.fetchData();
    }
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    parseDate (date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      if (!day || !month || !year) return null;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

    async fetchData() {
      let filter = new MovementFilter();
      if (this.filter.from) {
        filter.from = this.parseDate(this.filter.from);
      }
      if (this.filter.to) {
        filter.to = this.parseDate(this.filter.to);
      }

      let travelCalculation: TravelCalculation
          = await movementApi.calculateTravelHistory(filter);

      this.items = [];

      let travelHistoryMap = travelCalculation.travelHistory;
      for (let countryId in travelHistoryMap) {
        let days = travelHistoryMap[countryId];
        this.items.push({
          countryId,
          days
        })
      }
    }
  },

})
</script>
