import React, { useState } from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import Button from "@mui/material/Button/Button";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

interface modalProps {
  toggle: () => void;
  open: boolean;
  user: any;
  toggleFavorites: () => void;
  toggleViewed: () => void;
}

const ModalSettings = (props: modalProps) => {
  const { toggle, open, user, toggleFavorites, toggleViewed } = props;

  const navigate = useNavigate();
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      sessionStorage.removeItem("user");
      navigate("/");
      if (error) throw error;
    } catch (error) {
      alert(error);
    }
  };

  const handleReset = async () => {
    try {
      const { error } = await supabase
        .from("User favorites")
        .delete()
        .eq("user_id", user.user.id);
      if (error) throw error;
    } catch (error) {
      alert("something went wrong, please refresh the page");
    }
    try {
      const { error } = await supabase
        .from("User history")
        .delete()
        .eq("user_id", user.user.id);
      if (error) throw error;
    } catch (error) {
      alert("something went wrong, please refresh the page");
    }
    try {
      const { error } = await supabase
        .from("User completed")
        .delete()
        .eq("user_id", user.user.id);
      if (error) throw error;
    } catch (error) {
      alert("something went wrong, please refresh the page");
    }
    try {
      const { error } = await supabase
        .from("User timestamps")
        .delete()
        .eq("user_id", user.user.id);
      if (error) throw error;
    } catch (error) {
      alert("something went wrong, please refresh the page");
    }
  };

  const controlStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "5.5rem",
  };

  const dangerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    borderTop: "0.5px solid orange",
    fontFamily: "arial",
    fontSize: "0.8rem",
    color: "lightgray",
    textAlign: "center",
  };

  const settingsHeaderStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "0.5px solid darkgray",
    marginBottom: "0.5rem",
    padding: "0.2rem",
  };

  return (
    <>
      <dialog open={open} className="settings-modal">
        <div className="settings-header" style={settingsHeaderStyles}>
          <div style={{ margin: "5px" }}>Settings menu</div>
          <IconButton color="info">
            <CloseIcon color="info" onClick={toggle} />
          </IconButton>
        </div>
        <div className="control-options" style={controlStyles}>
          <div>
            <button className="user-button" onClick={toggleFavorites}>
              Go to Favorites
            </button>
            <button className="user-button" onClick={toggleViewed}>See history</button>
            <button onClick={signOut} className="user-button">
              Sign out
            </button>
          </div>
          <div className="danger-zone" style={dangerStyles}>
            <div style={{ display: "flex", alignItems: "center" }}>
              Danger zone <WarningAmberIcon style={{ color: "lightyellow" }} />
            </div>
            <p style={{width:"250px"}}>
              Please note that this action will erase all your data, you will
              still be able to log in, but all your data in terms of favorites,
              timestamps and watch history will be deleted.
            </p>
            <Button
              onClick={handleReset}
              style={{ width: "100%" }}
              variant="outlined"
              color="error"
            >
              Reset user data
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalSettings;