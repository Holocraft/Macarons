export default function Comment({ comment }) {
  return (
    <div className='comment-container'>
      <p className='comment-user'>{`${
        comment.author.name
      } ${comment.createdAt.toLocaleString("en-US")}`}</p>
      <p>{comment.content}</p>
    </div>
  );
}
