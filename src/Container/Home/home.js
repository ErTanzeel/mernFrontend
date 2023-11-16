import React, { useContext, useState } from 'react'
import './home.css'
import Formmodal from '../components/formmodal'
import Signup from './signup'
import { MyContext } from '../ContextApi/ContextApi'
import HomeModal from './HomeModal'

export default function Home() {

  const globalState = useContext(MyContext)

  const [localVariable, setLocalVariable] = useState(true)
  const [IsActive, setIsActive] = useState(true)

  function Signupmodal() {
    setLocalVariable(false)
    setIsActive(false)
  }

  function Signinmodal() {
    setLocalVariable(true)
    setIsActive(true)
  }


  return (
    <div>
      <div className="home">
        <div className="main-container">


          {/* left side box */}
          <div className="left-container"> 

            <div className="left-items">
              <img src="https://soombo.loominate.app/static/media/newlogo.51801a18.png" class="logo" alt="Loominate" />
              <h3 className='workplace'> Your Workplace Community </h3>
              <img src="https://soombo.loominate.app/static/media/new3monsters.afd23f01.png" alt="" />
            </div>
            
          </div>


          {/* right side box  */}

          <div className="right-container">

            <div className="heading">
              <div className={IsActive ? 'active' : ''} onClick={Signinmodal}><h3> SIGNIN</h3></div>
              < div className={IsActive ? '' : 'active'} onClick={Signupmodal}><h3>SIGNUP</h3> </div>
            </div>
            {localVariable ? <Formmodal /> : <Signup />}


            {globalState.showModal && globalState.crossState ? <HomeModal/> : <> </>}



          </div>
        </div>
      </div>

    </div>
  )
}
