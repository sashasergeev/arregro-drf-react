import makeStyles from "@mui/styles/makeStyles";

export const containerVariantsEnter = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

export const useCoinStyles = makeStyles((theme) => ({
  secondaryDetails: {
    color: "#95969a",
    fontWeight: "600",
    fontSize: "13px",
  },
  coinCard: {
    width: 335,
    backgroundColor: "#040d1b6b",
    color: "white",
    padding: "11px",
  },
  coinLink: {
    color: "white",
    textDecoration: "none",
  },
  addBtn: {
    width: "50px",
    height: "auto",
    cursor: "pointer",
  },
}));
