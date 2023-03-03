import React, { useEffect, useState, forwardRef } from "react";
import {
  CircularProgress,
  IconButton,
  Typography,
  Box,
  Modal,
  Alert,
  Snackbar,
  Stack,
  Button,
} from "@mui/material";
import MUIDataTable from "mui-datatables";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import ArticleIcon from "@mui/icons-material/Article";
import { SET_PRODUCTS } from "../../redux/reducers/highlightReducer";
import {
  adminGetProducts,
  deleteProduct,
} from "../../redux/actions/productAction";
import { Container } from "@mui/system";
import { MDBDataTable } from "mdbreact";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../../components/navbar/Sidebar";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
// import { DELETE_BOOKS_RESET } from "../../redux/constants/bookConstants";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function ProductList() {
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggle = () => {
    setState((prev) => !prev);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 200, md: 400 },
    bgcolor: "background.paper",
    border: "2px solid green",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const [navbar, setNavbar] = useState(true);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(true);

  const [openM, setOpenM] = useState(false);
  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => setOpenM(false);

  // const [open, setOpen] = useState(false);
  const [bookId, setBookId] = useState();
  // const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.allProducts
  );
  const { isDeleted, reset, deleting } = useSelector(
    (state) => state.deleteProduct
  );

  useEffect(() => {
    dispatch(adminGetProducts());

    // if (deleteError) {
    //   alert(deleteError);
    // }
  }, [dispatch, isDeleted, reset]);
  useEffect(() => {
    dispatch({ type: SET_PRODUCTS });
  });
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = ["Product Id", "Name", "Price", "Stock", "action"];
  const data = [];
  products &&
    products.map((product) =>
      data.push([
        product._id,
        product.name,
        product.price,
        product.stock,
        <>
          <Link to={`/admin/book/${product._id}`}>
            <IconButton sx={{ "&:focus": { outline: "none" } }}>
              <EditIcon color="primary" />
            </IconButton>
          </Link>

          <IconButton
            color="error"
            sx={{ "&:focus": { outline: "none" } }}
            onClick={() => {
              setBookId(product._id);
              handleOpenM();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>,
      ])
    );

  const options = {
    filterType: "checkbox",
  };
  return (
    <>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        background="white"
        border={true}
      />
      <Box
        sx={{
          paddingTop: { md: "12.2vh", xs: "9vh" },
          backgroundColor: "white",
          margin: "0px !important",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            height: "inherit",
            width: "100%",
          }}
        >
          <Box
            sx={{
              borderRight: "0.1px solid gray",
              width: "20%",
              display: { md: state ? "block" : "none", sm: "none", xs: "none" },
            }}
          >
            {" "}
            <Sidebar />
          </Box>
          <Box
            className="dashboard-main"
            sx={{
              width: "100%",
              overflowY: "scroll",
              paddingRight: "10px",
            }}
          >
            <Box sx={{ width: "100%", margin: "0", padding: "0" }}>
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    sx={{
                      margin: "5px",
                      "&:focus": {
                        outline: "none",
                      },
                      display: { md: "block", ms: "none", xs: "none" },
                    }}
                    onClick={toggle}
                  >
                    {state ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
                  </IconButton>
                  <IconButton
                    sx={{
                      margin: "5px",
                      "&:focus": {
                        outline: "none",
                      },
                      display: { md: "none", sm: "block", xs: "block" },
                    }}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <ArticleIcon sx={{ fontSize: "1.2em" }} />
                  </IconButton>
                  <Typography sx={{ fontWeight: "600", fontSize: "1.3em" }}>
                    All Products
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "auto",
                    overflowX: "scroll",
                  }}
                >
                  <MUIDataTable
                    title={"Product List"}
                    data={data}
                    columns={columns}
                    options={options}
                  />
                </Box>

                <Snackbar
                  open={isDeleted}
                  autoHideDuration={4000}
                  // onClose={handleClose}
                >
                  <SnackbarAlert>
                    <Typography>Deleted</Typography>
                  </SnackbarAlert>
                </Snackbar>
                <Modal
                  open={openM}
                  onClose={handleCloseM}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Delete Book
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Are you sure you wan't to delete this book?
                    </Typography>
                    <Stack>
                      <Button
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => setOpenM(false)}
                      >
                        cancel
                      </Button>
                      <Button
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => {
                          handleDelete(bookId);
                          setOpenM(false);
                        }}
                      >
                        Yes
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
              </>
            </Box>
          </Box>
        </Stack>
        <SidebarDrawer open={open} close={handleDrawerClose} />
      </Box>
    </>
  );
}

export default ProductList;
