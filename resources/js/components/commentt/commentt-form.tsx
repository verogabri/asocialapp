import { InputError } from '@/components/ui/input-error';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { store } from '@/actions/App/Http/Controllers/CommenttController';


interface CommentFormProps {
    postId: number;
    onSuccess? : () => void;
}

export default function CommentForm({ postId, onSuccess }: CommentFormProps) {

    const handleOnSuccess = () => {
    
        // alert('Comment added successfully!');
        if(onSuccess){
            onSuccess();
        }
    }

    const handleOnError = (errors: any) => {
        // Gestisce gli errori (es: utente non loggato)
        // ma nn gestisce il caso di redirect 302
        const errorMessage = errors?.auth || Object.values(errors)[0] || 'An error occurred';
        alert(errorMessage);
    }


    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Add Comment</CardTitle>
                <CardDescription>
                    Share your thoughts about this post
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form 
                    action={store()}
                    className="space-y-4"
                    resetOnSuccess
                    onSuccess={handleOnSuccess}
                    onError={handleOnError}
                    options={{
                        only: ['commentts']
                    }}
                >
                    {({ errors, processing }) => (
                        <>
                            <Input
                                type="hidden"
                                name="post_id"
                                value={postId}
                            />
                            <div className="space-y-1">
                                <Textarea
                                    id="body"
                                    name="body"
                                    placeholder="Write your comment here..."
                                    aria-invalid={!!errors.body}
                                />
                                <InputError message={errors.body} />
                            </div>
                            <Button
                                type="submit"
                                disabled={processing}
                            >{processing ? 'Adding...' : 'Add comment'}</Button>
                        </>
                    )}
                </Form>
            </CardContent>
        </Card>
    );
}