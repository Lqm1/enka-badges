import { Elysia } from "elysia";
import { makeBadge } from "badge-maker";
import { HonkaiStarRailClient } from "../lib/enka-network";
import { HTTPError } from "ky";

const hsr = new HonkaiStarRailClient();

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

export const HsrGen = new Elysia({ prefix: "/hsr" }).get(
    "/:uid/:type",
    async (context) => {
        const {
            params: { uid, type },
            query,
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

        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let userData: any;
        try {
            userData = await hsr.get(uid);
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

        if (type === "tl") {
            const data: number = userData.detailInfo.level;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${query.prefix || "TL"} ${data.toString()}`,
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

        if (type === "eq") {
            const data: number = userData.detailInfo.worldLevel ?? 0;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${query.prefix || "EQ"} ${data.toString()}`,
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

        if (type === "su") {
            const data: number =
                userData.detailInfo.recordInfo.maxRogueChallengeScore ?? 0;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${query.prefix || "SU World"} ${data.toString()}`,
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
            const data: number =
                userData.detailInfo.recordInfo.achievementCount ?? 0;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
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

        if (type === "characters") {
            const data: number =
                userData.detailInfo.recordInfo.avatarCount ?? 0;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${data.toString()} ${query.prefix || "Characters obtained"}`,
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

        if (type === "lcs") {
            const data: number =
                userData.detailInfo.recordInfo.equipmentCount ?? 0;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${data.toString()} ${query.prefix || "LCs obtained"}`,
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

        if (type === "relics") {
            const data: number = userData.detailInfo.recordInfo.relicCount ?? 0;
            return new Response(
                makeBadge({
                    label: query.title || "Honkai: Star Rail",
                    message: `${data.toString()} ${query.prefix || "Relics owned"}`,
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
