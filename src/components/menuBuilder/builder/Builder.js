import React, { useContext, useMemo } from 'react';

import List from '../list/List';

import { MenuContext } from '../../../context/MenuContext';
import { categoryKeys, categoryLabels } from '../../../common/constants';

import './builder.scss';
import '../list/list.scss';
import '../meal/meal.scss';

const Builder = () => {
  const {
    diners,
    currentStep,
    onMenuItemClick,
    getUsedCount,
  } = useContext(MenuContext);

  const diner = useMemo(() => diners.find((d) => d.id === currentStep), [currentStep]);

  const handleMenuItemClick = (type) => (item) => () => {
    onMenuItemClick(diner.id, item, type);
  };

  return (
    <div className="builder">
      <List
        type={categoryKeys.starters}
        label={categoryLabels.starters}
        selected={diner.selectedMeals}
        excluded={diner.excludedMeals}
        onItemClick={handleMenuItemClick(categoryKeys.starters)}
        getUsedCount={getUsedCount}
      />
      <List
        type={categoryKeys.mains}
        label={categoryLabels.mains}
        selected={diner.selectedMeals}
        excluded={diner.excludedMeals}
        onItemClick={handleMenuItemClick(categoryKeys.mains)}
        getUsedCount={getUsedCount}
      />
      <List
        type={categoryKeys.desserts}
        label={categoryLabels.desserts}
        selected={diner.selectedMeals}
        excluded={diner.excludedMeals}
        onItemClick={handleMenuItemClick(categoryKeys.desserts)}
        getUsedCount={getUsedCount}
      />
    </div>
  );
};

export default Builder;
