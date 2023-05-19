import React, {useState} from 'react';
import './Header.css';
import { Navbar, Nav , Form,Button} from 'react-bootstrap';
import splashlogo from '../../assets/images/logo.png';
import GoogleBtn from '../GoogleBtn';
import Avatar from '@material-ui/core/Avatar';
import { SuccessToast } from '../../utility/localStorageControl';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, userImage, userLogin, userName } from '../../features/user/userSlice';
import { useHistory } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { googleLogout } from '@react-oauth/google';

function Header1(){
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogin = useSelector(userLogin);
    const image = useSelector(userImage);
    const name = useSelector(userName);
    const [loader, setloader] = useState(false);
    const [searchValue, setSearchValue] = useState('');


    const open = () => {
        setloader(true);
    };
    const close = () => {
        setloader(false);
    };

       
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`/search?query=${searchValue}`);
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };


    const SignOut = () => {
        open();
        SuccessToast('Successfully Logged Out!')
        googleLogout();
        dispatch(logOutUser());
        setTimeout(() => {
            close();
            history.push('/home');
        }, [500])
    }

    const [dropdown, setdropdown] = useState(false);
    return (
        <header className="header">
            {loader ? <Loader /> : null}
            <Navbar sticky="top" expand="lg" className="flexRow flexAlignCenter navbar">
                <Navbar.Brand className="flexColumn flexAlignCenter" href="/home">
                    <img src={splashlogo} width="150" height="30" className="d-inline-block mr-80" alt="logo" />
                </Navbar.Brand>
                <div className="w100 flexRow flexAlignCenter flexBetween">
                    <Nav className="mr-auto flexRow">
                        <Nav.Link className="grow2" href="/about">About</Nav.Link>
                        <Nav.Link className="grow2" href="/home#faq">FAQ</Nav.Link>
                        <Nav.Link className="grow2" href="/contact">Contact</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto flexRow">
                    <Form menuAlign="center" className="d-flex flexRow" onSubmit={handleSearch}>
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        />
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form>
                    </Nav>
                    {isLogin ? (
                        dropdown ? (
                            <button onClick={() => SignOut()} 
                                className="edit-your-portfolio grow1" style={{fontWeight: 500}}
                            >
                                Sign Out
                            </button>
                        ) : (                            
                            <div className="avatar" style={{cursor: 'pointer'}} onClick={() => setdropdown(true)}>
                                <Avatar alt="img" src={image} />
                                <p className="avatar-name">Welcome<br/><p className="name">{name}</p></p>
                            </div>
                        )
                    ) : (
                        <GoogleBtn open={open} close={close} />
                    )}
                </div>
            </Navbar>
        </header>
    );
}

export default Header1;