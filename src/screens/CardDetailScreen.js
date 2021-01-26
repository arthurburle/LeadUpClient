import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { deleteCard } from '../actions/cardsActions';

import Header from '../components/Header';
import EditButton from '../assets/img/EditButton.png';
import DeleteButton from '../assets/img/DeleteButton.png';

import DeleteModal from '../components/DeleteModal';
import DoneModal from '../components/DoneModal';

const CardDetailScreen = ({ navigation, card, deleteCard }) => {
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [doneModalVisibility, setDoneModalVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const listener = navigation.addListener('blur', () => setErrorMessage(''));
    return listener;
  });

  const handleDelete = async () => {
    try {
      setDeleteModalVisibility(false);
      await deleteCard(card._id);
      setDoneModalVisibility(true);
      setTimeout(function () {
        setDoneModalVisibility(false);
        navigation.navigate('CardList');
      }, 1000);
    } catch (err) {
      setErrorMessage('Erro. Problema na conexão');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.itemImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.itemTitle}>{card.title}</Text>
          <Text style={styles.itemDescription}>{card.description}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CardEdit', { card })}
          >
            <Image style={styles.button} source={EditButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDeleteModalVisibility(true)}>
            <Image style={styles.button} source={DeleteButton} />
          </TouchableOpacity>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      </ScrollView>
      <DeleteModal
        visible={deleteModalVisibility}
        setVisibility={setDeleteModalVisibility}
        callback={handleDelete}
      />
      <DoneModal
        visible={doneModalVisibility}
        text="Artigo excluído com sucesso"
      />
    </View>
  );
};

const mapStateToProps = (state, props) => {
  const _id = props.route.params._id;
  const card = state.cards.find(c => c._id === _id);
  return { card };
};

const SW = Dimensions.get('window').width;
const PH = Dimensions.get('window').height / 812;
const PW = SW / 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  itemImage: {
    width: SW,
    height: 298 * PW,
    backgroundColor: '#DDD',
  },
  infoContainer: {
    paddingHorizontal: 41 * PW,
    paddingBottom: 70 * PH,
  },
  itemTitle: {
    fontSize: 18 * PW,
    fontWeight: 'bold',
    marginTop: 29 * PH,
    marginBottom: 12 * PH,
  },
  itemDescription: {
    fontSize: 14 * PW,
  },
  button: {
    alignSelf: 'center',
    height: 41.05 * PW,
    width: 289 * PW,
    marginTop: 24 * PH,
    marginBottom: 5 * PH,
  },
  errorMessage: {
    fontSize: 13 * PW,
    color: 'red',
    marginTop: 30 * PH,
    marginLeft: 3 * PW,
  },
});

export default connect(mapStateToProps, { deleteCard })(CardDetailScreen);
