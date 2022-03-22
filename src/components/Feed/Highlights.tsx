import React, { useState } from 'react'
import Slider from 'react-slick'

let settings0 = {
  autoplay: false,
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplaySpeed: 500,
}
let settings1 = {
  autoplay: true,
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplaySpeed: 2000,
}

const HighLights = ({ title }) => {
  const [isAuto, isSetAuto] = useState(true)
  const changeAuto = (value: boolean) => {
    isSetAuto(value)
    // console.log(isAuto)
  }

  return (
    <div className="relative mb-8">
      <div className="w-full h-40">
        <img src="../assets/img/feed/highlight.png" className="h-40 rounded-xl" />
      </div>
      <div
        className="w-full px-8 py-2 absolute left-0 top-0 z-20"
        // onMouseEnter={()=>changeAuto(true)}
        // onMouseLeave={()=>changeAuto(false)}
      >
        <div className="flex justify-between items-center mb-3 ">
          <p className="text-white text-sm font-medium ">{title}</p>
          <p className="text-white text-sm font-medium ">All</p>
        </div>
        <div style={{ display: isAuto ? 'block' : 'none' }}>
          <Slider {...settings1}>
            <div style={{ width: '46px !important', height: 46 }}>
              <div
                className="rounded-full bg-gradient-to-b from-purple-500 to-gray-300"
                style={{ width: 46, height: 46, padding: '2px' }}
              >
                <div
                  className="rounded-full text-center text-xl font-medium pt-2 bg-white text-black"
                  style={{ width: 42, height: 42 }}
                >
                  +
                </div>
              </div>
            </div>

            <div style={{ width: '46px !important', height: 46 }}>
              <div
                className="rounded-full bg-gradient-to-b from-purple-500 to-gray-300"
                style={{ width: 46, height: 46, padding: '2px' }}
              >
                <img
                  src="https://randomuser.me/api/portraits/women/10.jpg"
                  className="rounded-full"
                  style={{ width: 42, height: 42 }}
                />
              </div>
            </div>

            <div style={{ width: '46px !important', height: 46 }}>
              <div
                className="rounded-full bg-gradient-to-b from-purple-500 to-gray-300"
                style={{ width: 46, height: 46, padding: '2px' }}
              >
                <img
                  src="https://randomuser.me/api/portraits/women/11.jpg"
                  className="rounded-full"
                  style={{ width: 42, height: 42 }}
                />
              </div>
            </div>

            <div style={{ width: '46px !important', height: 46 }}>
              <div
                className="rounded-full bg-gradient-to-b from-purple-500 to-gray-300"
                style={{ width: 46, height: 46, padding: '2px' }}
              >
                <img
                  src="https://randomuser.me/api/portraits/men/10.jpg"
                  className="rounded-full"
                  style={{ width: 42, height: 42 }}
                />
              </div>
            </div>

            <div style={{ width: '46px !important', height: 46 }}>
              <div
                className="rounded-full bg-gradient-to-b from-purple-500 to-gray-300"
                style={{ width: 46, height: 46, padding: '2px' }}
              >
                <img
                  src="https://randomuser.me/api/portraits/women/12.jpg"
                  className="rounded-full"
                  style={{ width: 42, height: 42 }}
                />
              </div>
            </div>

            <div style={{ width: '46px !important', height: 46 }}>
              <div
                className="rounded-full bg-gradient-to-b from-purple-500 to-gray-300"
                style={{ width: 46, height: 46, padding: '2px' }}
              >
                <img
                  src="https://randomuser.me/api/portraits/women/13.jpg"
                  className="rounded-full"
                  style={{ width: 42, height: 42 }}
                />
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default HighLights
