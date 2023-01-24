<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Добавление миграционного периода</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <CountriesSelect v-model="data.country" />
          <DatePickerInput label="Дата въезда" v-model="data.enterDate" />
          <DatePickerInput label="Дата выезда" v-model="data.exitDate" />
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="black darken-1" x-large text @click="closeModal()">
          Отмена
        </v-btn>

        <v-btn color="blue darken-1" x-large text @click="clickAdd()">
          Добавить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import movementApi from "~/repositories/movements/MovementApi";
import MovementCreateRequest from "~/repositories/movements/MovementCreateRequest";
import alertsService, {Alert} from "~/services/AlertsService";
import Movement from "~/repositories/movements/Movement";

export default defineComponent({
  components: {},

  props: {
    value: {
      required: true
    }
  },

  data() {
    return {
      dialog: false,
      data: {
        country: undefined,
        enterDate: '',
        exitDate: ''
      }
    }
  },

  mounted() {
    this.dialog = this.show;
  },

  watch: {
    value() {
      this.dialog = this.value;
    }
  },

  methods: {
    parseDate (date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      if (!day || !month || !year) return null;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

    async clickAdd() {
      if (!this.data.country || !this.data.country.id) {
        alertsService.addAlert(new Alert(
            "error",
            "Выберите страну для создания периода"
        ));
        return;
      }

      if (!this.data.enterDate) {
        alertsService.addAlert(new Alert(
            "error",
            "Выберите дату въезда для создания периода"
        ));
        return;
      }

      let enterDate = this.parseDate(this.data.enterDate);
      let exitDate = this.parseDate(this.data.exitDate);

      if (exitDate) {
         if (new Date(exitDate).getTime() < new Date(enterDate).getTime()) {
           alertsService.addAlert(new Alert(
               "error",
               "Выберите дату въезда раньше даты выезда"
           ));
           return;
         }
      }

      try {
        let movement: Movement = await movementApi.create(new MovementCreateRequest({
          countryId: this.data.country.id,
          enterDate,
          exitDate
        }));

        this.closeModal();

        alertsService.addAlert(new Alert(
            "success",
            "Миграционный период успешно добавлен"
        ));
      } catch (e) {
        alertsService.addAlert(new Alert(
            "error",
            e
        ));
      }
    },

    closeModal() {
      this.dialog = false;
      this.$emit('input', false);
    }
  }

})
</script>
