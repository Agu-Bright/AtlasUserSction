import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VerifiedIcon from "@mui/icons-material/Verified";

import { useNavigate } from "react-router-dom";
import { Grid, Stack, Rating, Box, Avatar, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/actions/cartAction";
import bag from "../../images/bag.jpg";
export default function BrandCard({ key, data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState(false);
  const { adding } = useSelector((state) => state.cart);

  // const addToCart = () => {
  //   dispatch(addItemToCart(id, count));
  //   setCart(true);
  // };
  return (
    <Grid item sx={{ margin: "0px !important" }} key={key}>
      <Card
        sx={{ width: { md: 300, sm: 200, xs: 290 } }}
        component="div"
        onClick={() => navigate(`/brand/${data._id}`)}
      >
        {data.backgroundImage ? (
          <CardMedia
            component="img"
            alt={data.brandName}
            height="150"
            image={
              data?.backgroundImage ? data?.backgroundImage.url : <Avatar />
            }
          />
        ) : (
          <CardMedia>
            <Avatar
              sx={{
                width: "inherit",
                borderRadius: "0px",
                height: "150px",
              }}
            >
              {data.brandName}
            </Avatar>
          </CardMedia>
        )}
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ position: "relative" }}
          >
            <Avatar
              src={data?.brandLogo.url}
              sx={{
                borderRadius: "10px",
                width: "60px",
                height: "60px",
                position: "absolute",
                bottom: "3px",
                border: "5px solid white",
              }}
            />
            <Typography
              sx={{
                fontWeight: "800",
                justifySelf: "flex-end",
                marginLeft: "80px",
                width: "auto",
                overflowX: "hidden",
              }}
            >
              {data.brandName}
              {data.verified && (
                <span style={{ color: "blue" }}>
                  <IconButton sx={{ color: "blue" }}>
                    <VerifiedIcon sx={{ fontSize: "15px" }} />
                  </IconButton>
                </span>
              )}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
