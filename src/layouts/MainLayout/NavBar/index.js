import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  // Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  Users as UsersIcon,
  User as UserIcon,
  Home as HomeIcon
} from 'react-feather';
import NavItem from './NavItem';
import Logo from '../../../components/Logo';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Online Quiz Platform',
  name: 'Brainalry 2021'
};

const items = [
  {
    href: '/app/dashboard',
    icon: HomeIcon,
    title: 'Home'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'How it works'
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Way to play'
  },
  {
    href: '/app/account',
    icon: UsersIcon,
    title: 'About us'
  },
  {
    href: '/signup',
    icon: UserIcon,
    title: 'Join Us'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    display: 'none',
    width: 256,
    height: 'calc(100%)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Logo />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
