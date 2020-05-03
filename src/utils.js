import CSVFileValidator from "csv-file-validator";

function login(email, password) {
  return fetch(`${process.env.URL}/api/users/login`, { 
    method: "POST",  
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
}

function register(email, password1, password2, regKey) {
  return fetch(`${process.env.URL}/api/users/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password1, password2: password2, registrationKey: regKey})
  })
}

function getOptions(setOptions) {
    return fetch(`${process.env.URL}/api/companies`)
      .then(res => res.json())
      .then(res => {
        const options = res.map(comp => ({
          value: comp.name,
          label: comp.name,
        }))
        setOptions(options)
      })
}

function getCompany(company, token, {setmentorTeam, setmentorClinic, setWorkshop, setmatterEvent, setpartnerEng, setoppCon, setfacUsage}) {
    if (company) {
      return fetch(`${process.env.URL}/api/companies/${company}?token=${token}`)
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

function authSalesforce() {
  return fetch(`${process.env.URL}/api/users/salesforce/auth`, { method: "POST" }).then(res => res.json())
}

function updateOptions(token) {
  return fetch(`${process.env.URL}/api/companies/salesforce/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ token: token }),
  })
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
}


export { getOptions, getCompany, validateCSV, authSalesforce, updateOptions, login, register }