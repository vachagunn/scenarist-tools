import { authenticate } from "@/server/auth/authenticate";
import ssoAuthProviders from "@/server/auth/sso";
import { db } from "@/server/db";
import { admins, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params: { providerId } }: { params: { providerId: string } },
) => {
  const provider = ssoAuthProviders.find(
    (provider) => provider.id === providerId,
  );
  if (!provider) return redirect("/auth");

  const { title, image, email } = await provider.callback({ request });

  const adminExists = await db.query.admins.findFirst();

  if (!adminExists) {
    const [user] = await db
      .insert(users)
      .values({ email, fullName: title, pictureUrl: image })
      .onConflictDoUpdate({
        target: users.email,
        set: { fullName: title, pictureUrl: image },
      })
      .returning();
    if (!user) throw "could not upsert user";
    const [admin] = await db
      .insert(admins)
      .values({ userId: user.id })
      .returning();
    if (!admin) throw "could not create admin";
    await authenticate(user.id);
    redirect("/dashboard");
  }

  const user = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.email, email),
  });

  if (!user) {
    redirect("auth");
  }

  await db
    .update(users)
    .set({ fullName: title, pictureUrl: image })
    .where(eq(users.id, user.id));

  await authenticate(user.id);
  redirect("/dashboard");
};
