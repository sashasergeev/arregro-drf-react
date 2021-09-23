import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  root: {
    "& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)":
      {
        backgroundColor: "#151c29",
        color: "#abababb5",
      },
    "& .Mui-selected": {
      backgroundColor: "#121723",
      color: "#2ecd2d",
    },
    "& .MuiPaginationItem-outlined": {
      border: "1px solid rgba(0, 0, 0, 0.23)",
    },
    "& .MuiSvgIcon-root": {
      fill: "#0e4bc3",
    },
  },
}));

const PageNav = (props) => {
  const { root } = useStyles();
  return (
    <div>
      <Grid item xs={12} container>
        <div style={{ margin: "auto", textAlign: "center", padding: 5 }}>
          <Pagination
            className={root}
            count={props.numOfPages}
            page={props.page}
            variant="outlined"
            shape="rounded"
            onChange={props.onChange}
            color="standard"
            size="large"
          />
        </div>
      </Grid>
    </div>
  );
};

PageNav.propTypes = {
  page: PropTypes.number,
  numOfPages: PropTypes.number,
  onChange: PropTypes.func,
};

export default PageNav;
