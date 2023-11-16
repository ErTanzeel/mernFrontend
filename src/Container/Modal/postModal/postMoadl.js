import React, { useContext, useState } from 'react'
import './postModal.scss'
import { useEffect, useRef } from 'react'
import { MyContext } from '../../ContextApi/ContextApi';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function PostMoadl(props) {
    const { isPostModal, receivedUpdateData, setreceivedUpdateData,
        loadFile, userName, getTimeAgo, userCreatedDate } = props


    const textareaRef = useRef(null);
    const { postData, setpostData, backendPostData, setbackendPostData,  } = useContext(MyContext)
    console.log('context data', userName);


    function handleCrossIcon() {
        isPostModal(false)


    }

    async function handlePostModal() {

        const dataToSend = {
            postData: postData,
            userName: userName
        };

        await axios.post('https://mernbackend-7m60.onrender.com/student/postModal', dataToSend)
            .then((res) => console.log(' backend data', setbackendPostData(res.data.postData))).catch((err) => console.log(err))

        alert('post successfully ')
        isPostModal(false)

    }

    useEffect(() => {
        textareaRef.current.focus();

    }, []);

    function handlePostText(e) {
        console.log(e.target.value);
        setpostData(e.target.value)
    }

    console.log(' backendpost data', backendPostData);


    return (

        <div className='Modal1'>
            <div className='modalContent1'>
                <span onClick={handleCrossIcon} style={{ paddingTop: "10px" }}>
                    <span style={{ fontSize: "18px", fontWeight: "10px" }}> Create a Post </span>

                    <svg style={{ float: "right", marginRight: "10px", height: "27px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </span>
                <hr />





                <p><input type="file" accept="image/*" name="image" enctype="multipart/form-data" id="file"
                    onChange={loadFile} style={{ display: 'none' }} /></p>

                <p style={{ display: "flex" }}>
                    <img id='output4' />

                    <p><label for="file" style={{ cursor: "pointer;" }}>

                        <i style={{
                            fontsize: "22px",
                            marginleft: "1px",
                            margintop: "21px"
                        }}
                            class="fa">
                            &#xf067;
                        </i>
                    </label>

                    </p>

                    <>
                        <div className='userName'>
                            {receivedUpdateData && receivedUpdateData.name ? (
                                <div>{receivedUpdateData.name}</div>
                            ) : (
                                <div>{userName}</div>
                            )}
                            <span style={{ fontSize: "12px", fontWeight: "lighter" }}> {getTimeAgo(userCreatedDate)}</span>  </div>

                    </>
                </p>

                <div className="username">

                    <textarea ref={textareaRef} onChange={handlePostText}> Whats in Your Mind ?  </textarea>
                </div>


                <button className='updateButton1' onClick={handlePostModal} >
                    Add your Post
                </button>
            </div>

        </div>
    )
}
