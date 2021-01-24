import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import * as actions from '../actions';
import Login from '../screens/Login';

class StackNavigatior extends Component {
  componentDidMount() {}

  onPressHandler = () => {
    this.props.test(this.props.auth.test === 'oi' ? 'tchau' : 'oi');
  };

  render() {
    console.log(this.props.auth.test);
    return (
      <View>
        <TouchableOpacity onPress={this.onPressHandler}>
          <Text>Gravar state</Text>
        </TouchableOpacity>
        <Login />
      </View>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(StackNavigatior);
