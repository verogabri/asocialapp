
import React, { useEffect, useRef } from 'react';
import { Deferred, Link, usePoll } from '@inertiajs/react';

import AppLayout from '../../layouts/app-layout';
import { Commentt, Post, PostLikesData } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CommentForm from '@/components/commentt/commentt-form';
import CommenttCard from '@/components/commentt/commentt-card';
import CommenttList from '@/components/commentt/commentt-list';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import LikeButton from '@/components/ui/like-button';


interface PostShowProps {
    post: Post,
    commentts: Commentt[]; // Aggiungi questa riga per definire il tipo di commentts
    likes: PostLikesData
}

export default function PostShow({ post, commentts, likes }: PostShowProps) {

    const commenttsSectionRef = React.useRef<HTMLDivElement>(null);

    const commenttsCount = useRef(commentts?.length ? commentts.length : 0);
    const writingCommentt = useRef(false);


    useEffect(() => {
        // Aggiorna il conteggio dei commenti quando commentts cambia
        let commentsCountValue = commentts ? commentts.length : 0;

        console.log("Commentts updated, new count: writingCommentt.current ", writingCommentt.current);

        if(commentsCountValue > commenttsCount.current && commenttsCount.current !== 0 && writingCommentt.current) {
            toast.success("New commentts has been added!!", {
                description: "New commentts has been added!!",
                position: "top-center",
                duration: 8000,
                action: {
                    label: "View",
                    onClick: scrollToCommenttsSection
                }
            })

            writingCommentt.current = false;
        }

       
        commenttsCount.current = commentsCountValue

        console.log("Commentts updated, current count:", commenttsCount.current);

    }, [commentts]);


    usePoll( 10000, {
        only: ['commentts', 'likes']
    })

    const handleOnSuccess = () => {
        writingCommentt.current = true;

        toast.success("Commentts has beeen added successfully!!", {
            description: "Commentts has beeen added successfully!!",
            position: "top-center" 
        })
        
        // Scrolla alla sezione dei commentts dopo che un nuovo commento è stato aggiunto
        scrollToCommenttsSection();
    }

    const scrollToCommenttsSection = () => {
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
                    <CardContent className="space-y-4">
                        <p className="text-gray-700 whitespace-pre-wrap">
                            {post.body}
                        </p>
                        <Deferred 
                            data="likes"
                            fallback={
                                <LikeButton 
                                    postId={post.id} 
                                    count={likes?.count} 
                                    liked={likes?.user_has_liked} 
                                    isLoading={!likes}
                                />}
                        >
                            <LikeButton 
                                postId={post.id} 
                                count={likes?.count}
                                liked={likes?.user_has_liked}
                            />
                        </Deferred>
                        

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
                        <>
                        {/* <div><p>Loading commentts ... </p></div> */}
                        <CommenttList commentts={commentts} />
                        </>
                    }
                >
                    <CommenttList commentts={commentts} />
                
                </Deferred>
                </div>

            </div>
            <div>
                <Link href="/" className="text-blue-500 hover:underline mt-4">back Home Page</Link>
            </div>
        </AppLayout>
    );
}
