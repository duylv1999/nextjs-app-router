import { cookies } from "next/headers";
import accountApiRequest from "~/apiRequests/account";

export default async function MeProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return <div>Hello {result.payload.data.name}</div>;
}
