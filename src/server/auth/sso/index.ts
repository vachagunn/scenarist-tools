import { env } from "@/env";
import { type NextRequest } from "next/server";
import { type FC, type HTMLAttributes } from "react";
import googleSsoProvider from "./google";

export type SsoProvider = {
  id: string;
  title: string;
  Icon: FC<HTMLAttributes<HTMLOrSVGElement>>;
  generateRedirectURL: (options: {
    request: NextRequest;
    additionalState?: string;
    callbackUrl?: string;
  }) => string;
  callback: (options: { request: NextRequest }) => Promise<{
    id: string;
    email: string;
    title: string;
    image: string;
  }>;
};

const ssoAuthProviders = [googleSsoProvider] satisfies SsoProvider[];

const baseSsoUrl = `${env.APP_URL}/auth/sso` as const;

export const generateRedirectURL = <ProviderId extends string>(
  providerId: ProviderId,
) => `${baseSsoUrl}/${providerId}/redirect` as const;

export const generateCallbackURL = <ProviderId extends string>(
  providerId: ProviderId,
) => `${baseSsoUrl}/${providerId}/callback` as const;

export class SsoAuthInvalidPayload extends Error {
  constructor() {
    super("Invalid Payload");
  }
}

export class SsoAuthCouldNotGetAccountInfo extends Error {
  constructor() {
    super("Could Not Get Account Info");
  }
}

export class SsoAuthStateMismatch extends Error {
  constructor() {
    super("State Mismatch");
  }
}

export default ssoAuthProviders;
