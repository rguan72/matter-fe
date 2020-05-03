import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import IconButton from "@material-ui/core/IconButton"
import Snackbar from "@material-ui/core/Snackbar"
import CloseIcon from "@material-ui/icons/Close"
import Select from "react-select"
import Layout from "../components/layout"
import Dropzone from '../components/dropzone'
import SEO from "../components/seo"
import { getOptions, getCompany, authSalesforce, updateOptions } from "../utils"
import LoginPage from "../components/login"

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
  const [company, setCompany] = useState(sessionStorage.getItem("company") || null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData()
    formData.append("file", acceptedFiles[0])
    if (acceptedFiles[0] !== undefined) { 
      setLoading(true)     
      const res = await fetch(`${process.env.URL}/api/engagements/upload`, {
          method: "POST",
          body: formData,
        })
      if (!res.ok) { 
        setOpen(true)
        res.text().then(text => setMessage(text));
        return
      }
      setMessage("Upload complete!")
      setOpen(true)
      getCompany(company, token, {
        setmentorTeam,
        setmentorClinic,
        setWorkshop,
        setmatterEvent,
        setpartnerEng,
        setoppCon,
        setfacUsage,
      })
      getOptions(setOptions);
    }
  }

  useEffect(() => {
    sessionStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    sessionStorage.setItem("company", company)
  }, [company])

  useEffect(() => {
    getCompany(company, token, {
      setmentorTeam,
      setmentorClinic,
      setWorkshop,
      setmatterEvent,
      setpartnerEng,
      setoppCon,
      setfacUsage
    });
  }, [company, isLoggedIn])

  useEffect(() => {
    const fetchOptions = async () => {
      const data = await authSalesforce()
      setToken(data.access_token)
      updateOptions(data.access_token)
      getCompany(company, token, {
        setmentorTeam,
        setmentorClinic,
        setWorkshop,
        setmatterEvent,
        setpartnerEng,
        setoppCon,
        setfacUsage
      });
    }
    try {
      fetchOptions();
    }
    catch(err) {
      console.error(err)
    }
    getOptions(setOptions);
  }, [isLoggedIn])

  function handleLoadClose() {
    setLoading(false)
  }

  function handleClose() {
    setOpen(false)
  }

  if (!isLoggedIn) {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} />
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Select
        options={options}
        onChange={selectedOption => setCompany(selectedOption.value)}
      />
      <Dropzone onDrop={onDrop} />
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={loading}
        autoHideDuration={6000}
        onClose={handleLoadClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">Uploading...</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleLoadClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Layout>
  )
}

const useStyles = makeStyles(theme => ({
  card: {
    padding: 20,
    margin: 40,
    minWidth: 200,
  },
  noMarginLeft: {
    marginLeft: 0,
  },
  select: {
    minWidth: 300,
    marginRight: 50,
    flexBasis: 2,
    flexGrow: 1,
  },
  close: {
    padding: theme.spacing(0.5),
  },
}))

export default IndexPage
