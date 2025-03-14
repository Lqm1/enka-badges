export type Response = {
    playerInfo: {
        nickname: string;
        level: number;
        signature?: string;
        worldLevel?: number;
        nameCardId: number;
        finishAchievementNum?: number;
        towerFloorIndex?: number;
        towerLevelIndex?: number;
        showAvatarInfoList?: {
            avatarId: number;
            level: number;
            costumeId?: number;
            energyType?: number;
            talentLevel?: number;
        }[];
        showNameCardIdList?: number[];
        profilePicture: {
            id?: number;
            avatarId?: number;
        };
        fetterCount?: number;
        isShowAvatarTalent?: boolean;
        towerStarIndex?: number;
        theaterActIndex?: number;
        theaterModeIndex?: number;
        theaterStarIndex?: number;
    };
    avatarInfoList?: AvatarInfo[];
    ttl: number;
    uid: string;
    owner?: unknown;
};
export type AvatarInfo = {
    avatarId: number;
    propMap: {
        [index: string]: {
            type: number;
            ival: string;
            val?: string;
        };
    };
    talentIdList?: number[];
    fightPropMap: {
        [index: string]: number;
    };
    skillDepotId: number;
    inherentProudSkillList: number[];
    skillLevelMap: {
        [index: string]: number;
    };
    proudSkillExtraLevelMap?: {
        [index: string]: number;
    };
    equipList?: (Weapon | Reliquary)[];
    fetterInfo: {
        expLevel: number;
    };
    costumeId?: number;
};
export type Weapon = {
    itemId: number;
    weapon: {
        level: number;
        promoteLevel?: number;
        affixMap?: {
            [index: string]: number;
        };
    };
    flat: {
        nameTextMapHash: string;
        rankLevel: number;
        weaponStats: {
            appendPropId: string;
            statValue: number;
        }[];
        itemType: string;
        icon: string;
    };
};
export type Reliquary = {
    itemId: number;
    reliquary: {
        level: number;
        mainPropId: number;
        appendPropIdList?: number[];
    };
    flat: {
        nameTextMapHash: string;
        setNameTextMapHash: string;
        rankLevel: number;
        reliquaryMainstat: {
            mainPropId: string;
            statValue: number;
        };
        reliquarySubstats?: {
            appendPropId: string;
            statValue: number;
        }[];
        itemType: string;
        icon: string;
        equipType: string;
    };
};
