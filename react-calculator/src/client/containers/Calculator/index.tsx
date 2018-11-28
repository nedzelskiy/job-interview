'use strict';

import './styles.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { handleKeyUp } from './actions';
import { buttonsProps } from './buttons';
import Display from '../../components/Display';
import ButtonsSet from '../../components/ButtonsSet';

interface IProps {
  readonly expressionParts: string[];
  readonly result: number;
  readonly didGetResult: boolean;
  readonly isGettingResult: boolean;
}

export class Calculator extends React.Component<IProps, {}> {
  componentDidMount() {
    window.onkeyup = handleKeyUp;
  }

  render() {
    const { expressionParts, result, didGetResult, isGettingResult } = this.props;
    return (
      <div className="Calculator">
        {/*<ControlPanel />*/}
        <Display
          expression={expressionParts.join('')}
          result={result}
          didGetResult={didGetResult}
          isGettingResult={isGettingResult}
        />
        <ButtonsSet
          buttonsProps={buttonsProps}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  expressionParts: state.Calculator.expressionParts,
  result: state.Calculator.result,
  didGetResult: state.Calculator.didGetResult,
  isGettingResult: state.Calculator.isGettingResult,

});

export default connect<IProps, null, {}>(mapStateToProps, null)(Calculator);
