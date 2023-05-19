import React, { useState } from 'react';
import "./ExperienceCardDisplay.css";

export const ExperienceCardDisplay = ({ type, companyName, description, start, end }) => {

    const text = description;
    const [isReadMore, setIsReadMore] = useState(true);

    const myStartMonth = new Date(start).toDateString().split(' ')[1];
    const myStartYear = new Date(start).toDateString().split(' ')[3];
    const startDate = myStartMonth + ' ' + myStartYear;

    let endDate;
    if(end) {
        const myEndMonth = new Date(end).toDateString().split(' ')[1];
        const myEndYear = new Date(end).toDateString().split(' ')[3];
        endDate = myEndMonth + ' ' + myEndYear;
    } else {
        endDate = "Present";
    }

    const toggleReadMore = () => {
        setIsReadMore(prevState => !prevState);
    }

    function ReadMore() {
        return (
            <p>
                {isReadMore ? text.slice(0, 300) : text}
                <span onClick={toggleReadMore} style={{ color: "#4285F4", cursor: "pointer" }}>
                    {text.length > 300 ? isReadMore ? " ...show more" : <div>show less</div> : null}
                </span>
            </p>
        );
    }

    return (
        <div className="experience-card">
            <div className="flexColumn">
                <span className="company__name" > <strong>{companyName}</strong> </span>
                <span className="experience__date">{startDate} - {endDate} </span>
                <div className="experience__desc">
                    <ReadMore />
                </div>
                <div className="experience__type">
                    <em>{type}</em>
                </div>
            </div>
        </div>
    )
}