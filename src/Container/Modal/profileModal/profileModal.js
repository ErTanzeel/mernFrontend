import React, { useState, useRef, useEffect } from 'react';
import './profileModal.scss';
import { useLocation } from 'react-router';
import axios from 'axios';


export default function ProfileModal(props) {
    const { isOpen, loadFile, setreceivedUpdateData, receivedUpdateData } = props;
    const [edit, setEdit] = useState(false);
    // const [userUpdateData, setuserUpdateData] = useState('');


    const [modalInputData, setmodalInputData] = useState({
        name: '',
        textarea: " "
    })


    function handleModalInput(e) {
        let name = e.target.name
        let value = e.target.value

        setmodalInputData({
            ...modalInputData, [name]: value
        })


    }




    // Create a ref for the input field
    const inputRef = useRef(null);
    const loc = useLocation()

    const receivedLoginData = loc.state.message.name
    console.log('modal recievdat', receivedLoginData);



    useEffect(() => {
        if (edit && inputRef.current) {
            inputRef.current.focus();
        }
    }, [edit]);

    function handleEdit() {
        console.log(edit);
        setEdit(!edit);



        const modalInputDataJSON = JSON.stringify(modalInputData);

        const dataToSend = {
            modalinputdata: modalInputDataJSON,
            receivedLoginData: receivedLoginData
        };

        console.log('Data being sent:', dataToSend);
        if (edit) {
            let modalPostResponse = axios.post('https://mernbackend-7m60.onrender.com/student/modal', dataToSend)
            modalPostResponse.then((res) => console.log('modalpostresponse', setreceivedUpdateData(res.data)))
                .catch((er) => console.log(er));

        }


    }
    console.log('update name', receivedUpdateData);

    function handleCrossIcon() {
        isOpen(false)

        if (edit) {
            setreceivedUpdateData()
        }
    }

    return (

        <div className='Modal'>
            <div className='modalContent'>
                <span onClick={handleCrossIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </span>

                <p>
                    <input type="file" accept="image/*" name="image" id="file" onChange={loadFile} style={{ display: 'none' }} />
                </p>

                <p style={{ display: 'flex' }}>
                    <img id='output3' />
                    <p>
                        <label htmlFor="file" style={{ cursor: 'pointer' }}>
                            <i style={{ fontSize: '22px', marginLeft: '1px', marginTop: '21px' }} className="fa">
                                &#xf067;
                            </i>
                        </label>
                    </p>
                </p>

                <div className="username">
                    <label htmlFor=""> Username</label>
                    <br />
                    <span>  <input type="text" style={edit ? { display: 'block' } : { display: "none" }} name="name"
                        ref={inputRef} onChange={handleModalInput} />


                        {edit ? receivedUpdateData?.name : receivedLoginData}

                    </span>



                </div>

                <div className="username">
                    <label htmlFor=""> About </label>
                    <br />

                    <textarea name='textarea'
                        onChange={handleModalInput}
                        placeholder={modalInputData.textarea}
                        // Set the value of the textarea

                        style={{ width: '420px', height: '150px' }}>  </textarea>
                </div>


                <button className='updateButton' onClick={handleEdit}>
                    {edit ? 'Update your Profile' : 'Edit your Profile'}
                </button>
            </div>
            profileModal
        </div>
    );
}
