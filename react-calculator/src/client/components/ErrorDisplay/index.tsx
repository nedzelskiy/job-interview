'use strict';

import './styles.scss';
import * as React from 'react';

const errorDisplay = ({ error, show }: any): JSX.Element => {
  const css = {
    opacity: show ? 1 : 0,
  };
  return (
    <div style={css} className="ErrorDisplay">{error}</div>
  );
};

export default errorDisplay;
