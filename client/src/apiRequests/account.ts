import http from "~/lib/https";
import { AccountResType } from "~/schemaValidations/account.schema";

const accountApiRequest = {
  me: (sessionToken: string) =>
    http.get<AccountResType>("account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
};

export default accountApiRequest;
