import "./MainPage.css";
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { RxCaretSort } from "react-icons/rx";


const MainPage = () => {
  const columns = [
    { field: 'Order ID', headerName: 'Order ID', width: 150 },
    { field: 'Status', headerName: 'Status', width: 220 },
    { field: 'Transaction ID', headerName: 'Transaction ID', width: 220 },
    { field: 'Refund date', headerName: 'Refund date', width: 220 },
    { field: 'Order amount', headerName: 'Order amount', width: 220 },
  ];

  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
    const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const handleSortClick = (field) => {
    // Toggle sorting order if the same field is clicked again
    setSortOrder((prevOrder) => (sortField === field ? (prevOrder === 'asc' ? 'desc' : 'asc') : 'asc'));
    setSortField(field);
  };

  const handleDownloadClick = () => {
    // Convert rows data to JSON string
    const jsonData = JSON.stringify(filteredRows, null, 2);

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a link element and trigger a click event to download the JSON file
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.json';
    a.click();
  }

  useEffect(() => {
    // Dummy data for demonstration purposes
    const dummyData = [
      { id: 1, 'Order ID': '123', Status: 'Pending', 'Transaction ID': '456', 'Refund date': '2022-01-10', 'Order amount': 50 },
      { id: 2, 'Order ID': '124', Status: 'Pending', 'Transaction ID': '456', 'Refund date': '2022-01-10', 'Order amount': 50 },
      { id: 3, 'Order ID': '125', Status: 'Pending', 'Transaction ID': '456', 'Refund date': '2022-01-10', 'Order amount': 50 },
      { id: 4, 'Order ID': '126', Status: 'Pending', 'Transaction ID': '456', 'Refund date': '2022-01-10', 'Order amount': 50 },
      { id: 5, 'Order ID': '127', Status: 'Pending', 'Transaction ID': '456', 'Refund date': '2022-01-10', 'Order amount': 50 },
      { id: 6, 'Order ID': '128', Status: 'Pending', 'Transaction ID': '456', 'Refund date': '2022-01-10', 'Order amount': 50 },
      // Add more dummy data as needed
    ];

    setRows(dummyData);
    setFilteredRows(dummyData);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value);

    const filteredData = rows.filter((row) =>
      row['Order ID'].toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRows(filteredData);
  };

  return (
    <main className='wholeMainPage'>
      <div className="row">
        <Sidebar></Sidebar>
        <div className="col-md-10 middleContent">
          <Navbar></Navbar>
          <div className="row">
            <div className="box" style={{ height: "24vh", width: "70vw",
             marginLeft:"5%",marginTop:"2%" }}>
              <p style={{fontSize:"1.6rem",fontWeight:"600"}}>
                Overview
              </p>
              <div className="row">
              <div className="col-4">
              <div class="card" style={{
                boxShadow:"0px 10px -14px 14px grey",
              
              }}>
      <div className="card-body" style={{background:" rgba(20, 110, 180, 1)", color:"#fff",borderRadius:"5px"}}>
        <p className="card-title">Next Payout</p>
        <h4 className="card-text">$ 2,312.23 <small style={{color:"#fff",textDecoration:"underline", fontWeight:"400", fontSize:"1rem", marginLeft:"30%"}}> 23 orders <FaChevronRight/> </small></h4>
        <div className="row" style={{marginBottom:"-5%",background:"rgba(14, 79, 130, 1)",borderRadius:"5px",padding:"8px",}}>
          <div className="col-6">Next Payout date:</div>
          <div className="col-6">Today, 04:00 PM</div>
        </div>
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>


              </div>
              <div className="col-4">
              
              <div class="card" style={{
                boxShadow:"0px 10px -14px 14px grey",
              
              }}>
      <div className="card-body">
        <p className="card-title">Amount Pending</p>
        <h4 className="card-text">$ 92,312.20 <small style={{color:"blue",textDecoration:"underline", fontWeight:"400", fontSize:"1rem", marginLeft:"28%"}}> 13 orders <FaChevronRight/> </small></h4>
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
              </div>
              <div className="col-4">

              <div class="card" style={{
                boxShadow:"0px 10px -14px 14px grey",
              
              }}>
      <div className="card-body">
        <p className="card-title">Amount Processed</p>
        <h4 className="card-text">$ 23,92,312.20 </h4>
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
              </div>
              </div>
            </div>
            <div className="row" style={{fontSize:"1.6rem", fontWeight:"600",margin:"10px", padding:"5px", marginLeft:"4%"}}>
              Transaction | This Month
            </div>
            <div className="row mb-2 ml-2" style={{marginLeft:"4%"}}>
              
              <div className="btn1 col-2" style={{cursor:"pointer",
               background:" rgba(230, 230, 230, 1)",borderRadius:"20px",
               color:"black", padding:"5px",width:"120px", 
               textAlign:"center",}} >Payouts(22)</div>
              <div className="btn2 col-2" style={{cursor:"pointer",
               background:" rgba(20, 110, 180, 1)",borderRadius:"20px",
               color:"white" , padding:"5px",width:"120px",
               textAlign:"center", marginLeft:"5px"}}>Refunds(6)</div>
              </div>
            
            <div className="row " style={{marginLeft:"4%"}} >
              <div className="col-4">
              <TextField
                label="Search Order ID."
                variant="outlined"
                size="small"
                value={searchText}
                onChange={handleInputChange}
              />
              </div>
              <div className="col-6"></div>
          <div className="col-2"style={{marginBottom:"5px"}}>
          <div style={{ marginBottom: '10px' }}>
          <span style={
            {
              cursor:"pointer",
              marginRight: '10px' ,
              fontSize:"1.2rem",
              border:"1px solid grey",
              borderRadius:"5px",
              padding:"5px"
              

            }
          }
            variant="contained"
            onClick={() => handleSortClick('Order ID')}
           
          >
            Sort <RxCaretSort></RxCaretSort>
          </span>
          <span variant="contained"  style={{cursor:"pointer", fontSize:"1.5rem",paddingLeft:"5px",paddingRight:"5px", border:"1px solid grey", borderRadius:"5px"}} onClick={handleDownloadClick}>
            <MdOutlineFileDownload variant="contained" onClick={handleDownloadClick}></MdOutlineFileDownload>
          </span>
              </div>
              
              </div>
              </div>



             <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            headerClassName="header-row"
            getRowId={(row) => row.id}
            columns={columns}
            pageSize={5}
            checkboxSelection
            sortModel={[
              {
                field: sortField,
                sort: sortOrder,
              },
            ]}
            onSortModelChange={(model) => {
              if (model.length > 0) {
                handleSortClick(model[0].field);
              }
            }}
          />
        </div>
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
