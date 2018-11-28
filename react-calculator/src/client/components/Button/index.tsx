'use strict';

import './styles.scss';
import * as React from 'react';

interface IProps {
  title: string;
  onClick: any;
  className?: string;
}

const button = ({ title, onClick, className }: IProps): JSX.Element => (
  <div
    className={`Button ${ className ? className : '' }`}
    onClick={onClick}
  >{title}</div>
);

export default button;
