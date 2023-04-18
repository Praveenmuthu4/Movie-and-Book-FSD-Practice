import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function BasicProfileMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = sessionStorage.getItem("token")

  function logOut(){
    sessionStorage.removeItem("token", token)
    navigate("/login")
  }

  return (
    <div>
      <Button
        id="basic-button"
        color='inherit'
        size='large'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        {token
          ? <>
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={() => logOut()}>Logout</MenuItem>
          </>
          : <>
            <MenuItem onClick={() => navigate("/signup")}>Signup</MenuItem>
            <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
          </>}

      </Menu>
    </div>
  );
}