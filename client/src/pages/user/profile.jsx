import React, { useState } from "react";
import { Container } from "@mui/system";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

function Profile() {
  const { user, loading } = useSelector((state) => state.auth);
  const [navbar, setNavbar] = useState(true);

  return (
    <>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        active="active2"
        background="white"
        border={true}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          paddingTop: { md: "100px", xs: "60px" },
          paddingBottom: "20px",
        }}
      >
        {loading ? (
          <Container fixed>
            <CircularProgress />
          </Container>
        ) : (
          <>
            <Paper
              sx={{
                padding: "10px",
                width: { md: "80%", sm: "90%", xs: "auto" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "inherit",
                  display: "flex",
                  flexDirection: { xs: "column", md: "column" },
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <h3
                  style={{
                    width: "auto",
                    paddingLeft: "6px",
                    borderLeft: "10px solid rgb(24, 104, 183)",
                    borderBottom: "0.1px solid rgb(24, 104, 183)",
                    borderRadius: "10px",
                    borderBottomRightRadius: "0px",
                  }}
                >
                  User Profile
                </h3>
                <Stack spacing={3} sx={{ width: "auto", margin: "20px" }}>
                  <Avatar
                    sx={{ width: 150, height: 150 }}
                    alt={user?.name}
                    src={user?.avatar?.url}
                  />
                  <Link to="/update-profile">
                    <Button variant="contained">Edit Profile</Button>
                  </Link>
                </Stack>

                <Stack spacing={2} sx={{ width: "100%", padding: "2px" }}>
                  <h4 style={{ fontWeight: "200" }}>
                    Full Name: <span>{user?.name}</span>
                  </h4>

                  <h4>
                    Email Address: <span>{user?.email}</span>
                  </h4>

                  {user.role !== "admin" && (
                    <Link to="/orders/me">
                      <Button variant="contained">My Orders</Button>
                    </Link>
                  )}
                  <Typography>
                    {" "}
                    Joined On:{String(user.createdAt).substring(0, 10)}
                  </Typography>

                  <Link to="/update-password">
                    <Button variant="contained">Change Password</Button>
                  </Link>
                </Stack>
              </Box>
            </Paper>
          </>
        )}
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
