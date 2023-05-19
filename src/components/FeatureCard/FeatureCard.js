import {React} from 'react';
import './FeatureCard.css';
import '../../styles/HelperStyles.css';

function FeatureCard({name, img, desc}){
    return (
        <div className='grow1 cardw100 feature-card'>
            <div className="flexColumn flexAlignCenter flexCenter">
                <div style={{height: 120, width: 120, borderRadius: 60, backgroundImage: `url(${img})`}}></div>
                <p className="feature-text">{name}</p>
                <p className="feature-innertext">{desc}</p>
            </div>
        </div>
    );
}

export default FeatureCard;