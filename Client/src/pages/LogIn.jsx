import './LogIn.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    return (
        <main className='logMain'>
            <div className="login">
                <button
                    className="close-btn bi bi-x"
                    onClick={() => navigate(-1)}
                    aria-label="Close"
                ></button>
                <h2>Login</h2>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p>or</p>
                <Link to={'/register'} className='register'>Register</Link>
            </div>
        </main>
    )
}

export default Login;