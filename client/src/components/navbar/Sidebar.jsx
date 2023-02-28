import {
  List,
  ListItem,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useSelector, useDispatch } from "react-redux";
function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  const { dashboard, orders, products, customers } = useSelector(
    (state) => state.highlight
  );

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
              background: products ? "rgb(24, 104, 183)" : "",
              color: products ? "white" : "",
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
