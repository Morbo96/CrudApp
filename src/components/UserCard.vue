<template>
  <li class="card" v-for="user in users" :key="user.id">
    <div class="data">
      <div class="cardRow">
        <div class="text">ФИО:</div>
        <div class="text">
          {{ user.name }}
        </div>
        <div class="text">
          {{ user.surName }}
        </div>
      </div>
      <div class="cardRow">
        <div class="text">Дата рождения:</div>
        <div class="text">
          {{ user.birthday }}
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="btn" @click="updateUserButtonHandler(user.id)">
        <img src="../assets/update.png" alt="Редактировать" />
      </button>
      <button class="btn" @click="deleteUserButtonHandler(user)">
        <img src="../assets/trashcan.png" alt="Удалить" />
      </button>
    </div>
  </li>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  searchedName: String,
});
const emit = defineEmits(["updateForm"]);

const store = useStore();

const users = computed(() =>
  store.getters["users/getWithCorrectDateFormat"].filter(
    (item) => item.name.indexOf(props.searchedName) !== -1
  )
);

function deleteUserButtonHandler(user) {
  store.commit("users/deleteUser", user);
}

function updateUserButtonHandler(userId) {
  emit("updateForm", userId);
}
</script>

<style scoped>
.btn {
  border: 0;
  margin-left: 5px;
  padding: 4px;
  border-radius: 12px;
  border-color: white;
  transition-duration: 0.4s;
  background-color: hsl(0, 0%, 100%);
}
.btn:hover {
  background-color: hsl(0, 0%, 33%);
}
.card {
  border: 1px solid black;
  background-color: aquamarine;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 820px;
  align-self: center;
}
.text {
  padding: 10px;
  font-size: larger;
  font-weight: 800;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.cardRow {
  display: flex;
  flex-direction: row;
}
li {
  list-style-type: none;
}
</style>
