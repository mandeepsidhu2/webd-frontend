import React from 'react';
import '../../styles/HelperStyles.css';
import './CodingCard.css';

export default function CodingCardDisplay({name, rank, id, logo, url}){
    return(
            <div className="grow1 card11 flexColumn profile-card" onClick={() => window.open(url)} style={{cursor: 'pointer'}}>
                <div className="flexRow flexCenter" style={{position: 'relative'}}>
                    {logo === "" ? (
                        <div className="flexRow flexCenter flexAlignCenter empty-logo">
                            <p className="profile-name" style={{fontWeight: 700, color: 'white'}}>LOGO</p>
                        </div>
                    ) : (
                        <img className="logo" src={logo} alt="logo" />
                    )}
                </div>
                <p className="profile-name pl-20 mb-10"> {name === "" ? "Company Name" : name}</p>
                <p className="profile-name ph-20 mb-10"><span className="profile-heading">ID:</span> {id === "" ?  "Id here" : id }</p>
                <p className="profile-name ph-20 mb-10"><span className="profile-heading">Rank:</span> {rank === "" ?  "?" : rank  }</p>
            </div>
    );
}