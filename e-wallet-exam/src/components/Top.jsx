import React from 'react';
import Card from './Card/Card';

import './Top.css';
import { useDispatch, useSelector } from 'react-redux';
import { cardSendBackToStack, deleteCard } from '../reducers/cardReducer';

function Top() {
  const dispatch = useDispatch();
  const cardData = useSelector((state) => state.card.cardData);

  function handleCardClick() {
    dispatch(cardSendBackToStack());
  }

  function handleCardDelete() {
    if (cardData && cardData.cardNumber) {
      dispatch(deleteCard({ cardNumber: cardData.cardNumber }));
    }
  }

  return (
    <div className='top-site'>
      {cardData && cardData.cardNumber && (
        <div className='active-card-container'>
          <button
            className='btn-card-delete'
            onClick={() => handleCardDelete()}
          >
            Delete Card
          </button>
          <h2 className='top-title-card-active'>ACTIVE CARD</h2>
        </div>
      )}

      <Card
        className='card-pointer'
        handleCardClick={handleCardClick}
        cardData={cardData}
      ></Card>
    </div>
  );
}

export default Top;
