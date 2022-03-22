import { useState } from 'react'
import getImageUrl from 'src/utils/getImageUrl'
import moment from 'moment'

const PostCommets = ({ comments, commentlikeHandler }) => {
  const [isClose, isSetClose] = useState(false)
  return (
    <>
      <div className="post-comments-wrapper px-8 pb-8 border-t border-gray-100">
        <div style={{ display: isClose ? 'none' : 'block' }}>
          {comments
            .map((comment) => (
              <div className="flex ml-12 my-8">
                <img
                  src={
                    comment.user?.profileImage
                      ? getImageUrl(comment.user?.profileImage?.url)
                      : 'https://randomuser.me/api/portraits/women/20.jpg'
                  }
                  alt={comment.user?.profileImage?.alternativeText}
                  style={{ width: 36, height: 36, borderRadius: 20, marginRight: 10 }}
                />

                <div className="bg-indigo-100 rounded-bl-3xl rounded-tr-3xl px-6 py-3">
                  <h4 className="text-sm text-black font-medium">
                    {comment.user?.firstName ? comment.user?.firstName : 'Unnamed'} {comment.user?.lastName}
                    <span className="text-xs text-gray-500 font-normal ml-8">
                      {moment(comment.created_at).fromNow()}
                    </span>
                  </h4>
                  <p className="text-12 text-gray-800 font-normal">{comment.comment}</p>
                  <div className="flex justify-end text-xs text-blue font-medium -mt-1 -mb-2">
                    <button
                      className="mr-4"
                      onClick={() => {
                        commentlikeHandler(comment)
                      }}
                    >
                      {comment.likes?.length > 0 && comment.likes?.length}
                      Like
                    </button>
                    <button>Reply</button>
                  </div>
                </div>
              </div>
            ))
            .reverse()}
        </div>
        <div className="h-8" style={{ display: isClose ? 'block' : 'none' }} />
        <div className="flex items-center">
          <button onClick={() => isSetClose(!isClose)}>
            <img src="/assets/img/feed/more-comments.svg" />
          </button>
          <p className="text-12 text-gray-500 font-normal ml-3">{isClose ? 'More comments' : 'Close comments'}</p>
        </div>
      </div>
    </>
  )
}

export default PostCommets
