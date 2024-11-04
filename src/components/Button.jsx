import React from 'react'

const Button = (props) => {
	return (
		<button
			className={`${
				props.color || ' bg-[#2862ac]'
			} hover:bg-[#4070B5] px-10 py-3 rounded-md contact-btn-backdrop custom-radius border border-[#ffffff2b] text-[#f7f6f6] font-medium tracking-wide duration-150`}
		>
			Get Started
		</button>
	)
}

export default Button