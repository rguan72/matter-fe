import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import Select from "react-select"
import Layout from "../components/layout"
import Dropzone from '../components/dropzone';
import SEO from "../components/seo"

const IndexPage = () => {
  const classes = useStyles()
  const [mentorTeam, setmentorTeam] = useState(0)
  const [mentorClinic, setmentorClinic] = useState(0)
  const [workshop, setWorkshop] = useState(0)
  const [matterEvent, setmatterEvent] = useState(0)
  const [partnerEng, setpartnerEng] = useState(0)
  const [oppCon, setoppCon] = useState(0)
  const [facUsage, setfacUsage] = useState(0)
  const [options, setOptions] = useState([])
  const [company, setCompany] = useState(null)

  useEffect(() => {
    fetch("http://localhost:9000/api/companies")
      .then(res => res.json())
      .then(res => {
        const options = res.map(comp => ({ value: comp.name, label: comp.name }))
        setOptions(options);
      })
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
    }
    else {
      setmentorTeam("--")
      setmentorClinic("--")
      setWorkshop("--")
      setmatterEvent("--")
      setpartnerEng("--")
      setoppCon("--")
      setfacUsage("--")
    }
  }, [company])

  return (
    <Layout>
      <SEO title="Home" />
      <Select
        options={options}
        onChange={selectedOption => setCompany(selectedOption.value)}
      />
      <Dropzone />
      <Box m={3} mb={0} ml={0}>
        <Typography variant="h3">{company}</Typography>
      </Box>
      <Box display="flex" flexDirection="row">
        <Card className={`${classes.card} ${classes.noMarginLeft}`}>
          <Typography variant="h6"> MATTER Team </Typography>
          <Typography variant="subtitle1"> {mentorTeam} </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h6"> Mentor Clinic </Typography>
          <Typography> {mentorClinic} </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h6"> Workshops </Typography>
          <Typography> {workshop} </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h6"> MATTER Events </Typography>
          <Typography> {matterEvent} </Typography>
        </Card>
      </Box>
      <Box display="flex" flexDirection="row">
        <Card className={`${classes.card} ${classes.noMarginLeft}`}>
          <Typography variant="h6"> Partner Engagements </Typography>
          <Typography> {partnerEng} </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h6"> Opportunities & Connections </Typography>
          <Typography> {oppCon} </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h6"> Facilities Usage </Typography>
          <Typography> {facUsage} </Typography>
        </Card>
      </Box>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

const useStyles = makeStyles({
  card: {
    padding: 20,
    margin: 40,
    minWidth: 200,
  },
  noMarginLeft: {
    marginLeft: 0,
  },
})

export default IndexPage
