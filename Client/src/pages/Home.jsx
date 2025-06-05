import './Home.css';
import React, { useRef, useEffect, useState } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Link } from 'react-router-dom';
import { Data1, Data2, Comments } from '../Data/data';

function Home() {
    const duplicatedCards = [...Comments, ...Comments, ...Comments];

    return (
        <>
            <Header />
            <main className='home'>
                <section className='section1'>
                    <div className='textContent'>
                        <h1>Talk to strangers,<br />
                            Make friends!</h1>
                        <p>Experience a random chat alternative to find <br />friends, connect with people, and chat <br />with strangers from all over the world!</p>

                        <div className="chatBtn">
                            <Link to={'/auth'}><i className="bi bi-chat-left-heart"></i>Text Chat</Link>
                            <Link to={'/blog'}> <i class="bi bi-camera-reels"></i>Video Chat</Link>
                        </div>
                    </div>
                    <div className='homeImg'>
                        <img src="/images/homeimg1.webp" alt="chat img" />
                        <div>
                            <img src="/images/notification1.svg" alt="n1" className="notification" width={200} />
                            <img src="/images/notification2.webp" alt="n2" className="notification" width={200} />
                            <img src="/images/notification3.webp" alt="n3" className="notification" width={200} />
                            <img src="/images/notification4.webp" alt="n4" className="notification" width={200} />
                        </div>
                    </div>
                </section>

                <section className='section2'>
                    <div className="sec2Div1">
                        <div>Reach people like you</div>
                        <h1>Anonymous Chat, Meet new people</h1>
                        <p>Find strangers worldwide, the new modern Omegle and OmeTV <br /> alternative. Connect with real people, enjoy ad free text and video chats, <br /> and build genuine friendships.</p>
                    </div>

                    {Data1.map((data, id) => {
                        return (
                            <Comp1 data={data} key={id} />
                        )
                    })}

                </section>

                <section className='section3'>
                    <div className="sec3Div1">
                        <h1>The best site to Chat with Male and Female Strangers.</h1>
                        <p>Many text and video chat apps offer various features for meeting random strangers or chatting without bots, but not all of them are modern, secure and feature rich with a diverse interesting people from around the globe.</p>
                    </div>

                    <div className='sec3Div2'>
                        {Data2.map((data, id) => {
                            return (
                                <Comp2 data={data} key={id} />
                            )
                        })}
                    </div>


                </section>

                <section className='section4'>
                    <div className="sec4Div1">
                        <h1>Don't take our word for it</h1>
                        <p>We've asked random strangers, both men and women, to try our Omegle alternative platform for video and text chat. Here's what they had to say about our safe space for chatting with strangers:</p>
                    </div>

                    <div className='sec4Div2-wrapper'>
                        <div className='sec4Div2'>
                            {duplicatedCards.map((data, id) => {
                                return (
                                    <Card data={data} key={id} />
                                )
                            })}
                        </div>
                    </div>

                </section>

            </main>

            <Footer />
        </>

    )
}

function Comp1({ data }) {
    const ref1 = useRef();
    const ref2 = useRef();
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    useEffect(() => {
        const observer1 = new IntersectionObserver(
            ([entry]) => {
                setVisible1(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        const observer2 = new IntersectionObserver(
            ([entry]) => {
                setVisible2(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (ref1.current) observer1.observe(ref1.current);
        if (ref2.current) observer2.observe(ref2.current);

        return () => {
            observer1.disconnect();
            observer2.disconnect();
        };
    }, []);

    return (
        <div className='sec2Divs'>
            <div className={visible1 ? 'visible1' : ''} ref={ref1}>
                <p>{data.tag}</p>
                <h1>{data.heading}</h1>
                <p>{data.description}</p>
            </div>
            <div className={visible2 ? 'visible2' : ''} ref={ref2}>
                <img src={data.image} alt='images' />
            </div>
        </div>
    );
}


function Comp2({ data }) {

    const ref = useRef();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className={`sec3Div2Div ${visible ? 'visible3' : ''}`} ref={ref}>
            <div><i className={data.icon}></i></div>
            <h1>{data.heading}</h1>
            <p>{data.para}</p>
        </div>
    )
}

function Card({ data }) {
    let colors = ['#0a332c', '#485b46', '#0d3a7c', '#084e27'];
    return (
        <div className='comments' style={{ backgroundColor: `${colors[data.id - 1]}` }}>
            <div>
                <i className='bi bi-quote'></i>
            </div>
            <p>{data.comment}</p>
            <div className="userData">
                <div className="userLogo">
                    <i className='bi bi-person-circle'></i>
                </div>
                <div className="userName">
                    <h3>{data.name}</h3>
                    <p>{data.catagory}</p>
                </div>
            </div>
        </div>
    )
}

export default Home;