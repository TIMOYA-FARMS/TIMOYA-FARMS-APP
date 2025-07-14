import React, { Fragment } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ScrollToTopButton from '../ScrollToTopButton';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <Fragment>
            <header>
                <Navbar />
            </header>
            <main style={{ background: '#f9f9f9', minHeight: '100vh', marginTop: 64 }}>
                <Outlet />
            </main>
            <ScrollToTopButton />
            <footer>
                <Footer />
            </footer>
        </Fragment>
    )
}

export default Layout
