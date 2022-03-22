import { useState } from 'react'
import moment from 'moment'
import { Modal, Menu, Dropdown, Checkbox, Tabs, Row, Divider, Popover } from 'antd'
import getImageUrl from 'src/utils/getImageUrl'
import Linkify from 'react-linkify'
import Link from 'next/link'

import { Props } from './type'
import CREATE_LIKE_COMMENT_MUTATION from 'src/graphql/mutations/createLikeComment'
import SAVE_POST_MUTATION from 'src/graphql/mutations/savePost'

import CREATE_LIKE_MUTATION from 'src/graphql/mutations/createLike'
import DELETE_LIKE_MUTATION from 'src/graphql/mutations/deleteLike'
import DELETE_POST from 'src/graphql/mutations/deletePost'
import CREATE_COMMENT_MUTATION from 'src/graphql/mutations/createComment'
import { useMutation } from '@apollo/client'
import MY_FEED_QUERY from 'src/graphql/queries/getMyFeed'
import { useAuth } from 'src/utils/auth'
import FriendsSingle from '../FriendsSingle'
// import { HeartIcon } from '@heroicons/react/outline'
// import { HeartIcon as HeartFillIcon } from '@heroicons/react/solid'
import { notification } from 'antd'
import { LinkPreview } from '@dhaiwat10/react-link-preview'
import { DEFAULT_USER_AVATAR } from 'src/config/constant'
import ReactPlayer from 'react-player'
import Avatar from 'src/components/shared/Avatar'
import PostCommets from './PostCommets'
import InputWithEmoti from './InputWithEmoti'
import { useRouter } from 'next/router'
import savePost from 'src/graphql/mutations/savePost'
import PopOver from './PopOver'

const regex = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/
const { TabPane } = Tabs

const NormalPost = ({ post, editPostHandler }: Props) => {
  const [comment, setComment] = useState('')
  const { user } = useAuth()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [savePostInCollection, { data, loading, error }] = useMutation(SAVE_POST_MUTATION)

  const postLiked = post.likes.find((like) => like.user?.id === user.id)
  const urlInPostContent = post.content?.match(regex)
  const router = useRouter()

  const [createLikeComment] = useMutation(CREATE_LIKE_COMMENT_MUTATION, {
    onError: (error) => {
      console.log(error)
    },
  })

  const [createLike] = useMutation(CREATE_LIKE_MUTATION, {
    onError: (error) => {
      console.log(error)
    },
  })

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    onError: (error) => {
      console.log(error)
    },
  })

  const [deleteLike] = useMutation(DELETE_LIKE_MUTATION, {
    onError: (error) => {
      console.log(error)
    },
  })

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => {
      notification['success']({
        message: 'Post delete successfully',
        description: 'Your post has been deleted',
      })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const deletePostHandler = () => {
    deletePost({ variables: { id: post.id }, refetchQueries: [{ query: MY_FEED_QUERY }] })
  }

  const commentlikeHandler = (comment) => {
    const liked = comment.likes.find((like) => like.user?.id === user.id)
    if (liked) {
      deleteLike({ variables: { id: liked.id }, refetchQueries: [{ query: MY_FEED_QUERY }] })
      return
    }

    createLikeComment({ variables: { id: comment.id }, refetchQueries: [{ query: MY_FEED_QUERY }] })
  }

  const likeHandler = () => {
    if (postLiked) {
      deleteLike({ variables: { id: postLiked.id }, refetchQueries: [{ query: MY_FEED_QUERY }] })
      return
    }
    createLike({ variables: { id: post.id }, refetchQueries: [{ query: MY_FEED_QUERY }] })
  }

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const commentHandler = () => {
    if (comment.trim().length === 0) return
    createComment({ variables: { data: { post: post.id, comment } }, refetchQueries: [{ query: MY_FEED_QUERY }] })
    setComment('')
  }

  function onChange(e: { target: { checked: any } }) {
    console.log(`checked = ${e.target.checked}`)
  }
  const saveHandler = () => {
    const postID = post.id.toString()
    savePostInCollection({ variables: { id: postID } })
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div className="dropdown-option">
          <div className="dropdown-icon">
            <img src="/assets/img/feed/save-post.svg" />
          </div>
          <div className="dropdown-content">
            <h5>Save Post</h5>
            <p>Save this post for later</p>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => editPostHandler({ id: post.id, content: post.content, isEdit: true })}>
        <div className="dropdown-option">
          <div className="dropdown-icon">
            <img src="/assets/img/feed/edit-post.svg" />
          </div>
          <div className="dropdown-content">
            <h5>Edit Post</h5>
            <p>Save this post for later</p>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="dropdown-option">
          <div className="dropdown-icon">
            <img src="/assets/img/feed/share-feed.svg" />
          </div>
          <div className="dropdown-content">
            <h5>Share on my feed</h5>
            <p>Share this post on my feed</p>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key="3" onClick={showModal}>
        <div className="dropdown-option">
          <div className="dropdown-icon">
            <img src="/assets/img/feed/share-friends.svg" />
          </div>
          <div className="dropdown-content">
            <h5>Share with Friends</h5>
            <p>Share post with friends</p>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key="4" onClick={deletePostHandler}>
        <div className="dropdown-option">
          <div className="dropdown-icon">
            <img src="/assets/img/feed/delete.svg" />
          </div>
          <div className="dropdown-content">
            <h5>Delete Post</h5>
            <p>Delete this post</p>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  )

  const content_person = (
    <PopOver
      profile={post?.user?.profileImage ? getImageUrl(post?.user?.profileImage?.url) : DEFAULT_USER_AVATAR}
      profile_back={post?.user?.coverImage ? getImageUrl(post?.user?.coverImage?.url) : DEFAULT_USER_AVATAR}
      name={`${post.user?.firstName}` + ` ` + `${post.user?.lastName}`}
      friends="3"
      location="India"
      button1="+ Friends"
      button2="Follow"
      buttonHandler1={''}
      buttonHandler2={''}
      typeStore={false}
    />
  )

  const content_store = (
    <PopOver
      profile={post?.store?.profileImage ? getImageUrl(post?.store?.profileImage?.url) : DEFAULT_USER_AVATAR}
      profile_back={post?.store?.coverImage ? getImageUrl(post?.store?.coverImage[1].url) : DEFAULT_USER_AVATAR}
      name={`${post.store?.businessInformation?.name}`}
      friends="3"
      location="India"
      button1="Message"
      button2="Follow"
      buttonHandler1={''}
      buttonHandler2={''}
      typeStore={true}
    />
  )

  return (
    <div className="post-normal-wrapper rounded-xl bg-white mb-8">
      <div className="post-upper p-8 border-b border-gray-100 pb-0">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="mr-8">
              <img
                src={post?.user?.profileImage ? getImageUrl(post?.user?.profileImage?.url) : DEFAULT_USER_AVATAR}
                alt={post.user?.profileImage?.alternativeText}
                style={{ width: 50, height: 50 }}
                className="rounded-full"
              />
            </div>
            <div>
              <div className="text-sm text-black font-medium">
                {post.user && (
                  // <Link href="/user-profile">
                  <Popover content={content_person} placement="bottom">
                    <h5 className='hover:underline'>
                      {post.user?.firstName} {post.user?.lastName}
                    </h5>
                  </Popover>
                  // </Link>
                )}
                {post.store && (
                  <Popover content={content_store} placement="bottom">
                    <h5
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/listing/${post.store.businessInformation?.name.replace(/ /g, '-') + '-' + post.store.id}`,
                        )
                      }
                    >
                      {post.store.businessInformation?.name}
                    </h5>
                  </Popover>
                )}
                {/* {post.user?.firstName?post.user?.firstName:'Unnamed'} {post.user?.lastName}                 */}
              </div>
              <p className="text-12 text-gray-500 font-normal">
                {moment(post.created_at).format('DD MMM [at] hh:mm A')}
              </p>
            </div>
          </div>
          {post.user?.id === user.id && (
            <Dropdown overlay={menu} trigger={['click']} overlayClassName="feed-dropdown">
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <img src="/assets/img/feed/ic_More.svg" />
              </a>
            </Dropdown>
          )}
        </div>
        <div className="text-12 text-gray-500 font-normal mb-8">
          {ReactPlayer.canPlay(post.content) && <ReactPlayer url={post.content} controls={true} />}
          <Linkify target="_blank">{post.content}</Linkify>
        </div>
        {ReactPlayer.canPlay(post.content) ||
          (urlInPostContent && post?.attachments?.length === 0 && (
            <LinkPreview url={urlInPostContent[0]} className="w-full" />
          ))}
        <div className="mb-6">
          {post.attachments.map(({ url, alternativeText, mime }) =>
            mime.includes('image') ? (
              <img src={getImageUrl(url)} alt={alternativeText} className="w-full h-full" />
            ) : (
              <video controls className="w-full h-full">
                <source src={getImageUrl(url)} id="video_here" />
                Your browser does not support HTML5 video.
              </video>
            ),
          )}
        </div>
        <div className="flex justify-between items-center py-8 border-t border-gray-100">
          <div className="flex items-center">
            <img src="/assets/img/feed/ic_comment.svg" />
            <p className="text-12 text-gray-500 font-normal ml-3">{post?.comments?.length} Comments</p>
          </div>

          <div className="flex items-center">
            <button onClick={likeHandler}>
              <img src="/assets/img/feed/ic_like.svg" />
            </button>
            {/* {postLiked ? <HeartFillIcon fill="#92929D" /> : <HeartIcon stroke="#92929D" />} */}
            <p className="text-12 text-gray-500 font-normal ml-3">{post?.likes?.length} Likes</p>
          </div>
          <div className="flex items-center cursor-pointer" onClick={showModal}>
            <img src="/assets/img/feed/ic_Share.svg" />
            <p className="text-12 text-gray-500 font-normal ml-3">{post?.shares?.length} Shares</p>
          </div>
          {/* <div className="flex items-center">
            <img src="/assets/img/feed/ic_Saved.svg" />
            <p className='text-12 text-gray-500 font-normal ml-3'>12 Saved</p>
          </div> */}

          <div className="flex items-center">
            <Avatar
              avatarlist={post.comments
                .filter((comment, i) => i <= 3)
                .map((comment, i) => ({
                  id: i,
                  avatarURL: comment?.user?.profileImage
                    ? getImageUrl(comment?.user?.profileImage?.url)
                    : 'https://randomuser.me/api/portraits/women/13.jpg',
                }))}
              radius={32}
              border={2}
            />
            {post.comments.length > 4 && (
              <div
                className="w-12 h-12 rounded-full bg-blue text-xs text-white font-medium text-center ml-1"
                style={{ paddingTop: 7 }}
              >
                <button>+{post.comments.length - 4}</button>
              </div>
            )}
          </div>

          {/* <div className="flex items-center">
            <Avatar
              avatarlist={[
                { id: 1, avatarURL: 'https://randomuser.me/api/portraits/women/13.jpg' },
                { id: 2, avatarURL: 'https://randomuser.me/api/portraits/women/14.jpg' },
                { id: 3, avatarURL: 'https://randomuser.me/api/portraits/women/15.jpg' },
                { id: 4, avatarURL: 'https://randomuser.me/api/portraits/women/17.jpg' },
              ]}
              radius={32}
              border={2}
            />
            <div
              className="w-12 h-12 rounded-full bg-blue text-xs text-white font-medium text-center ml-1"
              style={{ paddingTop: 7 }}
            >
              <button onClick={saveHandler}>+20</button>
            </div>
          </div> */}
        </div>
      </div>
      <div className="post-footer flex items-center p-8 max-w-fit">
        <img
          src={user.profileImage ? getImageUrl(user.profileImage?.url) : DEFAULT_USER_AVATAR}
          alt={user.profileImage?.alternativeText}
          style={{ width: 36, height: 36 }}
          className="rounded-full"
        />
        <InputWithEmoti post={post} />
      </div>
      <PostCommets comments={post.comments} commentlikeHandler={commentlikeHandler} />

      <Modal
        visible={isModalVisible}
        className="group-feed-modal mt-8 p-4 bg-blue rounded-xl"
        onCancel={handleCancel}
        footer={null}
        closable={false}
        width={490}
      >
        <div className="bg-white rounded-xl -m-16">
          <div className="modal-header flex justify-between items-center px-8 py-4">
            <p className="text-sm text-black font-medium">Share with Friends</p>
            <button onClick={handleCancel}>
              <img src="/assets/img/feed/ic_Close.svg" />
            </button>
          </div>
          <div className="px-12 pt-8">
            <Tabs defaultActiveKey="1" className="user-info-tabs">
              <TabPane tab="Friends" key="1" className="">
                <div className="rounded-2xl h-16 w-full border border-gray-300 flex justify-between items-center px-4">
                  <input type={'text'} placeholder="Search" className="w-90"></input>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.58891 7.7845C4.63478 7.85112 4.69616 7.90559 4.76775 7.94322C4.83935 7.98085 4.91902 8.00052 4.99991 8.00052C5.08079 8.00052 5.16047 7.98085 5.23206 7.94322C5.30366 7.90559 5.36504 7.85112 5.41091 7.7845L9.91091 1.2845C9.963 1.20953 9.99354 1.12172 9.99923 1.0306C10.0049 0.93949 9.98552 0.848562 9.94315 0.767697C9.90079 0.686832 9.83707 0.619124 9.75893 0.571929C9.68078 0.524734 9.5912 0.499857 9.49991 0.500001H0.499907C0.408829 0.500377 0.319576 0.525574 0.241748 0.572882C0.163919 0.62019 0.100459 0.68782 0.0581917 0.768497C0.0159247 0.849175 -0.00355002 0.939848 0.00186196 1.03077C0.00727394 1.12168 0.0373678 1.20941 0.0889073 1.2845L4.58891 7.7845Z"
                      fill="#ACB1C0"
                    />
                  </svg>
                </div>
                <div className="h-2" />
                {user.friends.map((friend) => (
                  <Row key={friend.id} className="gutter-row">
                    <div className="rounded-2xl w-full bg-indigo-50 flex justify-between items-center px-4 py-2 my-3">
                      <div className="flex justify-start">
                        <img
                          src={getImageUrl(friend.user.profileImage?.url) || DEFAULT_USER_AVATAR}
                          className="h-16 rounded-full mr-4"
                        />
                        <div>
                          <div className="text-12 font-medium mt-2">{`${friend.user.firstName} ${friend.user.lastName}`}</div>
                          <div className="text-9 font-medium text-green-500">Online</div>
                        </div>
                      </div>
                      <Checkbox onChange={onChange}></Checkbox>
                    </div>
                  </Row>
                ))}
                <div className="h-6" />
                <div className="border-t -mx-6 px-6 py-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3">
                      <input
                        type="text"
                        placeholder="Type your message here"
                        className="w-full text-12 bg-gray-200 px-4 py-3 rounded-2xl"
                      ></input>
                    </div>
                    <div>
                      <button
                        className="py-3 px-4 rounded-2xl text-12 text-white bg-indigo-500 w-full"
                        onClick={handleOk}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </TabPane>

              <TabPane tab="Email" key="2"></TabPane>

              <TabPane tab="Address" key="3" style={{ width: '100% !important' }}></TabPane>
            </Tabs>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default NormalPost
