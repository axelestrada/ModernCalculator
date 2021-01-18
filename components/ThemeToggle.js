import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ThemeToggle = (props) => {
  const changeCurrentTheme = async (theme) => {
    try {
      await AsyncStorage.setItem('currentTheme', theme);
    } catch (error) {
      // Error saving data
    }
  };

  const styles = StyleSheet.create({
    toggleContainer: {
      backgroundColor: props.currentTheme === 'light' ? '#f9f9f9' : '#292d36',
      marginTop: 10,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    themeToggle: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 13,
      paddingLeft: 13,
    },
  });

  return (
    <View style={styles.toggleContainer}>
      <Icon
        name="sun"
        color="#707378"
        size={20}
        style={styles.themeToggle}
        onPress={() => {
          props.setCurrentTheme('light');
          changeCurrentTheme('light');
        }}
      />

      <Icon
        name="moon"
        color="#DEDEDE"
        size={20}
        style={styles.themeToggle}
        onPress={() => {
          props.setCurrentTheme('dark');
          changeCurrentTheme('dark');
        }}
      />
    </View>
  );
};

export default ThemeToggle;
