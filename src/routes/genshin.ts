import { Elysia } from "elysia";
import { Wrapper } from "enkanetwork.js";
import { makeBadge, ValidationError } from "badge-maker";

const { genshin } = new Wrapper({
    userAgent: "EnkaBadges/enkabadges.mikn.dev",
});

const ErrorBadge = {
    label: "error",
    message: "Bad Request",
    color: "red",
};

const NotFoundBadge = {
    label: "error",
    message: "User not found",
    color: "red",
};

export const GenshinGen = new Elysia({ prefix: "/genshin" }).get(
    "/:uid/:type",
    async (context) => {
        const {
            params: { uid, type },
            query
        } = context;

        if (
            type !== "ar" &&
            type !== "abyss" &&
            type !== "wl" &&
            type !== "achievements"
        ) {
            return new Response(makeBadge(ErrorBadge), {
                headers: {
                    "Content-Type": "image/svg+xml",
                },
                status: 400,
            });
        }

        const allowedStyles = ["plastic", "flat", "flat-square", "for-the-badge", "social"];
        if(query.style && !allowedStyles.includes(query.style)) {
            return new Response(makeBadge(ErrorBadge), {
                headers: {
                    "Content-Type": "image/svg+xml",
                },
                status: 400,
            });
        }

        let userData;
        try {
            userData = await genshin.getPlayer(uid);
        } catch (error) {
            return new Response(makeBadge(NotFoundBadge), {
                headers: {
                    "Content-Type": "image/svg+xml",
                },
                status: 404,
            });
        }

        if (type === "ar") {
            const data = userData.player.levels.rank;
            return new Response(
                makeBadge({
                    label: query.title || "Genshin Impact",
                    message: `${query.prefix || "AR"} ${data.toString()}`,
                    color: query.colour || "blue",
                    style: query.style as "flat" | "plastic" | "flat-square" | "for-the-badge" | "social" || "flat",
                }),
                {
                    headers: {
                        "Content-Type": "image/svg+xml",
                    },
                },
            );
        }

        if (type === "wl") {
            const data = userData.player.levels.world;
            return new Response(
                makeBadge({
                    label: query.title || "Genshin Impact",
                    message: `${query.prefix || "WL"} ${data.toString()}`,
                    color: query.colour || "blue",
                    style: query.style as "flat" | "plastic" | "flat-square" | "for-the-badge" | "social" || "flat",
                }),
                {
                    headers: {
                        "Content-Type": "image/svg+xml",
                    },
                },
            );
        }

        if (type === "abyss") {
            const data = `${userData.player.abyss.floor} - ${userData.player.abyss.chamber}`;
            return new Response(
                makeBadge({
                    label: query.title || "Genshin Impact",
                    message: `${query.prefix || "Abyss"} ${data.toString()}`,
                    color: query.colour || "blue",
                    style: query.style as "flat" | "plastic" | "flat-square" | "for-the-badge" | "social" || "flat",
                }),
                {
                    headers: {
                        "Content-Type": "image/svg+xml",
                    },
                },
            );
        }

        if (type === "achievements") {
            const data = userData.player.achievements;
            return new Response(
                makeBadge({
                    label: query.title || "Genshin Impact",
                    message: `${query.prefix || "Achievments:"} ${data.toString()}`,
                    color: query.colour || "blue",
                    style: query.style as "flat" | "plastic" | "flat-square" | "for-the-badge" | "social" || "flat",
                }),
                {
                    headers: {
                        "Content-Type": "image/svg+xml",
                    },
                },
            );
        }
    },
);