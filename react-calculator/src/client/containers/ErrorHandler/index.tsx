'use strict';

import './styles.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { onMessageClick } from './actions';
import ErrorDisplay from '../../components/ErrorDisplay';

interface IProps {
  readonly error: string;
  readonly show: boolean;
}

interface IDispatch {
  readonly onMessageClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export class ErrorHandler extends React.Component<IProps & IDispatch, {}> {
  render() {
    const { error, show, onMessageClick } = this.props;
    return (
      <div className = "ErrorHandler"
           onClick = { onMessageClick }
      >
        <ErrorDisplay
          show = { show }
          error = { error }
        />
      </div>
    );
  }
}

const mapDispatchToProps: IDispatch = {
  onMessageClick,
};

const mapStateToProps = (state: any) => ({
  error: state.ErrorHandler.error,
  show: state.ErrorHandler.show,
});

export default connect<IProps, IDispatch, {}>(mapStateToProps, mapDispatchToProps)(ErrorHandler);
