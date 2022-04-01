import React from "react";
import { FollowBtnStyled } from "./styles";

const FollowBtn = ({ isFollow, coinID, follow, inx }) => {
  return (
    <FollowBtnStyled
      variant="outlined"
      follow={isFollow ? 1 : 0}
      onClick={() => follow(coinID, inx)}
    >
      {isFollow ? "Unfollow" : "Follow"}
    </FollowBtnStyled>
  );
};

export default FollowBtn;
