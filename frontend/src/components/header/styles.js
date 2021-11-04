import makeStyles from "@mui/styles/makeStyles";

export const useHeaderStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#181b22",
  },
  logo: {
    fontWeight: 700,
    fontSize: 20,
    color: "#FFFEFE",
    textAlign: "left",
    border: "1px solid transparent",
    paddingBottom: 5,
    paddingTop: 5,
    textDecoration: "none",
  },
  menuButton: {
    fontWeight: 700,
    fontSize: 18,
    margin: 0,
    textDecoration: "none",
    color: "white",
    border: "1px solid transparent",
    paddingBottom: 5,
    paddingTop: 5,
  },
  MenuButtonDrawer: {
    fontSize: "15px",
    display: "flex",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  active: {
    borderWidth: 2,
    boxShadow: "0px 7px 1px -2px #2ecd2d78",
    paddingBottom: 5,
  },
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "7px",
    alignItems: "center",
  },
  menuItemIcon: {
    padding: "4px",
    background: "#8980f5",
    borderRadius: "50%",
  },
  menuBtnSecondary: {
    textDecoration: "none",
    color: "gray",
    paddingLeft: 20,
    paddingRight: 20,
  },
  authBtn: {
    border: "1px solid #15181d",
    background: "none",
    "&:hover": {
      backgroundColor: "#8980f529",
    },
  },
  authBtns: {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  notifMenuItem: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#15181d",
    justifyContent: "space-between",
    gap: "10px",
  },
  notifMenuItemLogo: { width: "32px", height: "32px" },
  notifMenuTitle: {
    padding: "6px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notifMenuItemUnread: {
    background: "#4caf5057",
    "&:hover": { background: "#7cdf7f", boxShadow: "0px 3px 5px #a79b9b6b" },
  },
}));

export const useDrawerStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    display: "block",
  },
  icon: {
    color: "white",
  },
  paper: {
    background:
      "linear-gradient(0deg, rgb(34 114 44) 50%, rgba(23,34,43,1) 50%)",
    width: "40vw",
  },
  listItemText: {
    textAlign: "center",
    padding: "10px 0px",
  },
  active: {
    borderWidth: 2,
    boxShadow: "0px 7px 1px -2px #2ecd2d78",
    paddingBottom: 5,
  },
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "7px",
  },
  menuItemIcon: {
    padding: "4px",
    background: "#8980f5",
    borderRadius: "50%",
  },
}));
