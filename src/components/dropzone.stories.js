import React from "react";
import Dropzone from "./dropzone";
import CSVFileValidator from 'csv-file-validator';

export default {
    component: Dropzone,
    title: "Dropzone"
}

export const dropZone = () => <Dropzone />

CSVFileValidator(file, config)
    .then(csvData => {
        csvData.data // Array of objects from file
        csvData.inValidMessages // Array of error messages
    })
    .catch(err => {})


    const config = {
        headers: [
            {
                name: 'Date',
                inputName: 'date',
                required: true,
                requiredError: function (headerName, rowNumber, columnNumber) {
                    return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`
                }
            },
            {
                name: 'Startup',
                inputName: 'companyname',
                requiredError: function (headerName, rowNumber, columnNumber) {
                    return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`
                }
            },
            {
                name: 'Engagement',
                inputName: 'engagement',
                required: true,
                requiredError: function (headerName, rowNumber, columnNumber) {
                    return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`
                }
            },
            {
                name: 'Partner, Investor, Organization',
                inputName: 'Investor',
                required: true,
                requiredError: function (headerName, rowNumber, columnNumber) {
                    return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`
                }
            },
            {
            name: 'Notes',
            inputName: 'notes', 
            required: false
            },
        ]
    }
