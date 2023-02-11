import React from 'react'
import AllTask from '../../Components/AllTask/AllTask'
import Sidebar from '../../Components/Sidebar/Sidebar'

const Summary = () => {
  return (
    <div className='Home'>
        <div className="Sidebar-Home">
            <Sidebar/>
        </div>
        <div className="Content-Home">
            <AllTask/>
        </div>
    </div>
  )
}

export default Summary
