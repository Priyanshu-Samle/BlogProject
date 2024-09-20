import { Outlet } from "react-router-dom"
import Navbar from "../components/Home"
import Footer from "../components/Footer/Footer"
import { Suspense } from "react"
export function MainLayout() {

  return <>

    <Navbar />

    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>

    <Footer />

  </>
}