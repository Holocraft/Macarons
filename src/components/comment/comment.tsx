export default function Comment({ comment }) {
  return (
    <div className='comment-container'>
      <p className='comment-user'>{comment.author.name}</p>
      <p>{comment.content}</p>
    </div>
  );
}
