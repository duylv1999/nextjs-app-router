import http from "~/lib/https";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
} from "~/schemaValidations/auth.schema";
import { MessageResType } from "~/schemaValidations/common.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),

  register: (body: RegisterBodyType) =>
    http.post<LoginResType>("/auth/register", body),

  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),

  logoutFromNextServerToServer: (sessionToken: string) => 
    http.post<MessageResType>("/auth/logout", {}, {
      headers : {
        Authorization: `Bearer ${sessionToken}`,
      }
    }),

  logoutFromClientToServer: () => 
    http.post<MessageResType>("/api/auth/logout", {}, {
      baseUrl: ''
    }),
};

export default authApiRequest;
