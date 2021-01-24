import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../actions';

const Login = props => {
  return (
    <TouchableOpacity onPress={() => props.test('aiaiaiai')}>
      <Text>{props.auth.test}</Text>
    </TouchableOpacity>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Login);
