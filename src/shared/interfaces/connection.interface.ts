import type { UserProfile } from "./users.interface";

export interface Connections {
    fromUserId: UserProfile,
    status: Required<'accepted'>,
    toUserId: UserProfile,
}

export interface ConnectionResponse {
    data: Connections[],
    message: string,
}