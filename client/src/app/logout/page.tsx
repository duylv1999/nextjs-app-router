"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import authApiRequest from "~/apiRequests/auth";
import { clientSessionToken } from "~/lib/https";

export default function Logout() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sessionToken = searchParams.get("sessionToken");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (sessionToken === clientSessionToken.value) {
      authApiRequest.logoutFromClientToNextServer(true, signal).then((res) => {
        route.push(`/login?redirectFrom=${pathname}`);
      });
    }

    return () => controller.abort();
  }, [sessionToken, route, pathname]);

  return <div></div>;
}
