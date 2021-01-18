import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {keyPressUndo} from './Functions';

const KeyIcon = (props) => {
  const keyPress = () => {
    keyPressUndo(props.props);
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
        props.props.currentTheme === 'light' ? '#f7f7f7' : '#272b33',
    },
    keyContent: {
      color: props.props.currentTheme === 'light' ? '#2e323b' : '#fbfbfb',
      fontSize: 25,
      fontFamily: 'Poppins-SemiBold',
    },
  });

  return (
    <TouchableWithoutFeedback onPress={keyPress}>
      <View style={styles.key}>
        <Icon
          name={props.keyContent}
          color="#2e323b"
          size={20}
          style={styles.keyContent}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default KeyIcon;
