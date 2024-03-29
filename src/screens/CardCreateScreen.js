import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createCard } from '../actions/cardsActions';

import Header from '../components/Header';
import CardFactory from '../components/CardFactory';

const CardCreateScreen = ({ createCard }) => {
  return (
    <View style={styles.container}>
      <Header />
      <CardFactory callback={createCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default connect(null, { createCard })(CardCreateScreen);
