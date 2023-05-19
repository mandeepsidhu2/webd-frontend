import axios from 'axios';
import React, { useState } from 'react';
import '../../styles/HelperStyles.css';
import './ProjectCard.css';

export default function ProjectCardDisplay({name, img, url, techstack, desc}){
    const [namecard, setcard] = useState(true);
    const [detailcard, setdetail] = useState(false);   
    desc = desc.length > 120 ? desc.slice(0,120)+"..." : desc;
    techstack = techstack && techstack.map(e => e.trim());
    const [display, setDisplay] = useState(true);

    axios.get(img)
        .then(res => setDisplay(true))
        .catch(err => setDisplay(false))
    
    return(
        <div onClick={() => window.open(url)} className="grow1 flexColumn project-card flexEnd" 
            style={{  
                backgroundImage: (img === "" || !display) ? `url('https://images.unsplash.com/photo-1603145733146-ae562a55031e?ixid=MXwyNTE2NnwwfDF8c2VhcmNofDV8fHxlbnwwfHx8&ixlib=rb-1.2.1&q=85&w=2160')` : `url("${img}")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                cursor: 'pointer'
            }}
        >
            {
                namecard ? (
                    <div onMouseEnter={() => {setcard(false); setdetail(true);}} className="flexColumn flexCenter flexAlignCenter project-textbox">
                        <p style={{cursor: 'pointer'}} className="project-name">{ name.length > 0 ? name : "Sample Webpage"}</p>
                    </div>
                ) : null
            }
            {
                detailcard ? (
                    <div onMouseLeave={() => {setdetail(false); setcard(true);}} className="flexColumn flexAlignCenter flexCenter project-textbox1">
                        <p style={{cursor: 'pointer'}} onClick={() => window.open(url)} className="project-desc textAlignCenter">{ desc.length > 0 ? desc : "Sample Description"}</p>
                        <p style={{cursor: 'pointer'}} onClick={() => window.open(url)} className="project-stack textAlignCenter">{ techstack ? (techstack.slice(0,4).join(' | ')) : "Sample Stack"}</p>
                    </div>
                ) : null
            }
        </div>
    );
}