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
import { Badge, Button, Avatar, Stack } from "@mui/material";
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

  const logoUrl = 'https://res.cloudinary.com/dbyeirmqw/image/upload/v1749203410/timoya-farms-logo_pdaeob.png';

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#fff', color: '#222', boxShadow: 2, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64, px: { xs: 1, sm: 2 } }}>
          {/* Mobile Menu Icon */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 0,
              alignItems: "center",
              mr: 1,
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
              <MenuIcon sx={{ color: 'primary.main' }} />
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
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? '#219653' : '#222',
                      fontWeight: 600,
                      background: isActive ? 'rgba(33,150,83,0.08)' : 'none',
                      borderRadius: 6,
                      padding: '2px 8px',
                    })}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo + Name + Tagline (Footer style) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              flexGrow: 1,
              alignItems: "center",
              maxHeight: 74,
              textDecoration: 'none',
            }}
            component={NavLink}
            to="/"
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 1 }}>
              <Avatar src={logoUrl} alt="Timoya Farms Logo" sx={{ width: 54, height: 54, bgcolor: '#fff', border: '2.5px solid #219653', boxShadow: 2 }} />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: 1, lineHeight: 1 }}>
                  Timoya~Farms
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'secondary.main', lineHeight: 1 }}>
                  Local. Natural. Sustainable
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Centered Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              flexGrow: 1,
              alignItems: "center",
              mx: 2,
              gap: 0,
              borderRightStyle: "solid",
              borderRightWidth: 1,
              borderRightColor: "#e0e0e0",
              pr: 2,
            }}
          >
            {pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? '#219653' : '#222',
                  fontWeight: 700,
                  background: isActive ? 'rgba(33,150,83,0.08)' : 'none',
                  borderRadius: 6,
                  padding: '4px 16px',
                  transition: 'all 0.2s',
                })}
              >
                <Typography
                  variant="button"
                  sx={{ mx: 2, fontWeight: "bold", fontSize: "0.8rem", letterSpacing: 0.5 }}
                >
                  {page.name}
                </Typography>
              </NavLink>
            ))}
          </Box>

          {/* Cart | User Menu */}
          <Box sx={{ 
            flexGrow: 0, 
            display: "flex", 
            justifyContent: "flex-end",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 }
          }}>
            {/* Desktop: Cart icon in top bar */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Tooltip title="Cart">
                <IconButton
                  component={NavLink}
                  to="/cart"
                  sx={{ p: 0, color: 'primary.main', '&:hover': { color: '#17643A', background: 'rgba(33,150,83,0.08)' } }}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? '#219653' : '#222',
                  })}
                >
                  <Badge
                    badgeContent={context.cartLength}
                    color="secondary"
                    sx={{ color: "inherit" }}
                  >
                    <ShoppingCartCheckoutTwoTone 
                    sx={{ fontSize: { xs: 24, sm: 30 }, color: 'inherit' }}
                    />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
            {/* User Menu (with cart for mobile) */}
            <Tooltip title={user?.firstName ? `Logged in as ${user.firstName}${user.lastName ? ' ' + user.lastName : ''}${user.role ? ' (' + user.role + ')' : ''}` : "Profile"}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'primary.main', ml: { xs: 0.5, md: 1 }, '&:hover': { color: '#17643A', background: 'rgba(33,150,83,0.08)' } }}>
                <Badge
                  color="secondary"
                  variant={context.cartLength > 0 ? 'dot' : undefined}
                  overlap="circular"
                  invisible={context.cartLength === 0}
                  sx={{ '& .MuiBadge-dot': { right: 2, top: 2 } }}
                >
                  <AccountCircle sx={{ width: { xs: 32, sm: 36 }, height: { xs: 32, sm: 36 } }} />
                </Badge>
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
              {/* Mobile: Cart in user menu */}
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/cart'); }}>
                  <Badge
                    badgeContent={context.cartLength}
                    color="secondary"
                    sx={{ color: 'primary.main', mr: 1 }}
                  >
                    <ShoppingCartCheckoutTwoTone sx={{ fontSize: 22, color: 'primary.main' }} />
                  </Badge>
                  <Typography textAlign="center" sx={{ color: 'primary.main', fontWeight: 700 }}>Cart</Typography>
                </MenuItem>
                <Box sx={{ borderBottom: '1px solid #eee', my: 1 }} />
              </Box>
              {isAuthenticated ? (
                <>
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
                </>
              ) : (
                <>
                  <MenuItem onClick={() => {handleCloseUserMenu(); navigate('/login');}}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {handleCloseUserMenu(); navigate('/register');}}>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>

      </Container>
    </AppBar>
  );
};

export default Navbar;
