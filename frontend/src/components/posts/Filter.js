import React, { useState, useEffect } from "react";
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
import { useFilterStyles } from "./styles";

const Filter = (props) => {
  const classes = useFilterStyles();
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
