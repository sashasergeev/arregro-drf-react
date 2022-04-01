import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FollowBtnStyled = styled(Button)(({ follow }) =>
  follow
    ? {
        background: "#c21d5112",
        color: "#c21d51",
        border: "1px solid #c21d51",
        "&:hover": {
          borderColor: "#f50852",
          color: "#f50852",
          backgroundColor: "#f508521f",
        },
      }
    : {
        background: "#32cd3212",
        color: "#32cd32e0",
        border: "1px solid #52b788",
        "&:hover": {
          borderColor: "#32cd32",
          color: "#32cd32",
          backgroundColor: "#294e293b",
        },
      }
);
