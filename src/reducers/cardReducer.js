import { createSlice } from '@reduxjs/toolkit';

function saveToLocalStorage(state) {
  localStorage.setItem('cardStack', JSON.stringify(state.cardStack));
}

function loadFromLocalStorage() {
  const storedState = localStorage.getItem('cardStack');
  return storedState ? JSON.parse(storedState) : [];
}

const initialState = {
  cardData: {},
  cardStack: loadFromLocalStorage(),
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCardData(state, action) {
      state.cardData = action.payload;
      saveToLocalStorage(state);
    },
    addCardToStack(state, action) {
      state.cardStack.push(action.payload);
      saveToLocalStorage(state);
    },
    swapCardStack(state, action) {
      // If there's an active card, add it back to the stack
      if (state.cardData && state.cardData.cardNumber) {
        state.cardStack = [...state.cardStack, state.cardData];
      }

      // Set the new active card
      state.cardData = action.payload;

      // Remove the new active card from the stack
      state.cardStack = state.cardStack.filter(
        (card) => card.cardNumber !== action.payload.cardNumber
      );
      saveToLocalStorage(state);
    },
    // check if there if there's an active card to send back from top.jsx to cardstack.jsx, and clears cardData
    cardSendBackToStack(state) {
      if (state.cardData && state.cardData.cardNumber) {
        const existsInCardstack = state.cardStack.some(
          (card) => card.cardNumber === state.cardData.cardNumber
        );
        if (!existsInCardstack) {
          state.cardStack = [...state.cardStack, state.cardData];
        }
        state.cardData = {};
      }
      saveToLocalStorage(state);
    },

    // delete the card thats inside of top.jsx
    deleteCard(state, action) {
      state.cardStack = state.cardStack.filter(
        (card) => card.cardNumber !== action.payload.cardNumber
      );
      if (state.cardData.cardNumber === action.payload.cardNumber) {
        state.cardData = {};
      }
      saveToLocalStorage(state);
    },
  },
});

export const {
  setCardData,
  addCardToStack,
  swapCardStack,
  cardSendBackToStack,
  deleteCard,
} = cardSlice.actions;
export default cardSlice.reducer;
