import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectSelectedItem } from './selectors';
import { Modal } from '@material-ui/core';
import { setSelected } from './actions';

import ItemPage from './ItemPage';

const ItemModal = () => {
  const selected = useSelector(selectSelectedItem);
  const dispatch = useDispatch();
  if (!selected) {
    return null;
  }

  return (
    <Modal
      open={!!selected}
      onClose={() => dispatch(setSelected(null))}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div>
        <ItemPage id={selected.id} />
      </div>
    </Modal>
  );
};

export default ItemModal;
