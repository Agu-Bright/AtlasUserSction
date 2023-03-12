import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Grid, Stack, Rating } from "@mui/material";
export default function ProductCard({ key, data, addToCart }) {
  const navigate = useNavigate();

  // const addToCart = () => {
  //   dispatch(addItemToCart(id, count));
  //   setCart(true);
  // };
  return (
    <Grid item xs={2} sm={4} md={3} sx={{ margin: "0px !important" }} key={key}>
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
          {/* <Typography variant="body2" color="text.secondary">
            hello
          </Typography> */}
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
          {/* <LoadingButton
                        loading={adding ? true : false}
                        variant="outlined"
                        sx={{ "&:focus": { outline: "none" },color: "white"  }}
                        onClick={addToCart}
                        disabled={book?.book?.stock === 0}
                      >
                        <Typography variant="h5">Add to cart</Typography>
                      </LoadingButton> */}
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
