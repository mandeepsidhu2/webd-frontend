import React from 'react'
import './Loader.css'

function Loader() {
    return (
        <div id="loader_component" className="flexColumn flexCenter flexAlignCenter">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader;
