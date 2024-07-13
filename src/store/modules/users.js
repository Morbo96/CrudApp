const state = {
  users: [
    { id: 1, name: "Олег", surName: "Олегович", birthday: "2003-11-11" },
    {
      id: 2,
      name: "Александр",
      surName: "Александров",
      birthday: "2002-02-02",
    },
    { id: 3, name: "Павел", surName: "Павлов", birthday: "2001-02-20" },
  ],
};

const getters = {
  getUserById: (state) => (id) => {
    return state.users.find((item) => item.id === id);
  },

  getWithCorrectDateFormat(state) {
    const users = state.users.map((user) => {
      user = {
        id: user.id,
        name: user.name,
        surName: user.surName,
        birthday:
          user.birthday.slice(8, 10) +
          "." +
          user.birthday.slice(5, 7) +
          "." +
          user.birthday.slice(0, 4),
      };
      return user;
    });
    return users;
  },
};

const mutations = {
  createUser(state, user) {
    state.users.push({
      id: Date.now(),
      name: user.name,
      surName: user.surName,
      birthday: user.birthday,
    });
  },

  updateUser(state, user) {
    const userToUpdate = state.users.findIndex((item) => item.id === user.id);
    state.users.splice(userToUpdate, 1, user);
  },

  deleteUser(state, user) {
    const userToDelete = state.users.find((item) => item.id === user.id);
    state.users = state.users.filter((item) => item.id !== userToDelete.id);
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
