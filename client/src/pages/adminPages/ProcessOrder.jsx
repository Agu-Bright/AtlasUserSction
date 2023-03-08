import React, { useEffect, useState, forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import Sidebar from "../../components/navbar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
import ArticleIcon from "@mui/icons-material/Article";
import {
  CircularProgress,
  Typography,
  Alert,
  Snackbar,
  Stack,
  Box,
  IconButton,
  Button,
  Modal,
  Divider,
  Avatar,
} from "@mui/material";
import {
  updateOrder,
  getOrderDetails,
  clearErrors,
} from "../../redux/actions/orderAction";
import { LoadingButton } from "@mui/lab";
import { SET_ORDERS } from "../../redux/reducers/highlightReducer";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function ProcessOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(true);
  const [state, setState] = useState(true);
  const { id } = useParams();
  const { loading, order } = useSelector((state) => state.orderDetails);

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(order ? order.orderStatus : "");

  const { updating, error, isUpdated } = useSelector((state) => state.order);
  // useEffect(() => {

  // }, [dispatch, id]);
  const { user: User } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      setOpen(true);
    }
  }, [error, isUpdated, dispatch, navigate, id]);

  let shippingInfo;
  let orderItems;
  let paymentInfo;
  let user;
  let orderStatus;
  let itemsPrice;

  if (order) {
    shippingInfo = order.shippingInfo;
    orderItems = order.orderItems;
    paymentInfo = order.paymentInfo;
    user = order.user;
    orderStatus = order.orderStatus;
    itemsPrice = order.itemsPrice;
  }

  // const { user: me } = useSelector((state) => state.auth);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    dispatch({ type: SET_ORDERS });
  }, []);
  const toggle = () => {
    setState((prev) => !prev);
  };
  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };
  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}, ${shippingInfo.campus}`;

  // const orderStatusHandler = (e) => {
  //   setStatus(e.target.value);
  // };
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
          height: " 100%",
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
              height: "100vh",
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
                    Process Order
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginTop: { md: "", sm: "10px", xs: "10px" },
                    padding: { md: "15px", sm: "0px", xs: "0px" },
                    width: { md: "98%", ms: "100%", xs: "100%" },
                    display: { md: "flex", sm: "flex", xs: "flex" },
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <>
                    {loading ? (
                      <Container
                        fixed
                        sx={{
                          height: "60vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress color="warning" size="small" />
                      </Container>
                    ) : (
                      <Stack
                        direction={{ md: "row", sm: "row", xs: "column" }}
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                      >
                        <Box sx={{ width: { md: "49%", xs: "100%" } }}>
                          <Typography variant="h5">
                            Order ID : {order && order._id}
                          </Typography>
                          <Stack
                            direction="column"
                            spacing={0.5}
                            sx={{
                              marginTop: "15px",
                              padding: "10px",
                              boxShadow: 5,
                            }}
                          >
                            <Typography variant="h5">Shipping Info</Typography>
                            <Typography>
                              <b>Name: </b> {user && user.name}
                            </Typography>
                            <Typography>
                              <b>phone: </b>{" "}
                              {shippingInfo && shippingInfo.phoneNumber}
                            </Typography>
                            <Typography>
                              <b>Address: </b>
                              {shippingDetails}
                            </Typography>
                            <Typography>
                              <b>Amount:</b> &#8358;{itemsPrice && itemsPrice}
                            </Typography>

                            <Divider />

                            <Typography>
                              <b> Payment : </b>

                              {paymentInfo &&
                                paymentInfo.status === "success" && (
                                  <Typography
                                    sx={{
                                      display: "inline-block",
                                      padding: "5px",
                                      fontSize: "0.8em",
                                      borderRadius: "15px",
                                      background: "#87d287",
                                    }}
                                  >
                                    {paymentInfo && paymentInfo.status}
                                  </Typography>
                                )}
                              {paymentInfo &&
                                paymentInfo.status !== "success" && (
                                  <Typography
                                    sx={{
                                      display: "inline-block",
                                      padding: "5px",
                                      fontSize: "0.8em",
                                      borderRadius: "15px",
                                      background: "#f3855a",
                                    }}
                                  >
                                    {paymentInfo && paymentInfo.status}
                                  </Typography>
                                )}
                            </Typography>

                            <Typography>
                              <b> Reference ID :</b>
                              {paymentInfo && paymentInfo.id}
                            </Typography>

                            <Typography>
                              <b>Order Status: </b>
                              {orderStatus && orderStatus === "success" && (
                                <Typography
                                  sx={{
                                    display: "inline-block",
                                    padding: "5px",
                                    fontSize: "0.8em",
                                    borderRadius: "15px",
                                    background: "#87d287",
                                  }}
                                >
                                  {orderStatus && orderStatus}
                                </Typography>
                              )}
                              {orderStatus && orderStatus !== "success" && (
                                <Typography
                                  sx={{
                                    display: "inline-block",
                                    padding: "5px",
                                    fontSize: "0.8em",
                                    borderRadius: "15px",
                                    background: "#f3855a",
                                  }}
                                >
                                  {orderStatus && orderStatus}
                                </Typography>
                              )}
                            </Typography>

                            <Divider />
                            <Typography variant="h5">Order Items:</Typography>

                            <Box>
                              {orderItems &&
                                orderItems.map((item) => (
                                  <>
                                    {user.role === "seller" &&
                                    user._id === item.seller ? (
                                      <Stack
                                        key={item.product}
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ padding: "10px 10px" }}
                                      >
                                        {" "}
                                        <Avatar
                                          src={item.image}
                                          alt={item.name}
                                        />
                                        <Typography
                                          sx={{
                                            textAlign: "start",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            navigate`/product/${item.product}`()
                                          }
                                        >
                                          {item.name}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            textAlign: "start",
                                          }}
                                        >
                                          &#8358;{item.price}
                                        </Typography>
                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                          <p>{`${item.quantity} Piece(s)`}</p>
                                          {User._id === item.seller && (
                                            <Typography>
                                              <Alert
                                                icon={false}
                                                severity="warning"
                                              >
                                                Your order{" "}
                                              </Alert>
                                            </Typography>
                                          )}
                                        </div>
                                      </Stack>
                                    ) : (
                                      <Stack
                                        key={item.product}
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ padding: "10px 10px" }}
                                      >
                                        {" "}
                                        <Avatar
                                          src={item.image}
                                          alt={item.name}
                                        />
                                        <Typography
                                          sx={{
                                            textAlign: "start",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            navigate`/product/${item.product}`()
                                          }
                                        >
                                          {item.name}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            textAlign: "start",
                                          }}
                                        >
                                          &#8358;{item.price}
                                        </Typography>
                                        {/* <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                      <p>{`${item.quantity} Piece(s)`}</p>
                                      {User._id === item.seller && (
                                        <Typography>
                                          <Alert
                                            icon={false}
                                            severity="warning"
                                          >
                                            Your order{" "}
                                          </Alert>
                                        </Typography>
                                      )}
                                    </div> */}
                                      </Stack>
                                    )}
                                    <Divider />
                                  </>
                                ))}
                            </Box>
                            <hr />
                          </Stack>
                        </Box>

                        <Box
                          sx={{
                            width: { md: "49%", xs: "100%" },
                          }}
                        >
                          <Typography variant="h5">update Order</Typography>
                          <Box
                            sx={{
                              marginTop: "15px",
                              padding: "10px",
                              boxShadow: 5,
                            }}
                          >
                            <Typography>Status</Typography>

                            <div className="form-group">
                              <select
                                className="form-control"
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </div>

                            <Stack>
                              <LoadingButton
                                disabled={
                                  orderStatus === "delivered" ? false : true
                                }
                                id="login_button"
                                type="submit"
                                color="primary"
                                variant="contained"
                                loading={updating ? true : false}
                                sx={{ "&:focus": { outline: "none" } }}
                                onClick={() => updateOrderHandler(order._id)}
                              >
                                UPDATE ORDER
                              </LoadingButton>

                              <Snackbar
                                open={open}
                                autoHideDuration={4000}
                                onClose={handleClose}
                              >
                                <SnackbarAlert>
                                  <Typography>updated</Typography>
                                </SnackbarAlert>
                              </Snackbar>
                            </Stack>
                          </Box>
                        </Box>
                      </Stack>
                    )}
                  </>
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

export default ProcessOrder;
