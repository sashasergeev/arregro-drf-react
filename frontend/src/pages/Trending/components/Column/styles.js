import makeStyles from "@mui/styles/makeStyles";

export const useColumnStyles = makeStyles({
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "5px 10px",
  },
  coinLogo: {},
  change: { marginLeft: "auto" },
  coinLink: { textDecoration: "none", color: "inherit" },
  skeleton: {
    width: "-webkit-fill-available",
    background: "#ffeddb14",
  },
});
