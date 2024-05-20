import http from "~/lib/https";
import { AccountResType, UpdateMeBodyType } from "~/schemaValidations/account.schema";

const accountApiRequest = {
  me: (sessionToken: string) =>
    http.get<AccountResType>("account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  meClient: () => http.get<AccountResType>('account/me'),
  updateMe: (name: string) => http.put<UpdateMeBodyType>('/account/me', {name})
};

export default accountApiRequest;
