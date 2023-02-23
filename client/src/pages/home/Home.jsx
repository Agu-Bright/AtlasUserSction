import React, { useState, useEffect } from "react";
import { Box, Divider, Typography, Chip, Skeleton } from "@mui/material";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Swiper from "../../components/swiper/Swiper";
import CardSlider from "./cardSlider/CardSlider";
import Trending from "./trending/Trending";
import { getBrandsInLocation } from "../../redux/actions/brandAction";
import { useDispatch, useSelector } from "react-redux";
import BrandCard from "../../components/cardComponent/brandCard";
const CenterDiv = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
function Home() {
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brandsInLocation, resturantsInLocation } = useSelector(
    (state) => state.brandsInLocationReducer
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getBrandsInLocation());
  }, [dispatch]);
  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active" />
      <div className="body">
        <div className="Header">
          <Box
            className="theme-container"
            sx={{
              ...CenterDiv,
            }}
          >
            <Typography
              className="theme"
              sx={{ fontSize: { xl: "45px", md: "40px", xs: "30px" } }}
            >
              Explore Stores And Resturants
            </Typography>
          </Box>
          <Swiper />
        </div>

        <Box
          sx={{
            background: "white",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            padding: { md: "15px 20px", xs: "10px 0px" },
          }}
        >
          <Trending />
        </Box>

        <Box>
          <div className="card-container">
            <Typography className="card-topic">
              Stores in your location
            </Typography>
            <Divider sx={{ color: "black" }} />
            {brandsInLocation && user && (
              <CardSlider data={brandsInLocation} />
            )}{" "}
            {brandsInLocation && brandsInLocation.length === 0 && (
              <Typography
                sx={{
                  textAlign: "center",
                  border: "0.2px solid grey",
                  lineHeight: "1.5em",
                  padding: "20px 0px",
                  borderRadius: "11px",
                }}
              >
                <span style={{ fontSize: "1.1em", fontWeight: "200" }}>
                  No Stores in your location
                </span>
              </Typography>
            )}{" "}
            {!user && (
              <Typography
                sx={{
                  textAlign: "center",
                  border: "0.2px solid grey",
                  lineHeight: "1.5em",
                  padding: "20px 0px",
                  borderRadius: "11px",
                }}
              >
                <Chip
                  onClick={() => navigate("/sign-up")}
                  label="Sign Up"
                  variant="outlined"
                  sx={{ fontSize: "10px", margin: "5px" }}
                />

                <span style={{ fontSize: "1.1em", fontWeight: "200" }}>
                  to view Stores in your location
                </span>
              </Typography>
            )}
          </div>

          <div className="card-container">
            <Typography className="card-topic">
              Resturants in your location
            </Typography>
            <Divider sx={{ color: "black" }} />

            {resturantsInLocation && user && (
              <CardSlider data={resturantsInLocation} />
            )}
            {resturantsInLocation && resturantsInLocation.length === 0 && (
              <Typography
                sx={{
                  textAlign: "center",
                  border: "0.2px solid grey",
                  lineHeight: "1.5em",
                  padding: "20px 0px",
                  borderRadius: "11px",
                }}
              >
                <span style={{ fontSize: "1.1em", fontWeight: "200" }}>
                  No Resturant in your location
                </span>
              </Typography>
            )}

            {!user && (
              <Typography
                sx={{
                  textAlign: "center",
                  border: "0.2px solid grey",
                  lineHeight: "1.5em",
                  padding: "20px 0px",
                  borderRadius: "11px",
                }}
              >
                <Chip
                  onClick={() => navigate("/sign-up")}
                  label="Sign Up"
                  variant="outlined"
                  sx={{ fontSize: "10px", margin: "5px" }}
                />

                <span style={{ fontSize: "1.1em", fontWeight: "200" }}>
                  to view Resturants in your location
                </span>
              </Typography>
            )}
          </div>
        </Box>
      </div>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default Home;
