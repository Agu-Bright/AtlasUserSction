import React, { useState, useEffect, forwardRef } from "react";
import { getProduct } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import {
  Rating,
  Typography,
  Box,
  ButtonGroup,
  IconButton,
  Stack,
  Alert,
  Snackbar,
  Divider,
  Paper,
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
import RecommendedProducts from "./productComponents/RecommendedProducts";
import ProductReview from "./productComponents/productReview";
import { addItemToCart } from "../../redux/actions/cartAction";
const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="warning" elevation={6} ref={ref} {...props} />;
});
const SnackbarAlert2 = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});
function ProductDetail() {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(false);
  const [navbar, setNavbar] = useState(true);
  const [count, setCount] = useState(1);
  const { success } = useSelector((state) => state.review);
  const { adding } = useSelector((state) => state.cart);

  const { id } = params;
  const { product, error } = useSelector((state) => state.productDetail);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id, success]);

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
  //handle couner
  const increaseQty = () => {
    if (count >= Number(product?.product?.stock)) {
      setOpen(true);
      return;
    } else {
      const qty = count + 1;
      setCount(qty);
    }
  };
  const decreaseQty = () => {
    if (count <= 1) return;
    const qty = count - 1;
    setCount(qty);
  };

  //add product to cart
  const addToCart = () => {
    dispatch(addItemToCart(id, count));
    setCart(true);
  };
  return (
    <>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        active="active2"
        background="white"
        border={true}
      />
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
                width: { md: "100%", xs: "auto" },
                padding: "10px",
              }}
              justifyContent="space-around"
            >
              <Box
                sx={{
                  width: { md: "46%", xs: "100%" },
                  height: "80vh",
                  borderRadius: "10px",
                }}
              >
                <Swiper
                  style={{
                    width: "100%",
                    height: "inherit",
                    border: "1px solid gray",
                    borderRadius: "inherit",
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

              <Paper
                elevation={5}
                sx={{
                  width: { md: "47%", xs: "100%" },
                  maxHeigth: "20vh",
                  marginTop: { md: "none", xs: "10px" },
                }}
              >
                <Box sx={{ padding: "10px" }}>
                  <Typography variant="h3">{product?.product?.name}</Typography>
                  <Typography>
                    <strong>Stock:</strong> {product?.product?.stock}
                  </Typography>
                  <Box className="d-flex mb-3">
                    <div className="text-primary mr-2">
                      <Rating
                        value={Number(product?.product?.rating)}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                    </div>
                    <small className="pt-1">
                      ({product?.product?.numberOfReviews} reviews)
                    </small>
                  </Box>
                  <h3 className="font-weight-semi-bold mb-4">
                    <span style={{ color: "green" }}>&#8358;</span>
                    {numberWithCommas(Number(product?.product?.price))}
                  </h3>

                  <Stack
                    spacing={2}
                    sx={{ flexDirection: { xs: "column", md: "row" } }}
                  >
                    <ButtonGroup
                      variant="contained"
                      orientation="horizontal"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: 0,
                      }}
                    >
                      <IconButton
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={decreaseQty}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        variant="h4"
                        sx={{
                          textAlign: "center",
                          verticalAlign: "center",
                          padding: "4px",
                          border: "0.1px solid gray",
                        }}
                      >
                        {count}
                      </Typography>
                      <IconButton
                        color="warning"
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={increaseQty}
                      >
                        <AddIcon />
                      </IconButton>
                    </ButtonGroup>

                    <LoadingButton
                      loading={adding ? true : false}
                      variant="outlined"
                      sx={{
                        "&:focus": { outline: "none" },
                        background: "rgb(24, 104, 183)",
                      }}
                      onClick={addToCart}
                      disabled={product?.product?.stock === 0}
                    >
                      <Typography variant="h5">Add to cart</Typography>
                    </LoadingButton>
                  </Stack>

                  <Box
                    sx={{
                      marginTop: "10px",
                      padding: "5px",
                    }}
                  >
                    <Typography variant="h6">Description</Typography>
                    <p className="mb-4">{product?.product?.description}</p>
                  </Box>
                </Box>
              </Paper>
            </Stack>
            <Paper
              elevation={5}
              sx={{
                marginTop: "10px",
                width: { md: "100%", xs: "auto" },
                padding: "10px",
              }}
            >
              <ProductReview product={product} id={id} />
            </Paper>
            <Paper elevation={5} sx={{ padding: "20px 20px" }}>
              <Box
                sx={{
                  margin: "15px 5px",
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
              >
                <Box
                  sx={{
                    padding: "10px 10px",
                    borderTopRightRadius: "10px",
                    borderTopLeftRadius: "10px",
                  }}
                >
                  <Typography sx={{ fontWeight: "900" }}>
                    More From This Brand
                  </Typography>
                  <Divider sx={{ width: "100%", paddingTop: "15px" }} />
                </Box>
                <RecommendedProducts id={id} />
              </Box>
            </Paper>
          </>
        )}

        {error && <Typography> {error}</Typography>}
        <Snackbar
          open={open}
          autoHideDuration={10000}
          onClose={handleClose}
          sx={{ width: "300px" }}
        >
          <SnackbarAlert sx={{ width: "inherit" }}>
            <Typography>Out of stock</Typography>
          </SnackbarAlert>
        </Snackbar>

        <Snackbar open={cart} autoHideDuration={4000} onClose={handleClose2}>
          <SnackbarAlert2>
            <Typography>Item Added to cart</Typography>
          </SnackbarAlert2>
        </Snackbar>
        <Snackbar open={success} autoHideDuration={4000} onClose={handleClose2}>
          <SnackbarAlert2>
            <Typography>Posted</Typography>
          </SnackbarAlert2>
        </Snackbar>
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default ProductDetail;
