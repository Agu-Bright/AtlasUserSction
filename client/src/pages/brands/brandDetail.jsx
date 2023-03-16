import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  ButtonGroup,
  IconButton,
  Skeleton,
  Menu,
  Divider,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Navbar from "../../components/navbar/Navbar";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import moment from "moment";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import VerifiedIcon from "@mui/icons-material/Verified";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBrandDetail } from "../../redux/actions/brandAction";
import BrandProoducts from "./brandComponent/BrandProoducts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useSelect } from "@mui/base";

const ITEM_HEIGHT = 48;
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
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? (
          <Typography
            sx={{ cursor: "pointer", fontWeight: "600", color: "gray" }}
          >
            Read More
          </Typography>
        ) : (
          <Typography
            sx={{ cursor: "pointer", fontWeight: "600", color: "gray" }}
          >
            show less
          </Typography>
        )}
      </span>
    </p>
  );
};

function BrandDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = params;
  const [navbar, setNavbar] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { brandDetail, loading, error } = useSelector(
    (state) => state.brandDetails
  );
  const { user } = useSelector((state) => state.auth);
  const { brand } = useSelector((state) => state.myBrand);
  const toggelSideBar = () => {
    setToggle((prev) => !prev);
  };

  //category section

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    dispatch(getBrandDetail(id));
    if (error) {
      setErrorMessage(error);
    }
  }, [dispatch, id, error]);

  //menu setup
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          {loading && (
            <Skeleton
              variant="rectanguler"
              sx={{ width: "100%", height: "inherit" }}
            />
          )}
          {brandDetail?.backgroundImage && !loading ? (
            <img
              style={{ width: "100%", height: "inherit" }}
              src={brandDetail?.backgroundImage.url}
              alt={brandDetail?.brandName}
            />
          ) : (
            <>
              {!loading && (
                <Avatar
                  sx={{
                    width: "100%",
                    height: "inherit",
                    borderRadius: "0px",
                    marginTop: "10px",
                  }}
                >
                  {brandDetail?.brandName}
                </Avatar>
              )}
            </>
          )}

          <Box
            sx={{
              position: "absolute",
              top: { md: "25vh", xs: "18vh" },
              left: "20px",
            }}
          >
            {loading ? (
              <Skeleton
                variant="rectanguler"
                sx={{
                  border: "5px solid white",
                  borderRadius: "20px",
                  width: { md: "200px", xs: "100px" },
                  height: { md: "200px", xs: "100px" },
                }}
              />
            ) : (
              <Avatar
                src={brandDetail?.brandLogo?.url}
                alt="image"
                sx={{
                  border: "5px solid white",
                  borderRadius: "20px",
                  width: { md: "200px", xs: "100px" },
                  height: { md: "200px", xs: "100px" },
                }}
              />
            )}
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
            {loading ? (
              <Skeleton
                variant="rectanguler"
                sx={{
                  marginLeft: "25px",
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  height: "1.2em",
                }}
              />
            ) : (
              <>
                <Typography
                  sx={{
                    marginTop: "25px",
                    paddingTop: { md: "auto", xs: "" },
                    paddingLeft: { md: "25px", xs: "10px" },
                    fontWeight: "900",
                    fontSize: { md: "25px", sm: "20px", xs: "18px" },
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {brandDetail?.brandName}
                  {brandDetail?.verified && (
                    <span style={{ color: "blue" }}>
                      <IconButton sx={{ color: "blue" }}>
                        <VerifiedIcon sx={{ fontSize: "15px" }} />
                      </IconButton>
                    </span>
                  )}
                </Typography>
              </>
            )}
            {loading ? (
              <Skeleton
                variant="rectanguler"
                sx={{
                  marginLeft: "25px",
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  height: "1.2em",
                }}
              />
            ) : (
              <ButtonGroup
                sx={{
                  paddingRight: "25px",
                  paddingLeft: { md: "25px", xs: "10px" },
                }}
              >
                {brandDetail?.twitter && (
                  <IconButton target="_blank" href={`${brandDetail.twitter}`}>
                    <TwitterIcon sx={{ color: "black" }} />
                  </IconButton>
                )}

                {brandDetail?.instagram && (
                  <IconButton target="_blank" href={`${brandDetail.instagram}`}>
                    <InstagramIcon sx={{ color: "black" }} />
                  </IconButton>
                )}

                {brandDetail?.faceBook && (
                  <IconButton target="_blank" href={`${brandDetail.facebook}`}>
                    <FacebookIcon sx={{ color: "black" }} />
                  </IconButton>
                )}
                {brandDetail?.whatsApp && (
                  <IconButton target="_blank" href={`${brandDetail.whatsApp}`}>
                    <WhatsAppIcon sx={{ color: "black" }} />
                  </IconButton>
                )}
                {user && user?._id === brandDetail?.user?._id && (
                  <>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                      sx={{ "&:focus": { outline: "none" } }}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      }}
                    >
                      <Menu>
                        <MenuItem onClick={() => navigate("/newProduct")}>
                          Add Item
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => navigate("/myBrand")}>
                          Update Brand
                        </MenuItem>
                      </Menu>
                    </Menu>
                  </>
                )}
              </ButtonGroup>
            )}
          </Stack>
          <div style={{ width: "100%" }}>
            {loading ? (
              <Skeleton
                variant="rectanguler"
                sx={{
                  marginLeft: "25px",
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  height: "1.2em",
                  marginTop: "10px",
                }}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: { md: "25px", xs: "10px" },
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>
                  Created{" "}
                  <Typography
                    style={{
                      fontWeight: "400",
                      display: "inline-block",
                      fontSize: { md: "1em", xs: "0.8em" },
                    }}
                  >
                    {moment(brandDetail?.createdAt).fromNow()}
                  </Typography>
                </Typography>
                <Typography sx={{ fontWeight: "600" }}>
                  Brand Type :
                  <Typography
                    style={{
                      fontWeight: "400",
                      display: "inline-block",
                      fontSize: { md: "1em", xs: "0.8em" },
                    }}
                  >
                    {brandDetail?.brandType}
                  </Typography>
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                paddingLeft: { md: "25px", xs: "10px" },
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
                }}
              >
                {/* {brandDetail?.brandDetail.split().length > 50 ? (
                  brandDetail?.brandDetail
                ) : (
                  <ReadMore>{brandDetail?.brandDetail}</ReadMore>
                )} */}
                <ReadMore>{`${brandDetail?.brandDetail}`}</ReadMore>
              </Typography>
            </Box>
          </div>

          <BrandProoducts
            toggle={toggle}
            toggelSideBar={toggelSideBar}
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
            id={id}
          />
        </Box>
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default BrandDetail;
