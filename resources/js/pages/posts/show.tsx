
import { Link } from '@inertiajs/react';

import AppLayout from '../../layouts/app-layout';
import { Post } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CommentForm from '@/components/commentt/commentt-form';
import CommenttCard from '@/components/commentt/commentt-card';


interface PostShowProps {
    post: Post;
}

export default function PostShow({ post }: PostShowProps) {
    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Post Content */}
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle className="text-2xl">{post.title}</CardTitle>
                        <CardDescription>
                            By {post.user?.name} on{" "} 
                            {new Date(post.created_at).toLocaleDateString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 whitespace-pre-wrap">
                            {post.body}
                        </p>
                    </CardContent>
                </Card>
                
                {/* Comment Form */}
                <CommentForm postId={post.id} />

                {/* Comments Section */}
                

                <div className="space-y-4">
                    {post.commentts && post.commentts.length > 0 ? (
                        <div>
                            
                            {post.commentts.map((commentt) => (
                                <CommenttCard
                                    key={commentt.id}
                                    commentt={commentt}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No comments yet.</p>
                        </div>
                    )}
                </div>

                {/* <CommentForm postId={post.id} /> */}

            </div>
            <div>
                <Link href="/" className="text-blue-500 hover:underline mt-4">back Home Page</Link>
            </div>
        </AppLayout>
    );
}
