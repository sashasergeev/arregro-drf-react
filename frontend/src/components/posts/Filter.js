import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  Button,
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  filterIcon: {
    position: "sticky",
    bottom: "25px",
    left: "25px",
  },
  cancelIcon: {
    width: "48px",
    height: "48px",
  },
  filterBtns: {
    position: "sticky",
    bottom: "10px",
    "& .MuiFab-root": {
      fontFamily: "Quicksand, sans-serif",
      background: "#e6e5e6",
      color: "#0c1018",
    },
  },
  main: {
    "& .MuiInputBase-root": {
      fontFamily: "Quicksand, sans-serif",
    },
    "& .MuiInputBase-root": {
      width: "50%",
      fontFamily: "Quicksand, sans-serif",
      display: "block",
      margin: "0 auto",
    },
    "& .MuiTypography-h6": {
      fontFamily: "Quicksand, sans-serif",
    },
    "& .MuiButtonBase-root": {
      fontFamily: "Quicksand, sans-serif",
      background: "#9ea5d0",
      color: "#0c1018",
    },
  },
}));

const Filter = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [tags, setTags] = useState(null);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    axios.get("api/tags/").then((res) => setTags(res.data));
  }, []);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setIsOpen(false);
    props.handleFilter(filter);
    if (filter !== false) {
      setClear(true);
    }
  };
  const handleFilterChange = (e) => setFilter(e.target.value);
  const clearFilter = () => {
    setFilter(false);
    setClear(false);
    props.handleFilter(false);
  };

  return (
    <>
      <Box className={classes.filterBtns}>
        <Fab
          variant="extended"
          onClick={openDialog}
          className={classes.filterIcon}
          style={{ marginRight: "22px" }}
        >
          <SearchIcon />
          {!clear && "Filter"}
        </Fab>
        {clear && (
          <Fab
            onClick={clearFilter}
            variant="extended"
            className={classes.cancelIcon}
          >
            <ClearIcon />
          </Fab>
        )}
      </Box>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={isOpen}
        onClose={closeDialog}
        className={classes.main}
      >
        <DialogTitle>Filter posts by tag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In the menu below choose filter by which you want to filter posts.
          </DialogContentText>
          <Select autoFocus value={filter} onChange={handleFilterChange}>
            <MenuItem value={false}>Choose Tag</MenuItem>
            {tags &&
              tags.map((e) => (
                <MenuItem key={e.id} value={e.tag}>
                  {e.tag}
                </MenuItem>
              ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Filter;
