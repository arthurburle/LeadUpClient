import { useEffect } from 'react';
import { connect } from 'react-redux';

import { tryLocalSignin } from '../actions/authActions';

/*
const fetchFonts = () => {
  return Font.loadAsync({
    NunitoRegular: require('../../assets/fonts/Nunito-Regular.ttf'),
  });
};
*/

const ResolveAuthScreen = ({ tryLocalSignin }) => {
  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

export default connect(null, {
  tryLocalSignin,
})(ResolveAuthScreen);
