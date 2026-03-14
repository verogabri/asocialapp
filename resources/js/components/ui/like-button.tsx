
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { router } from "@inertiajs/react";
import PostToggleLike from '@/actions/App/Http/Controllers/PostToggleLike';

interface LikeButtonProps {
    postId: number;
    count?: number;
    liked?: boolean;
    isLoading?: boolean;
}

/**
 * A button component for toggling a like action on a post.
 * 
 * @component
 * @example
 * <LikeButton postId={1} count={42} liked={false} />
 * 
 * @param {LikeButtonProps} props - The component props
 * @param {number} props.postId - The ID of the post to like/unlike
 * @param {number} [props.count=0] - The current count of likes on the post
 * @param {boolean} [props.liked=false] - Whether the current user has liked the post
 * @param {boolean} [props.isLoading=false] - External loading state to disable the button
 * 
 * @returns {JSX.Element} A styled button with a heart icon and like count
 */
export default function LikeButton({
    postId,
    count = 0,
    liked = false, // user_has_liked
    isLoading: externalLoading = false,
}: LikeButtonProps) {

    const [isLoading, setIsLoading] = useState(false);
    const disabled = isLoading || externalLoading;

    const handleToggleLike = () => {
        if (disabled) return;

        router.post(
            PostToggleLike.__invoke(postId).url,
            {},
            {
                onStart: () => setIsLoading(true),
                onSuccess: () => {
                    alert('ok success');
                },
                onError: (errors) => {
                    // Mostra alert con messaggio di errore
                    const errorMessage = errors?.auth || Object.values(errors)[0] || 'there was an error';
                    alert(errorMessage);
                },
                onFinish: () => setIsLoading(false),
                preserveScroll: true,
            }
        );
    };

    return (
        <button
            onClick={handleToggleLike}
            disabled={disabled}
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors",
                liked
                    ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100",
                disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            )}
        >
            <Heart
                size={16}
                className={cn(
                    "transition-all",
                    liked ? "fill-red-500 text-red-500" : "text-gray-500"
                )}
            />
            <span className="text-sm font-medium">{count}</span>
        </button>
    );
}
