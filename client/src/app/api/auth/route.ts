import { decodeJWT } from "~/lib/utils";

type payloadJWT = {
  iat:  number,
  exp:  number,
  tokenType:  string,
  userId:  number,
}


export async function POST(request: Request) {
  const body = await request.json();
  const sessionToken = body.sessionToken as string;
  //   const expiresAt = body.expiresAt as string;
  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      }
    );
  }
  //   const expiresDate = new Date(expiresAt).toUTCString();

  const payload = decodeJWT<payloadJWT>(sessionToken);
  const expiresDate = new Date(payload.exp * 1000).toUTCString();

  return Response.json(body, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}`,
    },
  });
}
