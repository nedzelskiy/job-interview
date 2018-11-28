'use strict';

import './styles.scss';
import * as React from 'react';
import Button from '../Button';
import { IButton } from '../../containers/Calculator/buttons';

interface IProps {
  buttonsProps: IButton[];
}

const buttonsSet = ({ buttonsProps }: IProps): JSX.Element => (
  <div className={`ButtonsSet `}>
    {
      (function () {
        return buttonsProps.map((buttonProps: IButton, i: number) => {
          return (
            <Button
              key={i}
              title={buttonProps.title}
              onClick={buttonProps.onClick}
              className={buttonProps.className}
            />
          );
        });
      })()
    }
  </div>
);

export default buttonsSet;
