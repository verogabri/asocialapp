
import { Link } from '@inertiajs/react';

import AppLayout from '../../layouts/app-layout';
import { Post } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PostIndexProps {
    posts: Post[]
}

export default function PostIndex({ posts }: PostIndexProps) {

    let content = <Card>
                    <CardContent className="flex items-center justify-center py-12">
                        <p className="text-muted-foreground">
                            No posts found.
                        </p>
                    </CardContent>
                </Card>;
                

    if (posts.length > 0) { 
        content = (
            <>
                {posts.map((post: Post) => (
                    <Card
                        key={post.id}
                        className="transition-colors hover:bg-muted/50 rounded-none border-b-0 last:border-b"
                    >
                        <CardHeader className="text-xl" >
                            <CardTitle >
                                <Link href={`/posts/${post.id}`}>
                                    {post.title}
                                </Link>
                            </CardTitle>
                            <CardDescription>
                                By {post.user.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* <p className="text-muted-foreground"> */}
                                {post.body.substring(0, 100)}
                                {post.body.length > 100 && "..."}
                            {/* </p> */}
                        </CardContent>
                        
                    </Card>
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
