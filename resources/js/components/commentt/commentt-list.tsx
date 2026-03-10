import CommenttCard from '@/components/commentt/commentt-card';
import { Commentt } from '@/types'
import LoadingCard from '../ui/loading-card';


interface CommenttListProps {
    commentts?: Commentt[];
}

export default function CommenttList({ commentts }: CommenttListProps) {


    if(commentts === undefined) {
        return (
            <LoadingCard message="Loading commentts..." />
            
        )
    }

    if( commentts.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No commentts yet.</p>
            </div>
        )
    }


    return (
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
    );
}
