import React, { useState, useEffect } from "react";
import './dh.css';
import axios from 'axios';
import AgentNavbar from "./agentnav";
import Dasb from "./dashside";
import { useNavigate } from 'react-router-dom';

function Dashmain() {
    const [closedTicketsCount, setClosedTicketsCount] = useState(0);
    const [openTicketsCount, setOpenTicketsCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchClosedTicketsCount();
    }, []);

    useEffect(() => {
        fetchOpenTicketsCount();
    }, []);

    const fetchClosedTicketsCount = async () => {
        try {
            const response = await axios.get('http://localhost:8007/api/tickets/closed');
            setClosedTicketsCount(response.data);
        } catch (error) {
            console.error('Error fetching closed tickets count:', error);
        }
    };

    const fetchOpenTicketsCount = async () => {
        try {
            const response = await axios.get('http://localhost:8007/api/tickets/open');
            setOpenTicketsCount(response.data);
        } catch (error) {
            console.error('Error fetching open tickets count:', error);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <AgentNavbar />
            <Dasb />

            <div className="welcomecard">
                <h1 className='tiy'>Welcome Back Agent</h1>
                <p>We're glad to see you. Let's continue providing excellent support and making a difference for our users today!</p>
            </div>
            <div className='asa card' onClick={() => handleNavigation('/open-tickets')}>
                <h1 className='sam'>Open Tickets</h1>
                <h6 className="ticket-count">{openTicketsCount.length}</h6>
            </div>
            <div className='chala card' onClick={() => handleNavigation('/closed-tickets')}>
                <h1 className='ana'>Closed Tickets</h1>
                <h6 className="ticket-count">{closedTicketsCount.length}</h6>
            </div>
        </div>
    );
}

export default Dashmain;






// import React, { useState, useEffect } from "react";
// import './dh.css';
// import axios from 'axios';
 
// import AgentNavbar from "./agentnav";
// import Dasb from "./dashside";
 
// function Dashmain() {
//     const [closedTicketsCount, setClosedTicketsCount] = useState(0);
//     const [openTicketsCount, setOpenTicketsCount] = useState(0);
 
//     useEffect(() => {
//         fetchClosedTicketsCount();
//     }, []);
 
//     useEffect(() => {
//       fetchOpenTicketsCount();
//   }, []);
 
//     const fetchClosedTicketsCount = async () => {
//         try {
//             const response = await axios.get('http://localhost:8007/api/tickets/closed');
//             setClosedTicketsCount(response.data);
//         } catch (error) {
//             console.error('Error fetching closed tickets count:', error);
//         }
//     };
 
//     const fetchOpenTicketsCount = async () => {
//       try {
//           const response = await axios.get('http://localhost:8007/api/tickets/open');
//           setOpenTicketsCount(response.data);
//       } catch (error) {
//           console.error('Error fetching open tickets count:', error);
//       }
//   };
 
//     return (
//         <div>
//             <AgentNavbar/>
//             <Dasb/>
           
//             <div className="welcomecard">
//     <h1 className='tiy'> Welcome Back Agent</h1>
//     <p>We're glad to see you. Let's continue providing excellent support and making a difference for our users today!</p>
// </div>
// <div className='asa'>
//     <h1 className='sam'>Open Tickets</h1>
//     <p className="ticket-count">{openTicketsCount.length}</p>
// </div>
// <div className='chala'>
//     <h1 className='ana'>Closed Tickets</h1>
//     <p className="ticket-count">{closedTicketsCount.length}</p>
// </div>

//         </div>
//     );
// }
 
// export default Dashmain;