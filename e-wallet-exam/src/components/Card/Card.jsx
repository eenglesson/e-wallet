import { useSelector } from 'react-redux';
import { cardVendorStyle, defaultStyle } from '../cardVendorStyle';
import './Card.css';

function Card({ handleCardClick, cardData: cardDataProps, className }) {
  const cardDataFromRedux = useSelector((state) => state.card.cardData);
  const cardData = cardDataProps || cardDataFromRedux;

  const { cardColor, cardEmblem, textColor, cardChip } =
    cardVendorStyle[cardData.vendor] ?? defaultStyle;

  return (
    <>
      <section
        className={`card-container ${className}`}
        onClick={() => handleCardClick()}
        style={{ backgroundColor: cardColor, color: textColor }}
      >
        <aside className='card-container__emblems'>
          {cardChip}
          {cardEmblem}
        </aside>
        <span className='card-number'>
          {cardData.cardNumber ? cardData.cardNumber : 'XXXX XXXX XXXX XXXX'}
        </span>
        <div className='card-info-container'>
          <aside className='card-name-container'>
            <p style={{ color: textColor }}>CARDHOLDER NAME</p>
            <h2>
              {cardData.cardHolderName
                ? cardData.cardHolderName
                : 'Firstname Lastname'}
            </h2>
          </aside>
          <aside className='card-date-container'>
            <p style={{ color: textColor }}>VALID THRU</p>
            <span>{cardData.validThru ? cardData.validThru : 'XX/XX'}</span>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Card;
