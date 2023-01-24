import React, { useState } from "react";
import { Box, Stack, IconButton } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";

export default function Brands() {
  const [toggle, setToggle] = useState(true);

  const toggelSideBar = () => {
    setToggle((prev) => !prev);
  };
  return (
    <Box sx={{ border: "2px solid black" }}>
      <IconButton onClick={toggelSideBar}>
        <AppsIcon sx={{ color: "black" }} />
      </IconButton>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Box
          sx={{
            transition: "0.5s",
            border: "1px solid blue",
            width: `${toggle ? "23%" : "0%"}`,
            minHeight: "100vh",
          }}
        ></Box>
        <Box
          sx={{
            transition: "0.5s",
            border: "1px solid green",
            width: `${toggle ? "77%" : "100%"}`,
            minHeight: "100vh",
          }}
        ></Box>
      </Stack>
    </Box>
  );
}
