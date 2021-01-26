import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signin, clearErrorMessage } from '../actions/authActions';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = ({
  signin,
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
      <ScrollView>
        <AuthForm
          errorMessage={errorMessage}
          submitButtonText="ENTRAR"
          onSubmit={signin}
        />
        <NavLink
          text="Ainda não possui uma conta? Registrar"
          routeName="Signup"
        />
      </ScrollView>
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

export default connect(mapStateToProps, { signin, clearErrorMessage })(
  SigninScreen
);
