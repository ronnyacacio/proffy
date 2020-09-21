import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import styles from './styles';

interface IConnections {
  total: number;
}

const Landing: React.FC = () => {
  const [connections, setConnections] = useState<IConnections>({ total: 0 });

  const navigation = useNavigation();

  useFocusEffect(() => {
    (async () => {
      const response = await api.get<IConnections>('connections');

      setConnections(response.data);
    })();
  });

  function handleNavigateToStudy() {
    navigation.navigate('Study');
  }

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
        <RectButton style={[styles.button, styles.buttonPrimary]} onPress={handleNavigateToStudy}>
          <Image source={studyIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton style={[styles.button, styles.buttonSecondary]} onPress={handleNavigateToGiveClasses}>
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totaoConnections}>
        Total de {connections.total} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;
