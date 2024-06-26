import { cookies } from "next/headers";
import accountApiRequest from "~/apiRequests/account";
import Profile from "./profile";

export default async function MeProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return <div>
      Hello 
      {result?.payload.data.name}
      <Profile profile={result.payload.data} />
    </div>;
}
