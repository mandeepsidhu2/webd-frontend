import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    login: false,
    accessToken: null,
    user_id: null,
    name: '',
    email: '',
    image: '',
    resume_present: false,
    portfolio: [],
    course_widgets: [],
    experience_widgets: [],
    rank_widgets: [],
    contest_widgets: [],
    project_widgets: [],
    sent_history: [],
    string_map: [],
    total_mails_sent: '',
    portfolio_link: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logUser: (state, action) => {
            state.login = true;
            state.accessToken = action.payload.access_token;
            return state;
        },
        logOutUser: (state, action) => {
            state.login = false;
            state.accessToken = null;
            state.user_id = null;
            state.name = '';
            state.email = '';
            state.image = '';
            state.resume_present = false;
            state.portfolio = [];
            state.rank_widgets = [];
            state.contest_widgets = [];
            state.project_widgets = [];
            state.course_widgets = [];
            state.experience_widgets = [];
            state.sent_history = [];
            state.string_map = [];
            state.total_mails_sent = '';
            state.portfolio_link = '';
        },
        setUser: (state, action) => {
            state.user_id = action.payload.user_id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.image = action.payload.picture_url;
            state.resume_present = action.payload.resume_present;
            state.portfolio = action.payload.portfolio;
            state.rank_widgets = action.payload.rank_widgets;
            state.contest_widgets = action.payload.contest_widgets;
            state.project_widgets = action.payload.personal_projects;
            state.course_widgets = action.payload.course_widgets;
            state.experience_widgets = action.payload.experience_widgets;
            state.portfolio_link = action.payload.portfolio_link;
            state.string_map = action.payload.string_map;
        },
        setPortfolio: (state, action) => {
            state.portfolio = action.payload.portfolio;
        },
        setRankWidgets: (state, action) => {
            state.rank_widgets = action.payload.rank_widgets;
        },
        setContestWidgets: (state, action) => {
            state.contest_widgets = action.payload.contest_widgets;
        },
        setProjectWidgets: (state, action) => {
            state.project_widgets = action.payload.personal_projects;
        },
        setHistory : (state, action) => {
            state.sent_history = action.payload.mail_history;
            state.total_mails_sent = action.payload.total_items;
        },
        setName: (state, action) => {
            state.name = action.payload.name;
        },
        setCourses: (state, action) => {
            state.course_widgets = action.payload.course_widgets;
        },
        setExperiences: (state, action) => {
            state.experience_widgets = action.payload.experience_widgets;
        },
        setPortfolioLink: (state, action) => {
            state.portfolio_link = action.payload.portfolio_link;
        },
    },
});

export const {logUser, logOutUser, setUser, setName, setPortfolio, setPortfolioLink, setRankWidgets, setContestWidgets, setProjectWidgets, setHistory, setCourses, setExperiences} = userSlice.actions;

export const userLogin = state => state.user.login;
export const userToken = state => state.user.accessToken;
export const userName = state => state.user.name;
export const userEmail = state => state.user.email;
export const userImage = state => state.user.image;
export const userID = state => state.user.user_id;
export const userResume = state => state.user.resume_present;
export const userPortfolio = state => state.user.portfolio;
export const userRankWidgets = state => state.user.rank_widgets;
export const userCoursesTaken = state => state.user.course_widgets;
export const userExperiences = state => state.user.experience_widgets;
export const userContestWidgets = state => state.user.contest_widgets;
export const userProjectWidgets = state => state.user.project_widgets;
export const userHistory = state => state.user.sent_history;
export const userMailSent = state => state.user.total_mails_sent;
export const userPortfolioLink = state => state.user.portfolio_link;
export const userStringMap = state => state.user.string_map;

export default userSlice.reducer;