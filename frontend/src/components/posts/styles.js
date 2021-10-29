import makeStyles from "@mui/styles/makeStyles";

export const useCardStyles = makeStyles({
  bdy: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#06070a40",
  },
  huo: {
    padding: "10px 8px",
  },
  root: {
    minWidth: 340,
    maxWidth: 350,
    backgroundColor: "#040d1b6b",
    color: "white",
  },
  paper: {
    textAlign: "center",
    fontWeight: 500,
    color: "white",
    background: "#181b22",
    padding: 2,
    borderRadius: 5,
  },
  ticker: {
    color: "#95969a",
    fontWeight: "600",
    fontSize: "13px",
  },
  actionIcons: {
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },
  priceSection: {
    padding: "5px",
  },
});

export const useFilterStyles = makeStyles((theme) => ({
  filterIcon: {
    position: "sticky",
    bottom: "25px",
    left: "25px",
    marginRight: "22px",
  },
  cancelIcon: {
    width: "48px",
    height: "48px",
  },
  filterBtns: {
    position: "sticky",
    bottom: "10px",
    width: "fit-content",
    "& .MuiFab-root": {
      background: "#e6e5e6",
      color: "#0c1018",
    },
  },
  main: {
    "& .MuiInputBase-root": {
      width: "50%",
      display: "block",
      margin: "10px auto",
    },

    "& .MuiButtonBase-root": {
      background: "#9ea5d0",
      color: "#0c1018",
    },
  },
  filterDatesBox: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "5px",
  },
  filterDateBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& .MuiTypography-root": {
      textAlign: "center",
    },
  },
}));

import { TableCell } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
// POST MODAL
// overriding classic TableCell component
export const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#6547a1",
    color: "#fff",
  },
  body: {
    backgroundColor: "#6547a1",
    fontSize: 16,
    color: "#fff",
  },
  sizeSmall: {
    padding: "6px 6px 6px 6px",
  },
}))(TableCell);

export const usePostModalStyles = makeStyles((theme) => ({
  text: {
    color: "#e6e6e6",
  },
  titleField: {
    backgroundColor: "#3f51b5",
    borderRadius: "10px 10px 0px 0px",
    fontSize: "18px",
    padding: "7px",
  },
  textField: {
    backgroundColor: "#0096885e",
    borderRadius: "0px 0px 10px 10px",
    padding: "7px",
    fontSize: "18px",
    marginBottom: "10px",
    wordBreak: "break-word",
    maxHeight: "200px",
    overflow: "auto",
  },
  mainBlock: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  nameLogoBlock: {
    backgroundColor: "#683bc1",
    padding: "5px 10px",
    borderRadius: "10px",
    boxShadow: "7px 7px 11px 5px #181b2247",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  linksBlock: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "10px",
  },
  ticker: {
    color: "#95969a",
    fontWeight: "600",
    fontSize: "15px",
  },
}));

export const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#8d77b7",
    border: "none",
    borderRadius: "7px",
  },
  overlay: {
    backgroundColor: "#6d4cadeb",
  },
};
