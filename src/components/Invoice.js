import React from "react";
import Navbar from "./navbar";
import { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export default function Invoice() {
  const [addresses, setAddresses] = useState([
    {
      address: "",
      area: "",
      rate: "",
      amount: "",
      soundBars: "", // Replaced extraCharges with soundBars
      floors: "",
    },
  ]);
  const [helpers, setHelpers] = useState([{ name: "", amount: "" }]);

  const handleAddressChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].address = value;
    setAddresses(updatedAddresses);
  };

  const handleAreaChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].area = value;
    setAddresses(updatedAddresses);
  };

  const handleRateChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].rate = value;
    const area = parseFloat(updatedAddresses[index].area || 0);
    const rate = parseFloat(value || 0);
    const soundBars = parseFloat(updatedAddresses[index].soundBars || 0); // Updated to soundBars
    updatedAddresses[index].amount = (
      area * (rate / 100) +
      soundBars // Included soundBars in amount calculation
    ).toFixed(2);
    setAddresses(updatedAddresses);
  };

  const handleSoundBarsChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].soundBars = value; // Updated to soundBars
    const area = parseFloat(updatedAddresses[index].area || 0);
    const rate = parseFloat(updatedAddresses[index].rate || 0);
    const soundBars = parseFloat(value || 0);
    updatedAddresses[index].amount = (
      area * (rate / 100) +
      soundBars // Included soundBars in amount calculation
    ).toFixed(2);
    setAddresses(updatedAddresses);
  };

  const handleFloorsChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].floors = value;
    setAddresses(updatedAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        address: "",
        area: "",
        rate: "",
        amount: "",
        soundBars: "", // Replaced extraCharges with soundBars
        floors: "",
      },
    ]);
  };


  const handleHelperChange = (index, field, value) => {
    const updatedHelpers = [...helpers];
    updatedHelpers[index][field] = value;
    setHelpers(updatedHelpers);
  };

  const handleAddHelper = () => {
    setHelpers([...helpers, { name: "", amount: "" }]);
  };

  const totalAmount = addresses.reduce((total, address) => {
    const amount = parseFloat(address.amount || 0);
    return total + amount;
  }, 0);

  const totalHelperAmount = helpers.reduce((total, helper) => {
    return total + parseFloat(helper.amount || 0);
  }, 0);

  const adjustedTotalAmount = totalAmount - totalHelperAmount; 
  const gstAmount = adjustedTotalAmount * 0.05; 
  const finalAmount = adjustedTotalAmount + gstAmount; 


  const totalArea = addresses.reduce((total, address) => {
    return total + parseFloat(address.area || 0);
  }, 0);


  pdfMake.vfs = pdfFonts.pdfMake.vfs;


  const generatePdf = () => {
    // Calculate total helpers' amount
    const totalHelpersAmount = helpers.reduce((sum, helper) => sum + parseFloat(helper.amount || 0), 0);
    
    // Deduct helpers' amount from final amount before calculating GST
    const adjustedFinalAmount = totalAmount - totalHelpersAmount;
    const gstAmount = adjustedFinalAmount * 0.05; // Calculate GST on the adjusted amount
    const grandTotal = adjustedFinalAmount + gstAmount; // Grand total includes GST
  
    const docDefinition = {
      content: [
        {
          columns: [
            {
              stack: [
                { text: "Shah Drywall Ltd.", style: "companyName" },
                { text: "6014 Saddlehorn Dr NE, T3J 4M4", style: "companyAddress" },
                { text: "GST Number: 123456789", style: "companyAddress" },
              ],
              alignment: "left",
            },
          ],
          margin: [0, 0, 0, 20],
        },
        { text: "Invoice", style: "header" },
        {
          columns: [
            {
              stack: [
                { text: `Date: ${new Date().toLocaleDateString()}`, style: "date" },
                { text: "Recipient: Dovmar Drywall Ltd.", style: "recipient" },
                { text: "Recipient Address: 74 Walden Manor SE, T2X 0N1", style: "recipientAddress" },
              ],
              alignment: "left",
            },
          ],
          margin: [0, 0, 0, 20],
        },
        {
          table: {
            headerRows: 1,
            widths: [120, 50, 50, 50, 50, 70],
            body: [
              [
                { text: "Address", style: "tableHeader" },
                { text: "Area (sqft)", style: "tableHeader" },
                { text: "Floors", style: "tableHeader" },
                { text: "Rate (%)", style: "tableHeader" },
                { text: "Sound Bars ($)", style: "tableHeader" },
                { text: "Amount ($)", style: "tableHeader" },
              ],
              ...addresses.map((address) => [
                { text: address.address, style: "tableCell", alignment: "left" },
                { text: `${address.area} sqft`, style: "tableCell", alignment: "center" },
                { text: `${address.floors}`, style: "tableCell", alignment: "center" },
                { text: `${address.rate}%`, style: "tableCell", alignment: "center" },
                { text: `$${address.soundBars}`, style: "tableCell", alignment: "center" },
                { text: `$${address.amount}`, style: "tableCell", alignment: "center" },
              ]),
              [
                { text: "Total", colSpan: 5, alignment: "right", style: "totalCell" },
                {}, {}, {}, {},
                { text: `$${totalAmount.toFixed(2)}`, style: "totalCell" },
              ],
              [
                { text: "Helpers Total", colSpan: 5, alignment: "right", style: "totalCell" },
                {}, {}, {}, {},
                { text: `-$${totalHelpersAmount.toFixed(2)}`, style: "totalCell" },
              ],
              [
                { text: "Final Amount", colSpan: 5, alignment: "right", style: "totalCell" },
                {}, {}, {}, {},
                { text: `$${totalAmount.toFixed(2) - totalHelperAmount.toFixed(2)}`, style: "totalCell" },
              ],
              [
                { text: "GST (5%)", colSpan: 5, alignment: "right", style: "totalCell" },
                {}, {}, {}, {},
                { text: `$${gstAmount.toFixed(2)}`, style: "totalCell" },
              ],
              [
                { text: "Grand Total", colSpan: 5, alignment: "right", style: "totalCell" },
                {}, {}, {}, {},
                { text: `$${grandTotal.toFixed(2)}`, style: "totalCell" },
              ],
            ],
          },
          layout: {
            hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 1 : 0.5),
            vLineWidth: () => 0.5,
            hLineColor: (i) => (i === 0 ? "black" : "#aaa"),
            vLineColor: () => "#aaa",
            paddingLeft: () => 10,
            paddingRight: () => 10,
            paddingTop: () => 5,
            paddingBottom: () => 5,
          },
        },
        // Conditionally render helpers section
        ...(helpers.length > 0 && helpers[0].name !== "" ? [
          {
            text: "Helpers", style: "helpersHeader", margin: [0, 20, 0, 10],
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', 70],
              body: [
                [
                  { text: "Helper Name", style: "tableHeader" },
                  { text: "Amount ($)", style: "tableHeader" },
                ],
                ...helpers.map(helper => [
                  { text: helper.name, style: "tableCell" },
                  { text: `$${helper.amount}`, style: "tableCell" },
                ]),
              ],
            },
            layout: 'lightHorizontalLines',
          },
        ] : []),
        {
          text: "Thank you for your business!", style: "thankYou", alignment: "center", margin: [0, 20, 0, 0],
        },
      ],
      styles: {
        companyName: {
          fontSize: 14,
          bold: true,
          marginBottom: 2,
        },
        companyAddress: {
          fontSize: 10,
          marginBottom: 2,
        },
        date: {
          fontSize: 10,
          marginBottom: 2,
        },
        recipient: {
          fontSize: 12,
          bold: true,
          marginBottom: 2,
        },
        recipientAddress: {
          fontSize: 10,
          marginBottom: 2,
        },
        header: {
          fontSize: 18,
          bold: true,
          marginBottom: 20,
          alignment: "center",
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: "white",
          fillColor: "#4F4F4F",
        },
        tableCell: {
          fontSize: 10,
          margin: [0, 5, 0, 5],
        },
        totalCell: {
          fontSize: 10,
          bold: true,
          margin: [0, 5, 0, 5],
        },
        helpersHeader: {
          fontSize: 14,
          bold: true,
          marginBottom: 10,
        },
        thankYou: {
          fontSize: 12,
          italics: true,
          margin: [0, 20, 0, 0],
        },
      },
    };
  
    pdfMake.createPdf(docDefinition).download("invoice.pdf");
  };
  


  return (
    <>
      <Navbar />
      <div className="flex-grow p-8 flex items-center justify-center">
        <div
          style={{ marginTop: "80px", width: "650px" }}
          className="w-3xl mt-10 bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="font-bold text-center text-2xl mb-6">
            Invoice Generator
          </h2>
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`mb-4 ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } rounded-md p-4`}
            >
              <label
                htmlFor={`address-${index}`}
                className="block font-bold text-xl mb-2 font-medium text-gray-900"
              >
                House Address
              </label>
              <input
                id={`address-${index}`}
                name={`address-${index}`}
                type="text"
                value={address.address}
                onChange={(e) => handleAddressChange(index, e.target.value)}
                placeholder="Enter address"
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              />

              <label
                htmlFor={`floors-${index}`}
                className="block font-bold text-xl mb-2 font-medium text-gray-900"
              >
                Floor(s)
              </label>
              <input
                id={`floors-${index}`}
                name={`floors-${index}`}
                type="text"
                value={address.floors}
                onChange={(e) => handleFloorsChange(index, e.target.value)}
                placeholder="Enter floor(s)"
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              />

              <label
                htmlFor={`area-${index}`}
                className="block font-bold text-xl mb-2 font-medium text-gray-900"
              >
                Area
              </label>
              <input
                id={`area-${index}`}
                name={`area-${index}`}
                type="text"
                value={address.area}
                onChange={(e) => handleAreaChange(index, e.target.value)}
                placeholder="Enter area"
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              />

              <label
                htmlFor={`rate-${index}`}
                className="block font-bold text-xl mb-2 font-medium text-gray-900"
              >
                Rate
              </label>
              <input
                id={`rate-${index}`}
                name={`rate-${index}`}
                type="text"
                value={address.rate}
                onChange={(e) => handleRateChange(index, e.target.value)}
                placeholder="Enter rate"
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              />

              <label
                htmlFor={`amount-${index}`}
                className="block font-bold text-xl mb-2 font-medium text-gray-900"
              >
                Amount
              </label>
              <input
                id={`amount-${index}`}
                name={`amount-${index}`}
                type="text"
                value={address.amount}
                readOnly
                placeholder="Amount"
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              />

              <label
                htmlFor={`soundBars-${index}`}
                className="block font-bold text-xl mb-2 font-medium text-gray-900"
              >
                Sound Bars
              </label>
              <input
                id={`soundBars-${index}`}
                name={`soundBars-${index}`}
                type="text"
                value={address.soundBars} // Updated to soundBars
                onChange={(e) => handleSoundBarsChange(index, e.target.value)}
                placeholder="Enter sound bars amount"
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              />
            </div>
          ))}

          <div className="mb-4">
            <button
              onClick={handleAddAddress}
              className="bg-indigo-500 text-white font-bold py-2 px-4 rounded"
            >
              Add Another Address
            </button>
          </div>

          {helpers.map((helper, index) => (
            <div key={index} className="mb-4 bg-gray-200 rounded-md p-4">
              <label className="block font-bold text-xl mb-2">Helper Name</label>
              <input type="text" value={helper.name} onChange={(e) => handleHelperChange(index, "name", e.target.value)} placeholder="Enter helper name" className="border-gray-300 block w-full p-2 rounded-md" />
              <label className="block font-bold text-xl mb-2">Helper Amount</label>
              <input type="text" value={helper.amount} onChange={(e) => handleHelperChange(index, "amount", e.target.value)} placeholder="Enter helper amount" className="border-gray-300 block w-full p-2 rounded-md" />
            </div>
          ))}

          <button onClick={handleAddHelper} className="bg-indigo-500 text-white py-2 px-4 rounded">Add Another Helper</button>

          <div className="text-xl font-bold mt-4">
            Total Area: {totalArea.toFixed(2)} sq.ft
          </div>
          <div className="text-xl font-bold mt-4">
            Total Amount: ${adjustedTotalAmount.toFixed(2)}
          </div>
          <div className="text-xl font-bold mt-4">
            GST @5%: ${gstAmount.toFixed(2)}
          </div>
          <div className="text-xl font-bold mt-4">
            Final Amount: ${finalAmount.toFixed(2)}
          </div>

          <div className="mt-8">
            <button
              onClick={generatePdf}
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
