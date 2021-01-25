import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signup, clearErrorMessage } from '../actions/authActions';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({
  signup,
  errorMessage,
  navigation,
  clearErrorMessage,
}) => {
  useEffect(() => {
    const listener = navigation.addListener('blur', clearErrorMessage);
    return listener;
  });

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <AuthForm
        errorMessage={errorMessage}
        submitButtonText="REGISTRAR"
        onSubmit={signup}
      />
      <NavLink text="Já possui uma conta? Fazer Login" routeName="Signin" />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.errorMessage };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default connect(mapStateToProps, {
  signup,
  clearErrorMessage,
})(SignupScreen);
