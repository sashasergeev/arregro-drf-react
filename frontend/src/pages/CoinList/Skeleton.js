import React from "react";

import { Box, Card, Grid, Typography } from "@mui/material";
import SkeletonMUI from "@mui/material/Skeleton";
import { useCoinStyles } from "./styles";

const Skeleton = () => {
  const skeletonArr = new Array(8).fill("skelet");
  const classes = useCoinStyles();

  return skeletonArr.map((e, inx) => {
    return (
      <Grid key={inx} item>
        <Card elevation={0} className={classes.coinCard}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Box component="div" display="inline">
              <Typography variant="h6" display="inline">
                <SkeletonMUI variant="rectangular" width={120} height={32} />
              </Typography>
              <div className={classes.secondaryDetails}>
                <SkeletonMUI
                  variant="rectangular"
                  width={70}
                  height={20}
                  mt="5px"
                />
              </div>
            </Box>

            <Box component="div" display="inline">
              <SkeletonMUI variant="circular" width={50} height={50} />
            </Box>
          </Grid>
        </Card>
      </Grid>
    );
  });
};

export default Skeleton;
