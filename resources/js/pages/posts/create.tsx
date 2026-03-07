
import { Form } from '@inertiajs/react';

import AppLayout from '../../layouts/app-layout';
// import { Post } from '../../types';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { InputError } from '@/components/ui/input-error';


export default function PostCreate() {

    
    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <CardTitle >Create Post</CardTitle>
                    <CardDescription>Create a new post by filling out the form below.</CardDescription>
                </CardHeader>
                <CardContent>

                    <Form method="post" action="/posts">
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
                                    />
                                    <InputError message={errors.body} className="mt-1" />
                                </div>

                                <div className="mt-4 mb-4 flex flex-row justify-between">
                                    <Button>
                                        CREATE
                                    </Button>
                                    <Button>
                                        <a href="/posts" className="text-white">Back</a>
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
