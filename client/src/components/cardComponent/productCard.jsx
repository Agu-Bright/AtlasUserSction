import React, { useState, forwardRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Grid, Stack, Rating, Alert, Snackbar } from "@mui/material";
import { addItemToCart } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";
const SnackbarAlert2 = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});
export default function ProductCard({ key, data }) {
  const [cart, setCart] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItemToCart(data._id, 1));
    setCart(true);
  };
  const handleClose2 = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCart(false);
  };
  return (
    <Grid item xs={2} sm={4} md={3} sx={{ margin: "0px !important" }} key={key}>
      <Snackbar
        size="small"
        open={cart}
        autoHideDuration={4000}
        onClose={handleClose2}
      >
        <SnackbarAlert2>
          <Typography>Item Added to cart</Typography>
        </SnackbarAlert2>
      </Snackbar>
      <Card sx={{ width: "100%" }} component="div">
        <CardMedia
          component="img"
          alt={data.name}
          height="150"
          image={data.images[0].url}
        />
        <CardContent sx={{ padding: { md: "8px 8px", xs: "4px" } }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              gutterBottom
              sx={{ fontWeight: "600", fontSize: { md: "1em", xs: "0.8em" } }}
            >
              {data.name}
            </Typography>
            <Typography
              sx={{ fontWeight: "600", fontSize: { md: "1em", xs: "0.8em" } }}
            >
              <span>&#8358;</span>
              {data.price}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Rating
              value={Number(data.rating)}
              precision={0.5}
              size="small"
              readOnly
            />
            <Typography sx={{ fontSize: { md: "1em", xs: "0.6em" } }}>
              ({data.numberOfReviews} reviews)
            </Typography>
          </Stack>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopRightRadius: "20px",
            borderTopLeftRadius: "20px",
            background: "rgb(24, 104, 183)",
            padding: { md: "8px", xs: "5px" },
          }}
          component="div"
        >
          <Button
            size="small"
            sx={{ color: "white", fontSize: { md: "0.8em", xs: "0.45em" } }}
            onClick={() => navigate(`/product/${data._id}`)}
          >
            View details
          </Button>

          <Button
            size="small"
            sx={{ color: "white", fontSize: { md: "0.8em", xs: "0.45em" } }}
            onClick={() => addToCart(data._id)}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
