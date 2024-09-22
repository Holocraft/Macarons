import prisma from "../../../lib/prisma";
import Comment from "../comment/comment";
import CommentInput from "../comment-input/comment-input";

export default async function Comments({ params }) {
  const { albumId } = params;
  const comments = await prisma.comment.findMany({
    where: {
      albumId: albumId,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return (
    <div className='comments-container'>
      {comments?.map((comment: string) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
      <CommentInput albumId={albumId} />
    </div>
  );
}
