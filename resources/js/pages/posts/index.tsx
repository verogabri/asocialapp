
import { Link } from '@inertiajs/react';

import AppLayout from '../../layouts/app-layout';
import { Post } from '../../types';

interface PostIndexProps {
    posts: Post[]
}

export default function PostIndex({ posts }: PostIndexProps) {

    let content = <div className="text-center py-8">
                        <p className="text-gray-500">No posts found.</p>
                    </div>;

    if (posts.length > 0) { 
        content = (
            <>
                {posts.map((post: Post) => (
                    <article
                        key={post.id}
                        className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            <Link href={`/posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </h2>
                        <p className="text-sm text-gray-500 mb-2">By {post.user.name}</p>
                        <p className="text-gray-600">
                            {post.body.substring(0, 100)}
                            {post.body.length > 100 && "..."}
                        </p>
                    </article>
                ))}
            </>
        );
    }

    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
                <div>
                    {content}
                </div>
            </div>

        </AppLayout>
    );
}
