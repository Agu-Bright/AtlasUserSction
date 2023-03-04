import * as React from "react";
import { Avatar, Stack, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import bag from "../../images/bag.jpg";
import { useNavigate } from "react-router-dom";
export default function CardComponent({ data }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ width: { md: "100%", sm: "100%", xs: "100%" } }}
      component="div"
      onClick={() => navigate(`/brand/${data._id}`)}
    >
      {data.backgroundImage ? (
        <CardMedia
          component="img"
          alt={data.brandName}
          height="150"
          image={data?.backgroundImage ? data?.backgroundImage.url : <Avatar />}
        />
      ) : (
        <CardMedia>
          <Avatar
            sx={{
              width: "inherit",
              borderRadius: "0px",
              height: "150px",
              overflow: "hidden",
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
            src={data?.brandLogo?.url}
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
              overflowY: "scroll",
              height: "26px",
            }}
          >
            {data.brandName}
            {data.verified && (
              <span style={{ color: "blue" }}>
                <IconButton sx={{ color: "blue" }}>
                  {/* <VerifiedIcon sx={{ fontSize: "15px" }} /> */}
                </IconButton>
              </span>
            )}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
