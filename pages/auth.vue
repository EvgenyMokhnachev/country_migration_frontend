<template>
  <v-container fluid class="auth_page">
    <div class="text-center">
      <img src="/48880.png" width="150">
    </div>
      <v-card-title>Авторизация</v-card-title>
      <v-card-subtitle>
        Введите свой email и пароль, указанный ранее при регистрации или введите email и пароль для
        регистрации.
        <br/>
        <strong>Если Вы авторизуетесь впервые</strong> – регистрация пройдет автоматически c указанными данными.
      </v-card-subtitle>

      <v-card-text>
        <v-form>
          <v-text-field type="email" v-model="email" label="E-mail" required />
          <v-text-field type="password" v-model="pass" label="Пароль" required />

          <div class="text-center">
            <v-btn color="primary" v-on:click="onClickLogin">Войти</v-btn>
          </div>
        </v-form>
      </v-card-text>
  </v-container>
</template>

<style lang="scss">
.auth_page {
  max-width: 400px;
  width: fit-content !important;
}
</style>

<script lang="ts">
import authService from "../services/AuthService";
import Vue from "vue";

import {defineComponent} from "vue";
import alertsService, {Alert} from "~/services/AlertsService";

export default defineComponent({
  layout: 'auth',

  middleware: ['auth'],

  data() {
    return {
      email: '',
      pass: '',
    }
  },

  methods: {
    async onClickLogin(e) {
      e.preventDefault();

      try {
        await authService.auth(this.email, this.pass);

        if (authService.isAuthenticated) {
          this.$router.push("/");
          alertsService.addAlert(new Alert('success', 'Добро пожаловать!'));
        }
      } catch (e) {
        alertsService.addAlert(new Alert('error', 'Убедитесь в корректности вводимых данных!'));
        console.error(e);
      }
    }
  }

})
</script>
