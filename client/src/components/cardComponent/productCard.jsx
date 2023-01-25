import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import bag from "../../images/bag.jpg";
import { Grid } from "@mui/material";

export default function ProductCard() {
  return (
    <Grid item>
      <Card sx={{ width: 300 }} component="div">
        <CardMedia
          component="img"
          alt="green iguana"
          height="150"
          image={bag}
        />
        <CardContent>
          <Typography gutterBottom sx={{ fontWeight: "600" }}>
            bag
          </Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          component="div"
        >
          <Button size="small" sx={{ color: "black" }}>
            Add to Cart
          </Button>
          <Button size="small" sx={{ color: "black" }}>
            Buy Now
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
