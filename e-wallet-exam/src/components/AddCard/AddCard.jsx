import React from 'react';
import CardForm from './CardForm';
import Card from '../Card/Card';
import './AddCard.css';

function AddCard() {
  return (
    <div className='addcard-site'>
      <h1 className='home-title'>
        ADD A NEW <br></br> BANK CARD
      </h1>
      <Card></Card>
      <CardForm></CardForm>
    </div>
  );
}

export default AddCard;
