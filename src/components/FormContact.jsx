import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const FormContact = () => {
	const style = {
		input:
			'p-3 bg-[#d9d9d90e] border border-[#ffffff5d] text-[#FFF] text-sm outline-none custom-radius focus:border-[#ffffffb9] duration-500 ease-in-out placeholder:text-white',
		button:
			'py-3 px-2 bg-[#4070B5] hover:bg-[#4070B5] text-white border border-[#fdfdfd50] font-medium custom-radius contact-btn-backdrop max-w-[250px] duration-500',
		form: 'grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 ',
	}

	const [formBox, setForm] = useState(false)

	const handleForm = () => {
		setForm(!formBox)
	}

	const form = useRef()
	const sendEmail = (e) => {
		e.preventDefault()

		emailjs.sendForm('service_ymd197m', 'template_q27e8r9', form.current, 'b911J9F3ZHPXPkbWU').then(
			(result) => {
				console.log('Your message has been sent!')
			},
			(error) => {
				console.log(error.text)
			}
		)

		handleForm()
		alert('Your message has been sent!')
	}

	return (
		<div className="bg-[#26365100] border border-[#ffffff38] custom-radius sm:max-w-[700px] mx-auto">
			<form ref={form} data-aos="fade" data-aos-duration="800" data-aos-delay="600" className={style.form} onSubmit={sendEmail}>
				<input name="name" disabled={formBox} data-aos="fade" className={`${style.input} `} placeholder="Full Name" type="text" required={true} />
				<input name="email" disabled={formBox} data-aos="fade" className={`${style.input}`} placeholder="Email Address" type="email" required={true} />
				<input name="subject" disabled={formBox} data-aos="fade" className={`${style.input} sm:col-span-2`} placeholder="Subject" type="text" required={true} />
				<textarea
					name="message"
					disabled={formBox}
					className={`${style.input} sm:col-span-2 min-h-[200px]`}
					placeholder="Compose your message..."
					type="text"
					required={true}
				/>
				<button disabled={formBox} data-aos="fade-right" data-aos-once={true} data-aos-duration="1000" data-aos-delay="1200" className={`${style.button} `}>
					{formBox ? 'Message Sent' : 'Send Message'}
				</button>
			</form>
		</div>
	)
}

export default FormContact
