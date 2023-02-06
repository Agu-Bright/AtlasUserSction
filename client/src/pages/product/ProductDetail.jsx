import React, { useState, useEffect, forwardRef } from "react";
import { getProduct } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/system";
import {
  CircularProgress,
  Rating,
  Typography,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Alert,
  Snackbar,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LoadingButton } from "@mui/lab";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import RecommendedProducts from "./RecommendedProducts";
const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="warning" elevation={6} ref={ref} {...props} />;
});
const SnackbarAlert2 = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});
function ProductDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const [state, setState] = useState(true);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(false);
  const [navbar, setNavbar] = useState(true);

  const { id } = params;
  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
  const toggleView = (view) => {
    setState((prev) => (prev ? false : true));
  };
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleClose2 = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCart(false);
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
        {product && (
          <>
            <Stack
              direction={{ md: "row", xs: "column" }}
              sx={{
                marginTop: "10px",
                border: "2px solid blue",
                width: "100%",
                padding: "10px",
              }}
              justifyContent="space-around"
            >
              <Box
                sx={{
                  width: { md: "46%", xs: "95%" },
                  height: "80vh",
                  borderRadius: "5px",
                  border: "1px solid",
                }}
              >
                <Swiper
                  style={{
                    width: "100%",
                    height: "inherit",
                  }}
                  slidesPerView={1}
                  modules={[Navigation, A11y]}
                  navigation
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log("slide change")}
                >
                  {product?.product?.images.map((item) => (
                    <SwiperSlide key={item.url}>
                      <img
                        src={item.url}
                        alt="productimage"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "5px",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>

              <Box
                sx={{
                  border: "5px solid green",
                  width: "47%",
                  maxHeigth: "20vh",
                }}
              ></Box>
            </Stack>

            <div className="row px-xl-5">
              <div className="col">
                <div className="bg-light p-30">
                  <div className="nav nav-tabs mb-4">
                    <Button
                      variant={state ? "contained" : ""}
                      onClick={() => {
                        toggleView(true);
                      }}
                      sx={{ "&:focus": { outline: "none" } }}
                    >
                      Reviews ({product?.product?.numberOfReviews})
                    </Button>
                    <Button
                      sx={{ "&:focus": { outline: "none" } }}
                      onClick={() => {
                        toggleView(false);
                      }}
                      variant={!state ? "contained" : ""}
                    >
                      Description
                    </Button>
                  </div>

                  {/* <div className="tab-content">
                      {state ? (
                        <Box>
                          <div className="row">
                            <div className="col-md-6">
                              {reviews && (
                                <h4 className="mb-4">
                                  {`${reviews.length} review(s) for ${book?.book?.name}`}
                                </h4>
                              )}
                              <Box
                                sx={{
                                  backgroundColor: "rgb(224, 250, 250)",
                                  borderRadius: "10px",
                                  padding: "5px",
                                  maxHeight: "35vh",
                                  overflowY: "scroll",
                                }}
                              >
                                {reviews &&
                                  reviews.map((rev) => (
                                    <>
                                      <div className="media mb-4">
                                        <div className="media-body">
                                          <h6>
                                            {rev.name}
                                            <small> </small>
                                          </h6>
                                          <Stack spacing={2}>
                                            <Rating
                                              value={rev.rating}
                                              precision={0.5}
                                              size="small"
                                              readOnly
                                            />
                                          </Stack>
                                          <Typography>{rev.comment}</Typography>
                                        </div>
                                      </div>
                                      <Divider />
                                    </>
                                  ))}
                              </Box>
                            </div>

                            {user ? (
                              <div className="col-md-6">
                                <h4 className="mb-4">Leave a review</h4>

                                <Stack spacing={2}>
                                  <Rating
                                    value={rating}
                                    onChange={handleRating}
                                    precision={0.5}
                                    size="small"
                                  />
                                </Stack>
                                <form>
                                  <div className="form-group">
                                    <label htmlfor="message">
                                      Your Review *
                                    </label>
                                    <textarea
                                      id="message"
                                      cols="30"
                                      rows="5"
                                      className="form-control"
                                      value={comment}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                    ></textarea>
                                  </div>

                                  <LoadingButton
                                    onClick={handlePostReview}
                                    variant="contained"
                                    loading={sending ? true : false}
                                    sx={{
                                      "&:focus": { outline: "none" },
                                      width: "30vw",
                                    }}
                                  >
                                    post
                                  </LoadingButton>
                                </form>
                              </div>
                            ) : (
                              <Box>
                                Sign In to leave a review
                                <Link to="/sign-in">Sign In</Link>
                              </Box>
                            )}
                          </div>
                        </Box>
                      ) : (
                        <Box>
                          <Typography variant="h4">
                            Product Description
                          </Typography>
                          <Typography variant="body1">
                            {book?.book?.description}
                          </Typography>
                        </Box>
                      )}
                    </div> */}
                </div>
              </div>
              <Snackbar
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
              >
                <SnackbarAlert>
                  <Typography>Out of stock</Typography>
                </SnackbarAlert>
              </Snackbar>

              <Snackbar
                open={cart}
                autoHideDuration={4000}
                onClose={handleClose2}
              >
                <SnackbarAlert2>
                  <Typography>Item Added to cart</Typography>
                </SnackbarAlert2>
              </Snackbar>
              <Snackbar
                // open={success}
                autoHideDuration={4000}
                onClose={handleClose2}
              >
                <SnackbarAlert2>
                  <Typography>Posted</Typography>
                </SnackbarAlert2>
              </Snackbar>
            </div>
          </>
        )}
        {error && <Typography> {error}</Typography>}
        <RecommendedProducts id={id} />
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default ProductDetail;
