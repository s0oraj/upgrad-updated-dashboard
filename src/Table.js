import React, { useState, useRef } from 'react';
import './Table.css';
import { TextField } from '@mui/material';
import searchIcon from './images/search.png';
import jsonIcon from './images/json.png';
import csvIcon from './images/csv.png';
import excelIcon from './images/excel.png';
import pdfIcon from './images/pdf.png';
import tableData from './tableData';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Table = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(tableData);
  const exportButtonRef = useRef(null);

  // Handle search logic
  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchValue(searchQuery);

    // Filter data based on searchQuery using filteredData
    const filteredResults = tableData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    setFilteredData(filteredResults);
  };

  // Export data as JSON
  const handleExportJSON = () => {
    const jsonData = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tableData.json';
    a.click();
  };

  // Export data as CSV
  const handleExportCSV = () => {
    const header = Object.keys(filteredData[0]).join(',');
    const csv = [header, ...filteredData.map((item) => Object.values(item).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tableData.csv';
    a.click();
  };

  // Export data as Excel
  const handleExportExcel = () => {
    const header = Object.keys(filteredData[0]);
    const data = filteredData.map((item) => Object.values(item));

    const worksheet = XLSXUtils.aoa_to_sheet([header, ...data]);
    const workbook = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(workbook, worksheet, 'Student Details');

    XLSXWriteFile(workbook, 'tableData.xlsx');
  };

  // Export data as PDF
  const handleExportPDF = () => {
    const tableRef = exportButtonRef.current;
    if (!tableRef) return;

    html2canvas(tableRef).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save('tableData.pdf');
    });
  };

  
  return (
    <main className="table">
      <section className="table__header">
           <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.5' }}>
          
          Student's Details
        </h1>
        <div className="input-group">
          <TextField
            type="search"
            variant="outlined"
            placeholder="Search Data..."
            value={searchValue}
            onChange={handleSearch}
            InputProps={{
              endAdornment: <img src={searchIcon} alt="" />,
            }}
          />
        </div>
        <div className="export__file">
          <label htmlFor="export-file" className="export__file-btn" title="Export File"></label>
          <input type="checkbox" id="export-file" ref={exportButtonRef} />
          <div className="export__file-options">
            <label>Export As &nbsp; &#10140;</label>
            <label htmlFor="export-file" onClick={handleExportJSON}>
              JSON <img src={jsonIcon} alt="" />
            </label>
            <label htmlFor="export-file" onClick={handleExportCSV}>
              CSV <img src={csvIcon} alt="" />
            </label>
            <label htmlFor="export-file" onClick={handleExportExcel}>
              Excel <img src={excelIcon} alt="" />
            </label>
            <label htmlFor="export-file" onClick={handleExportPDF}>
              PDF <img src={pdfIcon} alt="" />
            </label>
          </div>
        </div>
      </section>
      <section className="table__body">
        <table ref={exportButtonRef}>
          <thead>
            <tr>
              <th style={{ fontSize: '20px' }}>Id</th>
              <th style={{ fontSize: '20px' }}>Student</th>
              <th style={{ fontSize: '20px' }}>Course</th>
              <th style={{ fontSize: '20px' }}>Date of Birth</th>
              <th style={{ fontSize: '20px' }}>Status</th>
              <th style={{ fontSize: '20px' }}>CGPA</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <div className="student-image">
                    <img src={row.image} alt={row.name} />
                    {row.name}
                  </div>
                </td>
                <td>{row.course}</td>
                <td>{row.dateOfBirth}</td>
                <td>{row.status}</td>
                <td>{row.cgpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Table;
