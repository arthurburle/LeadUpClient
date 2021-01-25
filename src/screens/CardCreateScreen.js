import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { createCard } from '../actions/cardsActions';
import { SafeAreaView } from 'react-native-safe-area-context';

const CardCreateScreen = ({ createCard }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <Text style={{ fontSize: 30 }}>Novo Cartão</Text>
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={setTitle}
          value={title}
          autoCorrect={false}
        />
      </View>
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={setDescription}
          value={description}
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity
        onPress={() => createCard(title, description)}
        style={{
          backgroundColor: 'blue',
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Salvar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
    padding: 25,
  },
});

export default connect(null, { createCard })(CardCreateScreen);
