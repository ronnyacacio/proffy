import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import { useFields } from '../../hooks/useFields';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

interface IFieldGroup {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: string;
}

const TeacherForm: React.FC = () => {
  const [scheduleItems, setScheduleItems] = useState([{ week_day: '', from: '', to: '' }]);

  const history = useHistory();

  const [newClass, handleFieldChange] = useFields<IFieldGroup>({
    name: '',
    avatar: '',
    whatsapp: '',
    bio: '',
    subject: '',
    cost: '',
  });

  function addNewScheduleItem() {
    setScheduleItems(prevState => [...prevState, { week_day: '', from: '', to: '' }]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position)
        return { ...scheduleItem, [field]: value };

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handlCreateClass(e: FormEvent) {
    e.preventDefault();

    const data = { ...newClass, cost: Number(newClass.cost), schedule: scheduleItems };

    api.post('classes', data)
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        history.push('/');
      })
      .catch(() => alert('Erro no cadastro!'));
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handlCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input name="name" label="Nome completo" onChange={handleFieldChange} />
            <Input name="avatar" label="Avatar" onChange={handleFieldChange} />
            <Input name="whatsapp" label="WhatsApp" onChange={handleFieldChange} />
            <Textarea name="bio" label="Biografia" onChange={handleFieldChange} />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={newClass.subject}
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
            <Input name="cost" label="Custo da sua hora por aula" onChange={handleFieldChange} />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
            </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                  onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                />

                <Input name="from" label="Das" type="time" onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />
                <Input name="to" label="Até" type="time" onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
              </div>
            ))}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
            <button type="submit">
              Salvar cadastro
          </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
