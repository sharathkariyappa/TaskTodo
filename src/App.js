import React from 'react'
import Landing from './pages/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './context/ProtectedRoutes'

function App() {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/Login" element={<Login />} />
					<Route path="/Register" element={<Register />} />
					<Route path="/Contact" element={<Contact />} />
					<Route
						path="/Dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
						exact
					/>
				
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>
	)
}

export default App