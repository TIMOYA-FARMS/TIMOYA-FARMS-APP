import React, { Fragment } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ScrollToTopButton from '../ScrollToTopButton';

const Layout = (props) => {
    return (
        <Fragment>
            <header>
                <Navbar />
            </header>
            <main>
                {props.children}
            </main>
            <ScrollToTopButton />
            <footer>
                <Footer />
            </footer>
        </Fragment>
    )
}

export default Layout
