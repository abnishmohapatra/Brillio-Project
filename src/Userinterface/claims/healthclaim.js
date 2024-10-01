import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./healthclaim.css";
import axios from "axios";
import claimimage from "../../images/userimages/claimpage.png"
import Navbar1 from "../Usernavbar";

function HealthClaim() {
    const [diseaseOccured, setdiseaseOccured] = useState("");
    const [dateOfService, setdateOfService] = useState("");
    const [hospName, sethospName] = useState("");
    const [drCharge, setdrCharge] = useState("");
    const [hostAdd, sethostAdd] = useState("");
    const [claimAmt, setclaimAmt] = useState("");
    const [medicalBill, setmedicalBill] = useState(null); // State to hold the selected file
    const [status, setStatus] = useState('Pending');
    const [res, setRes] = useState("");
    const location = useLocation();
    const { userpolicyId } = location.state || {};

    const healthClaimData = {
        disease: diseaseOccured,
        dateofservice: dateOfService,
        hospitalname: hospName,
        doctorincharge: drCharge,
        address: hostAdd,
        claimamt: claimAmt,
        status: "Pending",
        medicalBill: medicalBill,
        userPolicy: {
            userPolicyId: userpolicyId,
        },
    };

    const submitdata = async (e) => {
        e.preventDefault();
        if (!diseaseOccured || !dateOfService || !hospName || !drCharge || !hostAdd || !claimAmt || !medicalBill) {
            alert("Please fill out all mandatory fields before submitting.");
            return;
        }

        var confirmation = window.confirm('Are you sure you want to submit?');
        if (confirmation) {
            const formData = new FormData();
            formData.append('disease', diseaseOccured);
            formData.append('dateOfService', dateOfService);
            formData.append('hospitalName', hospName);
            formData.append('doctorInCharge', drCharge);
            formData.append('address', hostAdd);
            formData.append('claimAmt', claimAmt);
            formData.append('status', status);
            formData.append('userPolicyId', userpolicyId);
            formData.append('medicalBill', medicalBill);

            try {
                const response = await axios.post(
                    "http://localhost:8007/health-claims/create",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log(response);
                setRes(response);
                if (response?.status === 201) {
                    alert("Submitted Successfully");
                }
            } catch (error) {
                console.error('Claim submission failed:', error);
                console.error('Error details:', error?.response?.data?.message);
                window.alert("Claim Request Failed as " + error?.response?.data?.message);
            }
        }
    };

    return (
        <div className="healthclaimbody">
<Navbar1/>
        
        <div className="health-claim-top">
            <div className="health-claim-text">
                <p id="health-claim-title">Health Insurance</p>
                <p id="health-claim-msg">Peace of mind that never expires, with every heartbeat</p>
            </div>
            <div className="health-claim-form">
                <h4>Claim Request</h4>
                <div className="health-claim-form-level1">
                    <div className="health-claim-form-level2">
                        <label>Disease Occurred *</label>
                        <input required
                            type="text"
                            className="health-claim-textfield"
                            onChange={(e) => setdiseaseOccured(e.target.value)}
                        ></input>
                    </div>
                    <div className="health-claim-form-level2">
                        <label>Date Of Service *</label>
                        <input required
                            type="date"
                            className="health-claim-textfield"
                            onChange={(e) => setdateOfService(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="health-claim-form-level1">
                    <div className="health-claim-fl">
                        <div className="health-claim-form-level2">
                            <label>Hospital Name *</label>
                            <input required
                                type="text"
                                className="health-claim-textfield"
                                onChange={(e) => sethospName(e.target.value)}
                            ></input>
                        </div>
                        <div className="health-claim-form-level2">
                            <label>Doctor Incharge *</label>
                            <input required
                                type="text"
                                className="health-claim-textfield"
                                onChange={(e) => setdrCharge(e.target.value)}
                            ></input>
                        </div>
                        <div className="health-claim-form-level2">
                            <label>Claim Amount *</label>
                            <input required
                                type="number"
                                className="health-claim-textfield"
                                onChange={(e) => setclaimAmt(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className="health-claim-form-level2">
                        <label>Hospital Address *</label>
                        <textarea required
                            className="health-claim-textarea"
                            onChange={(e) => sethostAdd(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <img src={claimimage} alt="claimimage" className="claimimg"></img>
                <div className="health-claim-but">
                    <label>Upload Medical Bill *</label>
                    <input type='file' onChange={(e) => setmedicalBill(e.target.files[0])} accept="image/*"></input>
                    <button
                        style={{ marginTop: "2%", width: "fit-content" }}
                        onClick={(e) => submitdata(e)}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default HealthClaim;
