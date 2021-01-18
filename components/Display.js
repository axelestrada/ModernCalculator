import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const Display = (props) => {
  const generateResult = () => {
    let resultSplit = props.result.toString().split('');
    let decimalNumber = 0;
    let includesDigit = false;

    if (props.result.toString().includes('-')) {
      resultSplit = props.result
        .toString()
        .slice(1, props.result.toString().length);
      includesDigit = true;
    }

    if (props.result.toString().includes('.')) {
      if (includesDigit) {
        resultSplit = resultSplit.split('.')[0];
      } else {
        resultSplit = props.result.toString().split('.')[0];
      }

      resultSplit = resultSplit.split('');
      decimalNumber = parseFloat(props.result).toFixed(2).split('.')[1];
    }

    let newResult = '';
    let validate = 0;

    for (let i = resultSplit.length - 1; i >= 0; i--) {
      const element = resultSplit[i];
      if (validate % 3 === 0 && validate !== 0) {
        newResult += ',';
      }

      newResult += element;
      validate++;
    }

    const newResultSplit = newResult.split('');
    newResult = '';

    for (let i = newResultSplit.length - 1; i >= 0; i--) {
      const element = newResultSplit[i];
      newResult += element;
    }

    newResult = includesDigit ? '-' + newResult : newResult;
    return props.result.toString().includes('.')
      ? newResult + '.' + decimalNumber
      : newResult;
  };

  const generateProcessHistory = () => {
    let processSplit = props.processHistory.split(' ');
    let newProcess = '';

    for (let fo = 0; fo < processSplit.length; fo++) {
      if (
        processSplit[fo] === '+' ||
        processSplit[fo] === '-' ||
        processSplit[fo] === '×' ||
        processSplit[fo] === '÷'
      ) {
        newProcess = newProcess + ' ' + processSplit[fo] + ' ';
      } else {
        let resultSplit = processSplit[fo];
        let decimalNumber = 0;
        let includesDigit = false;

        if (processSplit[fo].includes('-')) {
          resultSplit = processSplit[fo].slice(1, processSplit[fo].length);
          includesDigit = true;
        }

        if (processSplit[fo].includes('.')) {
          if (includesDigit) {
            resultSplit = resultSplit.split('.')[0];
          } else {
            resultSplit = processSplit[fo].split('.')[0];
          }

          resultSplit = resultSplit.split('');
          decimalNumber = processSplit[fo].split('.')[1];
        }

        let newResult = '';
        let validate = 0;

        for (let i = resultSplit.length - 1; i >= 0; i--) {
          const element = resultSplit[i];
          if (validate % 3 === 0 && validate !== 0) {
            newResult += ',';
          }

          newResult += element;
          validate++;
        }

        const newResultSplit = newResult.split('');
        newResult = '';

        for (let i = newResultSplit.length - 1; i >= 0; i--) {
          const element = newResultSplit[i];
          newResult += element;
        }

        newResult = includesDigit ? '-' + newResult : newResult;
        newProcess += processSplit[fo].includes('.')
          ? newResult + '.' + decimalNumber
          : newResult;
      }
    }

    return newProcess;
  };

  const styles = StyleSheet.create({
    main: {
      paddingRight: 20,
      paddingLeft: 20,
    },
    process: {
      height: 52,
      paddingBottom: 0,
      color: props.currentTheme === 'light' ? '#343841' : '#fbfbfb',
      fontFamily: 'Poppins-Medium',
      fontSize: 25,
      textAlign: 'right',
      backgroundColor: props.currentTheme === 'light' ? '#ffffff' : '#22252d',
    },
    result: {
      height: 80,
      paddingBottom: 0,
      color: props.currentTheme === 'light' ? '#292d36' : '#fbfbfb',
      fontSize: 50,
      fontFamily: 'Poppins-Bold',
      textAlign: 'right',
      backgroundColor: props.currentTheme === 'light' ? '#ffffff' : '#22252d',
    },
  });

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.process}
        value={generateProcessHistory()}
        editable={false}
      />

      <TextInput
        style={styles.result}
        value={
          props.processHistory === '-'
            ? '-'
            : props.processHistory === ''
            ? ''
            : generateResult()
        }
        editable={false}
      />
    </View>
  );
};

export default Display;
