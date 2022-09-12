import React, {useEffect} from 'react'
import {Header} from "./components";
import {Cart, Home} from "./pages";
import {Route, Routes} from "react-router-dom";


function App() {

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/cart' element={<Cart/>}/>
                </Routes>
            </div>
        </div>
    )
}


export default App