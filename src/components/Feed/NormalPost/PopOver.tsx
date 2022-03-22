import React from 'react'
import Avatar from '../../shared/Avatar'
import { Modal } from 'antd'
const PopOver = ({
  profile,
  profile_back,
  name,
  friends,
  location,
  button1,
  button2,
  buttonHandler1,
  buttonHandler2,
  typeStore,
}) => {
  const shadowstyle = {
    boxShadow: '0px 5px 50px rgba(163, 156, 169, 0.15)',
  }
  return (
    <div className="-m-8 relative" style={shadowstyle}>
      {
        typeStore?
        <div className='grid grid-cols-5 w-300 h-36 rounded-t-xl bg-white'>
          <img src={'../assets/img/instagram/1.jpg'} className="rounded-tl-xl" style={{width:60, height:90}}/>
          <img src={'../assets/img/instagram/2.jpg'} style={{width:60, height:90}}/>
          <img src={'../assets/img/instagram/5.jpg'} style={{width:60, height:90}}/>
          <img src={'../assets/img/instagram/3.jpg'} style={{width:60, height:90}}/>
          <img src={'../assets/img/instagram/4.jpg'} className="rounded-tr-xl" style={{width:60, height:90}}/>
        </div>
        :
        <img src={profile_back} className="rounded-t-xl w-300 h-36 relative z-10" />
      }
      <div className="relative w-300 rounded-b-xl -mt-1" style={{background:'#ECEEF4'}}>
        <div className="absolute left-7 -top-8 z-20 bg-white rounded-full">
          <Avatar radius={44} border={2} avatarlist={[{ id: 1, avatarURL: profile }]} />
        </div>
        <div className='bg-white pb-3'>
          <h5 className="text-sm text-black font-medium text-center mt-1 -ml-32 ">{name}</h5>
          <div className='flex justify-between items-center px-8 -mt-4'>
            <div className='text-12 text-black font-normal'>I’m an awesome woman</div>
            <div>
              <div>
                <button className="rounded-full bg-blue w-28 h-10 text-white text-xs mb-3" onClick={buttonHandler1}>
                  {button1}
                </button>
              </div>
              <div>
                <button className="rounded-full bg-white w-28 h-10 text-blue border-2 border-blue text-xs" onClick={buttonHandler2}>
                  {button2}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-1 px-12 pb-2'>
          <div className="flex justify-between text-base">
            <div className="font-medium text-center">200 {typeStore?'Products':'Following'}</div>
            <div>
              <div className="font-medium text-center">3k Followers</div>            
              <div className='flex'>
                <Avatar
                  avatarlist={[
                    { id: 1, avatarURL: 'https://randomuser.me/api/portraits/women/3.jpg' },
                    { id: 2, avatarURL: 'https://randomuser.me/api/portraits/women/13.jpg' },
                    { id: 3, avatarURL: 'https://randomuser.me/api/portraits/men/23.jpg' },
                    { id: 2, avatarURL: 'https://randomuser.me/api/portraits/men/13.jpg' },
                  ]}
                  radius={20}
                  border={2}
                />
                <div className='rounded-full text-white text-8 -ml-4 pt-1 bg-blue border-2 border-white' style={{width:20, height:20}}>+20</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopOver
