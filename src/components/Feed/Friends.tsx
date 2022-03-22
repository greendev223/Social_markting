import React from 'react'
import FriendsSingle from './FriendsSingle'
import { Col, Divider, Row } from 'antd'
import { useAuth } from 'src/utils/auth'
import getImageUrl from 'src/utils/getImageUrl'

const Friends = ({ title }) => {
  const { user, updateUser } = useAuth()
  return (
    <div className="bg-white rounded-xl px-8 pt-8 pb-2">
      <div className="flex justify-between items-center mb-6">
        <p className="text-base font-medium text-black">{title}</p>
        <p className="text-sm font-medium text-gray-500">All</p>
      </div>

      <input type="text" placeholder="Search" className="bg-gray-200 w-full px-4 py-3 text-12 rounded-xl" />
      <div className="friends-inner-wrapper mt-3">
        {user.friends
          .filter((friend, i) => i <= 3)
          .map((friend) => (
            <Row key={friend.id} className="gutter-row">
              <FriendsSingle
                // img="/assets/img/friends/01.png"
                img={getImageUrl(friend.user.profileImage?.url)}
                // alt={friend.user.profileImage?.alternativeText}
                name={`${friend.user.firstName} ${friend.user.lastName}`}
              />
              <Divider style={{ margin: '10px 0' }} />
            </Row>
          ))}
      </div>
      {/* <div className="friends-inner-wrapper">
        <FriendsSingle img="https://randomuser.me/api/portraits/women/3.jpg" name="Annette Murphy" online={false} />
        <Divider style={{ margin: '10px 0' }} />
        <FriendsSingle img="https://randomuser.me/api/portraits/men/31.jpg" name="Annette Murphy" online={false} />
        <Divider style={{ margin: '10px 0' }} />
        <FriendsSingle img="https://randomuser.me/api/portraits/women/31.jpg" name="Annette Murphy" online={true} />
        <Divider style={{ margin: '10px 0' }} />
        <FriendsSingle img="https://randomuser.me/api/portraits/women/32.jpg" name="Annette Murphy"  online={true}/>
      </div> */}
    </div>
  )
}

export default Friends
