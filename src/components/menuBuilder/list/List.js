import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Meal from '../meal/Meal';

import menuData from '../../../../menu-data.json';

const List = ({
  type,
  label,
  onItemClick,
  ...rest
}) => {
  const meals = useMemo(() => menuData[type], [type]);

  return (
    <div className="list">
      <div className="list--type">{label}</div>
      <div className="list__meals">
        {meals.map((meal) => (
          <Meal
            meal={meal}
            onClick={onItemClick(meal)}
            {...rest}
            key={meal.id}
          />
        ))}
      </div>
    </div>
  );
};

List.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  excluded: PropTypes.arrayOf(PropTypes.number),
  onItemClick: PropTypes.func,
  getUsedCount: PropTypes.func,
};

export default React.memo(List);
