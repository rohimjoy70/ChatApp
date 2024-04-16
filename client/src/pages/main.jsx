import { useNavigate } from "react-router-dom";
import socket from "../../sandbox";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export function Main() {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const { logout } = useAuth();

	function handleLogout() {
		logout();
		navigate("/login");
	}

	const handleSend = (el) => {
		el.preventDefault();
		console.log({ message });

		if (!message) return null;
		socket.emit("chat:new-chat", message);

		setMessages((currentMessage) => {
			return currentMessage.concat({
				sender: localStorage.username,
				message,
			});
		});
		setMessage("");
	};

	useEffect(() => {
		socket.connect();
		// console.log(localStorage.username, "<<<<<");
	}, []);

	useEffect(() => {
		socket.on("message", (msg) => {
			console.log(msg);
		});

		socket.on("User: Online", (onlineUser) => {
			setUsers(onlineUser);
			// console.log(onlineUser, "<<<<")
		});

		socket.on("chat:update", (newMessage) => {
			// console.log(newMessage, '<<<')
			setMessages((currentMessage) => {
				return currentMessage.concat(newMessage);
			});
		});

		return () => {
			socket.off("message");
			socket.off("chat:update");
			socket.off("User: Online");
			socket.disconnect();
		};
	}, [socket]);

	return (
		<div className="flex min-h-screen flex-row bg-gray-300">
			<div className="flex-row mx-auto my-auto container">
				<div className="flex-none mt-6 bg-white opacity-90 shadow-lg rounded-t-xl">
					<div className="flex justify-center">
						<div className="font-bold text-gray-900 text-3xl p-5">Chat App</div>
					</div>
				</div>

				<div className="flex-none bg-red-500 opacity-90 text-center py-3 text-white font-bold shadow-lg">
					<div>
						You are connected to:{" "}
						{users
							.filter((u) => {
								return u.username !== localStorage.username;
							})
							.map((u) => {
								return u.username;
							})}{["", ""]}
					</div>
				</div>
				<div className="flex-none overflow-y-scroll h-96 bg-chat opacity-90 flex flex-col font-semibold shadow-lg">
					{messages.map((m, i) => {
						return m.sender === localStorage.username ? (
							<div key={i} className="mt-2 flex justify-end">
								<p className="bg-green-300 p-3 flex items-center justify-end rounded-l-lg rounded-tr-lg mx-3">
									{m.message}
								</p>
							</div>
						) : (
							<div>
								<div className="mt-2 flex justify-start text-white mx-3 bottom-0">
									{m.sender}
								</div>
								<div key={i} className="mt-2 flex justify-start">
									<p className="bg-yellow-300 h-auto w-auto rounded-r-lg rounded-tl-lg p-3 flex items-center mx-3">
										{m.message}
									</p>
								</div>
							</div>
						);
					})}
					{/* dont delete below */}
					<div className="mt-2 flex justify-end invisible"></div>
				</div>
				<div className="flex-none h-14 shadow-lg">
					<form
						action=""
						onSubmit={handleSend}
						className="w-full h-full justify-end flex bg-slate-600"
					>
						<input
							type="text"
							className="h-auto appearance-none border border-gray-500 w-full py-2 px-5 focus:outline-none focus:bg-white focus:border-gray-600"
							onChange={(event) => {
								setMessage(event.target.value);
							}}
							value={message}
							placeholder="Enter your message..."
						/>
						<button
							className="w-20 bg-blue-500 text-white hover:bg-blue-700 font-semibold text-center"
							type="submit"
						>
							Send
						</button>
					</form>
				</div>
				<div className="flex-none bg-white shadow-lg opacity-90 rounded-b-xl flex justify-center">
					<button
						className="border text-gray-900 hover:bg-gray-300  font-bold p-3 m-3 text-xl"
						onClick={handleLogout}
					>
						Leave Chat
					</button>
				</div>
			</div>
		</div>
	);
}
