import React, { createContext, useContext, useReducer } from 'react';
import { filterFirstInstance } from '../../util';

type TMovableContext = {
  movableItems: DOMRect[],
  addMovableItems: (items: DOMRect[]) => void,
  removeMovableItem: (item:DOMRect) => void,
}

type TMovableState = {
  movableItems: DOMRect[],
}

type TActionTypes = 'UPDATE' | 'ADD_ITEM' | 'REMOVE_ITEM';

type TMovableProviderProps = {
  children: React.ReactNode
}

const defaultContext: TMovableContext = {
  movableItems: [],
  addMovableItems: () => {},
  removeMovableItem: () => {},
} 

// Create the context
const MovableContext = createContext<TMovableContext>(defaultContext);

export const useMovable = () => {
  return useContext(MovableContext);
}

const initialState = {
  movableItems: [],
};

const reducer = (state: TMovableState, action: { type: TActionTypes; payload: TMovableState; }) => {
  const {type, payload} = action;

  switch (type) {
    case 'UPDATE':
      return { ...state, ...action.payload };
    case 'ADD_ITEM':
      return { ...state, movableItems: [...state.movableItems,...payload.movableItems]};
    case 'REMOVE_ITEM':
      return { ...state, movableItems: filterFirstInstance(state.movableItems,payload.movableItems[0])}
    default:
      return state;
  }
};

export const MovableProvider = ( {children}: TMovableProviderProps ) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addMovableItems(items: DOMRect[]) {
    dispatch({type: 'ADD_ITEM', payload: {movableItems: items}})
  }

  function removeMovableItem(item:DOMRect) {
    dispatch({type: 'REMOVE_ITEM', payload: {movableItems: [item]}})
  }

  return (
      <MovableContext.Provider value={{ 
        movableItems: state.movableItems,
        addMovableItems: addMovableItems,
        removeMovableItem: removeMovableItem,
      }}>
        {children}
      </MovableContext.Provider>
  );
}