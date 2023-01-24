import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import bag from "../../images/bag.jpg";

export default function CardComponent({ image, name }) {
  return (
    <Card sx={{ maxWidth: 250 }} component="div" className="mainCardContainer">
      <CardMedia
        component="img"
        alt="green iguana"
        height="150"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom sx={{ fontWeight: "600" }}>
          {name}
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
          Share
        </Button>
        <Button size="small" sx={{ color: "black" }}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
