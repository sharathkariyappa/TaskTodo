import React from 'react'
import Landing from './pages/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthContextProvider } from './context/AuthContext'


function App() {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
				
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>
	)
}

export default App