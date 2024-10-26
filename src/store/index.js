import users from "./modules/users";
import { createStore } from "vuex";

export default createStore({
  modules: {
    users,
  },
});
