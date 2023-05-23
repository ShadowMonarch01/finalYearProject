import React from 'react'

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import NavPage from './NavPage';

const AHome = () => {
  return (
    <div>
        <section>
            <Navbar/>
        </section>

        <section>
            <div className='mainContainer'>
                <div className='sideBarContainer'>
                    <Sidebar/>
                </div>
                <div className='interContainer'>
                    <NavPage/>
                </div>
            </div>
        </section>
    </div>
  )
}

export default AHome;