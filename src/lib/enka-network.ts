import ky from "ky";
import type { Response } from "../types/enka-network";

class EnkaNetwork {
    public readonly client = ky.create({
        prefixUrl: "https://enka.network/api",
        headers: {
            "User-Agent": "EnkaBadges/enkabadges.mikn.dev",
        },
    });
}

export class GenshinImpactClient extends EnkaNetwork {
    public async get(uid: string, info = true): Promise<Response> {
        return await this.client
            .get(`uid/${uid}`, {
                searchParams: info ? "?info" : "",
            })
            .json<Response>();
    }
    public async getProfile(username: string): Promise<Response> {
        return await this.client.get(`profile/${username}`).json<Response>();
    }
}

export class HonkaiStarRailClient extends EnkaNetwork {
    public async get(uid: string): Promise<unknown> {
        return await this.client.get(`hsr/uid/${uid}`).json<unknown>();
    }
}

export class ZenlessZoneZeroClient extends EnkaNetwork {
    public async get(uid: string): Promise<unknown> {
        return await this.client.get(`zzz/uid/${uid}`).json<unknown>();
    }
}
