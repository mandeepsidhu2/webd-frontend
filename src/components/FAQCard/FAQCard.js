import {React, useState} from 'react';
import './FAQCard.css';
import '../../styles/HelperStyles.css';
import {BiChevronDownCircle, BiChevronUpCircle} from 'react-icons/bi';
import {Animated} from "react-animated-css";

function FAQCard({ques, ans}){
    const [isOpen, setOpen] = useState(false);
    return (
        <div>
            <div onClick={() => setOpen(!isOpen)} className='faq-card grow5' style={{backgroundColor: isOpen ? '#F2B630' : '#F2D492'}}>
                <div className="flexRow flexAlignCenter flexBetween">
                    <h1 className="faq-ques">{ques}</h1>
                    {
                        isOpen ? (
                            <BiChevronUpCircle style={{fontSize: 25}}/>
                        ) : (
                            <BiChevronDownCircle style={{fontSize: 25}} />
                        )
                    }
                </div>
            </div>
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={1000} animateOutDuration={100} isVisible={isOpen}>                
                <div className='ans-card' style={{display: isOpen ? 'flex' : 'none' }}>
                    <p className="ans">{ans}</p>
                </div>
            </Animated>
        </div>
    );
}

export default FAQCard;