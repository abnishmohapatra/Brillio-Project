import React, { useEffect, useState } from 'react';
import './viewtickets.css';
import Navbar1 from '../Userinterface/Usernavbar';
import { format, parseISO } from 'date-fns';

function SolvedTickets() {
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage] = useState(5);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user.userId;

    useEffect(() => {
        fetchSolvedTickets();
    }, [userId]);

    const fetchSolvedTickets = async () => {
        try {
            const response = await fetch(`http://localhost:8007/api/tickets/user/${userId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch solved tickets. Status: ${response.status}`);
            }
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching solved tickets:', error);
        }
    };

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return 'N/A'; 
        const date = parseISO(dateTimeString);
        return format(date, 'Pp'); 
    };

    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Navbar1 />
            <div className="solved-tickets-mainbox">
                <h1 className="solved-tickets-heading">Solved Tickets</h1>
                <table className="solved-tickets-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Response</th>
                            <th>Response At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.description}</td>
                                <td>{ticket.responseTxt}</td>
                                <td>{formatDateTime(ticket.responseAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {Array.from({ length: Math.ceil(tickets.length / ticketsPerPage) }, (_, i) => (
                        <button key={i + 1} onClick={() => paginate(i + 1)} className="page-link">
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SolvedTickets;



// import React, { useEffect, useState } from 'react';
// import './viewtickets.css';
// import Navbar1 from '../Userinterface/Usernavbar';

// function SolvedTickets() {
//     const [tickets, setTickets] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [ticketsPerPage] = useState(5);

//     const user = JSON.parse(sessionStorage.getItem('user'));
//     const userId = user.userId;

//     useEffect(() => {
//         fetchSolvedTickets();
//     }, [userId]);

//     const fetchSolvedTickets = async () => {
//         try {
//             const response = await fetch(`http://localhost:8007/api/tickets/user/${userId}`);
//             if (!response.ok) {
//                 throw new Error(`Failed to fetch solved tickets. Status: ${response.status}`);
//             }
//             const data = await response.json();
//             setTickets(data);
//         } catch (error) {
//             console.error('Error fetching solved tickets:', error);
//         }
//     };

//     const formatDateTime = (dateTimeString) => {
//         const date = new Date(dateTimeString);
//         const formattedDate = date.toLocaleDateString();
//         const formattedTime = date.toLocaleTimeString();
//         return `${formattedDate} ${formattedTime}`;
//     };

    
//     const indexOfLastTicket = currentPage * ticketsPerPage;
//     const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//     const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div>
//             <Navbar1 />
//             <div className="solved-tickets-mainbox">
//                 <h1 className="solved-tickets-heading">Solved Tickets</h1>
//                 <table className="solved-tickets-table">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Title</th>
//                             <th>Description</th>
//                             <th>Response</th>
//                             <th>Response At</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentTickets.map(ticket => (
//                             <tr key={ticket.id}>
//                                 <td>{ticket.id}</td>
//                                 <td>{ticket.title}</td>
//                                 <td>{ticket.description}</td>
//                                 <td>{ticket.responseTxt}</td>
//                                 <td>{formatDateTime(ticket.responseAt)}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className="pagination">
//                     {Array.from({ length: Math.ceil(tickets.length / ticketsPerPage) }, (_, i) => (
//                         <button key={i + 1} onClick={() => paginate(i + 1)} className="page-link">
//                             {i + 1}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SolvedTickets;
