import { Google } from "@/components/icons/google";
import { env } from "@/env";
import { Auth, google } from "googleapis";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import { ulid } from "ulidx";
import {
  SsoAuthCouldNotGetAccountInfo,
  SsoAuthInvalidPayload,
  SsoAuthStateMismatch,
  generateCallbackURL,
  type SsoProvider,
} from ".";

export const scopes = ["openid", "profile", "email"] as const;

export const googleAuthClient = () =>
  new Auth.OAuth2Client({
    clientId: env.SSO_GOOGLE_CLIENT_ID,
    clientSecret: env.SSO_GOOGLE_CLIENT_SECRET,
    redirectUri: generateCallbackURL("google"),
  });

const googleSsoProvider = {
  id: "google",
  title: "Google",
  Icon: Google,
  generateRedirectURL: ({ additionalState }) => {
    const uuid = ulid();
    const state = `${uuid}.${additionalState}`;
    const expires = DateTime.now().plus({ minutes: 5 }).toJSDate();
    cookies().set("state", state, {
      secure: true,
      httpOnly: true,
      // sameSite: env.NODE_ENV === "production" ? "strict" : "none",
      domain: env.APP_DOMAIN,
      expires,
    });
    const auth = googleAuthClient();
    const redirectUrl = auth.generateAuthUrl({
      state: uuid,
      scope: scopes.join(" "),
    });
    return redirectUrl;
  },
  callback: async ({ request }) => {
    const state = request.nextUrl.searchParams.get("state");
    const savedState = cookies().get("state")?.value;

    if (!savedState || savedState.split(".")[0] !== state)
      throw SsoAuthStateMismatch;
    const auth = googleAuthClient();

    const code = request.nextUrl.searchParams.get("code");

    if (!code) throw SsoAuthInvalidPayload;

    const token = await auth.getToken(code);

    auth.setCredentials(token.tokens);

    const oauth2 = google.oauth2("v2");

    const accountInfo = await oauth2.userinfo.get({ auth });

    if (accountInfo.status !== 200) throw SsoAuthCouldNotGetAccountInfo;

    const { id, email, name, picture } = accountInfo.data;

    if (!id || !email || !name || !picture) throw SsoAuthCouldNotGetAccountInfo;

    return { id, email, title: name, image: picture };
  },
} satisfies SsoProvider;

export default googleSsoProvider;
