import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { destroy, edit } from "@/actions/App/Http/Controllers/PostController";


import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";





interface PostActionsDropdownProps {
    postId: number;
    canUpdate: boolean;
    canDelete: boolean;
}


export default function PostDropActionMenu({postId, canUpdate, canDelete}: PostActionsDropdownProps) {

    if( !canDelete && !canUpdate ) return null;


    const handleDelete = () => {
        router.delete(destroy(postId));
    };
    

    let canUpdateAction = canUpdate ? (
        <DropdownMenuItem>
            <Link href={edit(postId)}>
                <Pencil className="mr-2 h-4 w-4 inline-block" />
                Edit
            </Link>
        </DropdownMenuItem>
    ) : null;


    let canDeleteAction = canDelete ? (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                >
                    <Trash2 />
                    Delete Post
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will
                        permantly delete your post and remove all
                        associated comments and likes.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ) : null;


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {canUpdateAction}
                {canDeleteAction}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
