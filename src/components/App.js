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
      currentResult: 'hello',
      previousCommand: 'he + llo',
      currentCommand: '',
      display: 0,
      displayResult: false
    }
  }

  display() {
    this.setState((state) => {
      return {
        currentCommand: `${state.firstTerm === '' ? '' : state.firstTerm}${state.currentOperator === '' ? '' : ' ' + state.currentOperator + ' '}${state.secondTerm === '' ? '' : state.secondTerm}`
      }
    });

    this.setState((state) => {
      return {display: state.displayResult ? state.firstTerm : state.currentCommand}
    });
  }

  clearCurrentCommand() {
    this.setState((state) => {
      return {
        firstTerm: '',
        currentOperator: '',
        secondTerm: '',
        displayResult: false
      }
    }
    );

    this.setState((state) => {
      return {currentCommand: `${state.firstTerm} ${state.currentOperator} ${state.secondTerm}`}
    });
  }

  buttonClear() {
    // if currentCommand is NOT ''
          // set currentCommand to ''
        // else, set previousCommand to ''
    this.setState((state) => {
      return {currentCommand: state.currentCommand === '' ? state.previousCommand === '' : 'placeholder'}
    });

    this.clearCurrentCommand();
  }

  buttonNumber(number) {
    // debugger;
    // console.log(number);
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
      return {displayResult: false}
    })

    this.display();
  }

  buttonDecimal() {
    this.setState((state) => {
      if (state.firstTerm === '') {
        return {firstTerm: '0.'}
      } else if (state.firstTerm !== '' && state.currentOperator === '' && state.firstTerm.indexOf('.') === -1) {
        return {firstTerm: state.firstTerm + '.'}
      } else if (state.firstTerm !== '' && state.currentOperator !== '' && state.secondTerm === '') {
        return {secondTerm: '0.'}
      } else if (state.secondTerm.indexOf('.') === -1){
        return {secondTerm: state.secondTerm + '.'}
      }
    });

    this.setState((state) => {
      return {displayResult: false}
    })

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
        let result = this.computeResult();
        return {
          currentResult: result,
          firstTerm: state.currentResult,
          secondTerm: '',
          currentOperator: operator,
          previousCommand: state.currentCommand,
          currentCommand: `${state.firstTerm} ${operator}`, // ???
          display: state.currentResult // not calling this.display(), because buttonOperator does computations ??
        }
      }
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
      } else if (state.firstTerm !== '' && state.operator === '') {
        // do nothing
      } else if (state.firstTerm !== '' && state.operator !== '' && state.secondTerm === '') {
        // do nothing
      } else {
        let result = this.computeResult();
        return {
          currentResult: result,
          firstTerm: state.currentResult,
          // secondTerm stays as it is
          // currentOperator stays as it is
          previousCommand: state.currentCommand,
          currentCommand: `${state.firstTerm} ${state.operator} ${state.secondTerm}`,
          display: state.currentResult // not calling this.display(), because equals does computations ??
        }
      }
    });

    this.display();
  }

  computeResult() {
    this.setState((state) => {
      return {displayResult: true}
    });

    let result = null;
    const firstTerm = Number(this.state.firstTerm);
    const operator = Number(this.state.currentOperator);
    const secondTerm = Number(this.state.secondTerm);

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
    // ???
    // result of current button press depends on the last character of this.state.currentCommand

    if (buttonChar === 'clear') {
      this.buttonClear();
    } else if (typeof Number(buttonChar) === 'number' && !Number.isNaN(Number(buttonChar))) {
      this.buttonNumber(buttonChar);
    } else if (buttonChar === '.') {
      this.buttonDecimal();
    } else if (buttonChar === '+' || buttonChar === '-' || buttonChar === 'x' || buttonChar === '/') {
      this.buttonOperator(buttonChar);
    } else if (buttonChar === '=') {
      this.buttonEquals();
    }

        // else if firstTerm is NOT '' && secondTerm is ''
        // else if firstTerm is NOT '' && secondTerm is NOT ''

          // else if buttonChar is delete
            // delete one term from secondTerm, operator, firstTerm --- in that order
          // else if buttonChar is plus/minus
            // if operator is ''
              // change sign of firstTerm
            // else, change sign of secondTerm
          // else if buttonChar is percent
            // if operator is ''
              // divide firstTerm by 100
            // else, divide secondTerm by 100
  }

  render() {
    return (
      <div>
        <Display display={this.state.display} previousCommand={this.state.previousCommand}/>
        <Grid onButtonPress={this.buttonPress.bind(this)}/>
      </div>
    );
  }
}

export default App;