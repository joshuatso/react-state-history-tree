import React from 'react';
export default function DoButton({
  type,
  doButtonStyles,
  disabled,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: `doButton${type === "left" ? " doButtonLeft" : " doButtonRight"}`,
    disabled: disabled,
    style: { ...doButtonStyles
    }
  }, type === "left" ? "\u3008" : "\u3009");
}