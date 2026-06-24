export interface UserProfile {
    firstName: string;
    lastName: string;
    emailId: string;
    age?: number;
    gender?: string;
    bio?: string;
    profilePicture?: string;
    about?: string,
    skills?: string[]
};