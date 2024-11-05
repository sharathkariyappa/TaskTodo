import React from 'react'
import LoginForm from '../components/FormLogin'
import Logo from '../assets/HeaderLogo.jpg'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const Login = () => {
	return (
		<div>
			<Navbar />

			<div className="max-w-[1400px] mx-auto my-10 px-6 md:px-2 md:my-36 ">
				<div className="grid place-content-center">
					<div data-aos="fade-in" data-aos-duration="800" data-aos-once="true" className="grid justify-center place-items-center place-self-center">
						<img src={Logo} className="w-[80px] rounded-lg" alt="Company Logo" />
					</div>

					<div data-aos="fade-right" data-aos-duration="800" data-aos-once="true" data-aos-delay="500" className="text-[#FFF] text-center mb-8 mt-8">
						<h1 className="text-3xl md:text-5xl font-black pb-2">Welcome Back!</h1>
						<p className="text-sm leading-loose md:text-base ">Enter your details below to access our dashboard</p>
					</div>

					<div data-aos="fade-in" data-aos-duration="800" data-aos-once="true" data-aos-delay="1200" className="">
						<LoginForm />
						<p className="text-white mt-4 font-light">
							Dont have an account?{' '}
							<Link to="/register">
								<span className="text-[#ffffff] font-medium">Get Started</span>
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
