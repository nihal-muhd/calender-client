import React from 'react'
import CalenderPart from '../../Components/Calender/CalenderPart'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Home.css'

const Home = () => {
  return (
    <div className='Home'>
        <div className="Sidebar-Home">
            <Sidebar/>
        </div>
        <div className="Content-Home">
            <CalenderPart/>
        </div>
    </div>
  )
}

export default Home
