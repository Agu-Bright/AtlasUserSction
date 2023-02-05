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
    <div className="container-fluid pb-5">
      {loading ? (
        <Container
          fixed
          sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <Box sx={{ marginTop: "15vh" }}>
          {product && (
            <>
              <div className="row px-xl-5" style={{ marginTop: "10px" }}>
                <div className="col-lg-5 mb-30">
                  <div
                    id="product-carousel"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner bg-light">
                      {product?.product?.images.map((item) => (
                        <div key={item.url} className="carousel-item active">
                          <img
                            className="w-100 h-100"
                            src={item.url}
                            alt="book detail"
                          />
                        </div>
                      ))}
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#product-carousel"
                      data-slide="prev"
                    >
                      <i className="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#product-carousel"
                      data-slide="next"
                    >
                      <i className="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                  </div>
                </div>

                <div className="col-lg-7 h-auto mb-30">
                  <div className="h-100 bg-light p-30">
                    <h3>{product?.product?.name}</h3>
                    <Typography>
                      <strong>Author:</strong> {product?.product?.author}
                    </Typography>
                    <Typography>
                      <strong>Number Of Pages:</strong>{" "}
                      {product?.product?.pageCount} pages
                    </Typography>
                    <Typography>
                      <strong>Stock:</strong> {product?.product?.stock}
                    </Typography>
                    <div className="d-flex mb-3">
                      <div className="text-primary mr-2">
                        <Rating
                          defaultValue={Number(product?.product?.rating)}
                          precision={0.5}
                          size="medium"
                          readOnly
                        />
                      </div>
                      <small className="pt-1">
                        ({product?.product?.numberOfReviews} reviews)
                      </small>
                    </div>
                    <h3 className="font-weight-semi-bold mb-4">
                      <span style={{ color: "green" }}>&#8358;</span>
                      {product?.product?.price}
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
                          color="primary"
                          sx={{ "&:focus": { outline: "none" } }}
                          // onClick={decreaseQty}
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
                          {/* {count} */}
                        </Typography>
                        <IconButton
                          color="warning"
                          sx={{ "&:focus": { outline: "none" } }}
                          // onClick={increaseQty}
                        >
                          <AddIcon />
                        </IconButton>
                      </ButtonGroup>

                      <LoadingButton
                        // loading={adding ? true : false}
                        variant="outlined"
                        sx={{ "&:focus": { outline: "none" } }}
                        // onClick={addToCart}
                        disabled={product?.product?.stock === 0}
                      >
                        <Typography variant="h5">Add to cart</Typography>
                      </LoadingButton>
                    </Stack>
                    <Box
                      sx={{
                        boxShadow: 2,
                        marginTop: "10px",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    >
                      <Typography variant="h4" color="primary">
                        Description
                      </Typography>
                      <p className="mb-4">{product?.product?.description}</p>
                    </Box>
                  </div>
                </div>
              </div>

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
        </Box>
      )}
    </div>
  );
}

export default ProductDetail;
