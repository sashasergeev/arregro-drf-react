import React, { useState, useEffect } from "react";
import { useHeaderStyles } from "./styles";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import axios from "axios";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useStateValue } from "../../contextAuth";
import { Box, Button, Badge, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Notifications = () => {
  const classes = useHeaderStyles();
  const [{ token, isAuth }] = useStateValue();

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unNotifCount, setUnNotifCount] = useState(0);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (isAuth) {
      axios
        .get(`${window.location.origin}/api/notifications/count/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => setUnNotifCount(res.data.not_count));
    }
  }, [isAuth]);
  useEffect(() => {
    if (open) {
      axios
        .get(`${window.location.origin}/api/notifications/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => setNotifications(res.data));
    }
  }, [open]);
  const handleNotifMenu = (event) => setAnchorEl(event.currentTarget);

  const handleNotifMenuClose = () => {
    setAnchorEl(null);
  };
  const clearNotifications = (pk) => {
    axios
      .get(
        `${window.location.origin}/api/notifications/clear/${
          Number.isInteger(pk) ? "?pk=" + pk : ""
        }`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) =>
        res.data.status === "one"
          ? setUnNotifCount(unNotifCount - 1)
          : setUnNotifCount(0)
      );
  };

  return (
    <>
      <Button className={classes.authBtn} onClick={handleNotifMenu}>
        <span className={`${classes.menuButton} ${classes.MenuButtonDrawer}`}>
          <Badge color="secondary" badgeContent={unNotifCount}>
            <NotificationsNoneIcon />
          </Badge>
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleNotifMenuClose}
        onClick={handleNotifMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box className={classes.notifMenuTitle}>
          <Typography variant="subtitle1">Notifications</Typography>
          <ClearAllIcon
            onClick={clearNotifications}
            style={{ cursor: "pointer" }}
          />
        </Box>
        {notifications.map((e) => (
          <MenuItem
            className={!e.read && classes.notifMenuItemUnread}
            key={e.pk}
          >
            <Link
              to={`/coins/coin?id=${e.coin}/`}
              onClick={() => {
                !e.read && clearNotifications(e.pk);
              }}
              className={classes.notifMenuItem}
            >
              <img
                className={classes.notifMenuItemLogo}
                src={e.coinImg}
                alt={`${e.coinImg} logo`}
              />
              {e.coinName} have new post!
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Notifications;
