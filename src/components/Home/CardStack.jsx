import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card.jsx';
import { swapCardStack } from '../../reducers/cardReducer.js';
import './CardStack.css';

function CardStack() {
  const dispatch = useDispatch();

  const [activeCard, setActiveCard] = useState(null);
  const cardStack = useSelector((state) => state.card.cardStack);

  function handleCardClick(i) {
    const selectedCard = cardStack[i];
    dispatch(swapCardStack(selectedCard));

    setActiveCard(i);
  }
  return (
    <>
      <div className='card-stack-container'>
        {cardStack.map((card, index) => (
          <Card
            key={index}
            cardData={card}
            handleCardClick={() => {
              handleCardClick(index);
            }}
            className={index === activeCard ? 'selected' : ''}
          />
        ))}
      </div>
    </>
  );
}

export default CardStack;
