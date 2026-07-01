export interface UserProfile extends UserId {
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    bio: string;
    profilePicture: string;
    about: string,
    skills: string[]
};

export interface UserId {
    _id: string
}

