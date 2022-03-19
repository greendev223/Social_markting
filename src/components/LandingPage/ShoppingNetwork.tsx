import React from 'react'


const ShoppingNetwork = () => {
  
  return (
    <div className="relative" style={{background: 'linear-gradient(92.44deg, #556EE6 0.13%, #6B21A8 100%)', height:'1300px'}}>
      <img src="/assets/img/landing-page-new/shopping-network/top.png" className="shopping-network-top-image" />
      <div className='flex items-center justify-center text-white absolute left-0 top-0 w-full' style={{height:'100vh'}}>
        <div className="grid grid-cols-2 gap-8" style={{maxWidth:1440, height:'70vh'}}>
          <div className="left-part py-8">
            <div className="-mt-20">
              <div style={{ width: '627px', position: 'relative' }} >
                <img src="/assets/img/landing-page-new/ExpandSocialNetwork.png" />                  
              </div>
            </div>
            <div className="-mt-60 ml-96 pl-20">
              <div className="text-26 font-medium text-left">Expand and strengthen your social network</div>
              <div className="text-sm font-normal pt-3 text-left">Meet new people from around the world, bridging the divide between social media and e-Commerce</div>
              <div className="text-left">
                <button className="bg-blue-500 text-18 font-medium rounded-2xl mt-8 py-2 px-4">Learn More</button>
              </div>
            </div>
          </div>
        
          <div className="right-part relative">
            <div className="relative mt-60 -ml-10 mr-96 pr-20">
              <div className="text-26 font-medium">Shop With Friends</div>
              <div className="text-sm font-normal pt-3 " >Social Commerce platform leveraging e-Commerce with a social media solution to provide you a fun, interactive personalized shopping experience.</div>
              <div>
                <button className="bg-blue-500 text-18 font-medium rounded-2xl mt-12 py-2 px-4" >Learn More</button>
              </div>
            </div>
            <div className="relative right-0 -mt-32 ml-60">
              <img src="/assets/img/landing-page-new/ShoppingWithFriend.png" width={550}/>
            </div>
          </div>
        </div>
      </div>
      <img src="/assets/img/landing-page-new/shopping-network/bottom.png" className="w-full absolute left-0 bottom-0" />
    </div>
  )
}

export default ShoppingNetwork
