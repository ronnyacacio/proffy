import React from 'react';

import api from '../../services/api';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface ITeacher {
  avatar: string;
  name: string;
  subject: string;
  bio: string;
  cost: number;
  whatsapp: string;
  id: number;
}

interface Props {
  teacher: ITeacher;
}

const TeacherItem: React.FC<Props> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora:
          <strong>{teacher.cost}</strong>
        </p>
        <a href={`https://wa.me/${teacher.whatsapp}`} onClick={createNewConnection} target="blank">
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;
