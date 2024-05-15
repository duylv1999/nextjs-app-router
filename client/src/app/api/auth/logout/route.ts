import { cookies } from "next/headers";
import authApiRequest from "~/apiRequests/auth";
import { HttpError } from "~/lib/https";

export async function POST(request: Request) {
    const res = await request.json();
    console.log('res', res)
    // const force = res.force as boolean | null;

    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken');
    //   const expiresAt = body.expiresAt as string;
    if (!sessionToken) {
      return Response.json(
        { message: "Không nhận được session token" },
        {
          status: 401,
        }
      );
    }

    try {
        const result = await authApiRequest.logoutFromNextServerToServer(
            sessionToken.value
          )
          return Response.json(result.payload, {
            status: 200,
            headers: {
              // Xóa cookie sessionToken
              'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`
            }
          })
    } catch (error) {
        if(error instanceof HttpError) {
            return Response.json(error.payload, {
                status: error.status
            })
        }else {
            return Response.json({
                message: 'Loi khong xac dinh'
            }, { status: 500 })
        }
    }
    //   const expiresDate = new Date(expiresAt).toUTCString();
    
  }
  