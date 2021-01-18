/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AsyncStorage} from 'react-native';

import ThemeToggle from './components/ThemeToggle';
import Display from './components/Display';
import KeyPad from './components/KeyPad';

const App = () => {
  const fetchCurrentTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('currentTheme');
      setCurrentTheme(value);
    } catch (error) {
      // Error retrieving data
    }
  };

  fetchCurrentTheme();
  const [currentTheme, setCurrentTheme] = useState();

  const [valA, setValA] = useState(0);
  const [valB, setValB] = useState(0);
  const [result, setResult] = useState(0);

  const [processHistory, setProcessHistory] = useState('');
  const [containsSign, setContainsSign] = useState(false);

  const [currentOperator, setCurrentOperator] = useState('');

  const styles = StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: currentTheme === 'light' ? '#ffffff' : '#22252d',
    },
    main: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
    },
  });

  return (
    <View style={styles.body}>
      <ThemeToggle
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
      <View style={styles.main}>
        <Display
          currentTheme={currentTheme}
          processHistory={processHistory}
          containsSign={containsSign}
          result={result}
        />
        <KeyPad
          currentTheme={currentTheme}
          processHistory={processHistory}
          setProcessHistory={setProcessHistory}
          containsSign={containsSign}
          setContainsSign={setContainsSign}
          currentOperator={currentOperator}
          setCurrentOperator={setCurrentOperator}
          valA={valA}
          setValA={setValA}
          valB={valB}
          setValB={setValB}
          result={result}
          setResult={setResult}
        />
      </View>
    </View>
  );
};

export default App;
