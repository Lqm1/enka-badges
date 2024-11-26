import { Elysia } from "elysia";
import { EnkaClient } from "enka-network-api";
import { makeBadge, ValidationError } from 'badge-maker';

const ErrorBadge = {
    label: 'error',
    message: 'Bad Request',
    color: 'red',
};

export const GenshinGen = new Elysia({ prefix: "/genshin" }).get(
    "/:uid/:type",
    async (context) => {
        const {
            params: { uid, type },
        } = context;

        return new Response(
            makeBadge(ErrorBadge),
            {
                headers: {
                    "Content-Type": "image/svg+xml",
                },
            }
        );
    }
);