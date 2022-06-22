import React from "react";

const Input = ({ name, label, error, style, ...rest }) => {
  const { _input, _label, _container, _errorMsg } = style;
  return (
    <div className={_container}>
      <label htmlFor={name} className={_label}>
        {label}
      </label>
      <input {...rest} name={name} id={name} className={_input} />
      {error && <div className={_errorMsg}>{error}</div>}
    </div>
  );
};

export default Input;
