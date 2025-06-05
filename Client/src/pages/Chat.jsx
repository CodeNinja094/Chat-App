import './Chat.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chat() {
    const [toggleChatBar, settoggleChatBar] = useState(true);
    const [chatStarted, setChatStarted] = useState(false);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [userId, setUserId] = useState('');
    const [partnerId, setPartnerId] = useState('');
    const [inRoom, setInRoom] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [waiting, setWaiting] = useState(false);

    // Get socket id on connect
    useEffect(() => {
        const handleConnect = () => setUserId(socket.id);
        socket.on("connect", handleConnect);
        if (socket.connected) handleConnect();
        return () => socket.off("connect", handleConnect);
    }, []);

    // Handle room join and waiting
    useEffect(() => {
        const handleRoomJoined = (msg, { roomId, partnerId }) => {
            setRoomId(roomId);
            setPartnerId(partnerId);
            setInRoom(true);
            setWaiting(false);
            setChat([{ message: msg, self: false, system: true }]);
        };
        const handleWaiting = (msg) => {
            setPartnerId('');
            setInRoom(false);
            setWaiting(true);
            setChat([{ message: msg, self: false, system: true }]);
        };
        socket.on('room_joined', handleRoomJoined);
        socket.on('waiting', handleWaiting);
        return () => {
            socket.off('room_joined', handleRoomJoined);
            socket.off('waiting', handleWaiting);
        };
    }, []);

    // Handle partner leaving
    useEffect(() => {
        const handleUserLeft = ({ userId }) => {
            setInRoom(false);
            setPartnerId('');
            setChat(prev => [...prev, { message: "Partner left the chat. Press Esc or Start for a new chat", self: false, system: true }]);
            // Also leave the room if still in it
            if (roomId) {
                socket.emit("leave_room", { roomId });
                setRoomId('')
            }
        };
        socket.on("user_left", handleUserLeft);
        return () => socket.off("user_left", handleUserLeft);
    }, [setInRoom, setPartnerId, setChat, roomId]);

    return (
        <main className="chatMain">
            <section className='chatSec1'>
                <div>Site Name</div>
                <div>
                    <div className={`chatsLink ${toggleChatBar ? ' active' : ''}`} onClick={() => settoggleChatBar(true)}>
                        <i className='bi bi-envelope-fill'></i>
                        <p>Chat</p>
                    </div>
                    <div className={`chatsLink${!toggleChatBar ? ' active' : ''}`} onClick={() => settoggleChatBar(false)}>
                        <i className='bi bi-people-fill'></i>
                        <p>Friends</p>
                    </div>
                </div>
                {toggleChatBar ? <Chats /> : <Friends />}
                <div className="accountInfo">
                    <i className='bi bi-person-fill'></i>
                    <p>{userId ? userId : "Connecting..."}</p>
                </div>
            </section>

            <section className='chatSec2'>
                <div>
                    <div>
                        {partnerId ? partnerId : inRoom ? "Waiting for partner..." : "Not in chat"}
                    </div>
                    <div className='chatActions'>
                        <i className='bi bi-person-fill-add'></i>
                        <i className='bi bi-bell-fill'></i>
                        <i className='bi bi-clock-fill'></i>
                    </div>
                </div>

                <div className="chatDisplay">
                    {chat.map((msg, index) => (
                        <div className={`${msg.self ? 'chatBar mymsg' : msg.system ? 'systemmsg' : 'chatBar'}`} key={index}>
                            <span>{msg.message}</span>
                        </div>
                    ))}
                </div>

                {chatStarted
                    ? <ChatInterface
                        message={message}
                        setMessage={setMessage}
                        setChat={setChat}
                        roomId={roomId}
                        inRoom={inRoom}
                        setPartnerId={setPartnerId}
                        waiting={waiting}
                        setWaiting={setWaiting}
                        setRoomId={setRoomId}
                    />
                    : <StartChatInterface setChatStarted={setChatStarted} waiting={waiting} />}
            </section>
        </main>
    );
}

function Chats() {
    return (
        <>
            <div className="currentChat">
                <i className='bi bi-chat-text-fill'></i>
                <p>New Chat</p>
            </div>
            <div className="directMsg">
                <p className='lined-text'>DIRECT MESSAGES</p>
                <div className='directMsgIcon'>
                    <i className='bi bi-mailbox2-flag'></i>
                </div>
                <p>Looks like you are popular one here. no messages yet.</p>
            </div>
        </>
    );
}

function Friends() {
    return (
        <>
            <div className="searchFrnd">
                <input type="text" placeholder='Search Friends' />
                <i className='bi bi-search'></i>
            </div>
            <div className="frindSec">
                <p>Looks like you don't have any friends right now.</p>
            </div>
        </>
    );
}

function StartChatInterface({ setChatStarted, waiting }) {
    return (
        <div className='interface'>
            <div className='interfaceDiv1'>
                <img src="/images/chaticon.jpg" alt="chatlogo" height={70} />
                <h1>Site Name</h1>
                <div>
                    <Link><i className="bi bi-twitter-x"></i></Link>
                    <Link><i className="bi bi-twitter-x"></i></Link>
                    <Link><i className="bi bi-twitter-x"></i></Link>
                </div>
            </div>
            <div className='interfaceDiv2'>
                <h3>Gender Filter</h3>
                <div>
                    <div>Male</div>
                    <div>Both</div>
                    <div>Female</div>
                </div>
                <div>
                    <div>
                        <i className="bi bi-camera-reels-fill"></i>
                    </div>
                    <div onClick={() => {
                        setChatStarted(true);
                        socket.emit('join_request');
                    }}>
                        <i className='bi bi-chat-text-fill'></i>
                        <h3>Start Text Chat</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChatInterface({ message, setMessage, setChat, roomId, inRoom, setPartnerId, waiting, setWaiting, setRoomId }) {
    // Send message to server and update local chat
    const sendMessage = () => {
        if (!roomId) {
            alert('No chat partner!');
            return;
        }
        if (!message.trim()) return;
        socket.emit('send_message', { roomId, message });
        setChat(prev => [...prev, { message, self: true }]);
        setMessage('');
    };

    // Listen for incoming messages
    useEffect(() => {
        const handleReceive = (data) => {
            setChat(prev => [...prev, { message: data.message, self: false }]);
        };
        socket.on('receive_message', handleReceive);
        return () => socket.off('receive_message', handleReceive);
    }, [setChat]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") sendMessage();
    };

    return (
        <div className='chatInterfaceDiv'>
            <div className="chatInterfaceDiv-wrapper">
                {waiting ? <div className='waitBtn'>Waiting</div>
                    :
                    <div className='startBtn'>
                        {inRoom ?
                            <>
                                <div>Esc</div>
                                <div onClick={() => {
                                    socket.emit("leave_room", { roomId });
                                    setPartnerId('');
                                    setRoomId('');
                                    setChat([]);
                                    socket.emit("join_request");
                                }}>Skip</div>
                            </>
                            :
                            <>
                                <div>Esc</div>
                                <div onClick={() => {
                                    socket.emit("join_request");
                                    setWaiting(true);
                                }}>Start</div>
                            </>
                        }
                    </div>}

                <input
                    type="text"
                    placeholder='Send messages'
                    className='chatInput'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

export default Chat;