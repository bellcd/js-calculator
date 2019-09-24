import React from 'react';
import '../App.css';
import Grid from './Grid.js';
import Display from './Display.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTerm: '',
      secondTerm: '',
      currentOperator: '',
      currentResult: '',
      previousCommand: '',
      display: '0',
      displayResult: false,
      moreEqualsPresses: '',
      lastPressedButton: ''
    }
  }

  display() {
    this.setState((state) => {
      return {display: state.displayResult ? state.firstTerm : `${state.firstTerm === '' ? '' : state.firstTerm}${state.currentOperator === '' ? '' : ' ' + state.currentOperator + ' '}${state.secondTerm === '' ? '' : state.secondTerm}`}
    });
  }

  buttonClear() {
    this.setState((state) => {
      if (state.firstTerm === '' && state.currentOperator === '' && state.secondTerm === '') {
        return {
          previousCommand: '',
          displayResult: false
        }
      } else {
        return {
          firstTerm: '',
          currentOperator: '',
          secondTerm: '',
          displayResult: false,
          currentResult: '',
          moreEqualsPresses: ''
        }
      }
    }
    );

    this.setState((state) => {
      return {lastPressedButton: 'clear'}
    });

    this.display();
  }

  buttonDelete() {
    this.setState((state) => {
      if (state.secondTerm !== '') {
        return {secondTerm: state.secondTerm.slice(0, -1)}
      } else if (state.secondTerm === '' && state.currentOperator !== '') {
        return {currentOperator: ''}
      } else if (state.secondTerm === '' && state.currentOperator === '' && state.firstTerm !== '') {
        return {firstTerm: state.firstTerm.slice(0, -1)}
      }
    });

    this.setState((state) => {
      return {lastPressedButton: 'delete'}
    });

    this.display();
  }

  buttonNumber(number) {
    this.setState((state) => {
      if (state.firstTerm === '') {
        return {firstTerm: number}
      } else if (state.firstTerm !== '' && state.currentOperator === '') {
        return {firstTerm: state.firstTerm + number}
      } else if (state.firstTerm !== '' && state.currentOperator !== '' && state.secondTerm === '') {
        return {secondTerm: number}
      } else {
        return {secondTerm: state.secondTerm + number}
      }
    });

    this.setState((state) => {
      return {displayResult: false, lastPressedButton: 'number'}
    })

    this.display();
  }

  buttonDecimal() {
    this.setState((state) => {
      if (state.firstTerm === '') {
        return {firstTerm: '0.'}
      } else if (state.firstTerm !== '' && state.currentOperator === '' && state.firstTerm.indexOf('.') === -1) {
        return {firstTerm: state.firstTerm + '.'}
      } else if (state.firstTerm !== '' && state.currentOperator !== '' && state.lastPressedButton === 'operator') {
        return {secondTerm: '0.'}
      } else if (state.secondTerm !== '' && state.secondTerm.indexOf('.') === -1){
        return {secondTerm: state.secondTerm + '.'}
      } else {
        return {
          firstTerm: '0.',
          secondTerm: '',
          currentOperator: ''
        }
      }
    });

    this.setState((state) => {
      return {displayResult: false, lastPressedButton: 'decimal'}
    })

    this.display();
  }

  buttonPlusMinus() {
    this.setState((state) => {
      let result;
      let toAdd = {lastPressedButton: 'plusMinus'};
      if (state.secondTerm === '' && state.firstTerm !== '') {
        result = Object.assign({}, toAdd, {firstTerm: state.firstTerm * -1});
      } else if (state.secondTerm !== '') {
        result = Object.assign({}, toAdd, {secondTerm: state.secondTerm * -1});
      }
      return result;
    });

    this.display();
  }

  buttonPercent() {
    this.setState((state) => {
      let result;
      let toAdd = {lastPressedButton: 'percent'};
      if (state.secondTerm === '' && state.firstTerm !== '') {
        result = Object.assign({}, toAdd, {firstTerm: state.firstTerm / 100});
      } else if (state.secondTerm !== '') {
        result = Object.assign({}, toAdd, {secondTerm: state.secondTerm / 100});
      }
      return result;
    });

    this.display();
  }

  buttonOperator(operator) {
    this.setState((state) => {
      return {displayResult: false}
    })

    this.setState((state) => {
      if (state.firstTerm === '') {
        return {firstTerm: '0', currentOperator: operator}
      } else if (state.firstTerm !== '' && state.operator === '') {
        return {currentOperator: operator}
      } else if (state.firstTerm !== '' && state.operator !== '' && state.secondTerm === '') {
        return {currentOperator: operator}
      } else {
      }
    });

    this.setState((state) => {
      return {lastPressedButton: 'operator'}
    });

    this.display();
  }

  buttonEquals() {
    this.setState((state) => {
      return {displayResult: false}
    })

    this.setState((state) => {
      if (state.firstTerm === '') {
        // do nothing
      } else if (state.firstTerm !== '' && state.currentOperator === '') {
        // do nothing
      } else if (state.firstTerm !== '' && state.currentOperator !== '' && state.secondTerm === '' && state.moreEqualsPresses !== '') {
        let result = this.computeResult(undefined, undefined, state.moreEqualsPresses);
        return {
          currentResult: result + '',
          firstTerm: result + '',
          // moreEqualsPresses stays as it is
          // secondTerm statys as it is
          // currentOperator stays as it is
          previousCommand: `${state.firstTerm} ${state.currentOperator} ${state.moreEqualsPresses}`,
          displayResult: true
        }
      } else {
        let result = this.computeResult();
        return {
          currentResult: result + '',
          firstTerm: result + '',
          moreEqualsPresses: state.secondTerm,
          secondTerm: '',
          // currentOperator stays as it is
          previousCommand: `${state.firstTerm} ${state.currentOperator} ${state.secondTerm}`,
          displayResult: true
        }
      }
    });

    this.setState((state) => {
      return {lastPressedButton: 'equals'}
    });

    this.display();
  }

  computeResult(firstTerm, operator, secondTerm) {
    let result = null;
    firstTerm = firstTerm === undefined ? Number(this.state.firstTerm) : Number(firstTerm);
    operator = operator === undefined ? this.state.currentOperator : operator;
    secondTerm = secondTerm === undefined ? Number(this.state.secondTerm) : Number(secondTerm);

    if (operator === '+') {
      result = firstTerm + secondTerm;
    } else if (operator === '-') {
      result = firstTerm - secondTerm;
    } else if (operator === '/') {
      result = firstTerm / secondTerm;
    } else if (operator === 'x') {
      result = firstTerm * secondTerm;
    }

    return result;
  }

  buttonPress(e) {
    let buttonChar = e.target.textContent;

    if (buttonChar === 'clear') {
      this.buttonClear();
    } else if (buttonChar === 'delete') {
      this.buttonDelete();
    } else if (typeof Number(buttonChar) === 'number' && !Number.isNaN(Number(buttonChar))) {
      this.buttonNumber(buttonChar);
    } else if (buttonChar === '.') {
      this.buttonDecimal();
    } else if (buttonChar === '+' || buttonChar === '-' || buttonChar === 'x' || buttonChar === '/') {
      this.buttonOperator(buttonChar);
    } else if (buttonChar === '=') {
      this.buttonEquals();
    } else if (buttonChar === '+/-') {
      this.buttonPlusMinus();
    } else if (buttonChar === '%') {
      this.buttonPercent();
    }
  }

  render() {
    return (
      <div>
        <h1 className="title">JavaScript Calculator</h1>
        <div className="calc-container">
          <div>
            <Display display={this.state.display} previousCommand={this.state.previousCommand}/>
            <Grid onButtonPress={this.buttonPress.bind(this)}/>
          </div>
        </div>
        <footer className="footer">Made with <span role="img" aria-label="heart emoji">❤</span>️ by <a href="https://bellcd.github.io/">Christian Bell</a></footer>
      </div>
    );
  }
}

export default App;