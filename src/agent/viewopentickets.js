import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import resolveticket from "../images/agentimages/resolveticketagent.png";
import './viewopentickets.css';  // Adjust this import as needed
import AgentNavbar from "./agentnav";
import Dasb from "./dashside";

function ViewOpenTickets() {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState({});
    const [responseTxt, setResponseTxt] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [loading, setLoading] = useState(true); 

    const sendEmail = () => {
        const emailData = {
          to: ticket.user.emailId, 
          subject: 'hello abnish',
          body: "Your Query is resolved."
        };
     
        axios.post('http://localhost:8007/api/tickets/send-email', emailData)
          .then(response => {
            alert('Email sent successfully');
          })
          .catch(error => {
            console.error('Error sending email: ', error);
          });
      };

    useEffect(() => {
        fetchTicketDetails();
    }, [ticketId]);

    const fetchTicketDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8007/api/tickets/${ticketId}`);
            setTicket(response.data);
            setFetchError(null);
        } catch (error) {
            console.error('Error fetching ticket details:', error);
            setFetchError('Failed to fetch ticket details. Please try again later.');
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!responseTxt.trim()) {
            setUpdateError('Response cannot be empty.');
            setUpdateSuccess(false);
            return;
        }

        try {
            await axios.put(`http://localhost:8007/api/tickets/update/${ticketId}`, {
                ...ticket,
                responseTxt
            });
            setUpdateSuccess(true);
            setUpdateError(null);
            sendEmail();
        } catch (error) {
            console.error('Error updating ticket:', error);
            setUpdateError('Failed to update ticket. Please try again later.');
            setUpdateSuccess(false);
        }
    };

    if (loading) {
        return (
            <div>
                <AgentNavbar />
                <Dasb/>
                <div className="ticket-mainbox">
                    <h1 className="ticket-heading">Resolve User Ticket</h1>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div>
                <AgentNavbar />
                <Dasb/>
                <div className="ticket-mainbox">
                    <h1 className="ticket-heading">Resolve User Ticket</h1>
                    <p>{fetchError}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AgentNavbar />
            <Dasb/>
            <div className="ticket-mainbox">
                <h1 className="ticket-heading">Resolve User Ticket</h1>
                <p className="ticket-subheading">Your help makes a difference!</p>
                <div className="ticket-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="ticket-form-group">
                            <label htmlFor="title">Title :</label>
                            <input type="text" id="title" className="ticket-form-control" value={ticket.title || 'Auto filled'} readOnly />
                        </div>
                        <div className="ticket-form-group">
                            <label htmlFor="description">Description :</label>
                            <input type="text" id="description" className="ticket-form-control" value={ticket.description || 'Auto filled'} readOnly />
                        </div>
                        <div className="ticket-form-group">
                            <label htmlFor="response">Response :</label>
                            <input
                                type="text"
                                id="response"
                                className="ticket-form-control"
                                value={responseTxt}
                                onChange={(e) => setResponseTxt(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="ticket-submit-button">Submit</button>
                        {updateError && <p className="ticket-error-message">{updateError}</p>}
                        {updateSuccess && <p className="ticket-success-message">Ticket updated successfully!</p>}
                    </form>
                </div>
                <img src={resolveticket} alt="Parachute" className="ticket-image"/>
            </div>
        </div>
    );
}

export default ViewOpenTickets;


// import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import resolveticket from "../images/agentimages/resolveticketagent.png";
// import './viewopentickets.css';  // Adjust this import as needed
// import AgentNavbar from "./agentnav";
// import Dasb from "./dashside";

// function ViewOpenTickets() {
//     const { ticketId } = useParams();
//     const [ticket, setTicket] = useState({});
//     const [responseTxt, setResponseTxt] = useState('');
//     const [fetchError, setFetchError] = useState(null);
//     const [updateError, setUpdateError] = useState(null);
//     const [updateSuccess, setUpdateSuccess] = useState(false);
//     const [loading, setLoading] = useState(true); 

//     const sendEmail = () => {
//         const emailData = {
//           to: ticket.user.emailId, 
//           subject: 'hello abnish',
//           body: "Your Query is resolved."
//         };
     
//         axios.post('http://localhost:8007/api/tickets/send-email', emailData)
//           .then(response => {
//             alert('Email sent successfully');
//           })
//           .catch(error => {
//             console.error('Error sending email: ', error);
//           });
//       };
 
//     useEffect(() => {
//         fetchTicketDetails();
//     }, [ticketId]);
 
//     const fetchTicketDetails = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:8007/api/tickets/${ticketId}`);
//             setTicket(response.data);
//             setFetchError(null);
//         } catch (error) {
//             console.error('Error fetching ticket details:', error);
//             setFetchError('Failed to fetch ticket details. Please try again later.');
//         }
//         setLoading(false);
//     };
 
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:8007/api/tickets/update/${ticketId}`, {
//                 ...ticket,
//                 responseTxt
//             });
//             setUpdateSuccess(true);
//             setUpdateError(null);
//         } catch (error) {
//             console.error('Error updating ticket:', error);
//             setUpdateError('Failed to update ticket. Please try again later.');
//             setUpdateSuccess(false);
//         }
//     };
 
//     if (loading) {
//         return (
//             <div>
//                 <AgentNavbar />
//                 <Dasb/>
//                 <div className="ticket-mainbox">
//                     <h1 className="ticket-heading">Resolve User Ticket</h1>
//                     <p>Loading...</p>
//                 </div>
//             </div>
//         );
//     }
 
//     if (fetchError) {
//         return (
//             <div>
//                 <AgentNavbar />
//                 <Dasb/>
//                 <div className="ticket-mainbox">
//                     <h1 className="ticket-heading">Resolve User Ticket</h1>
//                     <p>{fetchError}</p>
//                 </div>
//             </div>
//         );
//     }
 
//     return (
//         <div>
//             <AgentNavbar />
//             <Dasb/>
//             <div className="ticket-mainbox">
//                 <h1 className="ticket-heading">Resolve User Ticket</h1>
//                 <p className="ticket-subheading">Your help makes a difference!</p>
//                 <div className="ticket-form-container">
//                     <form onSubmit={handleSubmit}>
//                         <div className="ticket-form-group">
//                             <label htmlFor="title">Title :</label>
//                             <input type="text" id="title" className="ticket-form-control" value={ticket.title || 'Auto filled'} readOnly />
//                         </div>
//                         <div className="ticket-form-group">
//                             <label htmlFor="description">Description :</label>
//                             <input type="text" id="description" className="ticket-form-control" value={ticket.description || 'Auto filled'} readOnly />
//                         </div>
//                         <div className="ticket-form-group">
//                             <label htmlFor="response">Response :</label>
//                             <input
//                                 type="text"
//                                 id="response"
//                                 className="ticket-form-control"
//                                 value={responseTxt}
//                                 onChange={(e) => setResponseTxt(e.target.value)}
//                             />
//                         </div>
//                         <button type="submit" className="ticket-submit-button" onClick={sendEmail}>Submit</button>
//                         {updateError && <p className="ticket-error-message">{updateError}</p>}
//                         {updateSuccess && <p className="ticket-success-message">Ticket updated successfully!</p>}
//                     </form>
//                 </div>
//                 <img src={resolveticket} alt="Parachute" className="ticket-image"/>
//             </div>
//         </div>
//     );
// }
 
// export default ViewOpenTickets;
 