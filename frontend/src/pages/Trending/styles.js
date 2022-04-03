import makeStyles from "@mui/styles/makeStyles";

export const useMoversStyles = makeStyles({
  columns: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "35px",
  },
  column: {
    borderRadius: "5px",
    padding: "5px",
    backgroundColor: "#000",
  },
  columnheader: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  gainersBord: {
    background:
      "linear-gradient(0deg, rgba(194,29,77,0.47102591036414565) 0%, rgba(50,205,50,0.3617822128851541) 100%)",
  },
  losersBord: {
    background:
      "linear-gradient(0deg, rgba(50,205,50,0.5438550420168067) -64%, rgba(194,29,77,0.5606617647058824) 100%)",
  },
});
