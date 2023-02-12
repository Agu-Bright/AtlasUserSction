import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Box,
  Typography,
  Stack,
  IconButton,
  Grid,
  List,
  Paper,
  ListItemButton,
  Pagination,
  ListItemText,
  Chip,
  Divider,
} from "@mui/material";
import { getAllBrands } from "../../redux/actions/brandAction";
import { brandTypes } from "../../utils/stateData";
import Navbar from "../../components/navbar/Navbar";
import AppsIcon from "@mui/icons-material/Apps";
import PrimarySearchAppBar from "../../components/search";
import ProductCard from "../../components/cardComponent/productCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardLoader from "../../components/cardComponent/productCardSkeleton";
import { getAllProducts } from "../../redux/actions/productAction";
import Footer from "../../components/footer/Footer";
import BrandCard from "../../components/cardComponent/brandCard";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function BrandProoducts({ id }) {
  const [toggle, setToggle] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [navbar, setNavbar] = useState(true);

  const [page, setPage] = useState(1);
  const [brandType, setBrandType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get("search");
  const {
    loading,
    brands,
    brandCount,
    filteredBrandCount,
    numberOfPages,
    searchNumberOfPages,
    error,
  } = useSelector((state) => state.allBrandsReducer);

  useEffect(() => {
    dispatch(getAllBrands(searchQuery, page, brandType));
  }, [dispatch, searchQuery, page, brandType]);

  const handleChange = (e, value) => {
    setPage(value);
  };
  const handleBrandTypeSelect = (brandType) => {
    setBrandType(brandType);
  };
  const toggelSideBar = () => {
    setToggle((prev) => !prev);
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active2" />
      <Box
        sx={{
          height: "auto",
          paddingTop: { md: "100px", xs: "50px" },
          paddingBottom: "20px",
        }}
      >
        <Stack
          direction="row"
          sx={{ width: "100%" }}
          justifyContent="space-evenly"
        >
          <Paper
            elevation={24}
            sx={{
              transition: "0.5s",
              width: `${toggle ? "23%" : "0%"}`,
              minHeight: "100vh",
              display: { md: "flex", sm: "flex", xs: "none" },
              justifyContent: "start",
            }}
          >
            {toggle && (
              <Box
                sx={{
                  transition: "0.5s",
                  overflow: "hidden",
                  width: "100%",
                  margin: "10px",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      fontWeight: "700",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Filter By Brand Type
                  </Typography>
                  <Chip label="clear filter" onClick={() => setBrandType("")} />
                </Stack>

                <List component="nav" aria-label="secondary mailbox folder">
                  <Divider />
                  {brandTypes.map((type) => (
                    <ListItemButton
                      key={type.key}
                      selected={selectedIndex === type.key}
                      onClick={() => handleBrandTypeSelect(type.cat)}
                    >
                      {" "}
                      <ListItemText
                        sx={{ fontWeight: "900" }}
                        primary={type.cat}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
          <Paper
            elevation={24}
            sx={{
              margin: "0px !important",
              paddingBottom: "20px",
              width: {
                md: `${toggle ? "75%" : "100%"}`,
                xs: `${"100%"}`,
              },
            }}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ padding: "0px 10px" }}
              >
                <IconButton
                  onClick={() => toggelSideBar()}
                  sx={{
                    background: "rgb(32, 129, 226)",
                    margin: "5px",
                  }}
                >
                  <AppsIcon sx={{ color: "black" }} />
                </IconButton>
                {!brandType && <Chip label={"All Brands"} />}
                {brandType && <Chip label={`${brandType}`} />}
              </Stack>
            </Box>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              sx={{ padding: "15px" }}
            >
              {loading && <ProductCardLoader />}
              {brands &&
                brands.map((product) => (
                  <BrandCard key={product._id} data={product} />
                ))}
              {brands && brands.length === 0 && (
                <Box
                  sx={{
                    padding: "inherit",
                    margin: "inhert",
                    width: "inherit",
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "800",
                      fontSize: "2em",
                      textAlign: "center",
                    }}
                  >
                    No Brand found
                  </Typography>
                </Box>
              )}
            </Grid>
            <Stack
              spacing={2}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={
                  searchQuery || brandType ? searchNumberOfPages : numberOfPages
                }
                page={Number(page)}
                onChange={handleChange}
                sx={{
                  "&:focus": {
                    outline: "none",
                  },
                  color: "blue",
                }}
              />
            </Stack>
          </Paper>
        </Stack>
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default BrandProoducts;
