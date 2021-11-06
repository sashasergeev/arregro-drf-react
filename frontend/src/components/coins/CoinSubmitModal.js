import React, { useState } from "react";
import Modal from "react-modal";
import { TextField, Button, Typography } from "@mui/material";
Modal.setAppElement("#app");
import axios from "axios";
import useSnackbarAlert from "../other/useSnackbarAlert";
import { modalStyles, useCoinModalStyles } from "./styles";

const CoinSubmitModal = (props) => {
  const classes = useCoinModalStyles();
  const [coin, setCoin] = useState("");
  const [cgLink, setCgLink] = useState("");
  const snackbar = useSnackbarAlert();

  const handleSubmit = () => {
    axios
      .post("api/submit-coin/", { coin: coin, cg_link: cgLink })
      .then(() => snackbar.showMessage("Coin has been submitted!"))
      .catch(() =>
        snackbar.showError("Something went wrong! Reload the page and retry.")
      );
    props.handleModal();
    setCoin("");
    setCgLink("");
  };

  return (
    <Modal
      style={modalStyles}
      isOpen={props.isOpen}
      onRequestClose={props.handleModal}
    >
      <form noValidate onSubmit={handleSubmit} className={classes.submitForm}>
        <Typography variant="h4">Which coin do you want to see?</Typography>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="coin"
          label="Coin"
          name="coin"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          id="cg_link"
          label="CoinGecko Link"
          name="cg_link"
          value={cgLink}
          onChange={(e) => setCgLink(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submitBtn}
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default CoinSubmitModal;
