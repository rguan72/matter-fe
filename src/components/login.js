import React, { useState, useEffect } from "react"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import SnackBar from '@material-ui/core/SnackBar';
import TextField from "@material-ui/core/TextField"
import Collapse from "@material-ui/core/Collapse"
import CloseIcon from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { login, register } from "../utils"

export default ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordAgain, setNewPasswordAgain] = useState("")
    const [regKey, setRegKey] = useState("")
    const [regError, setRegError] = useState("")
    return (
      <Layout>
        <SEO title="Home" />
        {/* <form noValidate autoComplete="off"> */}
        <Box display="flex">
          <Box display="block">
            <Box>
              <TextField
                error={error !== ""}
                id="outlined-basic-1"
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                helperText="Incorrect email or password"
                onChange={event => setEmail(event.target.value)}
              />
              <TextField
                error={error !== ""}
                id="outlined-basic-2"
                label="Password"
                type="password"
                autoComplete="current-password"
                helperText="Incorrect email or password"
                variant="outlined"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </Box>
            <Box mt={5}>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  login(email, password)
                    .then(res => {
                      if (!res.ok)
                        return setError("Email or password incorrect")
                      setIsLoggedIn(true)
                      setError("")
                    })
                    .catch(() => setError("An unexpected error occurred"))
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
          <Box display="block">
            <Box>
              <TextField
                error={regError !== ""}
                id="outlined-basic-1"
                label="Email"
                type="email"
                variant="outlined"
                value={newEmail}
                onChange={event => setNewEmail(event.target.value)}
              />
            </Box>
            <Box>
              <TextField
                error={regError !== ""}
                id="newpass"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={newPassword}
                onChange={event => setNewPassword(event.target.value)}
              />
              <TextField
                error={regError !== ""}
                id="newpass2"
                label="Password Again"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={newPasswordAgain}
                onChange={event => setNewPasswordAgain(event.target.value)}
              />
            </Box>
            <Box>
              <TextField
                error={regError !== ""}
                id="regkey"
                label="Registration Key"
                variant="outlined"
                value={regKey}
                onChange={event => setRegKey(event.target.value)}
              />
            </Box>
            <Box mt={5}>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  console.log("clicked")
                  register(newEmail, newPassword, newPasswordAgain, regKey)
                    .then(async res => {
                      const data = await res.json()
                      console.table(data)
                      console.log(res.ok)
                      if (!res.ok) {
                        if (data.password) {
                          setRegError(data.password)
                        } 
                        else if (data.password2) {
                          setRegError(data.password2)
                        }
                        else if (data.email) {
                          setRegError(data.email)
                        } else if (data.registrationKey) {
                          setRegError(data.registrationKey)
                        } else {
                          setRegError("An unexpected error occured")
                        }
                        return
                      }
                      setIsLoggedIn(true)
                      setRegError("")
                    })
                    .catch(() => setRegError("An unexpected error occurred"))
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
        <SnackBar
          open={regError !== ""}
          autoHideDuration={6000}
          onClose={() => setRegError("")}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{regError}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => setRegError("")}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        {/* </form> */}
      </Layout>
    )
}