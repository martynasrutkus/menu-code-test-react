import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const Meal = ({
  meal,
  selected,
  excluded,
  onClick,
  getUsedCount,
}) => {
  const disabled = useMemo(() => {
    let d = excluded.includes(meal.id);
    if (meal.count) {
      d = d || getUsedCount(meal.id) >= meal.count;
    }
    return d;
  }, [excluded.length]);
  const isSelected = useMemo(() => !!selected
    .find((item) => item.id === meal.id), [selected.length]);

  const handleErrorMessage = () => {
    if (meal.count && getUsedCount(meal.id) >= meal.count) {
      alert(`${meal.name} is out of stock`);
    } else {
      alert('Meal combination is not allowed');
    }
  };

  const handleClick = () => {
    if (!disabled || isSelected) {
      onClick();
    } else {
      handleErrorMessage();
    }
  };

  const className = useMemo(() => {
    if (isSelected) {
      return 'meal meal--selected';
    }
    if (disabled) {
      return 'meal meal--disabled';
    }
    return 'meal';
  }, [disabled, isSelected]);

  return (
    <div className={className} onClick={handleClick}>
      <span className="meal--name">{meal.name}</span>
      <span>
        Price - &euro;
        {meal.price}
      </span>
    </div>
  );
};

Meal.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    excluded: PropTypes.arrayOf(PropTypes.number),
    count: PropTypes.number,
  }),
  selected: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  excluded: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
  getUsedCount: PropTypes.func,
};

export default React.memo(Meal);
