import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {
  Typography,
  Stack,
  TextField,
  Box,
  Alert,
  AlertTitle,
  Snackbar,
  Link,
  Paper,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { forgotPassword, clearErrors } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(true);

  // const { user, loading } = useSelector((state) => state.auth);
  const { error, message, sending } = useSelector(
    (state) => state.forgotPassword
  );

  const [open, setOpen] = useState(false);
  const [Message, setMessage] = useState(null);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      setMessage(error);
      clearErrors();
    }

    if (message) {
      setOpen(true);
    }
  }, [navigate, error, dispatch, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
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
                boxShadow: 2,
                border: "0.1px solid #48e5c2",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h3">Forgot Password</Typography>
              {Message && (
                <>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <Typography>{Message}</Typography>
                  </Alert>
                </>
              )}
              <TextField
                label="Email"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  loading={sending ? true : false}
                  sx={{ "&:focus": { outline: "none" } }}
                >
                  Email Me a reset Link
                </LoadingButton>
                <Typography sx={{ marginTop: "10px" }}>
                  Go Back To <Link href="/sign-in">Sign In Page</Link>{" "}
                </Typography>
              </Stack>

              <Snackbar
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
              >
                <SnackbarAlert>
                  <Typography variant="h4">{message}</Typography>
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

export default ForgotPassword;
