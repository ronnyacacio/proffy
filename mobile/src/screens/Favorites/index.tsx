import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';
import styles from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<ITeacher[]>([]);

  useFocusEffect(() => {
    (async () => {
      AsyncStorage.getItem('favorites').then(response => {
        if (response) {
          const favoritedTeachers = JSON.parse(response);

          setFavorites(favoritedTeachers);
        }
      });
    })();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map((teacher: ITeacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} favorited />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;