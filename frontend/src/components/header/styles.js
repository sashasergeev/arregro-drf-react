import { makeStyles } from "@material-ui/core";

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
