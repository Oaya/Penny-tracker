import React from "react";
import PropTypes from "prop-types";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Error = ({ message }) => {
  return (
    <div className="error">
      <div className="error__text">
        <ErrorOutlineIcon style={{ fontSize: 20 }} />
        &nbsp;{message}
      </div>
    </div>
  );
};
export default Error;

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
