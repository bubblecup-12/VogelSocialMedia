export type UserProfile = {
    id: string;
    username: string | undefined;
    bio: string | undefined;
    profilePictureUrl: string | null;
    followers: number;
    following: number;
    posts: number;
    isFollowing: boolean;
  }