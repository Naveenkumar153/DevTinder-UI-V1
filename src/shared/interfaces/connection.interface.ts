import type { UserProfile } from "./users.interface";

export interface ConnectionResponse {
    data: UserProfile[],
    message: string,
}

export interface RequestsType {
    fromUserId: UserProfile,
    status: Required<'interested'>,
    toUserId: string,
}

export interface RequestResponse {
    data: RequestsType[],
    message: string,
}