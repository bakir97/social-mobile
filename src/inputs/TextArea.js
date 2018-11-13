import React, { Fragment } from "react";
import { Textarea } from "native-base";
export default ({
  noviError,
  uspjesno,
  labelText,
  input: { onChange, ...restInput },
  tip,
  ime,
  text
}) => {
  return (
    <Textarea
      {...restInput}
      onChange={onChange}
      rowSpan={10}
      placeholder={text}
      bordered
    />
  );
};
