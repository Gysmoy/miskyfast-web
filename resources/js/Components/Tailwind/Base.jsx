import React, { Suspense } from "react"
import Header from "./Header";
import Footer from "./Footer";

const Base = ({ children, summary, socials, generals }) => {
  return <main className="min-h-screen bg-white">
    <Header />
    <main className="overflow-hidden min-h-[360px]">
      {children}
    </main>
    <Footer />
  </main>
}

export default Base
