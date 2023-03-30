import React from 'react';

const Back = (props) => {
  return (
    <li className="backOption">
      <input
        type="submit"
        value="Back"
        onChange={props.onPreviousButton}
      />
      <label className="radioCustomLabel">
        Back
      </label>
    </li>
  );
}

export default Back;