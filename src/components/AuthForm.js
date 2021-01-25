import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Logo from '../assets/img/Logo.png';

// Proportional Height and Width
const PH = Dimensions.get('window').height / 812;
const PW = Dimensions.get('window').width / 375;

const AuthForm = ({ errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput
          placeholder="E-mail"
          style={styles.inputField}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Senha</Text>
        <TextInput
          secureTextEntry
          placeholder="Password"
          style={styles.inputField}
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity
        onPress={() => onSubmit({ email, password })}
        style={styles.submitButton}
      >
        <Text style={styles.submitText}>{submitButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 39.5 * PW,
    paddingBottom: 20 * PW,
  },
  logo: {
    height: 105 * PW,
    width: 159.7 * PW,
    marginTop: 40 * PH,
    marginBottom: 141 * PH,
  },
  inputContainer: {
    alignSelf: 'stretch',
    marginBottom: 30 * PH,
  },
  inputLabel: {
    fontSize: 11 * PW,
    color: '#00DCB7',
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#00DCB7',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
  },
  submitButton: {
    borderWidth: 1,
    borderColor: '#00DCB7',
    height: 40 * PW,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 60 * PH,
  },
  submitText: {
    fontSize: 14 * PW,
    textAlign: 'center',
    color: '#00DCB7',
  },
});

export default AuthForm;
