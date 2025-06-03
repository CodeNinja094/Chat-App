import './Blog.css';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

function Blog() {
    return (
        <>
            <Header />
            <main className='blogMain'>
                <sction className="blogSec1">
                    <h1>Oops! Service is not available right now. <br /> Come Back Later</h1>
                </sction>
            </main>
            <Footer />
        </>
    )
}

export default Blog;