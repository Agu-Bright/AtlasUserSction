import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../redux/actions/orderAction";
import { Container } from "@mui/system";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
function OrderDetails() {
  const [errorMessage, setErrorMessage] = useState();
  const diapatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  useEffect(() => {
    diapatch(getOrderDetails(id));
    if (error) {
      setErrorMessage(error);
      diapatch(clearErrors());
    }
  }, [diapatch, error, id]);
  const [navbar, setNavbar] = useState(true);

  return (
    <Box sx={{ background: "white" }}>
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
          paddingTop: { md: "100px", xs: "65px" },
          paddingBottom: "20px",
          border: "1px solid green",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: "10px",
            width: { md: "70%", xs: "95%" },
          }}
        >
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
              <CircularProgress />
            </Container>
          ) : (
            <Stack justifyContent="space-between" sx={{ width: "100%" }}>
              {" "}
              {order && (
                <Stack spacing={2} direction="column">
                  <Typography variant="h5">
                    Order ID : {order && order._id}
                  </Typography>
                  <Divider />
                  <Typography variant="h5">Shipping Info</Typography>
                  <Typography>
                    <b>Name:</b> {order.user.name}
                  </Typography>
                  <Typography>
                    <b>Phone:</b> {order.shippingInfo.phoneNumber}
                  </Typography>
                  <Typography>
                    <b>Address:</b>
                    {order.shippingInfo.address}
                  </Typography>
                  <Typography>
                    <b>Amount:</b>
                    &#8358;
                    {order.itemsPrice}
                  </Typography>

                  <Divider />

                  <Typography>
                    <b>Payment:</b>
                    {order.paymentInfo.status === "success" && (
                      <Typography
                        sx={{
                          display: "inline-block",
                          padding: "5px",
                          fontSize: "0.8em",
                          borderRadius: "15px",
                          background: "#87d287",
                        }}
                      >
                        {order.paymentInfo.status}
                      </Typography>
                    )}
                    {order.paymentInfo.status !== "success" && (
                      <Typography
                        sx={{
                          display: "inline-block",
                          padding: "5px",
                          fontSize: "0.8em",
                          borderRadius: "15px",
                          background: "#f3855a",
                        }}
                      >
                        {order.paymentInfo.status}
                      </Typography>
                    )}
                  </Typography>

                  <Typography>
                    <b>Order Status:</b>
                    {order.orderStatus === "Delivered" && (
                      <Typography
                        sx={{
                          display: "inline-block",
                          padding: "5px",
                          fontSize: "0.8em",
                          borderRadius: "15px",
                          background: "#87d287",
                        }}
                      >
                        {order.orderStatus}
                      </Typography>
                    )}
                    {order.orderStatus !== "Delivered" && (
                      <Typography
                        sx={{
                          display: "inline-block",
                          padding: "5px",
                          fontSize: "0.8em",
                          borderRadius: "15px",
                          background: "#f3855a",
                        }}
                      >
                        {order.orderStatus}
                      </Typography>
                    )}
                  </Typography>
                  <Divider />
                  <Typography variant="h5">Order Item</Typography>

                  <div className="cart-item my-1">
                    {order.orderItems.map((item) => (
                      <div
                        className="row my-5"
                        key={item.book}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/book/${item.book}`}>{item.name}</Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>
                            {" "}
                            <span style={{ color: "green" }}>&#8358;</span>
                            {item.price}
                          </p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p> {item.quantity} Piece(s)</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Stack>
              )}
              {error && <Box sx={{ merginTop: "20vh" }}>{errorMessage}</Box>}
            </Stack>
          )}
        </Paper>
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </Box>
  );
}

export default OrderDetails;
