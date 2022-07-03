import React from "react";

export default function TextArea({ name, formId, style }) {
  const { _container, _label } = style;
  return (
    <div className={_container}>
      <label htmlFor={name} className={_label}>
        {name}
      </label>
      <textarea formid={formId} name={name} rows="4" cols="50" />
    </div>
  );
}
