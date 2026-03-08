import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Commentt } from "@/types";

interface CommenttCardProps {
    commentt: Commentt;
}

export default function CommenttCard({ commentt }: CommenttCardProps) {
    return (
        <Card className="rounded-none border-b-0 last:border-b">
            <CardHeader>
                <CardTitle className="text-base">{commentt.user?.name}</CardTitle>
                <CardDescription>
                    {new Date(commentt.created_at).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent>{commentt.body}</CardContent>
        </Card>
    );
}