import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import claimimage from "../../images/userimages/claimpage.png";
import axios from "axios";
import "./termclaim.css";
import Navbar1 from "../Usernavbar";

function TermClaim() {
    const [dateOfDemise, setdateOfDemise] = useState('');
    const [deathCrt, setDeathCrt] = useState(null);
    const [nommineProof, setNommineProof] = useState(null);
    const [status, setStatus] = useState('Pending');
    const [res, setRes] = useState("");
    const location = useLocation();
    const { userpolicyId } = location.state || {};

    const termClaimData = {
        dateofdemise: dateOfDemise,
        deathProof: deathCrt,
        nomineeProof: nommineProof,
        status: "Pending",
        userPolicy: {
            userPolicyId: userpolicyId,
        },
    };

    const submitData = async (e) => {
        e.preventDefault();

        // Validation
        if (!dateOfDemise || !deathCrt || !nommineProof) {
            alert("Please fill out all mandatory fields before submitting.");
            return;
        }

        var confirmation = window.confirm("Are you sure you want to submit?");
        if (confirmation) {
            const formData = new FormData();
            formData.append("dateofdemise", dateOfDemise);
            formData.append("deathProof", deathCrt);
            formData.append("nomineeProof", nommineProof);
            formData.append("status", status);
            formData.append("userPolicyId", userpolicyId);

            try {
                const response = await axios.post(
                    "http://localhost:8007/term-claims/create",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log(response);
                setRes(response);
                if (response?.status === 201) {
                    alert("Submitted Successfully");
                }
            } catch (error) {
                console.error("Claim submission failed:", error);
                console.error("Error details:", error?.response?.data?.message);
                window.alert("Claim Request Failed as " + error?.response?.data?.message);
            }
        }
    };

    return (
        <div className="termclaimbody">
        <Navbar1/>
        <div className="term-claim-top">
            <div className="term-claim-text">
                <p id="term-claim-title">Term Life Insurance</p>
                <p id="term-claim-msg">Security that lasts a lifetime, for the ones you cherish</p>
            </div>
            <div className="term-claim-form">
                <h4 style={{ marginTop: "5%", fontSize: "18px" }}>Claim Request</h4>
                <img src={claimimage} alt="claimimage" className="claimimg"></img>
                <div>
                    <label>Date of Demise *</label>
                    <input
                        type='date'
                        className='term-claim-textfield'
                        value={dateOfDemise}
                        onChange={(e) => setdateOfDemise(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label> Upload Death Certificate *</label>
                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setDeathCrt(e.target.files[0])}
                        style={{
                            marginTop: "2%",
                            marginBottom: "5%",
                            width: "300px",
                            height: "70px",
                            textAlign: "center",
                            fontSize: "18px",
                        }}
                    />
                </div>
                <div>
                    <label> Upload Nominee Id Proof *</label>
                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setNommineProof(e.target.files[0])}
                        style={{
                            marginBottom: "7%",
                            width: "250px",
                            height: "70px",
                            textAlign: "center",
                            fontSize: "16px",
                        }}
                    />
                </div>
                <button
                    onClick={(e) => submitData(e)}
                    style={{
                        marginTop: "2%",
                        width: "130px",
                        height: "50px",
                        textAlign: "center",
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
        </div>
    );
}

export default TermClaim;
