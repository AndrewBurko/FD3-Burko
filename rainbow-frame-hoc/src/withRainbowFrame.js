import React from "react";

const withRainbowFrame = colors => Comp => props => {
  let frameCode = <Comp {...props} />
  for (let i of colors) {
    frameCode = <div className="rainbow-div" style={{borderColor: i}}>{frameCode}</div>
  }
  return frameCode;
}

export { withRainbowFrame };