import React from 'react'
import Landing from './pages/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Login from './pages/Login'
// import About from './pages/About'
// import Register from './pages/Register'
// import Contact from './pages/Contact'
// import Dashboard from './pages/Dashboard'
import { AuthContextProvider } from './context/AuthContext'
// import ProtectedRoute from './context/ProtectedRoutes'

function App() {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
					{/* <Route path="/login" element={<Login />} /> */}
					{/* <Route path="/about" element={<About />} /> */}
					{/* <Route path="/register" element={<Register />} /> */}
					{/* <Route path="/contact" element={<Contact />} /> */}

					{/* <Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
						exact
					/> */}
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>
	)
}

export default App