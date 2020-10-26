import React, { useContext, useMemo } from 'react';

import Input from '../../input/Input';

import { MenuContext } from '../../../context/MenuContext';

import './diners.scss';
import '../../input/input.scss';

const Diners = () => {
  const {
    diners,
    changeDinerName,
    addDiner,
    removeDiner,
  } = useContext(MenuContext);

  const canRemove = useMemo(() => diners.length > 2, [diners.length]);

  const handleChange = (id) => (e) => {
    changeDinerName(id, e.target.value);
  };

  const handleRemoveDiner = (id) => () => removeDiner(id);

  return (
    <div className="diners">
      {diners.map((diner, index) => (
        <Input
          label={`Guest ${index + 1}`}
          value={diner.name}
          onChange={handleChange(diner.id)}
          canRemove={canRemove}
          onRemove={handleRemoveDiner(diner.id)}
          key={diner.id}
        />
      ))}
      <button className="diners--add" onClick={addDiner} type="button">Add Guest</button>
    </div>
  );
};

export default React.memo(Diners);
