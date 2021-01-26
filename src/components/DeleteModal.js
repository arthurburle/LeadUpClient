import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';

const DeleteModal = ({ visible, setVisibility, callback }) => {
  return (
    <View>
      <ReactNativeModal
        isVisible={visible}
        onBackdropPress={() => setVisibility(false)}
        swipeDirection={['up', 'down']}
        onSwipeComplete={() => setVisibility(false)}
      >
        <View style={styles.container}>
          <Text style={styles.question}>
            Tem certeza de que deseja excluir?
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={callback}
              style={{ ...styles.button, borderColor: '#00DCB7' }}
            >
              <Text style={{ ...styles.buttonText, color: '#00DCB7' }}>
                SIM
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisibility(false)}
              style={{ ...styles.button, borderColor: '#DC0000' }}
            >
              <Text style={{ ...styles.buttonText, color: '#DC0000' }}>
                NÃO
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

const PH = Dimensions.get('window').height / 812;
const PW = Dimensions.get('window').width / 375;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25 * PW,
    paddingHorizontal: 60 * PW,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 10,
  },
  question: {
    color: '#00145F',
    fontSize: 20 * PW,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15 * PW,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35 * PW,
  },
  button: {
    height: 43 * PW,
    width: 136 * PW,
    borderWidth: 1 * PW,
    justifyContent: 'center',
    marginHorizontal: 10 * PW,
  },
  buttonText: {
    fontSize: 12 * PW,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DeleteModal;
