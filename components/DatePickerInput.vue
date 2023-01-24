<template>
  <v-menu
      ref="menu1"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="dateFormatted"
          :label="label"
          hint="ДД / ММ / ГГГГ"
          persistent-hint
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
        v-model="date"
        no-title
        @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  components: {},

  props: {
    label: {
      required: true
    },
    value: {
      required: true
    }
  },

  data() {
    return {
      date: '',
      dateFormatted: '',
      menu: false
    }
  },

  mounted() {
    this.date = this.parseDate(this.value);
    this.dateFormatted = this.formatDate(this.date);
  },

  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
      this.$emit('input', this.dateFormatted);
    },
  },

  methods: {
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    parseDate (date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      if (!day || !month || !year) return null;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  }

})
</script>
