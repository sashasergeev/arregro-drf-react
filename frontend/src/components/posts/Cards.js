import React, { useState } from "react";
import { Grid } from "@mui/material";
import PostModal from "./PostModal";
import CardElem from "./CardElem";
import PropTypes from "prop-types";

const Cards = (props) => {
  const cards = props.cards;
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
  const isLoaded = cards[0].id ? true : false;

  return (
    <Grid container justifyContent="center">
      {cards.map((e, inx) => {
        return (
          <CardElem
            key={inx}
            data={e}
            openModal={openModal}
            isLoaded={isLoaded}
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
