import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { Menu, Dropdown, notification } from 'antd'
import CREATE_POST_MUTATION from 'src/graphql/mutations/createPost'
import UPDATE_POST_MUTATION from 'src/graphql/mutations/updatePost'
import { useMutation } from '@apollo/client'
import MY_FEED_QUERY from 'src/graphql/queries/getMyFeed'
import FileUpload from 'src/components/FileUpload'
import UPLOAD_FILE_MUTATION from 'src/graphql/mutations/uploadFile'
import { useAuth } from 'src/utils/auth'
import getImageUrl from 'src/utils/getImageUrl'
import { DEFAULT_USER_AVATAR } from 'src/config/constant'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

type Props = {
  editPost?: {
    isEdit: boolean
    id: string
    content: string
  }
  editPostHandler?: (post: { id: string; content: string; isEdit: boolean }) => void
  groupId?: string
  storeId?: string
}

const PostSomething: React.FC<Props> = ({ editPost, editPostHandler, ...props }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [postContent, setPostContent] = useState(editPost.content || '')
  const [postImage, setPostImage] = useState(false)
  const postImageVideo = () => setPostImage(!postImage)
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  })
  const [showEmojis, setShowEmojis] = useState(false)
  const { user } = useAuth()

  const updateUploadedFiles = (files) => setNewUserInfo({ ...newUserInfo, profileImages: files })

  const addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach((el) => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setPostContent(postContent + emoji)
  }

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: (res) => {
      notification['success']({
        message: 'Post created successfully',
        description: 'Your post has been created successfully',
      })
      handleCancel()
      setPostContent('')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const [upload] = useMutation(UPLOAD_FILE_MUTATION, {
    onCompleted: (res) => {
      console.log(`res`, res)
      setNewUserInfo({
        profileImages: [],
      })
      console.log(res)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const [editPostMutation] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      notification['success']({
        message: 'Post updated successfully',
        description: 'Your post has been updated successfully',
      })
      handleCancel()
      setPostContent('')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setShowEmojis(false)
    setPostImage(false)
    editPostHandler({ isEdit: false, content: null, id: null })
  }

  useEffect(() => {
    if (editPost.isEdit) {
      setIsModalVisible(true)
      setPostContent(editPost.content)
    }
  }, [editPost.isEdit])

  const postHandler = async () => {
    if (postContent) {
      if (editPost.isEdit) {
        return editPostMutation({
          variables: {
            id: editPost.id,
            content: postContent,
            group: props?.groupId && props?.groupId,
            store: props?.storeId && props?.storeId,
          },
          refetchQueries: [{ query: MY_FEED_QUERY }],
        })
      }
      if (newUserInfo.profileImages.length === 0) {
        await createPost({
          variables: {
            content: postContent,
            group: props?.groupId && props?.groupId,
            store: props?.storeId && props?.storeId,
          },
          refetchQueries: [{ query: MY_FEED_QUERY }],
        })
      } else {
        const files = await upload({
          variables: { ref: 'Posts', field: 'Attachments', files: newUserInfo.profileImages },
        })

        const fileIds = await files?.data?.multipleUpload?.map((file) => file.id)

        await createPost({
          variables: {
            content: postContent,
            attachments: fileIds,
            group: props?.groupId && props?.groupId,
            store: props?.storeId && props?.storeId,
          },
          refetchQueries: [{ query: MY_FEED_QUERY }],
        })
        // console.log('filesfiles', files)
      }
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="#">Friends</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">Groups</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="bg-white rounded-xl mb-8">
      <div className="px-8 py-2 border-b border-gray-200">
        <p className="text-sm text-black font-medium">Post Something</p>
      </div>
      <div className="px-8 py-4 flex items-center">
        <img
          src={user.profileImage ? getImageUrl(user.profileImage?.url) : DEFAULT_USER_AVATAR}
          alt={user.profileImage?.alternativeText}
          style={{ width: 44, height: 44 }}
          className="rounded-full"
        />

        <div className="ml-8 w-full" onClick={showModal}>
          <input
            type="text"
            placeholder="What’s on your mind?"
            style={{ fontSize: 13, fontWeight: 500 }}
            className="w-full text-sm font-normal"
          />
        </div>
      </div>
      <Modal
        // title="Post Something"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        width={625}
        // wrapClassName="post-something-modal"
        className="p-4 bg-blue rounded-xl"
      >
        <div className="bg-white rounded-xl -m-16">
          <div className="modal-header flex justify-between items-center px-8 py-4">
            <p className="text-sm text-black font-medium">Post Something</p>
            <button onClick={handleCancel}>
              <img src="/assets/img/feed/ic_Close.svg" />
            </button>
          </div>
          <div className="flex p-4 border-t border-gray-100">
            <img
              src={user.profileImage ? getImageUrl(user.profileImage?.url) : DEFAULT_USER_AVATAR}
              style={{ width: 44, height: 44, borderRadius: 20 }}
            />
            <div className="w-full" onClick={showModal}>
              <textarea
                className="border-0 w-full text-sm font-normal h-16 px-8 pt-3"
                placeholder="What’s on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
          </div>

          {postImage ? (
            <div>
              <form className="p-8">
                <FileUpload multiple updateFilesCb={updateUploadedFiles} />
              </form>
            </div>
          ) : null}

          <div className="flex border-t p-8">
            <div className="post-footer-left flex justify-between w-full">
              <div className="flex items-center">
                <button onClick={postImageVideo} className="mr-8">
                  <img src="/assets/img/feed/ic_Image.svg" />
                </button>
                <div className="mr-8" onClick={() => setShowEmojis(!showEmojis)}>
                  <img src="/assets/img/feed/ic_Emoticon.svg" />
                </div>
                <div className="mr-8">
                  <img src="/assets/img/feed/ic_GIF.svg" />
                </div>
                <div>
                  <img src="/assets/img/feed/ic_Polling.svg" />
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-12 text-gray-500 font-normal mr-4">Visible for</p>
                <Dropdown
                  overlay={menu}
                  trigger={['click']}
                  // overlayClassName="rounded-xl border border-gray-100"
                  className="rounded-xl border border-gray-100 px-4 mr-16 flex h-full items-center"
                >
                  <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    Friends
                    <img src="/assets/img/feed/purple-arrow.svg" alt="down arrow" className="pl-4" />
                  </a>
                </Dropdown>
              </div>
            </div>
            <div className="bg-blue rounded-xl flex items-center px-4 " style={{ height: 30 }}>
              <button className="text-12 text-white font-medium w-32" onClick={postHandler}>
                {editPost.isEdit ? 'Edit Post' : 'Share Post'}
              </button>
            </div>
          </div>
          {showEmojis && (
            <div className="p-8">
              <Picker onSelect={addEmoji} set="apple" />
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default PostSomething
