import './LogIn.css';
import { Link, useNavigate } from 'react-router-dom';


function Register() {

    const navigate = useNavigate();


    return (
        <main className='logMain'>
            <div className="login">
                <button
                    className="close-btn bi bi-x"
                    onClick={() => navigate(-1)}
                    aria-label="Close"
                ></button>
                <h2>Register</h2>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password" required />
                    </div>
                    <button type="submit" className="login-btn">Register</button>
                </form>
                <p>or</p>
                <Link to={'/login'} className='register'>Log In</Link>
            </div>
        </main>
    )
}

export default Register;