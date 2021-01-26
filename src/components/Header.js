import React from 'react';
import { connect } from 'react-redux';
import { signout } from '../actions/authActions';
import {
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ArrowBack from '../assets/img/ArrowBack.png';
import Logo from '../assets/img/Logo.png';
import Logout from '../assets/img/Logout.png';

const Header = ({ signout, listScreen }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {listScreen ? null : (
        <TouchableOpacity
          style={styles.arrowBackContainer}
          onPress={() => navigation.navigate('CardList')}
        >
          <Image style={styles.arrowBack} source={ArrowBack} />
        </TouchableOpacity>
      )}
      <Image style={styles.logo} source={Logo} />
      <TouchableOpacity onPress={signout} style={styles.logout}>
        <Image source={Logout} />
      </TouchableOpacity>
    </View>
  );
};

const PH = Dimensions.get('window').height / 812;
const PW = Dimensions.get('window').width / 375;

const styles = StyleSheet.create({
  container: {
    height: 104 * PH,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 43 * PH,
    marginTop: -10 * PH,
    elevation: 3,
    backgroundColor: '#FFF',
  },
  arrowBackContainer: {
    position: 'absolute',
    left: 30 * PW,
    paddingTop: 50 * PH,
  },
  arrowBack: {
    height: 17 * PW,
    width: 10 * PW,
  },
  logo: {
    height: 40 * PH,
    width: 60.95 * PH,
  },
  logout: {
    position: 'absolute',
    right: 30 * PW,
    paddingTop: 45 * PH,
  },
});

export default connect(null, { signout })(Header);
