import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

//Methods
import {
  functionKeyPress,
  showResult,
  updateCurrentOperator,
  defaultKeyPress,
} from './Functions';

const Key = (props) => {
  const keyPress = () => {
    switch (props.type) {
      case 'function':
        functionKeyPress(props);
        break;
      case 'operator':
        props.keyContent === '='
          ? showResult(props)
          : updateCurrentOperator(props);
        break;
      default:
        defaultKeyPress(props);
        break;
    }
  };

  const styles = StyleSheet.create({
    key: {
      width: 60,
      height: 60,
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:
        props.props.currentTheme === 'light' ? '#f5f5f5' : '#272b33',
    },
    keyContent: {
      color: props.props.currentTheme === 'light' ? '#2e323b' : '#fbfbfb',
      fontSize: 25,
      fontFamily: 'Poppins-SemiBold',
    },
    keyFunction: {
      color: props.props.currentTheme === 'light' ? '#16d9f6' : '#26fed7',
    },
    keyOperator: {
      color: props.props.currentTheme === 'light' ? '#db5f5f' : '#f16868',
    },
  });

  return (
    <TouchableWithoutFeedback onPress={keyPress}>
      <View style={styles.key}>
        <Text
          style={
            props.type === 'function'
              ? [styles.keyContent, styles.keyFunction]
              : props.type === 'operator'
              ? [styles.keyContent, styles.keyOperator]
              : styles.keyContent
          }>
          {props.keyContent}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Key;
