import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import * as jose from "jose";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Create JWT token containing user details
  const secretKey = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET);
  const token = await new jose.SignJWT({
    userId: session.user.id,
    email: session.user.email,
    name: session.user.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secretKey);

  return Response.json({ token });
}
