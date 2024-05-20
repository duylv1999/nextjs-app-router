"use client";
import { useEffect } from "react";
import authApiRequest from "~/apiRequests/auth";
import { clientSessionToken } from "~/lib/https";
import { differenceInHours } from "date-fns";

export default function SlideSession() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const expireAt = new Date(clientSessionToken.expiresAt);

      if (differenceInHours(now, expireAt) < 1) {
        const res =
          await authApiRequest.slideSessionNextClientFromToNextServer();

        clientSessionToken.expiresAt = new Date(
          res.payload.data.expiresAt
        ).toUTCString();
      }
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return null;
}
