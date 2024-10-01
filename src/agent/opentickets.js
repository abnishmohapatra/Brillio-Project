import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './opentickets.css';  // Adjust this import as needed
import AgentNavbar from "./agentnav";
import Dasb from "./dashside";

function OpenTickets() {
    const [tickets, setTickets] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTicketsSummary();
    }, []);

    const fetchTicketsSummary = async () => {
        try {
            const response = await axios.get('http://localhost:8007/api/tickets/open');
            console.log('Response received:', response);
            setTickets(response.data);
            setFetchError(null);
        } catch (error) {
            console.error('Error fetching tickets summary:', error);
            setFetchError('Failed to fetch tickets summary. Please try again later.');
        }
    };

    const handleViewTicket = (ticketId) => {
        navigate(`/view-open-ticket/${ticketId}`);
    };

    return (
        <div className="page-container">
            <AgentNavbar />
            <Dasb />
            <div className="main-content">
                <div className="table-container">
                    {fetchError ? (
                        <p>{fetchError}</p>
                    ) : (
                        <>
                            <h2>Ticket Summaries</h2>
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>User ID</th>
                                        <th>Ticket ID</th>
                                        <th>Title</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket, index) => (
                                        <tr key={index}>
                                            <td>
                                                {ticket.user ? (
                                                    ticket.user.userId ? (
                                                        ticket.user.userId
                                                    ) : (
                                                        'No UserId'
                                                    )
                                                ) : (
                                                    'No User'
                                                )}
                                            </td>
                                            <td>{ticket.id}</td>
                                            <td>{ticket.title}</td>
                                            <td>
                                                <button onClick={() => handleViewTicket(ticket.id)}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OpenTickets;
