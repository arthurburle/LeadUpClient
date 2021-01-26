import React from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import ReactNativeModal from 'react-native-modal';

import Checkmark from '../assets/img/CheckmarkCircle.png';

const DoneModal = ({ visible, text }) => {
  return (
    <View>
      <ReactNativeModal isVisible={visible}>
        <View style={styles.container}>
          <Image source={Checkmark} style={styles.checkmark} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </ReactNativeModal>
    </View>
  );
};

const PH = Dimensions.get('window').height / 812;
const PW = Dimensions.get('window').width / 375;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40 * PW,
    paddingHorizontal: 60 * PW,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 10,
  },
  checkmark: {
    height: 63 * PW,
    width: 63 * PW,
  },
  text: {
    color: '#00145F',
    fontSize: 20 * PW,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15 * PW,
  },
});

export default DoneModal;
