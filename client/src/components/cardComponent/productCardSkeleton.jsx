import React from "react";
import { Grid, Skeleton } from "@mui/material";
export default function ProductCardLoader() {
  return (
    <>
      <Grid
        item
        sx={{
          margin: "0px !important",
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Skeleton
          sx={{
            width: { md: 250, sm: 200, xs: 250 },
            minHeight: "500px",
            margin: "0px !important",
            padding: "0px !important",
            border: "1px solid black",
          }}
          component="div"
        ></Skeleton>
      </Grid>
    </>
  );
}
