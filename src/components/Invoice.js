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
      extraCharges: "",
      extraChargesFor: "",
      floors: "",
    },
  ]);
  const [helper, setHelper] = useState({ name: "", amount: "" });

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
    const extraCharges = parseFloat(updatedAddresses[index].extraCharges || 0);
    updatedAddresses[index].amount = (
      area * (rate / 100) +
      extraCharges
    ).toFixed(2);
    setAddresses(updatedAddresses);
  };

  const handleExtraChargesChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].extraCharges = value;
    const area = parseFloat(updatedAddresses[index].area || 0);
    const rate = parseFloat(updatedAddresses[index].rate || 0);
    const extraCharges = parseFloat(value || 0);
    updatedAddresses[index].amount = (
      area * (rate / 100) +
      extraCharges
    ).toFixed(2);
    setAddresses(updatedAddresses);
  };

  const handleExtraChargesForChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].extraChargesFor = value;
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
        extraCharges: "",
        extraChargesFor: "",
        floors: "",
      },
    ]);
  };

  const handleHelperName = (value) => {
    setHelper({ name: value, amount: null });
  };

  const handleHelperAmount = (value) => {
    setHelper({ name: helper.name, amount: value });
  };

  const totalAmount = addresses.reduce((total, address) => {
    const amount = parseFloat(address.amount || 0);
    return total + amount;
  }, 0);

  const totalArea = addresses.reduce((total, address) => {
    return total + parseFloat(address.area || 0);
  }, 0);

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      lineHeight: 1.5,
      flexDirection: "column",
      backgroundColor: "rgb(249 249 249)",
    },
    section: {
      marginBottom: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      color: "white",
      backgroundColor: "rgb(8, 8, 34)",
      padding: "20px",
    },
    table: {
      padding: "0 30px",
      marginBottom: 40,
      flexDirection: "row",
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    company: {
      flexDirection: "column",
      fontSize: 14,
      fontWeight: "bold",
    },
    rows: {
      marginLeft: "30px",
      marginBottom: "30px",
      fontSize: 14,
    },
    companyName: {
      fontWeight: "bold",
      fontSize: "20px",
    },
    total: {
      fontSize: "16px",
      fontWeight: "bold",
      marginLeft: "30px",
    },
  });

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
              className={`mb-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
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
                className="border-gray-300 bg-gray-100 block w-full sm:text-sm border p-2 rounded-md"
              />
              <label
                htmlFor={`extraCharges${index}`}
                className="block font-bold text-xl mb-2 font-medium text-gray-900"
              >
                Extra Charges
              </label>
              <input
                id={`extraCharges${index}`}
                name={`extraCharges${index}`}
                type="text"
                value={address.extraCharges}
                onChange={(e) =>
                  handleExtraChargesChange(index, e.target.value)
                }
                placeholder="Enter extra charges"
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              />
              {address.extraCharges > 0 && ( // Only render the input field when extra charges > 0
                <>
                  <label
                    htmlFor={`extraCharges${index}`}
                    className="block font-bold text-xl mb-2 font-medium text-gray-900"
                  >
                    For
                  </label>
                  <input
                    id={`extraChargesfor${index}`}
                    name={`extraChargesfor${index}`}
                    type="text"
                    value={address.extraChargesFor}
                    onChange={(e) =>
                      handleExtraChargesForChange(index, e.target.value)
                    }
                    placeholder="Enter Purpose"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
                  />
                </>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddAddress}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md mb-4"
          >
            Add Address
          </button>

          <div className={`mb-4 bg-gray-100 rounded-md p-4 pb-8`}>
            <h2 className="text-center text-2xl text-gray-900 font-bold p-4">
              Helper Details
            </h2>

            <label
              htmlFor={`helperName`}
              className="block font-bold text-xl mb-2 font-medium text-gray-900"
            >
              Name
            </label>
            <input
              id={`helperName`}
              name={`helperName`}
              type="text"
              value={helper.name}
              onChange={(e) => handleHelperName(e.target.value)}
              placeholder="Enter Name"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
            />

            <label
              htmlFor={`helperAmount`}
              className="block font-bold text-xl mb-2 font-medium text-gray-900"
            >
              Amount
            </label>
            <input
              id={`helperAmount`}
              name={`helperAmount`}
              type="text"
              value={helper.amount}
              onChange={(e) => handleHelperAmount(e.target.value)}
              placeholder="Enter Amount"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
            />
          </div>

          <h2 className="font-bold text-xl  my-4">
            Total Area: {totalArea.toFixed(2)} sq.ft
          </h2>
          <h2 className="font-bold text-xl mb-2">
            Total Amount: ${(totalAmount - helper.amount).toFixed(2)}
          </h2>
          <h2 className="font-bold text-xl  my-4">
            GST @5%: ${(parseFloat((totalAmount - helper.amount).toFixed(2)) * 0.05).toFixed(2)}
          </h2>
          <h2 className="font-bold text-xl  my-4">
            Final Amount: $
            {(
              parseFloat((totalAmount - helper.amount).toFixed(2) * 0.05) +
              parseFloat((totalAmount - helper.amount).toFixed(2))
            ).toFixed(2)}
          </h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <PDFDownloadLink
              document={
                <Document>
                  <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                      <View style={styles.company}>
                        <Text>
                          <Text style={styles.companyName}>
                            SHAH Drywall Ltd.
                          </Text>
                        </Text>
                        <Text>
                          <Text style={{ display: "inline" }}>
                            6014 Saddlehorn Dr NE, T3J 4M4
                          </Text>
                        </Text>
                        <Text>
                          <Text style={{ display: "inline" }}>
                            GST# 838419281RP0001
                          </Text>
                        </Text>
                        <Text>
                          <Text style={{ display: "inline" }}>
                            WCB# 9565188
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.company}>
                        <Text>
                          <Text style={styles.companyName}>
                            DOVMAR Drywall Ltd.
                          </Text>
                        </Text>
                        <Text>
                          <Text style={{ display: "inline" }}>
                            74 Walden Manor SE, T2X 0N1
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: "10px",
                        fontSize: "25px",
                        margin: "0 auto",
                        marginBottom: "20px",
                      }}
                    >
                      <Text>Invoice</Text>
                    </View>
                    <View
                      style={{
                        textAlign: "right",
                        fontSize: "14px",
                        marginRight: "30px",
                      }}
                    >
                      {" "}
                      <Text>Date: {new Date().toLocaleDateString()}</Text>
                    </View>

                    {addresses.map((address, index) => (
                      <View key={index} style={styles.rows}>
                        <Text>House Address: {address.address}</Text>
                        <Text>Floor(s): {address.floors}</Text>
                        <Text>Area: {address.area} sq.ft</Text>
                        <Text>Rate: ¢{address.rate}</Text>
                        {address.extraCharges > 0 && ( // Only render if extra charges > 0
                          <>
                            <Text>Extra Charges: ${address.extraCharges}</Text>
                            <Text>For: {address.extraChargesFor}</Text>
                          </>
                        )}
                        <Text>Amount: ${address.amount}</Text>
                      </View>
                    ))}

                    {helper && (
                    <View  style={styles.rows}>
                      <Text>Helper Name: {helper.name?(helper.name):("N/A")}</Text>
                      <Text>Amount: {helper.name?(helper.amount):("N/A")}</Text>
                    </View>
                    )}


                    <View style={styles.total}>
                      <Text>Total Area: {totalArea.toFixed(2)} sq.ft</Text>
                     <Text>{helper.name ? "Total Amount (Excluding helper): " : "Total Amount: "} ${(totalAmount - helper.amount).toFixed(2)}</Text>
                      <Text>
                        GST @5%: $
                        {(parseFloat((totalAmount - helper.amount).toFixed(2)) * 0.05).toFixed(2)}
                      </Text>
                      <Text>
                        Final Amount: $
                        {(
                          parseFloat((totalAmount - helper.amount).toFixed(2) * 0.05) +
                          parseFloat((totalAmount - helper.amount).toFixed(2))
                        ).toFixed(2)}
                      </Text>
                    </View>
                  </Page>
                </Document>
              }
              fileName="invoice.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Generating Invoice..." : "Generate Invoice"
              }
            </PDFDownloadLink>
          </button>
        </div>
      </div>
      <footer className="bg-gray-200 text-center p-4">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Shah Drywall Ltd. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}
