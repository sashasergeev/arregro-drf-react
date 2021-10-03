import React, { useState } from "react";
import Modal from "react-modal";
import { TextField, Button, Typography } from "@material-ui/core";
Modal.setAppElement("#app");
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#c8bae2c2",
    border: "none",
    borderRadius: "7px",
  },
  overlay: {
    backgroundColor: "#6d4cadeb",
  },
  fields: {
    marginTop: "10px",
  },
};

const CoinSubmitModal = (props) => {
  const [coin, setCoin] = useState("");
  const [cgLink, setCgLink] = useState("");

  const handleSubmit = () => {
    axios
      .post("api/submit-coin/", { coin: coin, cg_link: cgLink })
      .then((res) => console.log(res));
    props.handleModal();
    setCoin("");
    setCgLink("");
    console.log("submitted");
  };

  return (
    <>
      <Modal
        style={customStyles}
        isOpen={props.isOpen}
        onRequestClose={props.handleModal}
      >
        <form noValidate onSubmit={handleSubmit}>
          <Typography variant="h4">Which coin do you want to see?</Typography>
          <TextField
            variant="outlined"
            style={customStyles.fields}
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
            style={customStyles.fields}
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
            style={customStyles.fields}
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CoinSubmitModal;
