import './Footer.css';
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <>
            <div className='footer'>
                <section className='footerSec1'>
                    <div className="footerdivWrapper">
                        <div className='footerSec1Div1'>
                            <h1>Stay in the loop</h1>
                            <p>
                                Join our Discord Server to get updates before anyone else.
                            </p>
                        </div>
                        <div className='footerSec1Div2'>
                            <Link>Join Discord</Link>
                            <Link>Contact Us</Link>
                        </div>
                    </div>
                </section>
                <section className='footerSec2'>
                    <div className='footerLogo'>
                        Site Name
                    </div>
                    <div className="footerLink">
                        <Link>Terms Of Service</Link>
                        <Link>Privacy Policy</Link>
                        <Link>Community Guidelines</Link>
                        <Link>Refund Policy</Link>
                    </div>
                    <div className='footerMedia'>
                        <Link><i className="bi bi-discord"></i></Link>
                        <Link><i className="bi bi-facebook"></i></Link>
                        <Link><i className="bi bi-instagram"></i></Link>
                        <Link><i className="bi bi-whatsapp"></i></Link>
                    </div>
                </section>
                <section className="footerSec3">
                    <div className="copyright">@ All rights reserved. BeFriendsWith LTD.</div>
                </section>
            </div>
        </>
    )
}

export default Footer;