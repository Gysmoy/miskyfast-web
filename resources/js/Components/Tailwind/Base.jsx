import React, { Suspense } from "react"
import Header from "./Header";
import Footer from "./Footer";

const Base = ({ children, summary, socials, generals }) => {
  return <main className="min-h-screen bg-white">
    <Header />
    <div className="overflow-hidden">
    {children}
    </div>
    <Footer />
  </main>
}

export default Base
