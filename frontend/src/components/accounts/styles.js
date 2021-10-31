import makeStyles from "@mui/styles/makeStyles";

export const useAuthStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "20%",
    padding: 20,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "150%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#673ab7",
    "&:hover": {
      backgroundColor: "#9c27b096",
    },
    "& .MuiLoadingButton-loadingIndicator": {
      color: "#ffffffb8",
    },
  },
  window: {
    backgroundColor: "#673ab73d",
    borderRadius: "10px",
  },
  field: {
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-input": { color: "#ceb3ff" },
  },
}));
