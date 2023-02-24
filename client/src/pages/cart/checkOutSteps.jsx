import { Typography, LinearProgress, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
function CheckOutSteps({ shipping, confirmOrder, payment }) {
  return (
    <>
      {shipping && (
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1.5em",
          }}
        >
          Shipping
        </Typography>
      )}
      {confirmOrder && (
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1.5em",
          }}
        >
          Confirm Order
        </Typography>
      )}
      {payment && (
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1.5em",
          }}
        >
          Payment
        </Typography>
      )}

      <Box>
        {shipping && (
          <LinearProgress variant="determinate" value={50} color="primary" />
        )}
        {confirmOrder && (
          <LinearProgress variant="determinate" value={100} color="primary" />
        )}
        {payment && (
          <LinearProgress variant="determinate" value={100} color="primary" />
        )}
      </Box>
    </>
  );
}

export default CheckOutSteps;
