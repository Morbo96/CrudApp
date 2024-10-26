<template>
  <header class="header"></header>
  <main class="main">
    <div class="navBar">
      <input
        class="search"
        name="search"
        placeholder="Поиск"
        v-model="searchedName"
      />
      <button class="createBtn" v-if="!showForm" @click="createButtonhandler()">
        Создать
      </button>
    </div>
    <ul>
      <UserCard @updateForm="updateForm" :searched-name="searchedName" />
    </ul>
    <UserForm
      v-if="showForm"
      @disableForm="disableForm"
      :update="isUpdate"
      :userId="userId"
    />
  </main>
  <footer class="footer"></footer>
</template>

<script setup>
import UserCard from "./components/UserCard.vue";
import UserForm from "./components/UserForm.vue";
import { ref } from "vue";

const searchedName = ref("");
const showForm = ref(false);
const isUpdate = ref(false);
const userId = ref(0);

function disableForm() {
  showForm.value = false;
}

function updateForm(id) {
  userId.value = id;
  isUpdate.value = true;
  showForm.value = true;
}

function createButtonhandler() {
  isUpdate.value = false;
  showForm.value = true;
}
</script>

<style scoped>
main {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
ul {
  margin-left: 0;
  padding-left: 0;
  display: flex;
  flex-direction: column;
}
.search {
  padding: 10px;
  border-width: 1px;
  border-color: black;
  width: 50%;
  border-radius: 12px;
  font-size: larger;
  font-weight: 800;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.navBar {
  align-self: center;
  width: 840px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.createBtn {
  padding: 10px;
  border-radius: 12px;
  border-width: 1px;
  border-color: black;
  background-color: white;
  font-size: larger;
  font-weight: 800;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
