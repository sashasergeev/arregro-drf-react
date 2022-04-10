import makeStyles from "@mui/styles/makeStyles";

export const useSearchStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
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
    background: "#385e749e",
    borderRadius: "5px",
    zIndex: 100,
    top: "79px",
    right: "-9px",
    border: "1px solid rgb(24 27 34)",
    overflow: "auto",
    backdropFilter: "blur(5px)",
  },
}));
