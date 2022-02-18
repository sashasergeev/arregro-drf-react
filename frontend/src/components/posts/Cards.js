import React, { useState } from "react";
import { Grid } from "@mui/material";
import PostModal from "./PostModal";
import CardElem from "./CardElem";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Cards = ({ cards, isDataLoaded, page }) => {
  // modal
  const [isModal, setIsModal] = useState(false);
  const [idForModal, setIdForModal] = useState(null);
  const openModal = (id) => {
    setIsModal(true);
    setIdForModal(id);
  };
  const closeModal = () => {
    setIsModal(false);
    setIdForModal(null);
  };
  // endModal

  const history = useHistory();
  const from = history.location.pathname;

  return (
    <Grid container justifyContent="center">
      {cards.map((e, inx) => {
        return (
          <CardElem
            key={inx}
            data={e}
            page={page}
            from={from}
            openModal={openModal}
            isLoaded={isDataLoaded}
          />
        );
      })}
      <PostModal postId={idForModal} isOpen={isModal} close={closeModal} />
    </Grid>
  );
};

Cards.propTypes = {
  cards: PropTypes.array,
};

export default Cards;
