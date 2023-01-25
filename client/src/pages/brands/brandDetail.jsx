import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  ButtonGroup,
  IconButton,
  Grid,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import water from "../../images/water.jpg";
import pepsi from "../../images/pepsi.jpg";

import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AppsIcon from "@mui/icons-material/Apps";
import VerifiedIcon from "@mui/icons-material/Verified";
import ProductCard from "../../components/cardComponent/productCard";
import Footer from "../../components/footer/Footer";

function BrandDetail() {
  const [navbar, setNavbar] = useState(true);

  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active2" />
      <Box
        sx={{
          height: "auto",
          paddingTop: { md: "72px", xs: "50px" },
          backgroundColor: "white",
          paddingBottom: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: { md: "50vh", xs: "30vh" },
            position: "relative",
          }}
        >
          <img
            style={{ width: "100%", height: "inherit" }}
            src={water}
            alt="The Brand"
          />
          <Box
            sx={{
              position: "absolute",
              top: { md: "25vh", xs: "18vh" },
              left: "20px",
            }}
          >
            <Avatar
              src={pepsi}
              alt="image"
              sx={{
                border: "5px solid white",
                borderRadius: "20px",
                width: { md: "200px", xs: "100px" },
                height: { md: "200px", xs: "100px" },
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            paddingTop: { md: "50px", sm: "30px", xs: "15px" },
          }}
        >
          <Stack
            direction={{ md: "row", xs: "column" }}
            justifyContent="space-between"
          >
            <Typography
              sx={{
                paddingLeft: "25px",
                fontWeight: "900",
                fontSize: { md: "25px", sm: "20px", xs: "18px" },
                display: "flex",
                alignItems: "center",
              }}
            >
              Pepsi drink official{" "}
              <span style={{ color: "blue" }}>
                <IconButton sx={{ color: "blue" }}>
                  <VerifiedIcon sx={{ fontSize: "15px" }} />
                </IconButton>
              </span>
            </Typography>
            <ButtonGroup
              sx={{
                paddingRight: "25px",
                paddingLeft: "25px",
              }}
            >
              <IconButton>
                <TwitterIcon sx={{ color: "black" }} />
              </IconButton>

              <IconButton>
                <InstagramIcon sx={{ color: "black" }} />
              </IconButton>

              <IconButton>
                <FacebookIcon sx={{ color: "black" }} />
              </IconButton>
              <IconButton>
                <MoreHorizIcon sx={{ color: "black" }} />
              </IconButton>
            </ButtonGroup>
          </Stack>
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                paddingLeft: "25px",
              }}
            >
              <Typography sx={{ marginRight: "25px" }}>
                Items <span style={{ fontWeight: "700" }}>9999</span>
              </Typography>
              <Typography>
                Created <span style={{ fontWeight: "700" }}>jan 2022</span>
              </Typography>
            </Box>
            <Box
              sx={{
                paddingLeft: "25px",
                paddingTop: "10px",
                height: "auto",
              }}
            >
              <Typography sx={{ fontWeight: "600" }} variant="h5">
                Description
              </Typography>
              <Typography
                sx={{
                  width: { md: "70%", xs: "100%" },
                  maxHeight: "10vh",
                  overflowY: "scroll",
                }}
              >
                WVRPS are the 1st hybrid generative PFP + AI-composed music NFTs
                minted on the Ethereum blockchain. 9,999 unique NFTs based on
                the WarpSound virtual artists Nayomi, Gnar Heart + DJ Dragoon,
                with art by Emmy-winning illustrator Andy Poon, the embedded 1/1
                original music composed entirely by AI using the visual traits
                of the PFP 🤯WVRPS are the opening note of WarpSound’s larger
                ractive, social music experience, helping ignite the future of
                generative music creativity + synthetic artistry 🚀
              </Typography>
            </Box>
          </div>

          <Box
            sx={{
              paddingLeft: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid container my={4} rowSpacing={2} columnSpacing={4}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </Grid>
          </Box>
        </Box>
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default BrandDetail;
