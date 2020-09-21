import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';


const TeacherList: React.FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: ITeacher) => teacher.id);

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  function handleToggleFiltersVisible() {
    setFiltersVisible(prevState => !prevState);
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const filters = { subject, week_day, time };

    const response = await api.get<ITeacher[]>('classes', {
      params: filters,
    });

    setTeachers(response.data);
    setFiltersVisible(false);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
        {filtersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={setSubject}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={setWeekDay}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={setTime}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map(teacher => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
