import React, { Suspense } from "react"
import Header from "./Header";
import Footer from "./Footer";

const Base = ({ children, summary, socials, generals }) => {
  return <>
    <Header />
    <main className="overflow-hidden min-h-[360px]">
      {children}
    </main>
    <Footer />
  </>
}

export default Base
