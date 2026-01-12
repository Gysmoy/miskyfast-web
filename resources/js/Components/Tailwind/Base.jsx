import React, { Suspense } from "react"
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "sonner";

const Base = ({ children, summary, socials, generals, onOpenRestaurantForm, onOpenDriverForm }) => {
  return <main className="min-h-screen bg-white">
    <Header onOpenRestaurantForm={onOpenRestaurantForm} onOpenDriverForm={onOpenDriverForm} />
    <div className="overflow-hidden">
      {children}
    </div>
    <Footer />
    <Toaster />
  </main>
}

export default Base
