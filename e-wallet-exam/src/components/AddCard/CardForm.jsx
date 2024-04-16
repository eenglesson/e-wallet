import React, { useState } from 'react';
import './CardForm.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCardToStack,
  setCardData,
  cardSendBackToStack,
} from '../../reducers/cardReducer';

function CardForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cardStack = useSelector((state) => state.card.cardStack);

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolderName: '',
    validThru: '',
    ccv: '',
    vendor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardHolderName' && value.length > 24) {
      return;
    }

    if (name === 'cardNumber' && value.length > 19) {
      return;
    }
    if (name === 'validThru' && value.length > 7) {
      return;
    }

    if (name === 'ccv' && value.length > 3) {
      return;
    }

    const updatedCardInfo = { ...cardInfo, [name]: value };
    setCardInfo(updatedCardInfo);
    dispatch(setCardData(updatedCardInfo));
  };

  function handleGoBack() {
    dispatch(setCardData({}));
    navigate('/');
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (cardStack.length >= 4) {
      alert('You cannot have more than 4 concurrent cards');
      return;
    }

    if (
      !cardInfo.cardNumber ||
      cardInfo.cardNumber.replace(/\s/g, '').length !== 16
    ) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }
    if (!cardInfo.cardHolderName.trim()) {
      alert("Please enter the cardholder's name.");
      return;
    }
    if (!cardInfo.validThru || cardInfo.validThru.length !== 7) {
      alert('Please enter a valid expiration date in the format MM / YY.');
      return;
    }
    if (!cardInfo.ccv || cardInfo.ccv.length !== 3) {
      alert('Please enter a valid 3-digit CCV.');
      return;
    }
    if (!cardInfo.vendor) {
      alert('Please select a vendor.');
      return;
    }

    dispatch(addCardToStack(cardInfo));
    dispatch(cardSendBackToStack());
    navigate('/');
    console.log(cardInfo);
  }

  return (
    <>
      <section>
        <form className='form-container' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>CARD NUMBER</label>
            <input
              name='cardNumber'
              value={cardInfo.cardNumber}
              onChange={handleChange}
              className='card-input-large'
              type='text'
              placeholder='XXXX XXXX XXXX XXXX'
            />
          </div>
          <div className='form-group'>
            <label>CARDHOLDER NAME</label>
            <input
              name='cardHolderName'
              value={cardInfo.cardHolderName}
              onChange={handleChange}
              className='card-input-large'
              type='text'
              placeholder='FIRSTNAME LASTNAME'
            />
          </div>
          <div className='form-group-row'>
            <aside>
              <label>VALID THRU</label>
              <input
                name='validThru'
                value={cardInfo.validThru}
                onChange={handleChange}
                className='card-input-small'
                type='text'
                placeholder='XX / XX'
              />
            </aside>
            <aside>
              <label>CCV</label>
              <input
                name='ccv'
                value={cardInfo.ccv}
                onChange={handleChange}
                className='card-input-small'
                type='text'
                placeholder='XXX'
              />
            </aside>
          </div>
          <div className='form-group'>
            <label>VENDOR</label>
            <select
              name='vendor'
              value={cardInfo.vendor}
              onChange={handleChange}
              className='select-text-arrow'
            >
              <option value='' disabled>
                --Select Vendor--
              </option>
              <option name='Bitcoin' value='Bitcoin'>
                BITCOIN INC
              </option>
              <option name='Ninja' value='Ninja'>
                NINJA BANK
              </option>
              <option name='BlockChain' value='BlockChain'>
                BLOCK CHAIN INC
              </option>
              <option name='EvilCorp' value='EvilCorp'>
                EVIL CORP
              </option>
            </select>
          </div>
          <button className='btn-submit'>ADD CARD</button>
        </form>
        <button className='btn-back' onClick={() => handleGoBack()}>
          GO BACK
        </button>
      </section>
    </>
  );
}

export default CardForm;
