import { Elysia } from "elysia";
import { Wrapper } from "enkanetwork.js";
import { makeBadge, ValidationError } from "badge-maker";

const { starrail } = new Wrapper({
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

export const HsrGen = new Elysia({ prefix: "/hsr" }).get(
    "/:uid/:type",
    async (context) => {
        const {
            params: { uid, type },
            query
        } = context;

        if (
            type !== "tl" &&
            type !== "su" &&
            type !== "eq" &&
            type !== "achievements" &&
            type !== "characters" &&
            type !== "lcs" &&
            type !== "relics"
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
            userData = await starrail.getPlayer(uid);
        } catch (error) {
            return new Response(makeBadge(NotFoundBadge), {
                headers: {
                    "Content-Type": "image/svg+xml",
                },
                status: 404,
            });
        }

        if (type === "tl") {
            const data = userData.player.level;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${query.prefix || "TL"} ${data.toString()}`,
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

        if (type === "eq") {
            const data = userData.player.equilibriumLevel;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${query.prefix || "EQ"} ${data.toString()}`,
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

        if (type === "su") {
            const data = userData.player.recordInfo.simulatedUniverseLastFinishedWorld;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${query.prefix || "SU World"} ${data.toString()}`,
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
            const data = userData.player.recordInfo.achievementCount;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
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

        if (type === "characters") {
            const data = userData.player.recordInfo.charactersObtained;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${data.toString()} ${query.prefix || "Characters obtained"}`,
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

        if (type === "lcs") {
            const data = userData.player.recordInfo.lightConesObtained;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${data.toString()} ${query.prefix || "LCs obtained"}`,
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

        if (type === "relics") {
            const data = userData.player.recordInfo.relicsOwned;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${data.toString()} ${query.prefix || "Relics owned"}`,
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