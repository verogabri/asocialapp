export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
};

export interface Post {
    id: number;
    user_id: number;
    user: User;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
}