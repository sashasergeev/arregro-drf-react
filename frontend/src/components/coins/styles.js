import makeStyles from "@mui/styles/makeStyles";

export const useSearchStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      margin: theme.spacing(1),
      width: "250px",
    },
    "& .MuiInputBase-input": {
      color: "#dadada",
    },
    "& .MuiInputBase-root": {},
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff30",
    },
    "& .MuiFormLabel-root": {
      color: "rgb(91 117 128)",
    },
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  dropdown: {
    "& a": {
      color: "white",
      display: "block",
      textDecoration: "none",
      padding: "5px 5px",
      "&:hover": {
        backgroundColor: "#a7a7a72e",
      },
    },
    position: "absolute",
    width: "107%",
    maxHeight: "200px",
    background: "#0e131c",
    zIndex: 100,
    top: "79px",
    right: "-9px",
    border: "1px solid rgb(139 0 239 / 33%)",
    overflow: "auto",
  },
}));

export const useCoinStyles = makeStyles((theme) => ({
  unFollow: {
    background: "#c21d5112",
    color: "#c21d51",
    border: "1px solid #c21d51",
    "&:hover": {
      borderColor: "#f50852",
      color: "#f50852",
      backgroundColor: "#f508521f",
    },
  },
  follow: {
    background: "#32cd3212",
    color: "#32cd32e0",
    border: "1px solid #52b788",
    "&:hover": {
      borderColor: "#32cd32",
      color: "#32cd32",
      backgroundColor: "#294e293b",
    },
  },
  headerElements: {
    flexBasis: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "10px 0",
  },
  secondaryDetails: {
    color: "#95969a",
    fontWeight: "600",
    fontSize: "13px",
  },
  socialImg: {
    width: 40,
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
  backBtn: {
    fontWeight: "600",
    color: "black",
  },
}));

// animation
export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    x: "100vh",
    transition: { ease: "easeInOut" },
  },
  addBtn: {
    width: "50px",
    height: "auto",
    cursor: "pointer",
  },
};

export const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#c8bae2c2",
    border: "none",
    borderRadius: "7px",
  },
  overlay: {
    backgroundColor: "#6d4cadeb",
  },
};
