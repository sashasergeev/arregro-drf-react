import React from "react";
import PropTypes from "prop-types";
import { Snackbar, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function SnackbarAlert({
  message,
  action,
  ButtonProps,
  SnackbarProps,
  customParameters,
}) {
  return (
    <Snackbar autoHideDuration={4000} {...SnackbarProps}>
      <Alert
        severity={customParameters?.type}
        action={
          action != null && (
            <Button color="purple" size="small" {...ButtonProps}>
              {action}
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

SnackbarAlert.propTypes = {
  message: PropTypes.string,
  action: PropTypes.string,
  ButtonProps: PropTypes.object,
  SnackbarProps: PropTypes.object,
  customParameters: PropTypes.shape({
    type: PropTypes.oneOf(["error", "warning", "info", "success"]),
  }),
};
