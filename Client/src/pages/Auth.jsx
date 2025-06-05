import './Auth.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Auth() {
    const navigate = useNavigate();
    const [inLogin, setinLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        console.log('Email:', email);
        console.log('Password:', password);
    }

    return (
        <main className='authMain'>
            <section className='parent'>
                <section className='content'>
                    <h1>WelCome</h1>
                    <p>Fill the detail to get started with best Chat App</p>
                    <section className='authSec1'>
                        <div className={inLogin ? 'active' : ''} onClick={() => {
                            setinLogin(true)
                        }}>Log In</div>
                        <div className={!inLogin ? 'active' : ''} onClick={() => {
                            setinLogin(false)
                        }}>Register</div>
                    </section>
                    <form className="authSec2" onSubmit={handleSubmit}>
                        {inLogin ? <LogIn email={email} password={password} setEmail={setEmail} setPassword={setPassword} /> : <Register email={email} password={password} setEmail={setEmail} setPassword={setPassword} />}
                    </form>
                </section>

                <section className='authImg'>
                    <img src="/images/Login_page_img.png" alt="loginimg" width={400} />
                </section>
            </section>
        </main >
    )
}

function LogIn({ email, password, setEmail, setPassword }) {
    return (
        <>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='loginBtn' type='submit'>Login</button>
        </>
    )
}

function Register({ email, password, setEmail, setPassword }) {
    return (
        <>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' />
            <input type="password" placeholder='conform Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='loginBtn' type='submit'>Login</button>
        </>
    )
}

export default Auth;