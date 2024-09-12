export const API_CATEGORY = import.meta.env.VITE_API_CATEGORY;
export const API_SECURITY = import.meta.env.VITE_API_SECURITY;
export const API_CONTRACT = import.meta.env.VITE_API_CONTRACT;
export const API_REPORT = import.meta.env.VITE_API_REPORT;

export const endpoints = {
  security: {
    authenticate: `authenticate`,
    profile: `profile`,
    getMenu: `menu`,
    role: {
      addRole: `roles`,
      getListRole: `roles/search`,
      getListPrivilegeRole: `roles/privilege/flat`,
      getListPrivilegeTree: `roles/privilege/tree`,
      detailRole: `roles/detail`,
      updateRole: `roles/update`,
      deleteRole: `roles/delete`,
    },
    user: {
      getList: `users/search`,
      create: `users`,
      update: `users/update`,
      delete: `users/delete`,
      detail: `users/detail`,
      changePassword: `users/change-password`,
    },
    forgotPassword: {
      forgot: "forgot-password",
      reset: "reset-password",
      verify: "verify-token",
    },
  },
  category: {
    newsType: {
      getList: `newsType/get-all`,
      add: `newsType/add`,
      
    }
  },

  main: {
    test: {
      test1: `test`,
    },
  },
};
