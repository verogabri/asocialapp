
import { Link } from '@inertiajs/react';

import AppLayout from '../../layouts/app-layout';
import { Post } from '../../types';


interface PostShowProps {
    post: Post;
}

export default function PostShow({ post }: PostShowProps) {
    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <p className="text-sm text-gray-500 mb-2">By {post.user.name}</p>
                <p className="text-lg text-gray-600">{post.body}</p>
                
            </div>
            <div>
                <Link href="/" className="text-blue-500 hover:underline mt-4">back Home Page</Link>
            </div>
        </AppLayout>
    );
}
