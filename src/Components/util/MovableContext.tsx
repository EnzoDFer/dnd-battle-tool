import React, { createContext, useContext, useReducer } from 'react';

type TMovableContext = {
  movableItems: DOMRect[],
  addMovableItems: (items: DOMRect[]) => void,
}

type TMovableState = {
  movableItems: DOMRect[],
}

type TActionTypes = 'UPDATE' | 'ADD_ITEM';

type TMovableProviderProps = {
  children: React.ReactNode
}

const defaultContext: TMovableContext = {
  movableItems: [],
  addMovableItems: () => {},
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
      default:
        return state;
  }
};

export const MovableProvider = ( {children}: TMovableProviderProps ) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    function addMovableItems(items: DOMRect[]) {
      dispatch({type: 'ADD_ITEM', payload: {movableItems: items}})
    }

    return (
        <MovableContext.Provider value={{ 
          movableItems: state.movableItems,
          addMovableItems: addMovableItems,
        }}>
          {children}
        </MovableContext.Provider>
    );
}