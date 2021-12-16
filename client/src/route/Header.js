import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar>
          <NavbarBrand>
            <Link to={"/"}>
              <img
                src={require("../img/layout/logo.png").default}
                height="90px"
                width="200px"
                alt=""
              />
            </Link>
          </NavbarBrand>
          {/* <NavbarToggler /> */}
          <Nav className="mr-auto" className="menu">
            <NavItem>
              <NavLink to={"/board"}>게시판</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={"/register"}>사용자 등록</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={"/naverApi"}>상품 등록</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={"/product"}>구매 하기</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={"/cart"}>장바구니</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={"/history"}>구매 내역</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </header>
    );
  }
}

export default Header;
