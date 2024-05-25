// src/MortgageForm.js
import React, { useState } from 'react';
import axios from 'axios';

const MortgageForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    price: '',
    streetAddress: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, email, price, streetAddress, city } = formData;
    const date = new Date().toISOString().split('T')[0];

    const soapEnvelope = `<?xml version="1.0"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
                   xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns="http://com.mortgagecoach.edgeinterface">
        <soap:Header>
            <AuthHeader>
                <APIKey>ba974edd92e3d517</APIKey>
                <applicationKey>9611b597c0b805cb34c1</applicationKey>
            </AuthHeader>
        </soap:Header>
        <soap:Body>
            <saveEnterpriseClient>
                <reportType>0</reportType>
                <userName>brad@asklocal.com</userName>
                <client>
                    <clientId xsi:nil="true"/>
                    <contact>
                        <contactId xsi:nil="true"/>
                        <userId xsi:nil="true"/>
                        <firstName>${firstName}</firstName>
                        <lastName>Name</lastName>
                        <analysis>
                            <analysisId xsi:nil="true"/>
                            <contactId xsi:nil="true"/>
                            <isAutomation>true</isAutomation>
                            <property>
                                <propertyId xsi:nil="true"/>
                                <address>
                                    <AddressId xsi:nil="true"/>
                                    <StreetAddress>${streetAddress}</StreetAddress>
                                    <City>${city}</City>
                                    <State>null</State>
                                    <Zip>string</Zip>
                                    <userMail>${email}</userMail>
                                </address>
                                <propertyValue>${price}</propertyValue>
                            </property>
                            <clientAnalysis>
                                <clientAnalysisId xsi:nil="true"/>
                                <analysisId xsi:nil="true"/>
                                <buyLargerHomeGoal>true</buyLargerHomeGoal>
                                <reportType>0</reportType>
                            </clientAnalysis>
                            <loanProducts>
                                <!-- Loan Products Definitions as per your XML -->
                            </loanProducts>
                            <reports>
                                <AnalysisReport>
                                    <reportId xsi:nil="true"/>
                                    <reportType>0</reportType>
                                    <sendReadReceipt>true</sendReadReceipt>
                                    <quoteDate>${date}</quoteDate>
                                    <midTermMonths>60</midTermMonths>
                                    <longTermMonths>180</longTermMonths>
                                    <longTermChartType>2</longTermChartType>
                                </AnalysisReport>
                            </reports>
                        </analysis>
                    </contact>
                </client>
            </saveEnterpriseClient>
        </soap:Body>
    </soap:Envelope>`;

    try {
      const response = await axios.post('https://edge.mortgagecoach.com/EdgeInterface/EdgeInterface.asmx', soapEnvelope, {
        headers: {
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://com.mortgagecoach.edgeinterface/saveEnterpriseClient'
        }
      });

      console.log('Response:', response.data);
      // Optionally clear the form here
      setFormData({
        firstName: '',
        email: '',
        price: '',
        streetAddress: '',
        city: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Street Address:</label>
        <input
          type="text"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Send
      </button>
    </form>
  );
};

export default MortgageForm;
