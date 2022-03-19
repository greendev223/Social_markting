import React, { useEffect } from 'react'
import Header from 'src/components/LandingPage/Header'
import Footer from 'src/components/Infomation/footer'
import StartShopping from 'src/components/LandingPage/StartShopping'
import ShoppingNetwork from 'src/components/LandingPage/ShoppingNetwork'
import ShoppingCommunity from 'src/components/LandingPage/ShoppingCommunity'
import JoinCommunity from 'src/components/LandingPage/JoinCommunity'
import { isMobile } from 'react-device-detect'
import { useRouter } from 'next/router'
import { useAuth } from 'src/utils/auth'
export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>

  useEffect(() => {
    if (user) {
      router.replace('/feed')
    }
  }, [user])

  return (
    <>
      {isMobile ? (
        router.push('https://mobile.bluejestic.com')
      ) : (
        <div className="landing-page-main-wrapper relative">
          <Header />
          <StartShopping />
          <ShoppingNetwork />
          <ShoppingCommunity />
          <JoinCommunity />
          <Footer />
        </div>
      )}
    </>
  )
}
