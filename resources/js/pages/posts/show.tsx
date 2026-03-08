
import React from 'react';
import { Deferred, Link } from '@inertiajs/react';

import AppLayout from '../../layouts/app-layout';
import { Commentt, Post } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CommentForm from '@/components/commentt/commentt-form';
import CommenttCard from '@/components/commentt/commentt-card';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';


interface PostShowProps {
    post: Post,
    commentts: Commentt[]; // Aggiungi questa riga per definire il tipo di commentts
}

export default function PostShow({ post, commentts }: PostShowProps) {

    const commenttsSectionRef = React.useRef<HTMLDivElement>(null);

    const handleOnSuccess = () => {

        toast.success("Commentts has beeen added successfully!!", {
            description: "Commentts has beeen added successfully!!",
            position: "top-center" 
        })
        
        // Scrolla alla sezione dei commentts dopo che un nuovo commento è stato aggiunto
        if (commenttsSectionRef.current) {
            commenttsSectionRef.current.scrollIntoView({ behavior: 'smooth', block:'start' });
        }
    }


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
                <CommentForm 
                    postId={post.id}
                    onSuccess={handleOnSuccess}
                />

                {/* Comments Section */}
                
                <div ref={commenttsSectionRef}>
                <Deferred
                    data="commentts"
                    fallback={
                        <div><p>Loading commentts ... </p></div>
                    }
                >
                    <div className="space-y-4">
                        {commentts && commentts.length > 0 ? (
                            <div>
                                
                                {commentts.map((commentt) => (
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

                </Deferred>
                </div>

            </div>
            <div>
                <Link href="/" className="text-blue-500 hover:underline mt-4">back Home Page</Link>
            </div>
        </AppLayout>
    );
}
