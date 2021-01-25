import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { editCard, deleteCard } from '../actions/cardsActions';

import Header from '../components/Header';

const CardDetailScreen = ({ card, editCard, deleteCard }) => {
  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <Header />
      <Text style={{ fontSize: 48 }}>CardDetailScreen</Text>
      <Text>{card.title}</Text>
      <Text>{card.description}</Text>
      <TouchableOpacity
        onPress={() =>
          editCard('blaasdsegwe bla bla', 'blu fwefewfewblu blu', card._id)
        }
      >
        <Text>EDITAR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          deleteCard(card._id);
        }}
      >
        <Text>DELETAR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = (state, props) => {
  const _id = props.route.params._id;
  const card = state.cards.find(c => c._id === _id);
  return { card };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
});

export default connect(mapStateToProps, { editCard, deleteCard })(
  CardDetailScreen
);
