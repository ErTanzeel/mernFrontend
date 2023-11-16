import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export default function Formmodal() {

    const navigate = useNavigate()

    const [loginData, setloginData] = useState({
        name: '',
        password: ''
    })

    const staticData = { message: loginData }

    async function handleSignin(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://mernbackend-7m60.onrender.com/student/login', loginData);
            alert('login successfully')
    
            let loginID = response.data._id

            navigate(`/Dashboard/ ${loginID}`, { state: staticData })

        } catch (error) {
            // console.error('Error submitting form:', error);
            alert("Wrong Credential")
        }

    }



    async function handleInputData(e) {
        const { name, value } = e.target;

        setloginData((prevData) => ({
            ...prevData,
            [name]: value
        }));

    }





    return (

        <form action='/student/login' method='post' onSubmit={handleSignin}>
            <h2>soombo Coworker's Community </h2>
            <div className="username">
                <label htmlFor=""> Username</label><br />
                <input type="text" placeholder='your pseudoname' value={loginData.name} onChange={handleInputData} name='name' />
            </div>

            <div className="password">
                <label htmlFor=""> Password </label> <br />
                <input type="text" name='password' value={loginData.password} onChange={handleInputData} placeholder='***' />
                <i class="fa fa-eye" style={{ fontSize: "25px", color: " #03c5cc", textAlign: 'right', }}></i>

            </div>

            <a class="btn-forgot" href="/">Forgot password?</a> <br />

            <button className="button" type='submit'> Next </button>

        </form>

    )
}
