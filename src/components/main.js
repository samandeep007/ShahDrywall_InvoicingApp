import { useState } from "react";
import { RiHome2Line } from "react-icons/ri";
import { FaCalculator } from "react-icons/fa";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Navbar from "./navbar";
import TabNavigation from "./TabNavigation";
import HomePage from "./cards";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      lineHeight: 1.5,
      flexDirection: "column",
      backgroundColor: "rgb(249 249 249)"
    },
    section: {
      marginBottom: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      color: "white",
      backgroundColor: "rgb(8, 8, 34)",
      padding: "20px"
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
        fontWeight: "bold"
      
    },
    rows: {
     marginLeft: "30px",
     fontSize: 14
    },
    companyName: {
        fontWeight: "bold",
        fontSize: "20px"
    },
    total: {
      fontSize: "16px",
      fontWeight: "bold",
      marginLeft: "30px"
    }
  });
  

export default function Main() {
  const [fourteen, setFourteen] = useState("");
  const [twelve, setTwelve] = useState("");
  const [ten, setTen] = useState("");
  const [nine, setNine] = useState("");
  const [eight, setEight] = useState("");
  const [twelve54, setTwelve54] = useState("");
  const [ten54, setTen54] = useState("");
  const [eight54, setEight54] = useState("");
  const [address, setAddress] = useState("");

  const totalArea =
    (fourteen * 56) +
    (twelve * 48) +
    (ten * 40) +
    (nine * 36) +
    (eight * 32) +
    (twelve54 * 54) +
    (ten54 * 45) +
    (eight54 * 36);


    const generateInvoice = () => {
        const docDefinition = {
          content: [
            {
              text: "SHAH Drywall Ltd.",
              style: "header",
            },
            {
              text: "Company Address",
              style: "subheader",
            },
            {
              text: "Second Company Name",
              style: "subheader",
              alignment: "right",
            },
            {
              text: "House Address from Form", // Replace with the actual value from the form
              style: "address",
            },
            {
              table: {
                headerRows: 1,
                widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
                body: [
                  ["Sheet Size", "14 ft", "12 ft", "10 ft", "9 ft", "8 ft", "12 ft", "10 ft", "8 ft"],
                  ["Quantity", fourteen, twelve, ten, nine, eight, twelve54, ten54, eight54], // Replace with the corresponding state values
                ],
              },
            },
            {
              text: `Total Area: ${totalArea} sq.ft`,
              style: "total",
            },
          ],
          styles: {
            header: {
              fontSize: 24,
              bold: true,
              marginBottom: 10,
            },
            subheader: {
              fontSize: 12,
              marginBottom: 5,
            },
            address: {
              fontSize: 12,
              marginBottom: 10,
            },
            total: {
              fontSize: 14,
              bold: true,
              marginTop: 10,
              marginLeft: "30px"
            },
            
          },
        };
      
        pdfMake.createPdf(docDefinition).download();
      };

      
    
  return (
    <div className="flex flex-col h-screen">
     <Navbar/>
    

      {/* Main Content */}
      <div className="flex-grow p-8 flex items-center justify-center">
  <div className="max-w-3xl  mt-10 bg-white rounded-lg shadow-lg p-8">
  <div className="mb-4">
            <label htmlFor="address" className="block font-bold text-2xl mb-2 font-medium text-gray-900">
              House Address
            </label>
            <input
              name="address"
              type="text"
              onChange={(e)=>{setAddress(e.target.value)}}
              placeholder="Enter address"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
            />
          </div>

        <h1 className="text-2xl font-bold mb-4">48 Sheets</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="fourteen" className="block text-lg font-medium text-gray-700">
              14 ft
            </label>
            <input
              name="fourteen"
              type="number"
              placeholder="0"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              onChange={(e) => {
                setFourteen(parseInt(e.target.value));
              }}
            />
          </div>
          <div>
            <label htmlFor="twelve" className="block text-lg font-medium text-gray-700">
              12 ft
            </label>
            <input
              name="twelve"
              type="number"
              placeholder="0"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              onChange={(e) => {
                setTwelve(parseInt(e.target.value));
              }}
            />
          </div>
          <div>
            <label htmlFor="ten" className="block text-lg font-medium text-gray-700">
              10 ft
            </label>
            <input
              name="ten"
              type="number"
              placeholder="0"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              onChange={(e) => {
                setTen(parseInt(e.target.value));
              }}
            />
          </div>
          <div>
            <label htmlFor="nine" className="block text-lg font-medium text-gray-700">
              9 ft
            </label>
            <input
              name="nine"
              type="number"
              placeholder="0"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              onChange={(e) => {
                setNine(parseInt(e.target.value));
              }}
            />
          </div>
          <div>
            <label htmlFor="eight" className="block text-lg font-medium text-gray-700">
              8 ft
            </label>
            <input
              name="eight"
              type="number"
              placeholder="0"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              onChange={(e) => {
                setEight(parseInt(e.target.value));
              }}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">54 Sheets</h1>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="twelve54" className="block text-lg font-medium text-gray-700">
              12 ft
            </label>
            <input
              name="twelve54"
              type="number"
              placeholder="0"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              onChange={(e) => {
                setTwelve54(parseInt(e.target.value));
              }}
            />
          </div>
          <div>
            <label htmlFor="ten54" className="block text-lg font-medium text-gray-700">
              10 ft
            </label>
            <input
              name="ten54"
              type="number"
              placeholder="0"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              onChange={(e) => {
                setTen54(parseInt(e.target.value));
              }}
            />
          </div>
          <div>
            <label htmlFor="eight54" className="block text-lg font-medium text-gray-700">
              8 ft
            </label>
            <input
              name="eight54"
              type="number"
              placeholder="0"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 rounded-md"
              onChange={(e) => {
                setEight54(parseInt(e.target.value));
              }}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">
          Total Area: {totalArea} sq.ft
        </h1>

        <PDFDownloadLink 
  document={
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
            <View style={styles.company}>
          <Text>
            <Text style={styles.companyName}>SHAH Drywall Ltd.</Text>
          </Text>
          <Text>
            <Text style={{ display: "inline" }}>6014 Saddlehorn Dr NE, T3J 4M4</Text>
          </Text>
          </View>
          <View style={styles.company}>
          <Text>
            <Text style={styles.companyName}>DOVMAR Drywall Ltd.</Text>
          </Text>
          <Text>
            <Text style={{ display: "inline" }}>74 Walden Manor SE, T2X 0N1</Text>
          </Text>
       
        </View>
    
        </View>
        <View style={{marginTop: "10px", fontSize: "16px", margin: "0 auto"}}><Text>Invoice</Text></View>
        <View >
        <Text style={{ marginBottom: "20px", fontSize: "14px", marginLeft: "30px"}}> 
            House Address: <Text >{address}</Text>
          </Text>
          </View>
          <View style={styles.table}>
          <View style={styles.company}>
          <Text>Sheet Size</Text>
          <Text>14 ft</Text>
          <Text>12 ft</Text>
          <Text>10 ft</Text>
          <Text>9 ft</Text>
          <Text>8 ft</Text>
          <Text>12 ft (54)</Text>
          <Text>10 ft (54)</Text>
          <Text>8 ft (54)</Text>
        </View>
        

        <View style={styles.rows}>
          <Text>Quantity</Text>
          <Text>{fourteen}</Text>
          <Text>{twelve}</Text>
          <Text>{ten}</Text>
          <Text>{nine}</Text>
          <Text>{eight}</Text>
          <Text>{twelve54}</Text>
          <Text>{ten54}</Text>
          <Text>{eight54}</Text>
        </View>
        </View>
        <View>
          <Text style={styles.total}>Total Area: {totalArea} sq.ft</Text>
        </View>
      </Page>
    </Document>
  }
  fileName="invoice.pdf"
>
  {({ blob, url, loading, error }) =>
    loading ? "Generating Invoice..." : "Download Invoice"
  }
</PDFDownloadLink>

      </div>
      </div>


    



 
    </div>
  );
}
