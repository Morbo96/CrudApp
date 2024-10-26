<template>
  <form @submit.prevent @reset="resetForm()">
    <div class="title" v-if="!props.update">Создание пользователя</div>
    <div class="title" v-if="props.update">Редактирование пользователя</div>
    <p>Имя:</p>
    <input
      name="name"
      v-model="userForm.name"
      placeholder="Иван"
      autocomplete="name"
    />
    <p>Фамилия:</p>
    <input name="surname" v-model="userForm.surName" placeholder="Иванов" />
    <p>Дата рождения:</p>
    <input type="date" name="birthday" v-model="userForm.birthday" />
    <div class="buttons">
      <button class="btn" @click="submitUserForm(userForm)">Подтвердить</button>
      <button class="btn" type="reset" @click="cancelButtonHandler()">
        Отмена
      </button>
    </div>
  </form>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed, watch } from "vue";

const props = defineProps({
  update: Boolean,
  userId: Number,
});
const emit = defineEmits(["disableForm"]);

const store = useStore();

const user = computed(() => store.getters["users/getUserById"](props.userId));

watch(user, (newValue) => {
  userForm.value = newValue;
});

const userForm = ref({
  id: props.update ? user.value.id : 0,
  name: props.update ? user.value.name : "",
  surName: props.update ? user.value.surName : "",
  birthday: props.update ? user.value.birthday : "",
});

function submitUserForm(userForm) {
  if (props.update) {
    store.commit("users/updateUser", userForm);
  } else {
    store.commit("users/createUser", userForm);
  }
}

function resetForm() {
  userForm.value = {
    id: 0,
    name: "",
    surName: "",
    birthday: "",
  };
}

function cancelButtonHandler() {
  emit("disableForm");
}
</script>

<style scoped>
.btn {
  border: 0;
  margin-left: 5px;
  padding: 10px;
  border-radius: 12px;
  border-color: white;
  transition-duration: 0.4s;
  background-color: hsl(0, 0%, 100%);
  font-size: larger;
  font-weight: 800;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.btn:hover {
  background-color: hsl(0, 0%, 33%);
}
.title {
  align-self: center;
  font-size: larger;
  font-weight: 800;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
p {
  font-size: larger;
  font-weight: 800;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
input {
  font-size: larger;
  font-weight: 800;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  border-width: 1px;
  border-color: black;
}
form {
  flex-direction: column;
  background-color: rgb(94, 248, 248);
  width: 800px;
  align-self: center;
  display: flex;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid black;
}
input {
  padding: 10px;
  border-radius: 12px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
