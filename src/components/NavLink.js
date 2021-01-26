import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavLink = ({ text, routeName }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(routeName)}
    >
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const PH = Dimensions.get('window').height / 812;
const PW = Dimensions.get('window').width / 375;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 39.5 * PW,
    marginBottom: 40 * PH,
  },
  link: {
    color: '#00DCB7',
  },
});

export default NavLink;
