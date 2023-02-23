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
  Divider,
} from "@mui/material";
import Modal from "@mui/material/Modal";

import { categories } from "../../../utils/stateData";
import AppsIcon from "@mui/icons-material/Apps";
import PrimarySearchAppBar from "../../../components/search";
import ProductCard from "../../../components/cardComponent/productCard";
import { getBrandProducts } from "../../../redux/actions/brandAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BrandProductSearch from "../../../components/brandProductSearch";
import ProductCardLoader from "../../../components/cardComponent/productCardSkeleton";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};
function BrandProoducts({
  toggle,
  toggelSideBar,
  selectedIndex,
  handleListItemClick,
  id,
}) {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  // const searchQuery = query.get("search");

  const [searchQuery, setSearchQuery] = useState(false);
  const {
    loading,
    brandProducts,
    productCount,
    filteredProductCount,
    numberOfPages,
    searchNumberOfPages,
    error,
  } = useSelector((state) => state.brandProductReducer);

  useEffect(() => {
    dispatch(getBrandProducts(id, searchQuery, page, category));
  }, [dispatch, id, searchQuery, page, category]);

  const handleChange = (e, value) => {
    setPage(value);
  };
  const handleCategorySelect = (category) => {
    setCategory(category);
  };
  //modal setup
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid black",
          marginBottom: "10px",
        }}
      >
        <IconButton
          onClick={() => toggelSideBar()}
          sx={{
            background: "rgb(32, 129, 226)",
            margin: "5px",
            display: { md: "flex", sm: "flex", xs: "none" },
          }}
        >
          <AppsIcon
            sx={{
              color: "black",
            }}
          />
        </IconButton>
        <IconButton
          onClick={handleOpen}
          sx={{
            margin: "5px",
            display: { md: "none", sm: "none", xs: "flex" },
          }}
        >
          <AppsIcon
            sx={{
              color: "black",
            }}
          />
        </IconButton>
        <Box sx={{ width: "75%", padding: "10px" }}>
          <BrandProductSearch
            id={id}
            dispatch={dispatch}
            setSearchQuery={setSearchQuery}
          />
        </Box>
      </Box>

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
              <Typography
                sx={{
                  fontWeight: "700",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Filter By Category
              </Typography>
              <List component="nav" aria-label="secondary mailbox folder">
                {categories.map((category) => (
                  <ListItemButton
                    key={category.key}
                    selected={selectedIndex === category.key}
                    onClick={() => handleCategorySelect(category.cat)}
                  >
                    {" "}
                    <ListItemText
                      sx={{ fontWeight: "700" }}
                      primary={category.cat}
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
          <Grid
            container
            rowSpacing={2}
            columnSpacing={4}
            sx={{
              margin: "0",
              padding: "0",
              width: "auto",
              overFlow: "hidden",
            }}
          >
            {loading && <ProductCardLoader />}
            {brandProducts &&
              brandProducts.map((product) => (
                <ProductCard key={product._id} data={product} />
              ))}
            {brandProducts && brandProducts.length === 0 && (
              <Box
                sx={{
                  padding: "inherit",
                  margin: "inhert",
                  width: "100%",
                  height: "50vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "20px",
                }}
              >
                <Typography
                  sx={{
                    width: "inherit",
                    fontWeight: "800",
                    fontSize: "2em",
                    textAlign: "center",
                  }}
                >
                  No Product found
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
                searchQuery || category ? searchNumberOfPages : numberOfPages
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List component="nav" aria-label="secondary mailbox folder">
            <Typography
              sx={{
                fontWeight: "700",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Filter By Category
            </Typography>{" "}
            <Divider />
            {categories.map((category) => (
              <ListItemButton
                key={category.key}
                selected={selectedIndex === category.key}
                onClick={() => {
                  handleCategorySelect(category.cat);
                  handleClose();
                }}
              >
                {" "}
                <ListItemText
                  sx={{ fontWeight: "700" }}
                  primary={category.cat}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Modal>
    </Box>
  );
}

export default BrandProoducts;
