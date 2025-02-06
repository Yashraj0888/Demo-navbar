"use client"

import Navbar from "@/components/navbar"



export default function SyntheticV0PageForDeployment() {
  return (
    <div  className="bg-gray-400 min-h-screen">
      <Navbar onSignIn={undefined} onSignUp={undefined}/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Demo Navbar</h1>
        <p className="text-lg mb-4">This is a demo of the navbar component.</p>        
      </div>
    </div>
  )
}