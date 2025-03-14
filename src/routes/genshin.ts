import { Elysia } from "elysia";
import { makeBadge } from "badge-maker";
import { GenshinImpactClient } from "../lib/enka-network";
import type { Response } from "../types/enka-network";
import { HTTPError } from "ky";

const genshin = new GenshinImpactClient();

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

const InternalServerErrorBadge = {
    label: "error",
    message: "Internal Server Error",
    color: "red",
};

export const GenshinGen = new Elysia({ prefix: "/genshin" }).get(
    "/:uid/:type",
    async (context) => {
        const {
            params: { uid, type },
            query,
        } = context;

        if (
            type !== "ar" &&
            type !== "abyss" &&
            type !== "wl" &&
            type !== "achievements" &&
            type !== "theater"
        ) {
            return new Response(makeBadge(ErrorBadge), {
                headers: {
                    "Content-Type": "image/svg+xml",
                },
                status: 400,
            });
        }

        const allowedStyles = [
            "plastic",
            "flat",
            "flat-square",
            "for-the-badge",
            "social",
        ];
        if (query.style && !allowedStyles.includes(query.style)) {
            return new Response(makeBadge(ErrorBadge), {
                headers: {
                    "Content-Type": "image/svg+xml",
                },
                status: 400,
            });
        }

        let userData: Response;
        try {
            userData = await genshin.get(uid, true);
        } catch (error) {
            if (error instanceof HTTPError) {
                if (error.response.status === 404) {
                    return new Response(makeBadge(NotFoundBadge), {
                        headers: {
                            "Content-Type": "image/svg+xml",
                        },
                        status: 404,
                    });
                }
            }
            return new Response(makeBadge(InternalServerErrorBadge), {
                headers: {
                    "Content-Type": "image/svg+xml",
                },
                status: 500,
            });
        }

        if (type === "ar") {
            const data = userData.playerInfo.level;
            return new Response(
                makeBadge({
                    label: query.title || "Genshin Impact",
                    message: `${query.prefix || "AR"} ${data.toString()}`,
                    color: query.colour || "blue",
                    style:
                        (query.style as
                            | "flat"
                            | "plastic"
                            | "flat-square"
                            | "for-the-badge"
                            | "social") || "flat",
                }),
                {
                    headers: {
                        "Content-Type": "image/svg+xml",
                    },
                },
            );
        }

        if (type === "wl") {
            const data = userData.playerInfo.worldLevel ?? 0;
            return new Response(
                makeBadge({
                    label: query.title || "Genshin Impact",
                    message: `${query.prefix || "WL"} ${data.toString()}`,
                    color: query.colour || "blue",
                    style:
                        (query.style as
                            | "flat"
                            | "plastic"
                            | "flat-square"
                            | "for-the-badge"
                            | "social") || "flat",
                }),
                {
                    headers: {
                        "Content-Type": "image/svg+xml",
                    },
                },
            );
        }

        if (type === "abyss") {
            const data = `${userData.playerInfo.towerFloorIndex ?? 0} - ${userData.playerInfo.towerLevelIndex ?? 0}`;
            return new Response(
                makeBadge({
                    label: query.title || "Genshin Impact",
                    message: `${query.prefix || "Abyss"} ${data.toString()}`,
                    color: query.colour || "blue",
                    style:
                        (query.style as
                            | "flat"
                            | "plastic"
                            | "flat-square"
                            | "for-the-badge"
                            | "social") || "flat",
                }),
                {
                    headers: {
                        "Content-Type": "image/svg+xml",
                    },
                },
            );
        }

        if (type === "achievements") {
            const data = userData.playerInfo.finishAchievementNum ?? 0;
            return new Response(
                makeBadge({
                    label: query.title || "Genshin Impact",
                    message: `${query.prefix || "Achievments:"} ${data.toString()}`,
                    color: query.colour || "blue",
                    style:
                        (query.style as
                            | "flat"
                            | "plastic"
                            | "flat-square"
                            | "for-the-badge"
                            | "social") || "flat",
                }),
                {
                    headers: {
                        "Content-Type": "image/svg+xml",
                    },
                },
            );
        }

        if (type === "theater") {
            const data = `${userData.playerInfo.theaterActIndex ?? 0} - ★ ${userData.playerInfo.theaterStarIndex ?? 0}`;
            return new Response(
                makeBadge({
                    label: query.title || "Genshin Impact",
                    message: `${query.prefix || "Theater Act"} ${data.toString()}`,
                    color: query.colour || "blue",
                    style:
                        (query.style as
                            | "flat"
                            | "plastic"
                            | "flat-square"
                            | "for-the-badge"
                            | "social") || "flat",
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
