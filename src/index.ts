import { app } from "./app";
import type { Env } from "bun";
import type { Context } from "elysia";

export default {
    async fetch(request: Request, env: Env, ctx: Context): Promise<Response> {
        return await app.fetch(request);
    },
};
