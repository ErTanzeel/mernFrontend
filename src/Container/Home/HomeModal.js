import React, { useContext } from 'react'
import './HomeModal.css'
import { MyContext } from '../ContextApi/ContextApi'
export default function HomeModal() {

    const globalState = useContext(MyContext)

    function handleCross() {
        globalState.setcrossState(false);
        globalState.setshowModal(false);
        console.log(globalState.crossState);


    }



    return (

        <div className='detailsModal'>

            <div className="modal-body"><div class="info-card" >
                
                <span role="img" aria-label="close" tabindex="-1" className="anticon anticon-close" style={{ fontsize: "20px", float: "right", }}>
                    <svg onClick={handleCross} viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                        </path></svg></span>

                <div className="info-header align-items-center hstack gap-3">
                    <div style={{ textAlign: 'left' }}>🔐 <span style={{ fontWeight: 'bold', paddingLeft: "10px" }}>Safety</span></div>
                </div>

                <div class="info-content" >
                    <p style={{ paddingTop: '20px', textAlign: 'left' }}>Your work email is immediately one-way hashed and held separately from the
                        account that you are about to create.</p>
                    <p style={{ paddingTop: '20px', textAlign: 'left' }}>This means that there is no way for your organization to trace your username or activity back to your work email.
                    </p><p style={{ paddingTop: '20px', textAlign: 'left' }}>Our secure system provides the true psychological safety required for colleagues to speak openly and honestly.</p>
                </div>

            </div>
            </div>
        </div>

    )
}
