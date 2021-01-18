import React from 'react';
import {View, StyleSheet} from 'react-native';

import Key from './Key';
import KeyIcon from './KeyIcon';

const KeyPad = (props) => {
  const styles = StyleSheet.create({
    keyPad: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: props.currentTheme === 'light' ? '#f9f9f9' : '#292d36',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 20,
      paddingBottom: 10,
    },
    row: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.keyPad}>
      <View style={styles.row}>
        <Key keyContent="AC" type="function" props={props} />
        <Key keyContent="±" type="function" props={props} />
        <Key keyContent="%" type="function" props={props} />
        <Key keyContent="÷" type="operator" props={props} />
      </View>

      <View style={styles.row}>
        <Key keyContent="7" props={props} />
        <Key keyContent="8" props={props} />
        <Key keyContent="9" props={props} />
        <Key keyContent="×" type="operator" props={props} />
      </View>

      <View style={styles.row}>
        <Key keyContent="4" props={props} />
        <Key keyContent="5" props={props} />
        <Key keyContent="6" props={props} />
        <Key keyContent="-" type="operator" props={props} />
      </View>

      <View style={styles.row}>
        <Key keyContent="1" props={props} />
        <Key keyContent="2" props={props} />
        <Key keyContent="3" props={props} />
        <Key keyContent="+" type="operator" props={props} />
      </View>

      <View style={styles.row}>
        <KeyIcon keyContent="undo-alt" props={props} />

        <Key keyContent="0" props={props} />
        <Key keyContent="." props={props} />
        <Key keyContent="=" type="operator" props={props} />
      </View>
    </View>
  );
};

export default KeyPad;
