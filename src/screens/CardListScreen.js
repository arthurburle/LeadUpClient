import React, { useEffect } from 'react';
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
import Checkmark from '../assets/img/CheckmarkCircle.png';
import EditButton from '../assets/img/EditButton.png';

const CardListScreen = ({ navigation, fetchCards, cardsList }) => {
  useEffect(() => {
    const listener = navigation.addListener('focus', fetchCards);
    return listener;
  });

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={cardsList}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate('CardDetail', { _id: item._id })
              }
            >
              <Image source={Checkmark} style={styles.itemImage} />
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <TouchableOpacity>
                <Image style={styles.editButton} source={EditButton} />
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

const PH = Dimensions.get('window').height / 812;
const PW = Dimensions.get('window').width / 375;

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
});

export default connect(mapStateToProps, { fetchCards })(CardListScreen);
