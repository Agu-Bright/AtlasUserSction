import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Paper,
  Divider,
  FormControl,
  Typography,
  TextField,
} from "@mui/material";
import CreateBrandSteps from "./CreateBrandSteps";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { saveBrandInfo } from "../../../redux/actions/brandAction";
function Personal() {
  const [navbar, setNavbar] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createBrandInfo } = useSelector((state) => state.createBrand);
  const [bank, setBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const data = localStorage.getItem("createBrandInfo");
  const { brandName, brandDetails, brandType, brandLocation } =
    JSON.parse(data);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveBrandInfo({
        brandName,
        brandDetails,
        brandType,
        brandLocation,
        bank,
        accountName,
        accountNumber,
        phoneNumber,
      })
    );
  };

  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "60vh",
          paddingTop: { md: "200px", xs: "150px" },
          paddingBottom: "20px",
          marginBottom: "70px",
        }}
      >
        <Paper
          sx={{
            margin: "50px 0px",
            width: { md: "40%", xs: "90%" },
            padding: "20px",
            boxShadow: 2,
            borderRadius: "15px",
          }}
        >
          <div style={{ margin: "0", padding: "0" }}>
            <Typography
              sx={{ fontWeight: "800", margin: "9px 0px", fontSize: "1.2em" }}
            >
              Atlas
            </Typography>
            <CreateBrandSteps personal />

            <Stack direction="column" spacing={2}>
              <TextField
                label="Bank Name"
                name="bank"
                type="text"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                required
              />
              <TextField
                sx={{ margin: "10px" }}
                label="Account Number"
                type="text"
                name="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
              <TextField
                sx={{ margin: "10px" }}
                label="Account Name"
                type="text"
                name="accountName"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
              />
              <TextField
                sx={{ margin: "10px" }}
                label="Phone Number"
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Stack>
          </div>

          <Stack
            alignItems="flex-end"
            justifyContent="space-between"
            direction="row"
            sx={{ padding: "0px 20px", margin: "9px 0px" }}
          >
            <Button
              onClick={() => navigate("/brandLocation")}
              color="primary"
              type="submit"
              variant="outlined"
              sx={{ "&:focus": { outline: "none" }, width: "30%" }}
            >
              Previous
            </Button>
            <Button
              onClick={submitHandler}
              color="primary"
              type="submit"
              variant="contained"
              sx={{ "&:focus": { outline: "none" }, width: "30%" }}
            >
              create brand
            </Button>
          </Stack>
        </Paper>
      </Box>
      <div
        className="footer"
        style={{ oveflow: "hidden", marginTop: { md: "50px", xs: "70px" } }}
      >
        <Footer />
      </div>
    </>
  );
}

export default Personal;
