import './Chat.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Chat() {
    let [toggleChatBar, settoggleChatBar] = useState(true);
    let [chatstartted, setchatstartted] = useState(false);
    return (
        <>
            <main className="chatMain">
                <section className='chatSec1'>
                    <div>
                        Site Name
                    </div>
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
                        <p>User Name</p>
                    </div>
                </section>

                <section className='chatSec2'>
                    <div>
                        <div>
                            New Chat
                        </div>
                        <div className='chatActions'>
                            <i className='bi bi-person-fill-add'></i>
                            <i className='bi bi-bell-fill'></i>
                            <i className='bi bi-clock-fill'></i>
                        </div>
                    </div>
                    {chatstartted ? <ChatInterface /> : <StartChatInterface setchatstartted={setchatstartted} />}

                </section>
            </main>
        </>
    )
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
    )
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
    )
}

function StartChatInterface({ setchatstartted }) {
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
                    <div onClick={() => setchatstartted(true)}>
                        <i className='bi bi-chat-text-fill'></i>
                        <h3>Start Text Chat</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ChatInterface() {
    return (
        <div className='chatInterfaceDiv'>
            <div className="chatInterfaceDiv-wrapper">
                <div className='startBtn'>
                    <div>
                        Esc
                    </div>
                    <div>
                        Start
                    </div>
                </div>
                <input type="text" placeholder='Send messages' className='chatInput' />
            </div>
        </div>
    )
}

export default Chat;