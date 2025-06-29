export type UserProfile = {
    id: string;
    username: string;
    bio: string | undefined;
    profilePictureUrl: string | null;
    followers: number;
    following: number;
    posts: number;
  }