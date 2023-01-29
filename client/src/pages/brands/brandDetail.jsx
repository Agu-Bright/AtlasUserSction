import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  ButtonGroup,
  IconButton,
  Grid,
  Button,
  Skeleton,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
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
import PrimarySearchAppBar from "../../components/search";

import { useParams } from "react-router-dom";
import { categories } from "../../utils/stateData";
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
  const { id } = params;
  const [navbar, setNavbar] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggelSideBar = () => {
    setToggle((prev) => !prev);
  };

  //category section
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
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
          {loading ? (
            <Skeleton
              variant="rectanguler"
              sx={{ width: "100%", height: "inherit" }}
            />
          ) : (
            <img
              style={{ width: "100%", height: "inherit" }}
              src={water}
              alt="The Brand"
            />
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
                src={pepsi}
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
                Pepsi drink official{" "}
                <span style={{ color: "blue" }}>
                  <IconButton sx={{ color: "blue" }}>
                    <VerifiedIcon sx={{ fontSize: "15px" }} />
                  </IconButton>
                </span>
              </Typography>
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
                  paddingLeft: { md: "25px", xs: "10px" },
                }}
              >
                <Typography sx={{ marginRight: "25px" }}>
                  Items <span style={{ fontWeight: "700" }}>9999</span>
                </Typography>
                <Typography>
                  Created <span style={{ fontWeight: "700" }}>jan 2022</span>
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
                <ReadMore>
                  GeeksforGeeks: A Computer Science portal for geeks. It
                  contains well written, well thought and well explained
                  computer science, programming articles and quizzes. It
                  provides a variety of services for you to learn, so thrive and
                  also have fun! Free Tutorials, Millions of Articles, Live,
                  Online and Classroom Courses ,Frequent Coding Competitions,
                  Webinars by Industry Experts, Internship opportunities, and
                  Job Opportunities. Knowledge is power! minted on the Ethereum
                  blockchain. 9,999 unique NFTs based on the WarpSound virtual
                  artists Nayomi, Gnar Heart + DJ Dragoon, with art by
                  Emmy-winning illustrator Andy Poon, the embedded 1/1 original
                  music composed entirely by AI using the visual traits of the
                  PFP 🤯WVRPS are the opening note of WarpSound’s larger
                  ractive, social music experience, helping ignite the future of
                </ReadMore>
              </Typography>
            </Box>
          </div>

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
                onClick={toggelSideBar}
                sx={{
                  width: "auto",
                  height: "auto",
                }}
              >
                <AppsIcon
                  sx={{ color: "black", width: "30px", height: "30px" }}
                />
              </IconButton>
              <Box sx={{ width: "75%", padding: "10px" }}>
                <PrimarySearchAppBar />
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
                          selected={selectedIndex === 2}
                          onClick={(event) => handleListItemClick(event, 2)}
                        >
                          {" "}
                          <ListItemText
                            sx={{ fontWeight: "700" }}
                            primary={category}
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
                  sx={{ padding: "15px" }}
                >
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
              </Paper>
            </Stack>
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
