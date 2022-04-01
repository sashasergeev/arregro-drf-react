import React, { useState } from "react";
import Modal from "react-modal";
import { Typography } from "@mui/material";

import useSnackbarAlert from "../../../../components/other/useSnackbarAlert";
import { modalStyles } from "./styles";
import Field from "../../../../components/Field";
import SubmitBtn from "../../../../components/SubmitBtn";
import { submitCoin } from "../../../../api/coins";

Modal.setAppElement("#app");

const CoinSubmitModal = ({ isOpen, handleModal }) => {
  const [coin, setCoin] = useState("");
  const [cg_link, setCg_Link] = useState("");
  const snackbar = useSnackbarAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitCoin({ coin, cg_link });
      snackbar.showMessage("Coin has been submitted!");
    } catch (error) {
      snackbar.showError("Something went wrong! Reload the page and retry.");
    } finally {
      handleModal();
      setCoin("");
      setCg_Link("");
    }
  };

  return (
    <Modal style={modalStyles} isOpen={isOpen} onRequestClose={handleModal}>
      <form noValidate onSubmit={handleSubmit}>
        <Typography variant="h4">Which coin do you want to see?</Typography>
        <Field
          label="Coin"
          id="coin"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
        />
        <Field
          label="CoinGecko Link"
          id="cg_link"
          value={cg_link}
          onChange={(e) => setCg_Link(e.target.value)}
        />
        <SubmitBtn loading={false}>Submit</SubmitBtn>
      </form>
    </Modal>
  );
};

export default CoinSubmitModal;
