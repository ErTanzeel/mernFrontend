import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../Home/Signup.css'
import { MyContext } from '../ContextApi/ContextApi';

export default function Signup() {

    const [imgstate, setimgstate] = useState()

    const globalState = useContext(MyContext)
    function handleimage(e) {
        setimgstate(e.target.files[0])

    }

    const [myformdata, setmyformdata] = useState({
        name: '',
        password: '',
        email: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setmyformdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData =  new FormData()
        formData.append('name',myformdata.name)
        formData.append('email',myformdata.email)
        formData.append('password',myformdata.password)
        formData.append('image',imgstate)

        console.log('formdata', formData.get("name"));
        console.log('formdata', formData.get("email"));
        console.log('formdata', formData.get("password"));
        console.log('formdata', formData.get("image"));

        console.log('formdata',formData);

        try {
            const response = await axios.post('https://mernbackend-7m60.onrender.com/student', formData);
            console.log(response)
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        setmyformdata({
            name: '',
            password: '',
            email: ''
        });

    };


    // handleModal

    function handleModal() {

        globalState.setshowModal(true)
        globalState.setcrossState(true)
    }





    return (

        <form className='signup' onSubmit={handleSubmit} action='/student' method='post' >
            <h2> Join Our Collegues</h2>

            <div className="userName">
                {/* <label htmlFor=""> Name </label><br /> */}
                <input type="text" name='name' placeholder=' Enter your Name '
                    value={myformdata.name} onChange={handleInputChange} />
            </div>

            <div className="userEmail">
                {/* <label htmlFor=""> Email </label><br /> */}
                <input type="text" name='email' placeholder=' example: john@theragency.com '
                    value={myformdata.email} onChange={handleInputChange} />

            </div>

            <div className="userPassword">
                {/* <label htmlFor=""> Password </label><br /> */}
                <input type="text" name='password' placeholder='Enter your Password'
                    value={myformdata.password} onChange={handleInputChange} />



            </div>


            <div className="userFile">
                {/* <label htmlFor=""> Password </label><br /> */}
                <p><input type="file" accept="image/*" onChange={handleimage} name="image" id="file" /></p>


            </div>


            {/* <p > 🧙‍♂️ Your work email is only used to confirm which space you belong </p> */}
            {/*             
            <p style={{ paddingRight: '316px' }} > 🔐 Your identity is........    <span onClick={handleModal}
                role="img" aria-label="info-circle" tabindex="-1" class="anticon anticon-info-circle signup-info-icon"
                style={{ color: 'purple', fontSize: '12px', }}><svg viewBox="64 64 896 896" focusable="false"
                    data-icon="info-circle" width="1em" height="1em"
                    fill="currentColor" aria-hidden="true">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z">
                    </path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg></span> </p>
 */}

            <p style={{ paddingRight: '152px' }}> 🦄  Just be yourself and get rewarded for....  &nbsp; <span onClick={handleModal} role="img" aria-label="info-circle" tabindex="-1" class="anticon anticon-info-circle signup-info-icon"
                style={{ color: 'purple', fontSize: '12px', }}><svg viewBox="64 64 896 896" focusable="false"
                    data-icon="info-circle" width="1em" height="1em"
                    fill="currentColor" aria-hidden="true">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z">
                    </path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg></span>  </p>

            <button className="button" type='submit'> Verify </button>

        </form>


    )
}
