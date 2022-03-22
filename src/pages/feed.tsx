import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { useQuery } from '@apollo/client'
import MY_FEED_QUERY from 'src/graphql/queries/getMyFeed'
import PostSomething from 'src/components/Feed/PostSomething'
import NormalPost from 'src/components/Feed/NormalPost'
import HighLights from 'src/components/Feed/Highlights'
import SuggesstedGroups from 'src/components/Feed/SuggestedGroups'
import Friends from 'src/components/Feed/Friends'
import LeftSidebar from 'src/components/shared/LeftSidebar'
import Header from 'src/components/shared/headers/Header'
import ProtectedRoute from 'src/hoc/ProtectedRoute'

const NewFeedPage = () => {
  const { loading, error, data } = useQuery(MY_FEED_QUERY)
  const [editPost, setEditPost] = useState({ isEdit: false, content: null, id: null })

  const editPostHandler = ({ id, content, isEdit }) => {
    setEditPost({ isEdit: isEdit, content, id })
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const {
    myFeed: { feed },
  } = data
  return (
    <div>
      <Header />
      <div className="mx-auto mt-12" style={{ maxWidth: 1300 }}>
        <Row gutter={30}>
          <Col className="mb-12" span={5}>
            <div className="relative w-full h-100">
              <div className="sticky top-40">
                <LeftSidebar />
              </div>
            </div>
          </Col>
          <Col className="mb-12" span={13}>
            <PostSomething editPost={editPost} editPostHandler={editPostHandler} />
            {feed.map((post: any) => (
              <NormalPost key={post.id} post={post} editPostHandler={editPostHandler} />
            ))}
          </Col>
          <Col className="mb-12" span={6}>
            <div className="relative w-full h-100">
              <div className="sticky top-40">
                <HighLights title="Hightlights" />
                <SuggesstedGroups title="Suggessted Stores" />
                <Friends title="Friends" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProtectedRoute(NewFeedPage)
