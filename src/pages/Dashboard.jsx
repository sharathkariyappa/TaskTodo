import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { AppShell, Header, Text, MediaQuery, Burger, useMantineTheme } from '@mantine/core'
import { Modal, Button, Group } from '@mantine/core'
import { ThemeIcon } from '@mantine/core'
import { Navbar } from '@mantine/core'

import { db } from '../firebase/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { UserAuth } from '../context/AuthContext'

import StatCard from '../components/Statistics'
import Logo from '../assets/HeaderLogo.jpg'
import { RiAddFill } from 'react-icons/ri'
import { IoExitOutline } from 'react-icons/io5'
import { AiOutlineHome, AiOutlineMail, AiOutlineRocket } from 'react-icons/ai'
import { RiBubbleChartLine } from 'react-icons/ri'
import { FaRegTrashAlt } from 'react-icons/fa'
import { BsPencil } from 'react-icons/bs'

const Dashboard = (props) => {
	const theme = useMantineTheme()
	const [opened2, setopened2] = useState(false)
	const [opened, setOpened] = useState(false)
	const [todos, setTodos] = useState([])
	const [inputTitle, setInputTitle] = useState('')
	const [input, setInput] = useState('')

	const [editTitle, loadTitle] = useState('')
	const [editText, loadText] = useState('')
	const [openModal, setOpenModal] = useState('')

	//Function that creates the todo

	const { user, logout } = UserAuth()
	const uid = user.uid

	const Styling = {
		liComplete: `flex justify-between bg-[#555558] p-4 my-2 capitalize duration-500 ease-in-out`,
		textComplete: `ml-2 cursor-pointer line-through duration-500 ease-in-out`,
		dashList: 'flex gap-3 text-[#000]  align-center place-items-center duration-500 p-2 hover:bg-[#00000021] rounded-md',
	}

	const createTodo = async (e) => {
		e.preventDefault(e)
		if (!input || !inputTitle) {
			alert('Please enter a task')
			return
		}

		await addDoc(collection(db, `${uid}`), {
			head: inputTitle,
			text: input,
			completed: false,
			editted: false,
		})
		setInputTitle('')
		setInput('')
	}

	const handleLogout = async () => {
		try {
			await logout()
			navigate('/')
			console.log('You are logged out')
		} catch (e) {
			console.log(e.message)
		}
	}
	const navigate = useNavigate()

	//useEffect case that allows us to read the todos from the firebase database

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			const path = query(collection(db, `${currentUser.uid}`))
			onSnapshot(path, (QuerySnapshot) => {
				let todosArr = []
				QuerySnapshot.forEach((doc) => {
					todosArr.push({ ...doc.data(), id: doc.id })
				})
				setTodos(todosArr)
			})
		})
	}, [])

	//Update todo in firebase
	const toggleComplete = async (todo) => {
		await updateDoc(doc(db, `${uid}`, todo.id), {
			completed: !todo.completed,
		})
	}

	//Update todo in firebase
	const updateTodo = async (e) => {
		e.preventDefault()

		await updateDoc(doc(db, `${uid}`, openModal.id), {
			head: editTitle,
			text: editText,
			editted: true,
		})
		console.log(openModal)

		loadText('')
		loadTitle('')
		setOpenModal(false)
	}

	// Delete todo from firebase
	const deleteTodo = async (id) => {
		await deleteDoc(doc(db, uid, id))
	}

	return (
		<div className="bg-[#5c5e61] h-screen">
			{' '}
			<AppShell
				styles={{
					main: {
						background: '#FAFAFA',
					},
				}}
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				navbar={
					<Navbar
						data-aos="fade-up-right"
						data-aos-duration="500"
						className="bg-[#FBFEFF] border-r border-[#E4E4E4]"
						p="md"
						hiddenBreakpoint="sm"
						hidden={!opened2}
						width={{ sm: 200, lg: 300 }}
					>
						<Navbar.Section className="flex gap-5 place-items-center border-b pb-3 p-2 border-[#ffffff18]">
							<img src={Logo} alt="Logo" className="h-5 rounded-md" />
							<h1 className="text-[#000000] text-xl font-medium">Task</h1>
						</Navbar.Section>
						<Navbar.Section grow mt="md">
							<ul className="grid gap-4">
								<Link to="/dashboard">
									<li className={`${Styling.dashList} bg-[#0000000f]`}>
										{' '}
										<ThemeIcon size="md" variant="gradient" color="#000000">
											<AiOutlineRocket size={15} />
										</ThemeIcon>
										<p className="font-medium">Dashboard</p>
									</li>
								</Link>
								<Link to="/">
									<li className={Styling.dashList}>
										{' '}
										<ThemeIcon size="md" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
											<AiOutlineHome size={15} />
										</ThemeIcon>
										<p>Home</p>
									</li>
								</Link>
								<Link to="/about">
									<li className={Styling.dashList}>
										{' '}
										<ThemeIcon size="md" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
											<RiBubbleChartLine size={15} />
										</ThemeIcon>
										<p>About</p>
									</li>
								</Link>
								<Link to="/contact">
									<li className={Styling.dashList}>
										{' '}
										<ThemeIcon size="md" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
											<AiOutlineMail size={15} />
										</ThemeIcon>
										<p>Contact Us</p>
									</li>
								</Link>
							</ul>
						</Navbar.Section>
						<Navbar.Section>
							<ul className="border-t pt-3 border-[#0000001f]">
								<li className="flex gap-3 place-items-center hover:bg-[#ffffff18] rounded-md p-2 duration-200 ease-in-out">
									{' '}
									<ThemeIcon size="md" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
										<IoExitOutline size={15} />
									</ThemeIcon>
									<p onClick={handleLogout} className=" text-md font-medium break-all hover:cursor-pointer">
										Logout
									</p>
								</li>
							</ul>
						</Navbar.Section>
					</Navbar>
				}
				header={
					<Header data-aos="fade-left" data-aos-duration="300" className="bg-[#FBFEFF] border-b border-[#E4E4E4]" height={70} p="md">
						<div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
							<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
								<Burger opened={opened2} onClick={() => setopened2((o) => !o)} size="sm" color={theme.colors.gray[6]} mr="xl" />
							</MediaQuery>

							<Text className="text-[#000] md:text-2xl">Dashboard</Text>
						</div>
					</Header>
				}
			>
				<div className="grid gap-4">
					<div data-aos="fade" data-aos-duration="500">
						<StatCard title="Active Tasks" value={todos.length || 0} />
					</div>

					<Modal size={700} opened={opened} centered={true} onClose={() => setOpened(false)} title="Create your task">
						<form onSubmit={createTodo} className="flex flex-col justify-between p-1">
							<input
								value={inputTitle}
								onChange={(e) => setInputTitle(e.target.value)}
								className="placeholder:text-[#00000093] outline-none border-b p-1"
								type="text"
								placeholder="Enter Task Name"
								required={true}
							/>

							<textarea
								value={input}
								onChange={(e) => setInput(e.target.value)}
								className="placeholder:text-[#00000093] outline-none p-1 text-sm pt-3 min-h-[200px]"
								type="text"
								placeholder="Description"
								required={true}
							/>

							<div className="flex gap-2">
								<Button onClick={() => setOpened(false)} className=" border border-[#0202035b] duration-500 p-3  text-[#686868]  hover:bg-[#00000028] ">
									Cancel
								</Button>
								<button>
									<Button className="bg-[#186ABD] border border-[#ffffff25] duration-500 p-3" onClick={() => setOpened(false)}>
										Add Task
									</Button>
								</button>
							</div>
						</form>
					</Modal>

					{/* update modal */}
					<Modal size={700} opened={openModal ? true : false} centered={true} onClose={() => setOpenModal(false)} title="Edit Your Task">
						<form onSubmit={updateTodo} className="flex flex-col justify-between p-1">
							<input
								value={editTitle}
								onChange={(e) => loadTitle(e.target.value)}
								className="placeholder:text-[#00000093] outline-none border-b p-1"
								type="text"
								placeholder="Enter Task Name"
								required={true}
							/>

							<textarea
								value={editText}
								onChange={(e) => loadText(e.target.value)}
								className="placeholder:text-[#00000093] outline-none p-1 text-sm pt-3 min-h-[200px]"
								type="text"
								placeholder="Description"
								required={true}
							/>
							<div className="flex gap-2">
								<Button onClick={() => setOpenModal(false)} className=" border border-[#0202035b] duration-500 p-3  text-[#686868] hover:bg-[#00000021] ">
									Cancel
								</Button>

								<button>
									<Button className="bg-[#332e75] border border-[#ffffffbe] duration-500 p-3">Edit Task</Button>
								</button>
							</div>
						</form>
					</Modal>

					<div data-aos="fade" data-aos-duration="500" className="flex flex-col gap-2 bg-[#FBFEFF] w-full m-auto shadow-xl p-4 rounded-md">
						<div className="flex gap-2 justify-between">
							<div className="flex">
								<h3 data-aos="fade-in" data-aos-delay="400" data-aos-duration="800" className=" text-lg md:text-xl font-light text-left text-[#ffffff] p-2">
									Task Creator
								</h3>
							</div>

							<Group className="outline-none">
								<Button className="bg-[#5b95f9] border border-[#ffffffbe] duration-500 p-3 outline-none" onClick={() => setOpened(true)}>
									<RiAddFill color="#FFF" />
								</Button>
							</Group>
						</div>
						<div className="w-[30%] max-w-[200px]"></div>

						<ul className="px-1 ">
							{todos.map((todo, index) => (
								<li
									key={index}
									className={todo.completed ? Styling.liComplete : 'flex justify-between bg-[#f0f0f1]  p-4 my-2  duration-500 ease-in-out custom-radius '}
								>
									<div className="flex gap-2">
										<input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''} className="rounded-full" />

										<div
											onClick={() => toggleComplete(todo)}
											className={todo.completed ? Styling.textComplete : 'ml-2 cursor-pointer duration-500 ease-in-out'}
										>
											<h1 className="break-all text-[#0c0c0c] font-bold border-[#ffffff38] leading-loose capitalize">{todo.head}</h1>
											<p className="first-letter:capitalize break-all  text-[#1b1b1b]">{todo.text}</p>
										</div>
									</div>
									<div className="flex gap-2">
										<button
											onClick={() => {
												setOpenModal(todo)
											}}
											className="cursor-pointer flex items-center duration-500 ease-in-out relative"
										>
											{<BsPencil color="black" />}
										</button>
										<button onClick={() => deleteTodo(todo.id)} className="cursor-pointer flex items-center duration-500 ease-in-out relative">
											{<FaRegTrashAlt color="black" />}
										</button>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</AppShell>
		</div>
	)
}

export default Dashboard
