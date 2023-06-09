import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Typography,
  Stack,
  TextField,
  Box,
  Alert,
  AlertTitle,
  Snackbar,
  Paper,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updatePassword, clearErrors } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../redux/constants/userConstants";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});
function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { user, loading } = useSelector((state) => state.auth);
  const { error, isUpdated, updating } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [Message, setMessage] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (error) {
      setMessage(error);
      clearErrors();
    }

    if (isUpdated) {
      dispatch({ type: UPDATE_PASSWORD_RESET });
      setOpen(true);
    }
  }, [navigate, error, dispatch, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("newPassword", newPassword);

    dispatch(updatePassword(formData));
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const [navbar, setNavbar] = useState(true);

  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active2" />
      <Box
        sx={{
          height: "auto",
          paddingTop: { md: "100px", xs: "60px" },
          paddingBottom: "20px",
        }}
      >
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15vh",
          }}
        >
          <Paper
            sx={{ borderRadius: "10px", width: { md: "40%", xs: "100%" } }}
          >
            <Stack
              direction="column"
              spacing={1}
              sx={{
                boxShadow: { xs: "none", md: 10 },

                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h3">Update Password</Typography>
              {Message && (
                <>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <Typography>{Message}</Typography>
                  </Alert>
                </>
              )}
              <TextField
                label="oldPassword"
                type="text"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />

              <TextField
                label="newPassword "
                name="newPassword"
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoadingButton
                  onClick={handleSubmit}
                  variant="contained"
                  loading={updating ? true : false}
                  sx={{ "&:focus": { outline: "none" }, width: "30vw" }}
                >
                  Update Password
                </LoadingButton>
              </Stack>

              <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
              >
                <SnackbarAlert>
                  <Typography>Password Updated Seccess</Typography>
                </SnackbarAlert>
              </Snackbar>
            </Stack>
          </Paper>
        </Box>
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default UpdatePassword;
