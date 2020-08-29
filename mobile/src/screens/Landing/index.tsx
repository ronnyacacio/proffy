import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import styles from './styles';

const Landing: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigateToGiveClasses() {
    navigation.navigate('GiveClasses');
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} resizeMode="contain" />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>
          O que deseja fazer?
        </Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton style={[styles.button, styles.buttonPrimary]}>
          <Image source={studyIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton style={[styles.button, styles.buttonSecondary]} onPress={handleNavigateToGiveClasses}>
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totaoConnections}>
        Total de 285 conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;
