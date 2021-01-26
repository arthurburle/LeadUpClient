import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DoneModal from './DoneModal';

import UploadButton from '../assets/img/UploadButton.png';
import SaveButton from '../assets/img/SaveButton.png';

const CardFactory = ({ card, callback }) => {
  const [title, setTitle] = useState(card ? card.title : '');
  const [description, setDescription] = useState(card ? card.description : '');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const listener = navigation.addListener('blur', () => setErrorMessage(''));
    return listener;
  });

  const onSaveHandler = async () => {
    try {
      await callback(title, description, card ? card._id : null);
      setModalVisibility(true);
      setTimeout(function () {
        setModalVisibility(false);
        navigation.navigate('CardList');
      }, 1000);
    } catch (err) {
      setErrorMessage('Erro. Problema na conexão');
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.image} />
        <View style={styles.uploadButtonContainer}>
          <Image source={UploadButton} style={styles.uploadButton} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Título</Text>
          <TextInput
            placeholder="Título"
            style={styles.titleInput}
            onChangeText={setTitle}
            value={title}
            autoCorrect={false}
          />

          <Text style={styles.inputLabel}>Descrição</Text>
          <TextInput
            style={styles.descriptionInput}
            onChangeText={setDescription}
            value={description}
            autoCorrect={false}
            multiline
          />
        </View>
        <TouchableOpacity
          onPress={onSaveHandler}
          style={styles.saveButtonContainer}
        >
          <Image source={SaveButton} style={styles.saveButton} />
        </TouchableOpacity>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </ScrollView>
      <DoneModal
        visible={modalVisibility}
        text={
          card ? 'Artigo atualizado com sucesso' : 'Artigo criado com sucesso'
        }
      />
    </>
  );
};

const SW = Dimensions.get('window').width;
const PH = Dimensions.get('window').height / 812;
const PW = SW / 375;

const styles = StyleSheet.create({
  image: {
    width: SW,
    height: 234 * PW,
    backgroundColor: '#DDD',
  },
  uploadButtonContainer: {
    alignItems: 'flex-end',
    paddingRight: 43 * PW,
    marginTop: 35 * PH,
    marginBottom: 15 * PH,
  },
  uploadButton: {
    backgroundColor: 'red',
  },
  formContainer: {
    paddingHorizontal: 48 * PW,
  },
  inputLabel: {
    fontSize: 11 * PW,
    color: '#00DCB7',
  },
  titleInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#00DCB7',
    marginBottom: 30 * PH,
  },
  descriptionInput: {
    height: 100,
    borderColor: '#00DCB7',
    borderWidth: 1,
    marginTop: 10 * PH,
    padding: 8,
    textAlignVertical: 'top',
  },
  saveButtonContainer: {
    marginTop: 24 * PH,
    marginBottom: 50 * PH,
  },
  saveButton: {
    alignSelf: 'center',
    height: 41.5 * PW,
    width: 289 * PW,
  },
  errorMessage: {
    fontSize: 13 * PW,
    color: 'red',
    marginLeft: 48 * PW,
  },
});

export default CardFactory;
