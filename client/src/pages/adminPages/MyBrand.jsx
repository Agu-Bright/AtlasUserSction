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
  Select,
  MenuItem,
  TextField,
  AlertTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";

import { UPDATE_BRAND_RESET } from "../../redux/constants/brandConstant";
import {
  updateBrand,
  clearErrors,
  getMyBrand,
} from "../../redux/actions/brandAction";
import { SET_MY_BRAND } from "../../redux/reducers/highlightReducer";
import { states } from "../../utils/stateData";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Sidebar from "../../components/navbar/Sidebar";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
import ArticleIcon from "@mui/icons-material/Article";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function MyBrand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openM, setOpenM] = useState(false);
  const { brand } = useSelector((state) => state.myBrand);
  const { error, isUpdated, updating } = useSelector(
    (state) => state.updateBrand
  );
  const { user } = useSelector((state) => state.auth);
  const [brandName, setBrandName] = useState("");
  const [brandType, setBrandType] = useState("");
  const [brandDetail, setBrandDetail] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [whatsApp, setWhatsApp] = useState();
  const [faceBook, setFaceBook] = useState();
  const [instagram, setInstagram] = useState();
  const [twitter, setTwitter] = useState();
  const [bank, setBank] = useState("");
  const [accountName, setAccountname] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verified, setVerified] = useState(false);
  const [brandLogo, setBrandLogo] = useState();
  const [brandLogoPreview, setBrandLogoPreview] = useState(
    "/images/default_Avater.png"
  );
  const [backgroundImage, setBackgroundImage] = useState();
  const [backgroundPreview, setBackgroundPreview] = useState(
    "/images/default_Avater.png"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setBrandName(brand?.brandName);
    setBrandType(brand?.brandType);
    setBrandDetail(brand?.brandDetail);
    setLocation(brand?.location);
    setWebsite(brand?.website);
    setWhatsApp(brand?.whatsApp);
    setFaceBook(brand?.faceBook);
    setInstagram(brand?.instagram);
    setTwitter(brand?.twitter);
    setBank(brand?.bank);
    setAccountname(brand?.accountName);
    setAccountNumber(brand?.accountNumber);
    setPhoneNumber(brand?.phoneNumber);
    setVerified(brand?.verified);
    setBrandLogoPreview(brand?.brandLogo?.url);
    setBackgroundPreview(brand?.backgroundImage?.url);
    console.log(brand);
    if (error) {
      setErrorMessage(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      setOpenM(true);
      dispatch(getMyBrand());
      dispatch({ type: UPDATE_BRAND_RESET });
    }
  }, [error, isUpdated, dispatch, navigate, brand]);

  const handleChangeL = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBrandLogoPreview(reader.result);
        setBrandLogo(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleChangeC = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBackgroundPreview(reader.result);
        setBackgroundImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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
    formData.set("brandName", brandName);
    formData.set("brandType", brandType);
    formData.set("brandDetail", brandDetail);
    formData.set("location", location);
    whatsApp && formData.set("whatsApp", whatsApp);
    faceBook && formData.set("faceBook", faceBook);
    instagram && formData.set("instagram", instagram);
    twitter && formData.set("twitter", twitter);
    website && formData.set("website", website);
    formData.set("bank", bank);
    formData.set("accountName", accountName);
    formData.set("phoneNumber", phoneNumber);
    formData.set("accountNumber", accountNumber);
    formData.set("verified", verified);
    formData.set("user", user._id);
    if (user.role === "admin") formData.set("verified", verified);
    brandLogo && formData.append("brandLogo", brandLogo);
    backgroundImage && formData.append("backgroundImage", backgroundImage);
    dispatch(updateBrand(brand._id, formData));
  };

  //ui functionalities
  useEffect(() => {
    dispatch({ type: SET_MY_BRAND });
  }, [dispatch]);

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
              borderRight: "0.1px solid #d9d3d3",
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
                    My brand
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
                      boxShadow: 2,
                      borderRadius: "15px",
                    }}
                  >
                    {errorMessage && (
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                      </Alert>
                    )}
                    {/* background */}
                    <FormControl
                      fullWidth
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Cover Image</Typography>

                      <Box
                        sx={{
                          border: "0.1px dashed grey",
                          borderRadius: "20px",
                          width: "50%",
                          height: "200px",
                          justifySelf: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          type="file"
                          name="coverImage"
                          id="customFile"
                          multiple
                          onChange={handleChangeC}
                        />
                      </Box>

                      <Stack
                        direction="row"
                        spacing={3}
                        sx={{ borderRadius: "10px" }}
                      >
                        <img
                          style={{ borderRadius: "inherit" }}
                          src={backgroundPreview}
                          alt="images-preview"
                          width="55"
                          height="52"
                        />
                      </Stack>
                    </FormControl>

                    {/* brandLogo */}
                    <FormControl
                      fullWidth
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Brand Logo</Typography>

                      <Box
                        sx={{
                          border: "0.1px dashed grey",
                          borderRadius: "20px",
                          width: "50%",
                          height: "200px",
                          justifySelf: "center",
                          display: "flex",

                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          type="file"
                          name="brandLogo"
                          multiple
                          onChange={handleChangeL}
                        />
                      </Box>

                      <Stack
                        direction="row"
                        spacing={3}
                        sx={{ borderRadius: "10px" }}
                      >
                        <img
                          style={{ borderRadius: "inherit" }}
                          src={brandLogoPreview}
                          alt="images-preview"
                          width="55"
                          height="52"
                        />
                      </Stack>
                    </FormControl>

                    <TextField
                      label="Brand Name"
                      type="text"
                      name="brandName"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      required
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Brand Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brandType}
                        label="Location"
                        name="brandType"
                        onChange={(e) => setBrandType(e.target.value)}
                      >
                        <MenuItem value="Plug">Plug</MenuItem>
                        <MenuItem value="Store">Store</MenuItem>
                        <MenuItem value="Mall">Mall</MenuItem>
                        <MenuItem value="Restaurants">Restaurants</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      id="outlined-multiline-static"
                      label="Brand Description"
                      multiline
                      rows={4}
                      color="primary"
                      placeholder="Brand Description"
                      value={brandDetail}
                      onChange={(e) => setBrandDetail(e.target.value)}
                    />
                    <TextField
                      label="Website"
                      type="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                    <TextField
                      label="Bank"
                      type="text"
                      name="bank"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      required
                    />
                    <TextField
                      label="Account Name"
                      type="text"
                      name="accountName"
                      value={accountName}
                      onChange={(e) => setAccountname(e.target.value)}
                      required
                    />
                    <TextField
                      label="Account Number"
                      type="text"
                      name="accountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                    />
                    <TextField
                      label="Phone Number"
                      type="text"
                      name="phoneMumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />

                    <TextField
                      label="WhatsApp Number"
                      type="text"
                      name="whatsApp"
                      value={whatsApp}
                      onChange={(e) => setWhatsApp(e.target.value)}
                    />

                    <TextField
                      label="instagram Link"
                      type="text"
                      name="instagram"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />

                    <TextField
                      label="FaceBook Link"
                      type="text"
                      name="faceBook"
                      value={faceBook}
                      onChange={(e) => setFaceBook(e.target.value)}
                    />

                    <TextField
                      label="Twitter Link"
                      type="text"
                      name="twitter"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                    />

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

                    <Stack
                      justifyContent="flex-end"
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                      }}
                    >
                      <LoadingButton
                        sx={{
                          width: "20%",
                          "&:focus": {
                            background: "rgb(24, 104, 183)",
                            outline: "none",
                            color: "white",
                          },
                          "&:hover": {
                            background: "rgb(24, 104, 183)",
                            outline: "none",
                            color: "white",
                          },
                          background: "rgb(24, 104, 183)",
                          outline: "none",
                          color: "white",
                        }}
                        loading={updating ? true : false}
                        onClick={handleSubmit}
                      >
                        Update
                      </LoadingButton>
                    </Stack>
                  </Stack>
                </Box>
              </>
            </Box>
          </Box>
        </Stack>
        <SidebarDrawer open={open} close={handleDrawerClose} />
      </Box>
      <Snackbar open={openM} autoHideDuration={4000} onClose={handleClose}>
        <SnackbarAlert>
          <Typography>Brand update successful</Typography>
        </SnackbarAlert>
      </Snackbar>
    </>
  );
}

export default MyBrand;
