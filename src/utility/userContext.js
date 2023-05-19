import React, {useState, createContext, useEffect} from 'react';
import { setItem, getItem } from './localStorageControl';
export const ProgrammerContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(getItem('user') || {
        login: false,
        token: null,
        user_id: null,
        name: '',
        email: '',
        image: '',
        resume_present: false,
        portfolio: [],
        rank_widgets: [],
        contest_widgets: [],
        project_widgets: [],
        sent_history: [],
        total_mails_sent: '',
    });
    
    useEffect(() => {
        setItem('user', user)
    }, [user])

    return(
        <ProgrammerContext.Provider value={[user, setUser]}>
            {props.children}
        </ProgrammerContext.Provider>
    );
}