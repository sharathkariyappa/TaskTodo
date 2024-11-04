import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const LoginForm = () => {
	const inputStyles = 'px-5 py-3.5 rounded-md border border-[#ffffff6b] bg-[#d9d9d94f] placeholder:text-[#ffffffbe] text-[#FFF] outline-0 text-sm'
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { signIn } = UserAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		try {
			await signIn(email, password)
			navigate('/dashboard')
			return
		} catch (e) {
			setError(e.message)
			alert(e.message)
			return
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="grid gap-6 sm:w-[500px] md:w-[600px] ">
				<input className={`${inputStyles}`} type={'email'} placeholder={'Email Address'} required={true} onChange={(e) => setEmail(e.target.value)} />
				<input className={`${inputStyles}`} type={'password'} placeholder={'Password'} required={true} onChange={(e) => setPassword(e.target.value)} />

				<button className="py-3.5 bg-blue-500 text-[#ffffff] border border-[#eeeeee33] rounded-md hover:bg-cyan-500 ease-in-out duration-500 ">Continue</button>
			</form>
		</div>
	)
}

export default LoginForm