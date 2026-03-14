
import { Link, InfiniteScroll } from '@inertiajs/react';

import AppLayout from '../../layouts/app-layout';
import { Post } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { show } from "@/actions/App/Http/Controllers/PostController";
import { Heart } from 'lucide-react';

interface PostIndexProps {
    posts: {
        data: Post[]
    }
}

export default function PostIndex({ posts }: PostIndexProps) {

    let content = <Card>
                    <CardContent className="flex items-center justify-center py-12">
                        <p className="text-muted-foreground">
                            No posts found.
                        </p>
                    </CardContent>
                </Card>;
                

    if (posts.data.length > 0) { 
        content = (
            <InfiniteScroll data="posts">
                {posts.data.map((post: Post) => (
                    <Card
                        key={post.id}
                        className="transition-colors hover:bg-muted/50 rounded-none border-b-0 last:border-b"
                    >
                        <CardHeader className="text-xl" >
                            <CardTitle className='text-2xl'>
                                {/* <Link href={`/posts/${post.id}`}> */}
                                <Link href={show(post.id).url}>
                                    {post.title}
                                </Link>
                            </CardTitle>
                            <CardDescription>
                                By {post.user?.name} on{" "} 
                                {new Date(post.created_at).toLocaleDateString()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                {post.body.substring(0, 100)}
                                {post.body.length > 100 && "..."}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Heart size={16} className="text-gray-400" />
                                <span>
                                    {post.likes_count ?? 0} likes
                                </span>
                            </div>
                        </CardContent>
                        
                    </Card>
                ))}
            </InfiniteScroll>
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
