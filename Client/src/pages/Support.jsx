import './Support.css';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Link } from 'react-router-dom';

function Support() {
    return (
        <>
            <Header />
            <main className='supportMain'>
                <section className="supportSec1">
                    <div>
                        <h1>We're Here to Help</h1>
                        <p>Need assistance? Our support team is ready to help you with any questions or issues you may have.</p>
                    </div>
                </section>

                <section className="supportSec2">
                    <div>
                        <div style={{ backgroundColor: '#2a2963' }}>
                            <i className='bi bi-discord' style={{ color: 'rgba(255, 255, 255, 0.567)' }}></i>
                            <h1 style={{ color: 'rgba(255, 255, 255, 0.567)' }}>Join Our Discord</h1>
                            <p style={{ color: 'rgba(255, 255, 255, 0.567)' }}>Get real-time support and connect with our community on Discord.</p>
                            <Link style={{ backgroundColor: '#5046e5', color: 'white' }}>Join Discord Server</Link>
                        </div>
                        <div style={{ backgroundColor: '#471d67' }}>
                            <i className='bi bi-envelope-fill' style={{ color: 'rgba(255, 255, 255, 0.567)' }}></i>
                            <h1 style={{ color: 'rgba(255, 255, 255, 0.567)' }}>Email Support</h1>
                            <p style={{ color: 'rgba(255, 255, 255, 0.567)' }}>Prefer email? Reach out to our support team directly.</p>
                            <Link style={{ backgroundColor: '#9432ea', color: 'white' }}>Email Us</Link>
                        </div>
                    </div>

                    <div>
                        <h1>Connect With Us</h1>
                        <div>
                            <Link>
                                <i className="bi bi-twitter" style={{ color: '#08a5f4' }}></i>
                            </Link>
                            <Link>
                                <i className="bi bi-tiktok" style={{ color: 'rgb(255, 255, 255)' }}></i>
                            </Link>
                            <Link>
                                <i className="bi bi-instagram" style={{ color: '#bc35b4' }}></i>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Support;