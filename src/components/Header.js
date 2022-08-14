import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/esm/Table";
import { DLT } from "../redux/action/action";

const Header = () => {
  const [price, setPrice] = useState(0);
  console.log(price);

  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  return (
    <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
      <Container>
        <NavLink to="/" className="text-decoration-none text-light mx-3">
          Add to cart
        </NavLink>
        <Nav className="me-auto">
          <NavLink to="/" className="text-decoration-none text-light">
            Home
          </NavLink>
        </Nav>
        <Badge
          badgeContent={getdata.length}
          color="primary"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <i
            className="fa-solid fa-cart-shopping text-light"
            style={{ fontSize: 25, cursor: "pointer" }}
          ></i>
        </Badge>
      </Container>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {getdata.length ? (
          <div className="card_details" style={{ width: "24rem", padding: 10 }}>
            <Table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Food Name</th>
                </tr>
              </thead>
              <tbody>
                {getdata.map((e) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                            {" "}
                            <img
                              src={e.imgdata}
                              style={{ width: "5rem", height: "5rem" }}
                              alt=""
                            />
                          </NavLink>
                        </td>
                        <td>
                          <p>{e.rname}</p>
                          <p>Price : ₹{e.price}</p>
                          <p>Quantity : {e.qnty}</p>
                          <p
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => dlt(e.id)}
                          >
                            <i className="fas fa-trash smalltrash"></i>
                          </p>
                        </td>
                        <td
                          className="mt-5"
                          style={{
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                          onClick={() => dlt(e.id)}
                        >
                          <i className="fas fa-trash largetrash"></i>
                        </td>
                      </tr>
                    </>
                  );
                })}
                <p className="text-center">Total : {price}</p>
              </tbody>
            </Table>
          </div>
        ) : (
          <div
            className="d-flex  justify-content-center align-items-center"
            style={{
              width: "13rem",
              height: "2rem",
              top: 6,
              right: 8,
              padding: 7,
              position: "relative",
            }}
          >
            {/* <i
              className="fas fa-close smallclose"
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 9,
                right: 10,
                fontSize: 20,
                cursor: "pointer",
              }}
            ></i> */}
            <p style={{ fontSize: 18 }}>Your Cart is empty</p>
          </div>
        )}
      </Menu>
    </Navbar>
  );
};

export default Header;
