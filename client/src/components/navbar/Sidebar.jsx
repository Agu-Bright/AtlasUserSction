import {
  List,
  ListItem,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Stack,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useSelector, useDispatch } from "react-redux";
function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { dashboard, orders, products, customers } = useSelector(
    (state) => state.highlight
  );
  const { brand } = useSelector((state) => state.myBrand);

  return (
    <div>
      <List disablePadding>
        <ListItem
          sx={{
            marginTop: "5px",
            cursor: "pointer",
          }}
        >
          <ListItemButton
            onClick={() => {
              navigate("/dashboard");
            }}
            sx={{
              "&:hover": { background: "rgb(24, 104, 183)", color: "white" },
              borderRadius: "10px",
              background: dashboard ? "rgb(24, 104, 183)" : "",
              color: dashboard ? "white" : "",
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" secondary={user?.role} />
          </ListItemButton>
        </ListItem>
        <ListItem
          sx={{
            marginTop: "5px",
            cursor: "pointer",
          }}
        >
          <ListItemButton
            sx={{
              "&:hover": { background: "rgb(24, 104, 183)", color: "white" },
              borderRadius: "10px",
              background: orders ? "rgb(24, 104, 183)" : "",
              color: orders ? "white" : "",
            }}
          >
            <ListItemIcon>
              <BookmarkBorderIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>

        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItem
              sx={{
                marginTop: "5px",
                cursor: "pointer",
              }}
            >
              <ListItemButton
                sx={{
                  "&:hover": {
                    background: "rgb(24, 104, 183)",
                    color: "white",
                  },
                  borderRadius: "10px",
                  background: products ? "rgb(24, 104, 183)" : "",
                  color: products ? "white" : "",
                }}
                // onClick={() => {
                //   navigate("/newProduct");
                // }}
              >
                <ListItemIcon>
                  <AutoStoriesIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="column" sx={{ alignItems: "start" }}>
              <ListItem
                sx={{
                  marginTop: "5px",
                  cursor: "pointer",
                }}
              >
                <ListItemButton
                  sx={{
                    "&:hover": {
                      background: "rgb(24, 104, 183)",
                      color: "white",
                    },
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    navigate("/productList");
                  }}
                >
                  <ListItemIcon>
                    <AutoStoriesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{
                  marginTop: "5px",
                  cursor: "pointer",
                }}
              >
                <ListItemButton
                  sx={{
                    "&:hover": {
                      background: "rgb(24, 104, 183)",
                      color: "white",
                    },
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    navigate("/newProduct");
                  }}
                >
                  <ListItemIcon>
                    <AutoStoriesIcon />
                  </ListItemIcon>
                  <ListItemText primary="New Item" />
                </ListItemButton>
              </ListItem>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <ListItem
          sx={{
            marginTop: "5px",
            cursor: "pointer",
          }}
        >
          <ListItemButton
            sx={{
              "&:hover": { background: "rgb(24, 104, 183)", color: "white" },
              borderRadius: "10px",
              background: customers ? "rgb(24, 104, 183)" : "",
              color: customers ? "white" : "",
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>
        <ListItem
          sx={{
            marginTop: "5px",
            cursor: "pointer",
          }}
        >
          <ListItemButton
            sx={{
              "&:hover": { background: "rgb(24, 104, 183)", color: "white" },
              borderRadius: "10px",
            }}
            onClick={() => navigate(`/brand/${brand._id}`)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="My Brand" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
