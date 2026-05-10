import * as cookie from "cookie";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { findUserByEmail, createUser } from "./queries/users";
import { signSessionToken } from "./kimi/session";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const authRouter = createRouter({
  me: authedQuery.query((opts) => {
    const { password, ...safeUser } = opts.ctx.user;
    return safeUser;
  }),

  login: publicQuery
    .input(loginSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await findUserByEmail(input.email);
      if (!user) {
        throw new Error("Ongeldig e-mailadres of wachtwoord");
      }

      const valid = bcrypt.compareSync(input.password, user.password);
      if (!valid) {
        throw new Error("Ongeldig e-mailadres of wachtwoord");
      }

      const token = await signSessionToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      const opts = getSessionCookieOptions(ctx.req.headers);
      ctx.resHeaders.append(
        "set-cookie",
        cookie.serialize(Session.cookieName, token, {
          httpOnly: opts.httpOnly,
          path: opts.path,
          sameSite: (opts.sameSite?.toLowerCase() || "lax") as "lax" | "none",
          secure: opts.secure,
          maxAge: Session.maxAgeMs / 1000,
        }),
      );

      const { password: _, ...safeUser } = user;
      return safeUser;
    }),

  register: publicQuery
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const existing = await findUserByEmail(input.email);
      if (existing) {
        throw new Error("Dit e-mailadres is al geregistreerd");
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const user = await createUser({
        email: input.email,
        name: input.name || input.email.split("@")[0],
        password: hashedPassword,
        role: input.email === "admin@admin.com" ? "admin" : "user",
      });

      const { password: _, ...safeUser } = user;
      return safeUser;
    }),

  logout: authedQuery.mutation(async ({ ctx }) => {
    const opts = getSessionCookieOptions(ctx.req.headers);
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, "", {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSide: (opts.sameSite?.toLowerCase() || "lax") as "lax" | "none",
        secure: opts.secure,
        maxAge: 0,
      }),
    );
    return { success: true };
  }),
});
