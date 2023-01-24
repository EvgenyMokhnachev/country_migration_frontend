<template>
  <div class="movements_list">
    <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        hide-default-footer
    >

      <template v-slot:item.enterDate="{ item }">
        {{ formatDate(new Date(item.enterDate).toISOString().substring(0, 10)) }}
      </template>

      <template v-slot:item.exitDate="{ item }">
        {{ formatDate(new Date(item.exitDate).toISOString().substring(0, 10)) }}
      </template>

      <template v-slot:item.days="{ item }">
        {{ calculateDaysPeriod(item) }}
      </template>

      <template v-slot:item.countryId="{ item }">
        <CountryLabel :countryId="item.countryId" />
      </template>

      <template v-slot:top>
        <v-container>
          <v-btn small color="primary" @click="onClickCreateMovement">
            <v-icon>mdi-plus</v-icon>Добавить период
          </v-btn>
        </v-container>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon color="red darken-2" @click="deleteMovementId = item.id">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <MovementCreateDialog v-model="showCreateMovementModal" />

    <DialogYesNot :opened="!!deleteMovementId"
                  title="Удаление миграционного периода"
                  text="Уверены, что хотите удалить запись о миграции?"
                  noBtnTitle="Не удалять"
                  yesBtnTitle="Удалить"
                  :onClickYes="() => {this.clickDeleteMovement(this.deleteMovementId)}"
                  :onClickNo="() => {this.deleteMovementId = ''}"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import movementApi from "~/repositories/movements/MovementApi";
import PaginationResponse from "~/repositories/PaginationResponse";
import Movement from "~/repositories/movements/Movement";
import alertsService, {Alert} from "~/services/AlertsService";

export default defineComponent({
  components: {},

  data() {
    return {
      deleteMovementId: '',

      showCreateMovementModal: false,

      headers: [
        {
          text: 'Страна',
          align: 'start',
          sortable: true,
          value: 'countryId',
        },
        { text: 'Дней пребывания', value: 'days', sortable: false },
        { text: 'Дата въезд', value: 'enterDate' },
        { text: 'Дата выезда', value: 'exitDate' },
        { text: 'Удалить', value: 'actions', sortable: false },
      ],

      items: []
    }
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      let itemsPagination: PaginationResponse<Movement> = await movementApi.get();
      this.items = itemsPagination.items;
    },

    onClickCreateMovement() {
      this.showCreateMovementModal = true;
    },

    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    calculateDaysPeriod(item: Movement) {
      let enterDate = new Date(item.enterDate);
      let exitDate = item.exitDate ? new Date(item.exitDate) : new Date();

      let diffMs = exitDate.getTime() - enterDate.getTime();
      return Math.ceil(diffMs / 86400000) + 1;
    },

    async clickDeleteMovement(movementId: number) {
      try {
        await movementApi.delete(movementId);
        alertsService.addAlert(new Alert('success', 'Миграционный период успешно удален'))
        this.deleteMovementId = '';
      } catch (e) {
        console.log(e);
        alertsService.addAlert(new Alert('error', 'Не удалось удалить миграционный период'))
      }
    }
  },

  created() {
    this.movementEventIndex = movementApi.onCrud(() => {
      this.fetchData();
    });
    console.log('created', this.movementEventIndex);
  },

  destroyed() {
    console.log('destroyed', this.movementEventIndex);
    if (this.movementEventIndex) {
      movementApi.removeCrud(this.movementEventIndex);
    }
  }

})
</script>
