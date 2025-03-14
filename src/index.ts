import { app } from "./app";

export default {
    async fetch(
        request: Request,
        env: CloudflareBindings,
        ctx: ExecutionContext,
    ): Promise<Response> {
        return await app.fetch(request);
    },
};
