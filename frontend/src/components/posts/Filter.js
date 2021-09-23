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
    position: "sticky",
    bottom: "25px",
    left: "50px",
  },
  main: {
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
  const [filter, setFilter] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    axios.get("api/tags/").then((res) => setTags(res.data));
  }, []);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setIsOpen(false);
    props.handleFilter(filter);
  };
  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <>
      <Fab
        variant="extended"
        onClick={openDialog}
        className={classes.filterIcon}
      >
        <SearchIcon />
        Filter
      </Fab>

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
            <MenuItem value={null}>Choose Tag</MenuItem>
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
