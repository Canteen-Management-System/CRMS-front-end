import React from "react";

const Select = ({ name, label, options, style, error, ...rest }) => {
  const { _label, _container, _select, _option, _errorMsg } = style;

  return (
    <>
      <div className={_container}>
        <div>
          <label htmlFor={name} className={_label}>
            {label}
          </label>
          <select className={_select} name={name} id={name} {...rest}>
            {/* <option className={_option} value="" /> */}
            {options.map((option) => (
              <option className={_option} key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          {error && <div className={_errorMsg}>{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Select;
