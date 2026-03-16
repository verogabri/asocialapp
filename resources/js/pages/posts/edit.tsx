
import { Form } from '@inertiajs/react';

import AppLayout from '../../layouts/app-layout';
// import { Post } from '../../types';
// import { cn } from '../../lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { InputError } from '@/components/ui/input-error';
import { update, show } from '@/actions/App/Http/Controllers/PostController';
import { Post } from '@/types';


interface PostEditProps {
    post: Post;
}


export default function PostEdit({ post }: PostEditProps) {

    
    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <CardTitle >Edit Post</CardTitle>
                    <CardDescription>Edit the post by updating the form below.</CardDescription>
                </CardHeader>
                <CardContent>

                    <Form action={update(post.id)} >
                        {({ errors }) => (
                            <>
                                <div className="mt-4 mb-4">
                                    <Label
                                        htmlFor="title" 
                                        className="mb-2"
                                    >
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        aria-invalid={!!errors.title}
                                        className='rounded-none'
                                        defaultValue={post.title}
                                    />
                                    <InputError message={errors.title} className="mt-1" />
                                </div>

                                <div className="mt-4 mb-4">
                                    <Label htmlFor="body" className="mb-2">
                                        Body
                                    </Label>
                                    <Textarea
                                        id="body"
                                        name="body"
                                        aria-invalid={!!errors.body}
                                        className='rounded-none'
                                        defaultValue={post.body}

                                    />
                                    <InputError message={errors.body} className="mt-1" />
                                </div>

                                <div className="mt-4 mb-4 flex flex-row justify-between">
                                    <Button>
                                        UPDATE
                                    </Button>
                                    <Button>
                                        <a href={show(post.id).url} className="text-white">Back</a>
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                </CardContent>
            </Card>
        </AppLayout>
    );
}
