import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import CardStack from './CardStack';
import { cardSendBackToStack } from '../../reducers/cardReducer';
import Top from '../Top';
import { useDispatch } from 'react-redux';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSendCardToStack() {
    dispatch(cardSendBackToStack());
    navigate('/addCard');
  }
  return (
    <>
      <div className='home-site'>
        <h1 className='home-title'>E-WALLET</h1>
        <Top></Top>
        <CardStack></CardStack>
        <button
          className='btn-add-new-card'
          onClick={() => handleSendCardToStack()}
        >
          ADD A NEW CARD
        </button>
      </div>
    </>
  );
}

export default Home;
