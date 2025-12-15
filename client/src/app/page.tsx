import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import HomePage from './(marketing)/page'
import Navbar from '@/components/cosmik/homepage-navbar'
import HomepageCardSection from '@/components/cosmik/homepage-card-section'



export default async function Home() {
  const res = await fetch(`http://localhost:5000/api/test`, {
    cache: "no-store", // or "force-cache", etc.
  })
  const data = await res.json()
  console.log(data)

  // redirect("/home");

  return (
    <>
      <Navbar/>
      <HomePage></HomePage>
      <HomepageCardSection />
    </>
  )
}