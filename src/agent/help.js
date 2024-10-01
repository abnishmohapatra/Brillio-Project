import React, { useState } from "react";
import axios from 'axios';
import './help.css';
import helpme from "../images/userimages/helpme.png";
import Navbar1 from "../Userinterface/Usernavbar";
 
function Help() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState(""); 
 
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
 
    console.log(user.userId);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const ticket = {
            title: title,
            description: description,
            user: { userId: user.userId }
        };
 
        try {
            const response = await axios.post('http://localhost:8007/api/tickets/create', ticket, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
 
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);
 
            if (response.status === 201 || response.status === 200) {
                setSubmissionStatus("Ticket created successfully! Please wait until the agent gets back to you."); // Update submission status
                setTitle("");
                setDescription("");
                setTimeout(() => setSubmissionStatus(""), 5000); // Clear the message after 5 seconds
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error creating ticket:', error.response ? error.response.data : error.message);
            setSubmissionStatus("Error creating ticket. Please try again later."); // Update submission status in case of error
            setTimeout(() => setSubmissionStatus(""), 5000); // Clear the message after 5 seconds
        }
    };
 
    return (
        <div className="helpbody">
            <Navbar1 />
            <div className="help-background">
                <div className="help-main-body">
                    <h1 className="help-upperhead">Need Assistance, User? Let’s Resolve It Together!</h1>
                    <div className="help-white-box">
                        <h2 className="help-box-heading">Raise a Ticket</h2>
                        <form className="help-ticket-form" onSubmit={handleSubmit}>
                            <div className="help-form-left">
                                <div className="help-form-group">
                                    <label htmlFor="title">Issue:</label>
                                    <select
                                        id="title"
                                        name="title"
                                        className="help-text-box"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    >
                                        <option value="">Select an issue</option>
                                        <option value="Premium Calculation Error">Premium Calculation Error</option>
                                        <option value="Billing Issue">Billing Issue</option>
                                        <option value="Policy Purchase Issue">Policy Purchase Issue</option>
                                        <option value="Auto Insurance Claim Issue">Auto Insurance Claim Issue</option>
                                        <option value="Health Insurance Claim Issue">Health Insurance Claim Issue</option>
                                        <option value="Term Life Insurance Claim Issue">Term Life Insurance Claim Issue</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="help-form-group">
                                    <label htmlFor="description">Description:</label>
                                    <input
                                        id="description"
                                        name="description"
                                        className="help-text-boxx"
                                        rows="4"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="help-submittt-button">Submit</button>
                                {submissionStatus && (
                                    <div className={`help-message ${submissionStatus.includes("successfully") ? "help-success" : "help-error"}`}>
                                        {submissionStatus}
                                    </div>
                                )}
                            </div>
                            <div className="help-form-right">
                                <img src={helpme} alt='userloginlogo' className='help-ag-image' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Help;
