import React from 'react';
import './AgentNavbar.css';
import logo from "../images/logosfolder/applogo.png";
import userlogo from "../images/logosfolder/userlogo.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


function AgentNavbar() {

    const [user, setUser] = useState({});

    useEffect(() => {
        // Fetch agent data
        axios.get(`http://localhost:8007/api/tickets/agent`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
            });
    }, []);

    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('user');
        navigate('/');
    };
    return (
        <div className="agent-navbar">
            <div className="agent-navbar-left">
                <img src={logo} alt='userlogo' className='agent-logo' />
                <span className="agent-greeting">Insurre</span>
            </div>
            <div className="agent-navbar-middle"></div>
            <div className="agent-navbar-right">
                <img src={userlogo} alt='userloginlogo' className='agent-profile-image' />
                <p className='agent-name'>{user.firstName}</p>
                <button onClick={handleLogout} className="agent-action-button">Logout</button>
            </div>
        </div>
    );
}

export default AgentNavbar;
