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
