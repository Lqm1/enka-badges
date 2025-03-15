import { Elysia } from "elysia";
import { makeBadge, type Format } from "badge-maker";
import { GenshinImpactClient } from "../lib/enka-network";
import type { Response } from "../types/enka-network";
import { HTTPError } from "ky";

const logoBase64 =
    "data:image/webp;base64,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";

type GenshinFormat = Omit<Format, "logoBase64"> & { logo: "genshin-impact" };

const genshinMakeBadge = (genshinFormat: GenshinFormat) => {
    const { logo: _, ...format } = genshinFormat;
    return makeBadge({
        ...format,
        logoBase64:
            genshinFormat.logo === "genshin-impact" ? logoBase64 : undefined,
    });
};

const genshin = new GenshinImpactClient();

const ErrorBadge: GenshinFormat = {
    label: "error",
    message: "Bad Request",
    color: "red",
    logo: "genshin-impact",
};

const NotFoundBadge: GenshinFormat = {
    label: "error",
    message: "User not found",
    color: "red",
    logo: "genshin-impact",
};

const InternalServerErrorBadge: GenshinFormat = {
    label: "error",
    message: "Internal Server Error",
    color: "red",
    logo: "genshin-impact",
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
            return new Response(genshinMakeBadge(ErrorBadge), {
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
            return new Response(genshinMakeBadge(ErrorBadge), {
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
                    return new Response(genshinMakeBadge(NotFoundBadge), {
                        headers: {
                            "Content-Type": "image/svg+xml",
                        },
                        status: 404,
                    });
                }
            }
            return new Response(genshinMakeBadge(InternalServerErrorBadge), {
                headers: {
                    "Content-Type": "image/svg+xml",
                },
                status: 500,
            });
        }

        if (type === "ar") {
            const data = userData.playerInfo.level;
            return new Response(
                genshinMakeBadge({
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
                    logo: "genshin-impact",
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
                genshinMakeBadge({
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
                    logo: "genshin-impact",
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
                genshinMakeBadge({
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
                    logo: "genshin-impact",
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
                genshinMakeBadge({
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
                    logo: "genshin-impact",
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
                genshinMakeBadge({
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
                    logo: "genshin-impact",
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
