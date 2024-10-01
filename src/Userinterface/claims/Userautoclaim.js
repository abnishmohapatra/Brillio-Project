import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import claimimage from "../../images/userimages/claimpage.png";
import './userautoclaim.css';
import Navbar1 from '../Usernavbar';

function AutoClaim() {
    const [vehicleModelNo, setVehicleModelNo] = useState('');
    const [licensePlateNo, setLicensePlateNo] = useState('');
    const [exShowroomPrice, setExShowroomPrice] = useState('');
    const [vehicleAge, setVehicleAge] = useState('');
    const [driverAge, setDriverAge] = useState('');
    const [incidentDateTime, setIncidentDateTime] = useState('');
    const [damageDescription, setDamageDescription] = useState('');
    const [repairCost, setRepairCost] = useState('');
    const [photoOfDamage, setPhotoOfDamage] = useState(null);
    const [status, setStatus] = useState('Pending');
    const [formValid, setFormValid] = useState(false);
    const [res, setRes] = useState("");
    const location = useLocation();
    const { userpolicyId } = location.state || {};

    const handleVehicleModelNoChange = (event) => {
        setVehicleModelNo(event.target.value);
    };

    const handleLicensePlateNoChange = (event) => {
        setLicensePlateNo(event.target.value);
    };

    const handleExShowroomPriceChange = (event) => {
        setExShowroomPrice(event.target.value);
    };

    const handleVehicleAgeChange = (event) => {
        setVehicleAge(event.target.value);
    };

    const handleDriverAgeChange = (event) => {
        setDriverAge(event.target.value);
    };

    const handleIncidentDateTimeChange = (event) => {
        setIncidentDateTime(event.target.value);
    };

    const handleDamageDescriptionChange = (event) => {
        setDamageDescription(event.target.value);
    };

    const handleRepairCostChange = (event) => {
        setRepairCost(event.target.value);
    };

    const handleFileChange = (event) => {
        setPhotoOfDamage(event.target.files[0]);
    };

    const validateForm = () => {
        return (
            vehicleModelNo !== '' &&
            licensePlateNo !== '' &&
            exShowroomPrice !== '' &&
            vehicleAge !== '' &&
            driverAge !== '' &&
            incidentDateTime !== '' &&
            damageDescription !== '' &&
            repairCost !== '' &&
            photoOfDamage !== null
        );
    };

    const submitData = async (e) => {
        e.preventDefault();
        if (!vehicleModelNo || !licensePlateNo || !exShowroomPrice || !vehicleAge || !driverAge || !incidentDateTime || !damageDescription || !repairCost || !photoOfDamage) {
            alert("Please fill out all mandatory fields before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append('vehicleModelNo', vehicleModelNo);
        formData.append('licensePlateNo', licensePlateNo);
        formData.append('exShowroomPrice', exShowroomPrice);
        formData.append('vehicleAge', vehicleAge);
        formData.append('incidentTime', incidentDateTime);
        formData.append('driverAge', driverAge);
        formData.append('damageDescription', damageDescription);
        formData.append('damageCost', repairCost);
        formData.append('photoOfDamage', photoOfDamage);
        formData.append('status', status);
        formData.append('userPolicyId', userpolicyId);

        try {
            const response = await axios.post('http://localhost:8007/auto-claims/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            setRes(response);
            if (response?.status === 201) {
                alert("Submitted Successfully");
            }
        } catch (error) {
            if (error.response) {
                console.error('Server responded with error data:', error.response.data);
                console.error('Status code:', error.response.status);
                console.error('Headers:', error.response.headers);
                alert('Claim submission failed: ' + error?.response?.data?.message);
            } else if (error.request) {
                console.error('No response received:', error.request);
                alert('No response received from server. Please try again later.');
            } else {
                console.error('Error setting up request:', error.message);
                alert('Error setting up request. Please try again later.');
            }
            console.error('Error submitting claim:', error);
        }
    };

    return (
        <div className='autoclaimbody'>
        <Navbar1/>
        <div className='auto-claim-top'>
            <div className='auto-claim-text'>
                <p id='auto-claim-title'>Auto Insurance</p>
                <p id='auto-claim-msg'>Shielding your Journey with reliable coverage</p>
            </div>
            <div className='auto-claim-form'>
                <h4 style={{textAlign:'center'}}>Claim Request</h4>
                <div className='auto-claim-formlevel0'>
                    <div className='auto-claim-formlevel1'>
                        <div className='auto-claim-formlevel2'>
                            <label>Vehicle Model No *</label>
                            <input
                                type='text'
                                className='auto-claim-textfield'
                                value={vehicleModelNo}
                                onChange={handleVehicleModelNoChange}
                            />
                        </div>
                        <div className='auto-claim-formlevel2'>
                            <label>License Plate No *</label>
                            <input
                                type='text'
                                className='auto-claim-textfield'
                                value={licensePlateNo}
                                onChange={handleLicensePlateNoChange}
                            />
                        </div>
                    </div>
                    <div className='auto-claim-formlevel1'>
                        <div className='auto-claim-formlevel2'>
                            <label>Ex-Showroom Price *</label>
                            <input
                                type='number'
                                className='auto-claim-textfield'
                                value={exShowroomPrice}
                                onChange={handleExShowroomPriceChange}
                            />
                        </div>
                        <div className='auto-claim-formlevel2'>
                            <label>Vehicle Age *</label>
                            <input
                                type='number'
                                className='auto-claim-textfield'
                                value={vehicleAge}
                                onChange={handleVehicleAgeChange}
                            />
                        </div>
                    </div>
                    <div className='auto-claim-formlevel1'>
                        <div className='auto-claim-formlevel2'>
                            <label>Driver’s Age *</label>
                            <input
                                type='number'
                                className='auto-claim-textfield'
                                value={driverAge}
                                onChange={handleDriverAgeChange}
                            />
                        </div>
                        <div className='auto-claim-formlevel2'>
                            <label>Date of Incident *</label>
                            <input
                                type='date'
                                className='auto-claim-textfield'
                                value={incidentDateTime}
                                onChange={handleIncidentDateTimeChange}
                            />
                        </div>
                    </div>
                    <div className='auto-claim-formlevel1'>
                        <div className='auto-claim-formlevel2'>
                            <label>Damage Description *</label>
                            <input
                                type='text'
                                className='auto-claim-textfield'
                                value={damageDescription}
                                onChange={handleDamageDescriptionChange}
                            />
                        </div>
                        <div className='auto-claim-formlevel2'>
                            <label>Repair Cost *</label>
                            <input
                                type='number'
                                className='auto-claim-textfield'
                                value={repairCost}
                                onChange={handleRepairCostChange}
                            />
                        </div>
                        <img src={claimimage} alt="claimimage" className="claimimg"></img>
                    </div>
                    <div className='auto-claim-formlevel2'>
                        <label>Upload Proof Of Damage *</label>
                        <input type='file' onChange={handleFileChange}></input>
                    </div>
                    <div className='auto-claim-formlevel2'>
                        <button style={{ marginTop: '2%' }} className='autobutton' onClick={e=>submitData(e)} >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default AutoClaim;
