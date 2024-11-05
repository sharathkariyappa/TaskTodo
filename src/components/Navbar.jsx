import React, { useState, useEffect, useRef } from 'react'
import TaskLogo from '../assets/HeaderLogo.jpg'
import { Link } from 'react-router-dom'
import { Sling as Hamburger } from 'hamburger-react'

import { UserAuth } from '../context/AuthContext'

const Navbar = () => {
	const { user } = UserAuth()
	const [nav, setNav] = useState(true)
	const [isOpen, setOpen] = useState(false)

	const handlerMobile = () => {
		handleHamburger()
		handleNav()
	}

	const handleHamburger = () => {
		setOpen(!isOpen)
	}

	const handleNav = () => {
		setNav(!nav)
	}

	let menuRef = useRef()

	useEffect(() => {
		let handler = (event) => {
			if (!menuRef.current.contains(event.target)) {
				setOpen(false)
				setNav(true)
			}
		}

		document.addEventListener('mousedown', handler)

		return () => {
			document.removeEventListener('mousedown', handler)
		}
	})

	const myStyling = {
		list: 'p-4 mx-5 cursor-pointer hover:text-[#e6e6e6] ease-in-out duration-150 text-[#FFF]',
		mobileList: 'p-4  hover:animate-pulse font-medium text-xl text-[#FFF]',
	}

	return (
		<div ref={menuRef} className="flex justify-between items-center h-24 max-w-[1400px] mx-auto px-8 text-poppins ">
			{/* Regular Navigation */}
			<Link to="/">
				<img alt="logo" src={TaskLogo} className=" h-12 rounded-xl px-0 bg-gray-600" />
			</Link>
			<ul className="hidden lg:flex">
				<Link to="/">
					<li className={myStyling.list}>Home</li>
				</Link>
				<Link to="/login">
					<li className={!user ? myStyling.list : 'hidden'}>Sign in</li>
				</Link>
				<Link to="/register">
					<li className={!user ? myStyling.list : 'hidden'}>Sign Up</li>
				</Link>
				<Link to="/dashboard">
					<li className={user ? myStyling.list : 'hidden '}>Dashboard</li>
				</Link>
			</ul>

			<ul className="hidden lg:flex">
				
			</ul>

			{/* If nav is TRUE then AiOutlineClose will display else display AiOutlineMenu. This is for the menu button transition */}

			<div className="block lg:hidden">
				{!nav ? <Hamburger color="#FFF" toggled={isOpen} toggle={handlerMobile} /> : <Hamburger color="#FFF" toggled={isOpen} toggle={handlerMobile} />}
			</div>

			{/* Mobile Navigation */}
			<div
				ref={menuRef}
				className={
					!nav
						? 'fixed text-white text-xl left-0 top-0 w-[80%] h-full border-r border-[#ffffff41] bg-[#22375eb7] ease-out duration-500 lg:hidden z-50 backdrop-blur-md flex flex-col drop-shadow-xl'
						: 'fixed left-[-100%] top-0 ease-in duration-500 z-50 h-full w-[80%] flex flex-col text-xl'
				}
			>
				<img alt="logo" src={TaskLogo} className="m-6 pt-2 h-12 animate-pulse self-start" />

				<ul className=" capitalize p-4 ">
					<Link to="/" onClick={handlerMobile}>
						<li className={`${myStyling.mobileList} border-b border-[#ffffff41]`}>Home</li>
					</Link>
					<Link to="/register" onClick={handlerMobile}>
						<li className={!user ? `${myStyling.mobileList} border-b border-[#ffffff41]` : 'hidden'}>Register</li>
					</Link>
					<Link to="/login" onClick={handlerMobile}>
						<li className={!user ? `${myStyling.mobileList} border-b border-[#ffffff41]` : 'hidden'}>Login</li>
					</Link>
					<Link to="/dashboard" onClick={handlerMobile}>
						<li className={user ? `${myStyling.mobileList} border-b border-[#ffffff41]` : 'hidden'}>Dashboard</li>
					</Link>
				</ul>
			</div>
		</div>
	)
}

export default Navbar