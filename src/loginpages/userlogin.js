import React from 'react';

import userloging from '../images/loginimages/userlogin.png';
import LoginComponent from './logincomponent';
 
const UserLogin = () => {
    return (
        <div>
            <LoginComponent
                loginUrl="http://localhost:8007/users/login"
                welcomsmsg="Welcome back User"
                imageUrl={userloging}
                role="user"
            />
        </div>
    );
};
 
export default UserLogin;