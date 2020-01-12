function getOptions(setOptions) {
    fetch("http://localhost:9000/api/companies")
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
      fetch(`http://localhost:9000/api/companies/${company}`)
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

export { getOptions, getCompany }