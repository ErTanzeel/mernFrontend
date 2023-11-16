import React, { createContext, useState } from 'react'

export const MyContext = createContext()

export default function ContextApi({ children }) {
    const [showModal, setshowModal] = useState(false)// after click true
    const [crossState, setcrossState] = useState(false) // true
    const [postData, setpostData] = useState([])
    const [backendPostData, setbackendPostData] = useState([])





    const values = {
        showModal,
        setshowModal,
        crossState,
        setcrossState,
        postData,
        setpostData,
        backendPostData,
        setbackendPostData,

    }



    return (

        <MyContext.Provider value={values}> {children} </MyContext.Provider>
    )
}
