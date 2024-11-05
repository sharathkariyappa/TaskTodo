import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const RegisterForm = () => {
	const inputStyles = 'px-5 py-3.5 rounded-md border border-[#ffffff6b] bg-[#d9d9d94f] placeholder:text-[#ffffffbe] text-[#FFF] outline-0 text-sm w-full'
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const { createUser } = UserAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			await createUser(email, password)
			navigate('/dashboard')
		} catch (e) {
			setError(e.message)
			alert(e.message)
		}
		setLoading(false)
	}
	return (
		<div>
			<form onSubmit={handleSubmit} className="grid gap-6 sm:w-[500px] lg:grid-cols-2">
				<input className={`${inputStyles} lg:col-span-2`} type={'name'} placeholder={'Full name'} required={true} />

				<input
					id="email"
					className={`${inputStyles} lg:col-span-2`}
					type={'email'}
					placeholder={'Email Address'}
					required={true}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					id="password"
					className={`${inputStyles}`}
					type={'password'}
					placeholder={'Password'}
					required={true}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input id="confirm-password" className={`${inputStyles}`} type={'password'} placeholder={'Confirm Password'} required={true} />
				<button
					disabled={loading}
					className="py-3.5 bg-blue-500 text-[#FFF] border border-[#eeeeee33] rounded-md hover:bg-cyan-500 ease-in-out duration-500 lg:col-span-2"
				>
					Create Account
				</button>
			</form>
		</div>
	)
}

export default RegisterForm