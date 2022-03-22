import React from 'react'
import Link from 'next/link'

const FriendsSingle = (props:any) => {
  return (
    <div className="flex items-center my-1">
      <div className='relative'>
        <img src={props.img} className='rounded-full' style={{width:32, height:32}}/>
        {
          props.online
          ?
          <div className='rounded-full absolute top-0 -right-1' style={{backgroundColor:'#8CCB49', width:12, height:12}}></div>
          :
          <></>
        }
      </div>

      <div className="ml-8 text-sm text-black font-medium hover:text-blue">
        <Link href={'#'}>
          <a className='hover:text-blue hover:underline'>
            {props.name}
          </a>
        </Link>
      </div>
    </div>
  )
}

export default FriendsSingle
