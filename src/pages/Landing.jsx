import React from 'react'
import Button from '../components/Button.jsx'
import Landingpage from '../assets/Landingpage.jpg'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const landing = () => {
	return (
		<div>
			<div className="max-w-[1400px] mx-auto">
				<Navbar />
				<div className="grid md:grid-cols-2 gap-5 py-12 mb-28 px-8">
					<div className="grid gap-5 md:flex md:flex-col md:gap-8 md:mt-10 px-4 justify-center">
						<div data-aos="fade-up-right" data-aos-duration="800" data-aos-once="true" className="flex flex-col gap-5 mx-auto text-center mb-4 md:text-left">
							<h1 className="text-[#ffffff] font-black sm:text-3xl md:text-5xl lg:text-6xl">The Ultimate Planner for Busy Lives</h1>
							<p className=" text-base md:text-md md:w-[90%] text-[#ffffffc6]">
							Our Ultimate Task Tracking Daily Planner not only keeps you organized and focused but also offers features designed to enhance productivity and support you in reaching your goals..{' '}
							</p>
						</div>

						<div data-aos="fade-up-left" data-aos-duration="800" data-aos-once="true" className="mx-auto place-items-center grid md:mx-0 md:place-items-start">
							<Link to="/register">
								<Button />
							</Link>
						</div>
					</div>
					<div data-aos="flip-up" data-aos-duration="800" data-aos-delay="800" data-aos-once="true" className="mx-auto place-items-center justify-center grid ">
						<img src={Landingpage} alt="Illustration" />
					</div>
				</div>
			</div>
			<div className="xl:pt-10">
				<Footer />
			</div>
		</div>
	)
}

export default landing