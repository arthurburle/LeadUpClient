import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchCards } from '../actions/cardsActions';

import Header from '../components/Header';
import AddButton from '../assets/img/AddButton.png';
import EditButton from '../assets/img/EditButton.png';

const PH = Dimensions.get('window').height / 812;
const PW = Dimensions.get('window').width / 375;

const CardListScreen = ({ navigation, cardsList, fetchCards }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const listener = navigation.addListener('blur', () => setErrorMessage(''));
    return listener;
  });

  useEffect(() => {
    const listener = navigation.addListener('focus', async () => {
      setRefreshing(true);
      try {
        await fetchCards();
        setRefreshing(false);
      } catch (err) {
        setErrorMessage('Erro. Problema na conexão');
      }
    });
    return listener;
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCards();
    setRefreshing(false);
  };

  if (cardsList.length === 0) {
    return (
      <View style={styles.container}>
        <Header listScreen />
        {refreshing ? null : (
          <Text style={styles.noCardsText}>Ainda não há nenhum registros</Text>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CardCreate')}
        >
          <Image source={AddButton} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header listScreen />
      <FlatList
        data={cardsList}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.flatListContainer}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate('CardDetail', { _id: item._id })
              }
            >
              <View style={styles.itemImage} />
              <Text style={styles.itemTitle}>
                {item.title.length > 32
                  ? `${item.title.slice(0, 30)}...`
                  : item.title}
              </Text>
              <Text style={styles.itemDescription}>
                {item.description.length > 178
                  ? `${item.description.slice(0, 174)}...`
                  : item.description}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('CardEdit', { card: item })}
              >
                <Image style={styles.editButton} source={EditButton} />
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CardCreate')}
      >
        <Image source={AddButton} />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return { cardsList: state.cards };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  flatListContainer: {
    paddingHorizontal: 17 * PW,
  },
  itemContainer: {
    padding: 21 * PW,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#FFF',
    marginVertical: 20 * PH,
  },
  itemImage: {
    alignSelf: 'center',
    height: 288 * PW,
    width: 288 * PW,
    backgroundColor: '#DDD',
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
  editButton: {
    alignSelf: 'center',
    height: 41 * PW,
    width: 288 * PW,
    marginTop: 24 * PH,
    marginBottom: 5 * PH,
  },
  addButton: {
    position: 'absolute',
    bottom: 35 * PH,
    right: 27 * PW,
    height: 57 * PW,
    width: 57 * PW,
  },
  errorMessage: {
    fontSize: 13 * PW,
    color: 'red',
    marginLeft: 5 * PW,
  },
  activityIndicator: {
    color: '#00DCB7',
    alignSelf: 'center',
    marginTop: 100 * PH,
  },
  noCardsText: {
    fontSize: 15 * PW,
    color: '#AAA',
    alignSelf: 'center',
    marginTop: 100 * PH,
  },
});

export default connect(mapStateToProps, { fetchCards })(CardListScreen);
