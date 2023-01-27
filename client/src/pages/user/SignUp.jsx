import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Stack,
  TextField,
  Box,
  Alert,
  AlertTitle,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { register, clearErrors } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import states from "../../utils/stateData";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Message, setMessage] = useState(null);
  const { loading, isAuthenticated, regError } = useSelector(
    (state) => state.auth
  );
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ ...user }));
  };

  useEffect(() => {
    if (regError) {
      setMessage(regError);
      clearErrors();
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, regError]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30vh",
        marginBottom: "25vh",
      }}
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
        <Typography variant="h3">Campus Pay sign Up</Typography>
        {Message && (
          <>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <Typography variant="h5">{Message}</Typography>
            </Alert>
          </>
        )}

        <TextField
          label="first Name"
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          type="text"
          value={user.lastName}
          onChange={handleChange}
          required
        />

        <TextField
          label="Emial Address"
          name="email"
          type="text"
          value={user.email}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Campus</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user.state}
            label="Age"
            name="Location"
            onChange={handleChange}
          >
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={user.confirmPassword}
          onChange={handleChange}
          required
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
            loading={loading ? true : false}
            sx={{ "&:focus": { outline: "none" }, width: "30vw" }}
          >
            Register
          </LoadingButton>
        </Stack>

        <Typography>
          Already have an account{" "}
          <Link to="/sign-in" sx={{ cursor: "pointer" }}>
            {" "}
            <Typography variant="h5" color="primary">
              SIgn In
            </Typography>{" "}
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}

export default SignUp;
