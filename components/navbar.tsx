"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Circle, LogIn, UserPlus, ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

// Default navigation data
const defaultNavItems = {
  DiseaseAreas: {
    items: [
      { name: "Analytics", description: "Get detailed insights and metrics" },
      { name: "Engagement", description: "Interact with your audience" },
      { name: "Security", description: "Secure your business data" },
      { name: "Integrations", description: "Connect with other tools" }
    ]
  },
  Solutions: {
    items: [
      { name: "For Startups", description: "Scale your startup fast" },
      { name: "For Enterprise", description: "Large scale solutions" },
      { name: "For Business", description: "Mid-sized business tools" },
      { name: "For Creators", description: "Tools for content creators" }
    ]
  },
  Services: {
    items: [
      { name: "Documentation", description: "Guides and references" },
      { name: "Blog", description: "Latest updates and news" },
      { name: "Tutorials", description: "Step by step guides" },
      { name: "Support", description: "Get help from our team" }
    ]
  }
}



const NavLink = ({ href, className, children }: { href?: string, className?: string, children: React.ReactNode }) => {
  return (
    <Link href={href || "#"} className={className}>
      {children}
    </Link>
  )
}
const DropdownItem = ({ item, onClick, className }: { item: { href?: string; name: string; description: string }, onClick?: () => void, className?: string }) => {
  return (
    <NavLink
      href={item.href}
      className={className}
      onClick={onClick}
    >
      <span className="font-medium text-gray-900">{item.name}</span>
      <span className="text-sm text-gray-500">{item.description}</span>
    </NavLink>
  )
}
const Navbar = ({

  navItems = defaultNavItems,
  showAuth = true,
  onSignIn,
  onSignUp,
  className = "",
  brandColor = "blue"
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState("")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? "" : name)
  }

  return (
    <nav className={`relative px-4 py-4 flex justify-between items-center bg-white ${className}`}>
      {/* Logo */}
      <NavLink href="#" className="text-3xl font-bold leading-none flex items-center space-x-4">
      <Image src="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png" alt="Logo" width={120} height={100} />
      </NavLink>
      
      {/* Mobile Menu Button - Now properly aligned to the right */}
      <div className={`lg:hidden ml-auto ${isMenuOpen ? 'hidden' : 'block'}`}>
        <button 
          className={`navbar-burger flex items-center text-${brandColor}-600 p-3`} 
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
        <li>
          <NavLink href="#" className="text-sm text-gray-600 hover:text-gray-700 hover:underline" >
            Home
          </NavLink>
        </li>
        {Object.entries(navItems).map(([key, value], index, arr) => (
          <>
            <li className="text-gray-500">
              <Circle className="w-4 h-4 current-fill" />
            </li>
            <li key={key} className="relative group">
              <button
                className="text-sm text-gray-600 hover:text-gray-700 flex items-center"
                onClick={() => toggleDropdown(key)}
              >
                {key}
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {/* Desktop Dropdown */}
              <div className="absolute top-full left-0 hidden group-hover:block w-80 bg-white shadow-lg rounded-xl p-4 z-50">
                <div className="grid grid-cols-1 gap-4">
                  {value.items.map((item) => (
                    <DropdownItem
                      key={item.name}
                      item={item}
                      className="flex flex-col p-3 hover:bg-gray-50 rounded-lg transition duration-150 ease-in-out" onClick={undefined}                    />
                  ))}
                </div>
              </div>
            </li>
          </>
        ))}
        <li className="text-gray-300">
          <Circle className="w-4 h-4 current-fill" />
        </li>
        <li>
          <NavLink href="https://www.aganitha.ai/company/contact/" className="text-sm text-gray-600 hover:text-gray-700 hover:underline">
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Desktop Auth Buttons */}
      {showAuth && (
        <div className="hidden lg:flex lg:items-center lg:space-x-3">
          <NavLink
            href="https://www.aganitha.ai/solutions/igniva/"
            className={`lg:inline-block py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200`}
            onClick={onSignIn}
          >
            Discover Igniva
          </NavLink>
          <NavLink
            href="https://www.aganitha.ai/company/contact/"
            className={`lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-blacky font-bold rounded-xl transition duration-200`}
            onClick={onSignUp}
          >
            Contact Us
          </NavLink>
        </div>
      )}

      {/* Mobile Navigation */}
      <div 
        className={`navbar-menu fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div 
          className={`navbar-backdrop fixed inset-0 bg-gray-800 opacity-25 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          onClick={toggleMenu}
        ></div>
        <nav className={`fixed top-0 right-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-l overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex items-center mb-8 justify-between">
            <NavLink href="#" className="text-3xl font-bold leading-none" children={undefined}>
              {}
            </NavLink>
            <button className="navbar-close" onClick={toggleMenu}>
              <X className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" />
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <NavLink
                  href="#"
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                >
                  Home
                </NavLink>
              </li>
              {/* Mobile Dropdowns */}
              {Object.entries(navItems).map(([key, value]) => (
                <li key={key} className="mb-1">
                  <button
                    onClick={() => toggleDropdown(key)}
                    className="flex items-center justify-between w-full p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  >
                    {key}
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === key ? 'rotate-90' : ''
                    }`} />
                  </button>
                  {/* Mobile Dropdown Content */}
                  <div className={`pl-4 ${activeDropdown === key ? 'block' : 'hidden'}`}>
                    {value.items.map((item) => (
                      <DropdownItem
                        key={item.name}
                        item={item}
                        className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" onClick={undefined}                      />
                    ))}
                  </div>
                </li>
              ))}
              <li className="mb-1">
                <NavLink
                  href="https://www.aganitha.ai/company/contact/"
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          {showAuth && (
            <div className="mt-auto">
              <div className="pt-6">
                <NavLink
                  href="https://www.aganitha.ai/solutions/igniva/"
                  className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl"
                  onClick={onSignIn}
                >
                  <LogIn className="inline-block mr-2" size={16} />
                  Discover Igniva
                </NavLink>
                <NavLink
                  href="https://www.aganitha.ai/company/contact/"
                  className={`block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold text-blacky bg-blue-500 hover:bg-blue-600 rounded-xl`}
                  onClick={onSignUp}
                >
                  <UserPlus className="inline-block mr-2" size={16} />
                  Contact Us
                </NavLink>
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © 2025, All Rights Reserved</span>
              </p>
            </div>
          )}
        </nav>
      </div>
    </nav>
  )
}
export default Navbar