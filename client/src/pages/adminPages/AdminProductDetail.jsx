import React, { useState, useEffect, forwardRef } from "react";
import {
  Stack,
  Alert,
  Snackbar,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";

import {
  getProduct,
  updateProduct,
  clearErrors,
} from "../../redux/actions/productAction";
import { SET_PRODUCTS } from "../../redux/reducers/highlightReducer";

import { states, categories } from "../../utils/stateData";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Sidebar from "../../components/navbar/Sidebar";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
import ArticleIcon from "@mui/icons-material/Article";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id } = useParams();
  const [openUpdate, setOpenUpdate] = useState(false);
  const { error, product } = useSelector((state) => state.productDetail);
  const {
    deleting: loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteProduct);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id, isUpdated]);

  useEffect(() => {
    setName(product?.product?.name);
    setPrice(product?.product?.price);
    setCategory(product?.product?.category);
    setDescription(product?.product?.description);
    setStock(product?.product?.stock);
    setLocation(product?.product?.location);
    setStatus(product?.product?.status);
    setOldImages(product?.product?.images);

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      console.log(updateError);
    }
    if (isUpdated) {
      setOpenUpdate(true);
    }
  }, [error, isUpdated, dispatch, navigate, updateError, product?.product, id]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("stock", stock);
    formData.set("location", location);
    formData.set("category", category);

    if (user.role === "admin") formData.set("status", status);
    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(id, formData));
  };

  useEffect(() => {
    dispatch({ type: SET_PRODUCTS });
  });
  const [navbar, setNavbar] = useState(true);
  const [state, setState] = useState(true);
  const toggle = () => {
    setState((prev) => !prev);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        background="white"
        border={true}
      />
      <Box
        sx={{
          paddingTop: { md: "12.2vh", xs: "9vh" },
          backgroundColor: "white",
          margin: "0px !important",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            height: "inherit",
            width: "100%",
          }}
        >
          <Box
            sx={{
              borderRight: "0.1px solid gray",
              width: "20%",
              display: { md: state ? "block" : "none", sm: "none", xs: "none" },
            }}
          >
            {" "}
            <Sidebar />
          </Box>
          <Box
            className="dashboard-main"
            sx={{
              width: "100%",
              overflowY: "scroll",
              paddingRight: "10px",
            }}
          >
            <Box sx={{ width: "100%", margin: "0", padding: "0" }}>
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    sx={{
                      margin: "5px",
                      "&:focus": {
                        outline: "none",
                      },
                      display: { md: "block", ms: "none", xs: "none" },
                    }}
                    onClick={toggle}
                  >
                    {state ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
                  </IconButton>
                  <IconButton
                    sx={{
                      margin: "5px",
                      "&:focus": {
                        outline: "none",
                      },
                      display: { md: "none", sm: "block", xs: "block" },
                    }}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <ArticleIcon sx={{ fontSize: "1.2em" }} />
                  </IconButton>
                  <Typography sx={{ fontWeight: "600", fontSize: "1.3em" }}>
                    Product Detail
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginTop: { md: "", sm: "10px", xs: "10px" },
                    padding: { md: "15px", sm: "0px", xs: "0px" },
                    width: { md: "98%", ms: "100%", xs: "100%" },
                    display: { md: "flex", sm: "flex", xs: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Stack
                    spacing={2}
                    direction="column"
                    sx={{
                      width: { md: "70%", sm: "100%", xs: "100%" },
                      padding: "12px 10px",
                      boxShadow: 20,
                      borderRadius: "15px",
                    }}
                  >
                    <TextField
                      label="Item Name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <FormControl fullWidth>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Amount
                      </InputLabel>

                      <OutlinedInput
                        id="outlined-adornment-amount"
                        value={price}
                        type="number"
                        startAdornment={
                          <InputAdornment position="start">
                            {" "}
                            &#8358;
                          </InputAdornment>
                        }
                        label="Item Price"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </FormControl>
                    <TextField
                      id="outlined-multiline-static"
                      label="Product Description"
                      multiline
                      rows={4}
                      color="primary"
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        name="category"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat.key} value={cat.cat}>
                            {cat.cat}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Stock
                      </InputLabel>

                      <OutlinedInput
                        id="outlined-adornment-amount"
                        value={stock}
                        type="number"
                        label="Stock"
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Location
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={location}
                        label="Location"
                        name="location"
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        {states.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className="form-group">
                      <label>Images</label>

                      <div className="custom-file">
                        <input
                          type="file"
                          name="product_images"
                          className="custom-file-input"
                          id="customFile"
                          multiple
                          onChange={handleChange}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Choose Images
                        </label>
                      </div>

                      {oldImages &&
                        oldImages.map((image) => (
                          <img
                            key={image}
                            src={image.url}
                            alt="bookimage"
                            className="mt-3 mr-2"
                            width="55"
                            height="52"
                          />
                        ))}

                      {imagesPreview.map((img) => (
                        <img
                          key={img}
                          className="mt-3 mr-2"
                          src={img}
                          alt="images-preview"
                          width="55"
                          height="52"
                        />
                      ))}
                    </div>
                    <Stack
                      justifyContent="flex-end"
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                      }}
                    >
                      <LoadingButton
                        id="login_button"
                        type="submit"
                        color="primary"
                        variant="contained"
                        loading={loading ? true : false}
                        sx={{
                          width: "20%",
                          background: "rgb(24, 104, 183)",
                          color: "white",
                          "&:focus": {
                            outline: "none",
                          },
                          "&:hover": {
                            border: "1px solid",
                            color: "black",
                          },
                        }}
                        onClick={handleSubmit}
                      >
                        update product
                      </LoadingButton>
                      <Snackbar
                        open={openUpdate}
                        autoHideDuration={4000}
                        onClose={handleClose}
                      >
                        <SnackbarAlert>
                          <Typography>Product update successful</Typography>
                        </SnackbarAlert>
                      </Snackbar>
                    </Stack>
                  </Stack>
                </Box>
              </>
            </Box>
          </Box>
        </Stack>
        <SidebarDrawer open={open} close={handleDrawerClose} />
      </Box>
    </>
  );
}

export default UpdateProduct;
