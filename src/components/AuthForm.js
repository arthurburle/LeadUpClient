import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/img/Logo.png';

// Proportional Height and Width
const PH = Dimensions.get('window').height / 812;
const PW = Dimensions.get('window').width / 375;

const AuthForm = ({ errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    const listener = navigation.addListener('blur', () => {
      setEmail('');
      setPassword('');
      setShowError(false);
    });
    return listener;
  });

  useEffect(() => {
    // Email validation
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }, [email]);

  useEffect(() => {
    // Password validation
    if (password.length < 6) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  }, [password]);

  handleOnSubmit = () => {
    if (validEmail && validPassword) {
      onSubmit({ email, password });
    } else {
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput
          type="email"
          placeholder="E-mail"
          style={styles.inputField}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {showError && !validEmail ? (
          <Text style={styles.errorMessage}>Este não é um email válido</Text>
        ) : null}
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
        {showError && !validPassword ? (
          <Text style={styles.errorMessage}>
            Sua senha precisa ter pelo menos 6 dígitos
          </Text>
        ) : null}
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity onPress={handleOnSubmit} style={styles.submitButton}>
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
    fontSize: 13,
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
