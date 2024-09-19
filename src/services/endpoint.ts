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
    upload:{
      upload:`upload/image`,
    },
    newsType: {
      getAll:`newsType/get-no-params`,
      getList: `newsType/get-all`,
      add: `newsType/add`,
      detail:`newsType/detail`,
      update:`newsType/update`,
      delete:`newsType/delete`, 
    },
    news: {
      getList: `news/get-all`,
      add: `news/add`,
      detail:`news/detail`,
      update:`news/update`,
      delete:`news/delete`, 
    },
    tv:{
      getList: `tv/get-all`,
      add: `tv/add`,
      detail:`tv/detail`,
      update:`tv/update`,
      delete:`tv/delete`, 
    }
    
  },

  main: {
    test: {
      test1: `test`,
    },
  },
};
