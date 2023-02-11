import React from 'react'
import SignupForm from '../../Components/SignupForm/SignupForm'

const Signup = () => {
  return (
    <div>
       <div className='auth'>
            <div className="auth-left">
                <div className='auth-logo'>Calender</div>
            </div>
            <SignupForm/>
        </div>
    </div>
  )
}

export default Signup
