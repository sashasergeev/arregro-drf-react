import React, { useState } from "react";
import Modal from "react-modal";
import { TextField, Button, Typography } from "@mui/material";
Modal.setAppElement("#app");
import axios from "axios";
import { modalStyles } from "./styles";
import useSnackbarAlert from "../other/useSnackbarAlert";

const CoinSubmitModal = (props) => {
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
      <form noValidate onSubmit={handleSubmit}>
        <Typography variant="h4">Which coin do you want to see?</Typography>
        <TextField
          variant="outlined"
          mt="10px"
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
          mt="10px"
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
          mt="10px"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default CoinSubmitModal;
