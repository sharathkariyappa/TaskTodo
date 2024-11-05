import React, { useState, useEffect } from 'react'
import { RiAddFill } from 'react-icons/ri'
import { db } from '../firebase/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { UserAuth } from '../context/AuthContext'
import StatCard from './Statistics'
import { Modal, Button, Group } from '@mantine/core'
import { FaRegTrashAlt } from 'react-icons/fa'
import { BsPencil } from 'react-icons/bs'

const TodoList = () => {
	const [opened, setOpened] = useState(false)
	const [todos, setTodos] = useState([])
	const [inputTitle, setInputTitle] = useState('')
	const [input, setInput] = useState('')
	const [userDate, setDate] = useState(null)
	const [editTitle, loadTitle] = useState('')
	const [editText, loadText] = useState('')
	const [openModal, setOpenModal] = useState('')

	//Function that creates the todo

	const { user } = UserAuth()
	const uid = user.uid
	const userPath = `todos/${uid}/${userDate}`
	const Styling = {
		liComplete: `flex justify-between bg-[#555558] p-4 my-2 capitalize duration-500 ease-in-out`,
		textComplete: `ml-2 cursor-pointer line-through duration-500 ease-in-out`,
	}
	const createTodo = async (e) => {
		e.preventDefault(e)
		if (!input || !inputTitle) {
			alert('Please enter a task')
			return
		} else if (!userDate) {
			alert('Please enter a due date')
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
		<div className="grid gap-4">
			<StatCard title="Active Tasks" value={todos.length || 0} />

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
						<Button onClick={() => setOpened(false)} className=" border border-[#0202035b] duration-500 p-3  text-[#686868] hover:bg-[#00000021] ">
							Cancel
						</Button>

						<button>
							<Button className="bg-[#332e75] border border-[#ffffff25] duration-500 p-3" onClick={() => setOpened(true)}>
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
							<Button className="bg-[#332e75] border border-[#ffffff25] duration-500 p-3">Edit Task</Button>
						</button>
					</div>
				</form>
			</Modal>

			<div className="flex flex-col gap-2 bg-[#1a1a1d] w-full m-auto shadow-xl p-4 rounded-md">
				<div className="flex gap-2 justify-between">
					<div className="flex">
						<h3 data-aos="fade-in" data-aos-delay="400" data-aos-duration="800" className=" text-lg md:text-xl font-light text-left text-[#ffffff] p-2">
							Task Creator
						</h3>
					</div>

					<Group className="outline-none">
						<Button className="bg-[#0202035b] border border-[#ffffff25] duration-500 p-3 outline-none" onClick={() => setOpened(true)}>
							<RiAddFill color="#FFF" />
						</Button>
					</Group>
				</div>
				<div className="w-[30%] max-w-[200px]"></div>

				<ul className="px-1 ">
					{todos.map((todo, index) => (
						<li
							key={index}
							className={todo.completed ? Styling.liComplete : 'flex justify-between bg-[#26252e]  p-4 my-2  duration-500 ease-in-out custom-radius '}
						>
							<div className="flex gap-2">
								<input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''} className="rounded-full" />

								<div onClick={() => toggleComplete(todo)} className={todo.completed ? Styling.textComplete : 'ml-2 cursor-pointer duration-500 ease-in-out'}>
									<h1 className="break-all text-[#ebeaee] font-bold border-[#ffffff38] leading-loose capitalize">{todo.head}</h1>
									<p className="first-letter:capitalize break-all  text-[#ebeaee]">{todo.text}</p>
								</div>
							</div>
							<div className="flex gap-2">
								<button
									onClick={() => {
										setOpenModal(todo)
									}}
									className="cursor-pointer flex items-center duration-500 ease-in-out relative"
								>
									{<BsPencil color="white" />}
								</button>
								<button onClick={() => deleteTodo(todo.id)} className="cursor-pointer flex items-center duration-500 ease-in-out relative">
									{<FaRegTrashAlt color="white" />}
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default TodoList
