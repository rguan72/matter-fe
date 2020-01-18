import CSVFileValidator from "csv-file-validator";

function getOptions(setOptions) {
    fetch(`${process.env.URL}/api/companies`)
      .then(res => res.json())
      .then(res => {
        const options = res.map(comp => ({
          value: comp.name,
          label: comp.name,
        }))
        setOptions(options)
      })
}

function getCompany(company, {setmentorTeam, setmentorClinic, setWorkshop, setmatterEvent, setpartnerEng, setoppCon, setfacUsage}) {
    if (company) {
      fetch(`${process.env.URL}/api/companies/${company}`)
        .then(res => res.json())
        .then(res => {
          // multiply by scores on front end
          setmentorTeam(res.matter_team)
          setmentorClinic(res.mentor_clinic)
          setWorkshop(res.workshop)
          setmatterEvent(res.matter_event)
          setpartnerEng(res.partner_eng)
          setoppCon(res.opp_conn)
          setfacUsage(res.fac)
        })
    } else {
      setmentorTeam("--")
      setmentorClinic("--")
      setWorkshop("--")
      setmatterEvent("--")
      setpartnerEng("--")
      setoppCon("--")
      setfacUsage("--")
    }
}

function validateCSV(file, onErr) {
  const config = {
    headers: [
      {
        name: "Date",
        inputName: "date",
        required: true,
        requiredError: function(headerName, rowNumber, columnNumber) {
          return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`
        },
      },
      {
        name: "Startup",
        inputName: "companyname",
        requiredError: function(headerName, rowNumber, columnNumber) {
          return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`
        },
      },
      {
        name: "Engagement",
        inputName: "engagement",
        required: true,
        requiredError: function(headerName, rowNumber, columnNumber) {
          return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`
        },
      },
      {
        name: "Partner, Investor, Organization",
        inputName: "Investor",
        required: true,
        requiredError: function(headerName, rowNumber, columnNumber) {
          return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`
        },
      },
      {
        name: "Notes",
        inputName: "notes",
        required: false,
      },
    ],
  }
  CSVFileValidator(file, config)
    .then(csvData => console.log(csvData));
// CSVFileValidator(file, config)
//   .then(csvData => ({
//     data: csvData.data, // Array of objects from file
//     invalid: csvData.inValidMessages // Array of error messages
//   }))
//   .catch(err => onErr(err))
}


export { getOptions, getCompany, validateCSV }