import { Typography, LinearProgress, Box } from "@mui/material";
import React from "react";
function CreateBrandSteps({
  brandName,
  brandType,
  brandDetails,
  location,
  personal,
}) {
  return (
    <>
      <Box>
        {brandName && (
          <LinearProgress variant="determinate" value={10} color="primary" />
        )}
        {brandType && (
          <LinearProgress variant="determinate" value={20} color="primary" />
        )}
        {brandDetails && (
          <LinearProgress variant="determinate" value={60} color="primary" />
        )}
        {location && (
          <LinearProgress variant="determinate" value={80} color="primary" />
        )}
        {personal && (
          <LinearProgress variant="determinate" value={100} color="primary" />
        )}
      </Box>
      {brandName && (
        <Typography
          sx={{
            textAlign: "start",
            fontWeight: "550",
            fontSize: "1.1em",
            padding: "9px 0px",
          }}
        >
          Lets get started. Choose a unique name that best describes your brand
        </Typography>
      )}
      {brandType && (
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1.5em",
          }}
        >
          what is your plan for selling( typically asking about your physical
          store )
        </Typography>
      )}
      {brandDetails && (
        <Typography
          sx={{
            textAlign: "start",
            fontWeight: "550",
            fontSize: "1.1em",
            padding: "9px 0px",
          }}
        >
          Write a brief description of what your brand is about
        </Typography>
      )}
      {location && (
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1.5em",
          }}
        >
          Brand Location
          <p>Your brand location will help us locate customers around you</p>
        </Typography>
      )}
      {location && (
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1.5em",
          }}
        >
          Personal Information
          <p>
            We need these personal information for payment when an order have
            been placed in your store{" "}
          </p>
        </Typography>
      )}
    </>
  );
}

export default CreateBrandSteps;
