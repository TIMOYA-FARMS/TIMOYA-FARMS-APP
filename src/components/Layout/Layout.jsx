import React, { Fragment } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ScrollToTopButton from '../ScrollToTopButton';
import { Outlet } from 'react-router-dom';
import WhatsAppFloat from '../WhatsAppFloat'

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
            <WhatsAppFloat phone="233593786079" message="Hello Timoya Farms! I'd like to learn more about your rice products." />
            <footer>
                <Footer />
            </footer>
        </Fragment>
    )
}

export default Layout
