import { createRext, IRext, IRextKeys } from "store/baseStoreProviders";
import URLRoutes from "URLRoutes";

export const forgotPassword: IRext = createRext({
  identity: "forgotPassword",
  method: 'post',
  primaryKey: "",
  url: URLRoutes.server.forgot
});

export const updateForgotPassword: IRext = createRext({
  identity: "updateForgotPassword",
  method: 'post',
  primaryKey: "",
  url: URLRoutes.server.forgotChangePassword
});

export const userRoles: IRext = createRext({
  identity: "userRoles",
  method: 'get',
  primaryKey: "",
  url: URLRoutes.server.fetchUsersRoles
});

export const userTypes: IRext = createRext({
  identity: "userRoles",
  method: 'get',
  primaryKey: "",
  url: URLRoutes.server.fetchUsersTypes
});
