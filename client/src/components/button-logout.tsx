"use client";

import authApiRequest from "~/apiRequests/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "~/lib/utils";

export const ButtonLogout = () => {
  const route = useRouter();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromClientToNextServer();
      route.push("/login");
    } catch (error) {
      handleErrorApi({ error });

      authApiRequest.logoutFromClientToNextServer(true).then((res) => {
        route.push("/login");
      });
    }
  };

  return (
    <Button size={"sm"} onClick={handleLogout}>
      Logout
    </Button>
  );
};
