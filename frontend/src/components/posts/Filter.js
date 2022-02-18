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
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useFilterStyles } from "./styles";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";

const Filter = ({ handleFilter }) => {
  const classes = useFilterStyles();

  // window states
  const [isOpen, setIsOpen] = useState(false); // modal status
  const [clear, setClear] = useState(false); // true when results are filtered

  // tags states
  const [tags, setTags] = useState(null);
  const [tag, setTag] = useState(false);

  // date picker states
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [errDate, setErrDate] = useState(false);

  // fetching tags
  useEffect(() => {
    axios.get("api/tags/").then((res) => setTags(res.data));
  }, []);

  const openDialog = () => setIsOpen(true);

  const closeDialog = () => {
    setIsOpen(false);
    handleFilter(tag, fromDate, toDate);
    if (tag || toDate || fromDate) {
      setClear(true);
    }
  };

  const handleFilterChange = (e) => setTag(e.target.value);
  const clearFilter = () => {
    setIsOpen(false);
    setTag(false);
    setClear(false);
    setFromDate(null);
    setToDate(null);
    handleFilter(false, null, null);
  };

  // date filter related objs
  const handleDateChange = (e, type) => {
    const date = new Date(e.valueOf());
    if (type === "to") {
      setToDate(date);
      setErrDate(date < fromDate ? true : false);
    } else {
      setFromDate(date);
      setErrDate(toDate && date > toDate ? true : false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
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
        onClose={clearFilter}
        className={classes.main}
      >
        <DialogTitle>Filter posts</DialogTitle>
        <DialogContent>
          <DialogContentText>By tag.</DialogContentText>
          <Select autoFocus value={tag} onChange={handleFilterChange}>
            <MenuItem value={false}>Choose Tag</MenuItem>
            {tags &&
              tags.map((e) => (
                <MenuItem key={e.id} value={e.tag}>
                  {e.tag}
                </MenuItem>
              ))}
          </Select>
          <DialogContentText>By date.</DialogContentText>

          <Box className={classes.filterDatesBox}>
            {errDate && (
              <Alert severity="error">
                Error! from date is greater than to. Please change filters.
              </Alert>
            )}
            <Box className={classes.filterDateBox}>
              <Typography>From</Typography>
              <MobileDatePicker
                inputFormat="DD/MM/YYYY"
                value={fromDate}
                onChange={(e) => handleDateChange(e, "from")}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box className={classes.filterDateBox}>
              <Typography>To</Typography>
              <MobileDatePicker
                inputFormat="DD/MM/YYYY"
                value={toDate}
                onChange={(e) => handleDateChange(e, "to")}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearFilter} color="primary">
            Reset
          </Button>
          <Button
            disabled={errDate ? true : false}
            onClick={closeDialog}
            color="primary"
          >
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default Filter;
