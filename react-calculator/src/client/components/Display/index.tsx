'use strict';

import './styles.scss';
import * as React from 'react';

interface IProps {
  expression: string;
  result: number;
  didGetResult: boolean;
  isGettingResult: boolean;
}

interface IComponentProps {
  maxExpressionFontSize: number;
  currentFontSize: number;
}

const componentProps: IComponentProps = {
  maxExpressionFontSize: 0,
  currentFontSize: 0,
};

export class Display extends React.Component<IProps, any> {
  componentDidUpdate() {
    this.recalculateFontSize();
    this.animate();
  }

  componentDidMount() {
    this.prepareComponent();
  }

  animate() {
    const expressionHTML: HTMLElement = this.refs.Display__expression as HTMLElement;
    const resultHTML: HTMLElement = this.refs.Display__result as HTMLElement;
    const loaderHTML: HTMLElement = this.refs.Display__loader as HTMLElement;

    expressionHTML.classList.remove('onChange');

    if (this.props.didGetResult) {
      expressionHTML.classList.remove('onChange');
      expressionHTML.classList.add('onResult');
      resultHTML.classList.add('onResult');
    } else {
      expressionHTML.classList.remove('onResult');
      resultHTML.classList.remove('onResult');
      expressionHTML.classList.add('onChange');
    }
    if (this.props.isGettingResult) {
      loaderHTML.classList.remove('hidden');
    } else {
      loaderHTML.classList.add('hidden');
    }
  }

  prepareComponent() {
    const expressionHTML: HTMLElement = this.refs.Display__expression as HTMLElement;
    componentProps.maxExpressionFontSize =
      parseFloat(`${window.getComputedStyle(expressionHTML).fontSize}`);
    componentProps.currentFontSize = componentProps.maxExpressionFontSize;
    expressionHTML.addEventListener('transitionend', () => {
      expressionHTML.classList.remove('onChange');
    });
    this.recalculateFontSize();
  }

  recalculateFontSize() {
    const expressionHTML: HTMLElement = this.refs.Display__expression as HTMLElement;
    const maxExpressionFontSize = componentProps.maxExpressionFontSize;
    let fontSize = componentProps.currentFontSize;

    expressionHTML.classList.remove('onChange');
    if (fontSize < maxExpressionFontSize) {
      fontSize = (fontSize + 3 > maxExpressionFontSize) ? maxExpressionFontSize : fontSize + 3;
      expressionHTML.style.fontSize = `${fontSize}px`;
    }
    while (
      expressionHTML.scrollHeight > expressionHTML.clientHeight ||
      expressionHTML.scrollWidth > expressionHTML.clientWidth
    ) {
      fontSize = fontSize - 3;
      expressionHTML.style.fontSize = `${fontSize}px`;
    }
    componentProps.currentFontSize = fontSize;
  }

  render() {
    const { expression, result, didGetResult } = this.props;

    return (
      <div className="Display" ref="Display">
        <div
          ref="Display__expression"
          className={ `expression` }
          data-placeholder = "0"
          title = { expression }
        >{expression}</div>
        <div
          ref = "Display__result"
          className = { `result` }
          title = { result.toString() }
        >{result}</div>
        <div ref = "Display__loader" className="loader-wrapper hidden">
          <div className="loader">
            <div className="dot dot1"></div>
            <div className="dot dot2"></div>
            <div className="dot dot3"></div>
            <div className="dot dot4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Display;
