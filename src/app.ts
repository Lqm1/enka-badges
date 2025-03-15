import Elysia, { redirect } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { GenshinGen } from "./routes/genshin";
import { HsrGen } from "./routes/hsr";
import { ZzzGen } from "./routes/zzz";

export const app = new Elysia({ aot: false }).onError(({ code, error }) => {
    return new Response(JSON.stringify({ error: error.toString() ?? code }), {
        status: 500,
    });
});

app.use(
    swagger({
        documentation: {
            info: {
                title: "EnkaBadges API",
                version: "1.0.0",
            },
        },
    }),
);
app.use(GenshinGen);
app.use(HsrGen);
app.use(ZzzGen);

app.get("/", () => redirect("https://enkabadges.mikn.dev/"));
