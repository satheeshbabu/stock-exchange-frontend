import axios from 'axios';
import url from 'routes/url';
import { toast } from 'react-toastify';

export const EDIT_ITEM_REQUEST = 'EDIT_ITEM_REQUEST';
export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
export const EDIT_ITEM_FAILURE = 'EDIT_ITEM_FAILURE';

export const editItemAction = (itemType, itemContent, id) => (dispatch) => {
  dispatch({
    type: EDIT_ITEM_REQUEST,
  });
  return axios.put(`${url}/${itemType}/${id}`, {
    itemType,
    ...itemContent,
  })
    .then(({ data }) => {
      toast('Item has been edited successfully');
      dispatch({
        type: EDIT_ITEM_SUCCESS,
        itemType,
        data,
      });
    })
    .catch((error) => {
      toast(`An error occurred trying to edit the item\n${error}`);
      dispatch({
        type: EDIT_ITEM_FAILURE,
      });
    });
};
