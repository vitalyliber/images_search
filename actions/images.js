export const GET_IMAGES = 'GET_IMAGES';
export const GET_IMAGES_SUCCESS = 'GET_IMAGES_SUCCESS';
export const GET_IMAGES_ERROR = 'GET_IMAGES_ERROR';

export const getImages = text => (dispatch) => {
  dispatch({ type: GET_IMAGES, keyword: text });

  if (text === '') return dispatch({ type: GET_IMAGES_SUCCESS, images: [] });

  const api = 'https://www.googleapis.com/customsearch/v1';
  const apiKey = 'AIzaSyBfbE3BYorntrWd09zLotWyWKscGoVefvE';
  const cx = '005260898830607475686:xivoakm5jvs';

  const search = `${api}?key=${apiKey}&cx=${cx}&searchType=image&fileType=jpg,png&q=${text}`;

  const params = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };

  return fetch(search, params)
    .then((res) => { return res.json(); })
    .then((result) => {
      const images = result.items ? result.items : [];
      dispatch({ type: GET_IMAGES_SUCCESS, images });
    })
    .catch((err) => {
      dispatch({ type: GET_IMAGES_ERROR, error: err });
    });
};
