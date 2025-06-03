import './About.css';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { aboutUs } from '../Data/data';

function About() {
    return (
        <>
            <Header />
            <main className='aboutMain'>
                <section className="aboutSection1">
                    <div>
                        <h1>Your Platform for Random Text and Video Chats</h1>
                        <p>Chitchat.gg is your ultimate platform for chatting with strangers, engaging in random video chats, and making new friends from around the globe. Experience seamless connections similar to Omegle and OmeTV.</p>
                    </div>
                </section>

                <section className="aboutSection2">
                    <h1>Our Journey</h1>
                    {aboutUs.map((data, id) => {
                        return (
                            <AboutUs data={data} key={id} />
                        )
                    })}

                </section>

                <section className="aboutSection3">
                    <h1>Our Impact</h1>
                    <div>
                        <div>
                            <h1>5M+</h1>
                            <p>Monthly Active Users</p>
                        </div>
                        <div>
                            <h1>19M+</h1>
                            <p>Video Chats per Week</p>
                        </div>
                        <div>
                            <h1>10M+</h1>
                            <p>Messages Sent Daily</p>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </>

    )
}

function AboutUs({ data }) {
    return (
        <div className='aboutSection2Div'>
            <div className='aboutSection2Pic'>
                <img src={data.img} alt="profile pic" />
            </div>
            <div className='aboutSection2Des'>
                <h1>{data.title}</h1>
                <p>
                    {data.des}
                </p>
            </div>
        </div>
    )
}

export default About;