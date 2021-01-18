// Clear All and Show Result
export const showResult = (props) => {
  clearValues(props.props.result, ' ', props.props);
};

const clearValues = (result, processHistory, props) => {
  props.setValA(0);
  props.setValB(0);
  props.setResult(result);
  props.setProcessHistory(processHistory);
  props.setCurrentOperator('');
  props.setContainsSign(false);
};

// Is Operator ?
const isOperator = (element) => {
  if (
    element === '+' ||
    element === '-' ||
    element === '×' ||
    element === '÷'
  ) {
    return true;
  } else {
    return false;
  }
};

// Update Current Operator
export const updateCurrentOperator = (props) => {
  if (props.props.processHistory.length !== 0) {
    const lastElement = splitProcessHistory(props.props.processHistory, '', 2);
    if (props.props.containsSign) {
      if (isOperator(lastElement)) {
        if (lastElement === '-') {
          if (splitProcessHistory(props.props.processHistory, '', 1) === ' ') {
            updateHistoryOperator(
              props.props.processHistory,
              props.props.setProcessHistory,
              props.keyContent,
            );

            changeCurrentOperator(
              props.keyContent,
              props.props.setCurrentOperator,
            );
          } else {
            addSign(props);
          }
        } else {
          updateHistoryOperator(
            props.props.processHistory,
            props.props.setProcessHistory,
            props.keyContent,
          );

          changeCurrentOperator(
            props.keyContent,
            props.props.setCurrentOperator,
          );
        }
      } else {
        addSign(props);
      }
    } else {
      addSign(props);
    }
  }
};

// Add Sign To Process History
const addSign = (props) => {
  if (splitProcessHistory(props.props.processHistory, '', 1) !== '.') {
    props.props.setProcessHistory(
      props.props.processHistory === ' '
        ? props.props.result + ' ' + props.keyContent + ' '
        : props.props.processHistory + ' ' + props.keyContent + ' ',
    );

    if (props.props.processHistory === ' ') {
      props.props.setValA(props.props.result);
    }

    changeCurrentOperator(props.keyContent, props.props.setCurrentOperator);
    updateCurrentValues(props.props);
  }
};

// Method To Change Current Operator From Process History
const updateHistoryOperator = (processHistory, setProcessHistory, newSign) => {
  setProcessHistory(processHistory.slice(0, -3) + ' ' + newSign + ' ');
};

// Method To Change Current Operator
const changeCurrentOperator = (operator, updateOperator) => {
  switch (operator) {
    case '+':
      updateOperator('sum');
      break;
    case '-':
      updateOperator('subtraction');
      break;
    case '×':
      updateOperator('multiplication');
      break;
    case '÷':
      updateOperator('division');
      break;
    default:
      updateOperator('');
      break;
  }
};

// Method To Update Current Values
const updateCurrentValues = (props) => {
  props.setValA(props.result === 0 ? props.valA : props.result);
  props.setValB(0);
  props.setContainsSign(true);
};

// Method To Split Process History
const splitProcessHistory = (processHistory, divisionRules, elementReturn) => {
  const splitElement = processHistory.split(divisionRules === '' ? '' : ' ');
  return splitElement[splitElement.length - elementReturn];
};

// Default Key Press
export const defaultKeyPress = (props) => {
  // To Avoid Inserting Multiple Points Or If There Is No Number Before
  if (props.keyContent === '.') {
    if (props.props.processHistory.length !== 0) {
      pointKey(props.props);
    }
  } else {
    defaultUpdateValues(props);
  }
};

// Default Update Method
const defaultUpdateValues = (props) => {
  if (props.props.containsSign) {
    props.props.setProcessHistory(
      props.props.valB === '0'
        ? props.props.processHistory.slice(0, -1) + props.keyContent
        : props.props.processHistory + props.keyContent,
    );

    if (props.props.valB === 0 || props.props.valB === '0') {
      props.props.setValB(props.keyContent);
    } else {
      props.props.setValB(props.props.valB + props.keyContent);
    }

    executeOperation(
      props.props.currentOperator,
      props.props.valA,
      props.props.valB,
      props.keyContent,
      props.props.setResult,
    );
  } else {
    if (props.props.valA === 0 || props.props.valA === '0') {
      props.props.setValA(props.keyContent);
      props.props.setResult(props.keyContent);
    } else {
      props.props.setValA(props.props.valA + props.keyContent);
      props.props.setResult(props.props.valA + props.keyContent);
    }

    props.props.setProcessHistory(
      props.props.processHistory === '0'
        ? props.keyContent
        : props.props.processHistory + props.keyContent,
    );
  }
};

// Method For Point Key
const pointKey = (props) => {
  const lastElement = splitProcessHistory(props.processHistory, '', 1);

  if (!isOperator(lastElement) && lastElement !== ' ') {
    if (props.containsSign) {
      if (!props.valB.toString().includes('.')) {
        props.setValB(props.valB + '.');

        props.setProcessHistory(props.processHistory + '.');
      }
    } else if (!props.valA.toString().includes('.')) {
      props.setValA(props.valA + '.');
      props.setProcessHistory(props.processHistory + '.');
    }
  }
};

// Method To Execute An Operation Based On The Current Operator
const executeOperation = (
  currentOperator,
  valA,
  valB,
  keyContent,
  setResult,
) => {
  switch (currentOperator) {
    case 'sum':
      setResult(parseFloat(valA) + parseFloat(valB + keyContent));
      break;
    case 'subtraction':
      setResult(parseFloat(valA) - parseFloat(valB + keyContent));
      break;
    case 'multiplication':
      setResult(parseFloat(valA) * parseFloat(valB + keyContent));
      break;
    case 'division':
      setResult(parseFloat(valA) / parseFloat(valB + keyContent));
      break;
    default:
      setResult(parseFloat(valA) + parseFloat(valB + keyContent));
      break;
  }
};

// Function Keys
export const functionKeyPress = (props) => {
  switch (props.keyContent) {
    case 'AC':
      clearAll(props.props);
      break;
    case '±':
      changeSign(props.props);
      break;
    case '%':
      calculatePercentage(props.props);
      break;
    default:
      break;
  }
};

// Method To Clear All
const clearAll = (props) => {
  clearValues(0, '', props);
};

// Change Sign Method
const changeSign = (props) => {
  if (props.containsSign) {
    let newProcessHistory = props.processHistory.slice(
      0,
      -props.valB.toString().length,
    );

    let newValB =
      props.valB === 0
        ? 0
        : props.valB.toString().split('')[0] === '-'
        ? props.valB.toString().slice(1, props.valB.toString().length)
        : '-' + props.valB;

    props.setValB(newValB);
    props.setProcessHistory(
      newValB === 0 ? props.processHistory : newProcessHistory + newValB,
    );

    executeOperation(
      props.currentOperator,
      props.valA,
      newValB,
      '',
      props.setResult,
    );
  } else {
    let newVal =
      props.valA === 0
        ? props.valA
        : props.valA.toString().split('')[0] === '-'
        ? props.valA.toString().slice(1, props.valA.toString().length)
        : '-' + props.valA;

    props.setValA(newVal);
    props.setResult(newVal);
    props.setProcessHistory(newVal === 0 ? '' : newVal);
  }
};

// Calculate Percentage
const calculatePercentage = (props) => {
  if (props.containsSign) {
    if (props.valB !== 0) {
      let newProcessHistory = props.processHistory.slice(
        0,
        -props.valB.toString().length,
      );
      const newValB = (parseFloat(props.valB) * parseFloat(props.valA)) / 100;

      props.setValB(newValB);
      props.setProcessHistory(
        newValB === 0 ? newProcessHistory : newProcessHistory + newValB,
      );

      executeOperation(
        props.currentOperator,
        props.valA,
        newValB,
        '',
        props.setResult,
      );
    }
  }
};

// Undo Method
export const keyPressUndo = (props) => {
  if (props.processHistory.length !== 0) {
    redoProcessHistory(props);
  }
};

const redoProcessHistory = (props) => {
  const lastElement = splitProcessHistory(props.processHistory, '', 1);
  let newProcessHistory = '';
  let tempOperator = '';
  let tempValA = '';
  let tempValB = '';
  let tempResult = '';
  let tempContainsSign = false;

  if (!isOperator(lastElement) && lastElement !== ' ') {
    props.setProcessHistory(props.processHistory.slice(0, -1));
    newProcessHistory = props.processHistory.slice(0, -1);
  } else {
    if (lastElement === '-') {
      props.setProcessHistory(props.processHistory.slice(0, -1));
      newProcessHistory = props.processHistory.slice(0, -1);
    } else {
      props.setProcessHistory(props.processHistory.slice(0, -3));
      newProcessHistory = props.processHistory.slice(0, -3);
    }
  }

  const newProcessHistorySplit = newProcessHistory.split(' ');

  for (let i = 0; i < newProcessHistorySplit.length; i++) {
    const element = newProcessHistorySplit[i];
    if (!isOperator(element) && element !== '') {
      if (tempValA === '') {
        tempValA = element;
      } else {
        tempValB = element;

        switch (tempOperator) {
          case '+':
            tempResult = parseFloat(tempValA) + parseFloat(tempValB);
            tempValA =
              i < newProcessHistorySplit.length - 1 ? tempResult : tempValA;
            break;
          case '-':
            tempResult = parseFloat(tempValA) - parseFloat(tempValB);
            tempValA =
              i < newProcessHistorySplit.length - 1 ? tempResult : tempValA;
            break;
          case '×':
            tempResult = parseFloat(tempValA) * parseFloat(tempValB);
            tempValA =
              i < newProcessHistorySplit.length - 1 ? tempResult : tempValA;
            break;
          case '÷':
            tempResult = parseFloat(tempValA) / parseFloat(tempValB);
            tempValA =
              i < newProcessHistorySplit.length - 1 ? tempResult : tempValA;
            break;
          default:
            break;
        }
      }
    } else {
      tempOperator = element !== '' ? element : tempOperator;
      tempContainsSign = true;
      tempValB = '';
    }
  }
  
  props.setValA(tempValA === '' ? 0 : tempValA);
  props.setValB(tempValB === '' ? 0 : tempValB);
  props.setResult(tempResult === '' ? tempValA : tempResult);
  props.setContainsSign(tempContainsSign);

  changeCurrentOperator(tempOperator, props.setCurrentOperator);
};
