export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    posts?: Post[];
    commentts?: Commentt[];
    
};

export interface Post {
    id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    user?: User;
    commentts?: Commentt[];
    likes?: Like[];
    likes_count?: number
}

export interface Commentt {
    id: number;
    body: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    post_id: number;
    user: User;
    post: Post;
}

export interface PostLikesData {
    count: number;
    user_has_liked: boolean;
}