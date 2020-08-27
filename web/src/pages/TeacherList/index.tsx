import React, { useState, FormEvent } from 'react';

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { useFields } from '../../hooks/useFields';
import { ITeacher } from '../../components/TeacherItem';
import './styles.css';


interface IFieldGroup {
  subject: string;
  week_day: string;
  time: string;
}

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [filters, handleFieldChange] = useFields<IFieldGroup>({
    subject: '',
    week_day: '',
    time: '',
  });

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: filters,
    });

    console.log(response.data);

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Esses são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={filters.subject}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Química', label: 'Química' },
              { value: 'Física', label: 'Física' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'História', label: 'História' },
              { value: 'Educação física', label: 'Educação física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Filosofia', label: 'Filosofia' },
              { value: 'Sociologia', label: 'Sociologia' },
              { value: 'Português', label: 'Português' },
            ]}
            onChange={handleFieldChange}
          />

          <Select
            name="week_day"
            label="Dia da semana"
            value={filters.week_day}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
            onChange={handleFieldChange}
          />

          <Input type="time" label="Hora" name="time" onChange={handleFieldChange} />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: ITeacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}

export default TeacherList;
