<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item to="/user/me" router exact>
          <v-list-item-action class="mr-3">
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              {{ userMe.email }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/" router exact>
          <v-list-item-action class="mr-3">
            <v-icon>mdi-train-car</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              История путешествий
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/calculation" router exact>
          <v-list-item-action class="mr-3">
            <v-icon>mdi-calculator-variant</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Калькуляция периодов
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>ЮФУ, ИКТИБ, г.Таганрог – Мохначев Евгений Сергеевич &copy; 2023</span>
    </v-footer>

    <Alerts />
  </v-app>
</template>

<script lang="ts">
import Alerts from "~/components/Alerts.vue";
import authService from "~/services/AuthService";
import User from "~/repositories/user/User";

export default {

  name: 'DefaultLayout',
  components: {Alerts},
  middleware: ['auth'],

  data() {
    return {
      clipped: false,
      miniVariant: false,
      drawer: true,
      title: 'Информационная система контроля миграционных периодов туриста – "КУПОЛ"',
      userMe: {}
    }
  },

  methods: {
    async fetchUserMe() {
      let userMe: User | undefined = await authService.getUserMe();
      if (userMe) {
        this.userMe = userMe;
      }
    }
  },

  created() {

  },

  mounted() {
    this.fetchUserMe();
  }
}
</script>
