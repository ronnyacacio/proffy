import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://github.com/ronnyacacio.png" alt="Ronny Acácio" />
        <div>
          <strong>Ronny Acácio</strong>
          <span>Física</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de física teórica
            <br /><br />
            Apaixonado em explorar as estrelas coisas pelo telescópio e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas observações.
          </p>

      <footer>
        <p>
          Preço/hora:
              <strong>R$ 100,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="WhatsApp" />
              Entrar em contato
            </button>
      </footer>
    </article>
  );
}

export default TeacherItem;