import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import CartContext from "../../Store/CartContext";
import { Badge, Button } from "@mui/material";
import { ShoppingCartCheckoutTwoTone } from "@mui/icons-material";
import { useAuth } from '../../contexts/AuthContext';

const pages = [
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Blog", path: "/blog" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const context = useContext(CartContext);
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout();
    handleCloseUserMenu();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64, px: 2 }}>
          {/* Mobile Menu Icon */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 0,
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ p: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              flexGrow: 1,
              alignItems: "center",
              maxHeight: 74,
            }}
            component={NavLink}
            to="/"
          >
            <img
              src="https://res.cloudinary.com/dbyeirmqw/image/upload/v1749203410/timoya-farms-logo_pdaeob.png"
              alt="Timoya-Farms Logo"
              style={{
                width: "35%",
                height: "auto",
              }}
            />
          </Box>

          {/* Centered Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              flexGrow: 1,
              alignItems: "center",
              mx: 2,
              gap: 2,
              borderRightStyle: "solid",
              borderRightWidth: 1,
              borderRightColor: "white",
              pr: 2,
            }}
          >
            {pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "yellow" : "white",
                })}
              >
                <Typography
                  variant="button"
                  sx={{ mx: 2, fontWeight: "bold", fontSize: "0.9rem" }}
                >
                  {page.name}
                </Typography>
              </NavLink>
            ))}
          </Box>


          {/* Cart | User Menu */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="Cart" sx={{ mr: 2 }}>
              <IconButton
                component={NavLink}
                to="/cart"
                sx={{ p: 0, color: "inherit", mr: 1 }}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "yellow" : "white",
                })}
              >
                <Badge
                  badgeContent={context.cartLength}
                  color="secondary"
                  sx={{ mr: 2, color: "inherit" }}
                >
                  <ShoppingCartCheckoutTwoTone 
                  sx={{ fontSize: 30, color: "inherit", }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            {isAuthenticated ? (
              <>
                <Tooltip title={user?.firstName ? `Logged in as ${user.firstName}${user.lastName ? ' ' + user.lastName : ''}${user.role ? ' (' + user.role + ')' : ''}` : "Profile"}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'inherit' }}>
                    <AccountCircle sx={{ width: 36, height: 36 }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "40px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => {handleCloseUserMenu(); navigate('/dashboard');}}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {handleCloseUserMenu(); navigate('/orders');}}>
                    <Typography textAlign="center">Orders</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {handleCloseUserMenu(); navigate('/checkout');}}>
                    <Typography textAlign="center">Checkout</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} disabled={loading}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={NavLink} to="/login" sx={{ mx: 1 }}>
                  Login
                </Button>
                <Button color="inherit" component={NavLink} to="/register" sx={{ mx: 1 }}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>

      </Container>
    </AppBar>
  );
};

export default Navbar;
