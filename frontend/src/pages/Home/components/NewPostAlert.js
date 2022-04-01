import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

export const NewPostAlertBox = styled("div")({
  backgroundColor: "#252a34",
  border: "5px solid #0c1018",
  color: "#bbbbbb",
  margin: "0 auto",
  padding: "8px 15px",
  fontWeight: "600",
  textAlign: "center",
  borderRadius: "10px",
  cursor: "pointer",
  width: "fit-content",
  "&:hover": {
    backgroundColor: "#3f588b1a",
  },
});

const NewPostAlert = ({ refresh }) => {
  const [newPost, setNewPost] = useState(0);

  useEffect(() => {
    const newPostWS = new WebSocket(
      (window.location.protocol === "http:" ? "ws://" : "wss://") +
        window.location.host +
        "/ws/new-post/"
    );
    newPostWS.onmessage = (e) => setNewPost(newPost + 1);
    return () => newPostWS.close();
  }, []);

  const handleClick = () => {
    setNewPost(0);
    refresh();
  };

  return newPost > 0 ? (
    <NewPostAlertBox onClick={handleClick}>
      {newPost} new {newPost > 1 ? "posts" : "post"}. Tap to refresh.
    </NewPostAlertBox>
  ) : (
    <></>
  );
};

export default NewPostAlert;
