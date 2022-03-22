import React from 'react'
import Link from 'next/link'

const SingleGroup = ({ img, name, followers, id, ...props }) => {
  return (
    <div className="flex my-4">
      <img src={img} style={{ width: 64, height: 44 }} className="rounded-xl" />
      <div className="ml-12">
        <Link href={`/listing/${props?.businessInformation?.name.replace(/ /g, '-') + '-' + id}`}>
          <a>
            <p className="text-sm text-black font-medium hover:text-blue hover:underline">{name}</p>
          </a>
        </Link>
        <p className="text-12 text-gray-500 font-normal">{followers} followers</p>
      </div>
    </div>
  )
}

export default SingleGroup
