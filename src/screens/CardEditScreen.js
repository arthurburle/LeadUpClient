import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { editCard } from '../actions/cardsActions';

import Header from '../components/Header';
import CardFactory from '../components/CardFactory';

const CardEditScreen = ({ route, editCard }) => {
  const card = route.params.card;

  return (
    <View style={styles.container}>
      <Header />
      <CardFactory card={card} callback={editCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default connect(null, { editCard })(CardEditScreen);
