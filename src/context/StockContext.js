import createDataContext from './createDataContext';
import server from '../api/mongo-server';

const reducer = (state, action) => {
  switch (action.type) {
    case 'get_ownedtickers':
      return action.payload;
    default:
      return state;
  }
};

const getOwnedTickers = dispatch => {
  return async () => {
    const tickers = await server.get('/fetchAllStocks');
    dispatch({type: 'get_ownedtickers', payload: tickers.data[0].tickers}); // 'data' array will always be just 1 long, as each user only has 1 group of tickers
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getOwnedTickers },
  []
);