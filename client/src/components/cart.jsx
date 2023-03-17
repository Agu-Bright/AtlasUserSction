import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  ButtonGroup,
} from "@mui/material";
import { Stack } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart, removeItemFromcart } from "../redux/actions/cartAction";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty >= stock) return;
    dispatch(addItemToCart(id, newQty));
  };
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 1) return;
    dispatch(addItemToCart(id, newQty));
  };
  const removeCartHandler = (id) => {
    dispatch(removeItemFromcart(id));
  };
  const checkOutHandler = () => {
    navigate("/shipping");
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      PaperProps={{
        sx: {
          margin: "10px 20px",
          width: { md: "30%", xs: "90%" },
          height: "95vh",
          borderRadius: "15px",
        },
        className: "cartmain",
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            alignItems: "center",
            padding: "5px 0px",
          }}
        >
          <Typography sx={{ fontWeight: "700", fontSize: "1.4em" }}>
            Your Cart
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ "&:focus": { outline: "none" } }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ marginTop: "10px" }} />
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            alignItems: "center",
            padding: "5px 0px",
          }}
        >
          <Typography sx={{ fontWeight: "500", fontSize: "1.1em" }}>
            {cartItems.length === 1
              ? `${cartItems.length} item`
              : `${cartItems.length} items`}
          </Typography>
          <Typography
            sx={{ fontWeight: "500", fontSize: "1.1em", cursor: "pointer" }}
          ></Typography>
        </Stack>

        {cartItems.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 !important",
              padding: "0 !important",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                width: "90%",
                fontWeight: "3em",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Your Cart is Empty
            </Typography>
            <IconButton
              sx={{ border: "1px solid", "&:focus": { outline: "none" } }}
            >
              <ProductionQuantityLimitsIcon
                sx={{
                  fontWeight: "900",
                  fontSize: "5em",
                  padding: "15px",
                  "&:focus": {
                    outline: "none",
                  },
                }}
                onClick={() => navigate("/products")}
              />
            </IconButton>
          </Box>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem
                  key={item.product}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      sx={{ "&:focus": { outline: "none" } }}
                      onClick={() => removeCartHandler(item.product)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={item.name}
                      src={item.image}
                      sx={{
                        borderRadius: "6px",
                        height: "60px",
                        width: "60px",
                        marginRight: "5px",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                        <span style={{ color: "grey" }}>&#8358;</span>
                        {numberWithCommas(Number(item.price))}
                      </>
                    }
                  />
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
                      onClick={() => {
                        decreaseQty(item.product, item.quantity);
                      }}
                      color="secondary"
                      sx={{ "&:focus": { outline: "none" } }}
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
                      {item.quantity}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        increaseQty(item.product, item.quantity, item.stock);
                      }}
                      color="warning"
                      sx={{ "&:focus": { outline: "none" } }}
                    >
                      <AddIcon />
                    </IconButton>
                  </ButtonGroup>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ marginTop: "10px" }} />

            <Box sx={{ width: "100%" }}>
              <Typography sx={{ fontWeight: "500", fontSize: "1.1em" }}>
                Cart Summary
              </Typography>
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <Typography variant="h6">Subtotal</Typography>
                    <Typography variant="h6">
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{" "}
                      (units)
                    </Typography>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6" sx={{ fontWeight: "700" }}>
                      <span style={{ color: "gray" }}>&#8358;</span>
                      {numberWithCommas(
                        Number(
                          cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                        )
                      )}
                    </Typography>
                  </div>
                  <Stack>
                    <LoadingButton
                      onClick={checkOutHandler}
                      variant="contained"
                      // loading={sending ? true : false}
                      sx={{
                        "&:focus": { outline: "none" },
                        background: "rgb(24, 104, 183)",
                      }}
                    >
                      Proceed To Checkout
                    </LoadingButton>
                  </Stack>
                </div>
              </div>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;
