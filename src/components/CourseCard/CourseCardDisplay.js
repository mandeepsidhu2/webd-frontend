import React from 'react'

export const CourseCardDisplay = ({name, issuer, link}) => {
    return (
        <div className="course-card flexRow flexAlignCenter">
            {/* <img 
                src="https://play-lh.googleusercontent.com/qq5__wITsoCx2kUK8TqVW2-8UDRuxET9kCzPzAPHad8umXiHRF2N0tZKuLezd0tiBQg" 
                className="course__logo"  
            /> */}
            <div className="flexColumn">
                <a href={link} className="course__name" >{name}</a>
                <span className="course__issuer">{issuer}</span>
            </div>
        </div>
    )
}