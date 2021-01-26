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
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import DoneModal from './DoneModal';

import UploadButton from '../assets/img/UploadButton.png';
import SaveButton from '../assets/img/SaveButton.png';
import NoImage from '../assets/img/NoImage.png';

const CardFactory = ({ card, callback }) => {
  const [title, setTitle] = useState(card ? card.title : '');
  const [description, setDescription] = useState(card ? card.description : '');
  const [photoUri, setPhotoUri] = useState(card ? card.photoUri : '');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Precisamos do acesso ás imagens para que funcione');
        }
      }
    })();
  }, []);
  console.log(photoUri);

  useEffect(() => {
    const listener = navigation.addListener('blur', () => setErrorMessage(''));
    return listener;
  });

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPhotoUri(result.uri);
    }
  };

  const onSaveHandler = async () => {
    try {
      await callback(title, description, photoUri, card ? card._id : null);
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
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.image} />
        ) : (
          <View style={styles.image}>
            <Image source={NoImage} />
          </View>
        )}

        <TouchableOpacity
          onPress={handleChoosePhoto}
          style={styles.uploadButtonContainer}
        >
          <Image source={UploadButton} style={styles.uploadButton} />
        </TouchableOpacity>
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
    height: SW * (3 / 4),
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
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
