import { SetStateAction, useState } from "react"
import { Modal } from 'antd'
import FileUpload from 'src/components/FileUpload'
import { useMutation } from '@apollo/client'
import CREATE_COMMENT_MUTATION from 'src/graphql/mutations/createComment'
import MY_FEED_QUERY from 'src/graphql/queries/getMyFeed'
// import Picker from 'emoji-picker-react';
import InputEmoji from "react-input-emoji";

const InputWithEmoti = (props:any) => {
  const [comment, setComment] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newUserInfo, setNewUserInfo] = useState({ profileImages: [],})

  const updateUploadedFiles = (files: any) => setNewUserInfo({ ...newUserInfo, profileImages: files })

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, { onError: (error) => { console.log(error) }, })

  const commentHandler = () => {
    if (comment.trim().length === 0) return    
    createComment({ variables: { data: { post: props.post.id, comment } }, refetchQueries: [{ query: MY_FEED_QUERY }] })
    setComment('')
  }

  const showModal = () => { setIsModalVisible(true) }
  const handleCancel = () => { setIsModalVisible(false) }

     
  return (
    <>        
      <div className="post-comment relative flex bg-gray-50 rounded-2xl border border-gray-100 w-full ml-4">        
          <InputEmoji placeholder="Write your comment…" value={comment}
            fontSize = {12} borderRadius = {10} height={46} onChange = {setComment}
            onKeyDown={(e: any) => {
              if (e.code === 'Enter') { commentHandler() }
            }}
          />        
            
          <button className="mr-6">
            <img src="/assets/img/feed/ic_Image.svg" onClick={showModal}/>
          </button>          
      </div>
      
      <Modal visible={isModalVisible}
        onCancel={handleCancel} footer={null} closable={false} width={625} className='p-4 bg-blue rounded-xl'
      >
        <div className='bg-white rounded-xl -m-16'>
          <div className='modal-header flex justify-between items-center px-8 py-4'>
            <p className='text-sm text-black font-medium'>Upload Image</p>
            <button onClick={handleCancel}>
              <img src="/assets/img/feed/ic_Close.svg" />
            </button>
          </div>
          
          <div>
            <form className="p-8">
              <FileUpload multiple updateFilesCb={updateUploadedFiles} />
            </form>
          </div>          

          <div className="flex border-t p-8">
            <div className="bg-blue rounded-xl flex items-center px-4 " style={{height:30}}>
              <button className='text-12 text-white font-medium w-32'
                // onClick={postHandler}
              >                
                Post
              </button>
            </div>
          </div>
        </div>
      </Modal>
      
    </>
  )
}
export default InputWithEmoti