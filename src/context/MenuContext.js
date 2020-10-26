import React, {
  createContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import menuData from '../../menu-data.json';
import { categoryKeys, stepKeys } from '../common/constants';

const initialDinerState = {
  name: '',
  selectedMeals: [],
  excludedMeals: [],
  isValid: false,
};
const initialDinersState = [
  {
    id: `diner-${v4()}`,
    ...initialDinerState,
  },
  {
    id: `diner-${v4()}`,
    ...initialDinerState,
  },
];

const getInitialDinersState = () => initialDinersState.map((diner) => ({
  ...diner,
  selectedMeals: [...diner.selectedMeals],
  excludedMeals: [...diner.excludedMeals],
}));

export const MenuContext = createContext({
  diners: [],
  total: 0,
  currentStep: stepKeys.diners,
  nextStepDisabled: true,
  checkNameValidity: () => {},
  changeDinerName: () => {},
  addDiner: () => {},
  removeDiner: () => {},
  onMenuItemClick: () => {},
  getUsedCount: () => {},
  nextStep: () => {},
  prevStep: () => {},
  reset: () => {},
});

const MenuContextProvider = ({ children }) => {
  const [diners, setDiners] = useState(getInitialDinersState());
  const [total, setTotal] = useState(0);
  const [currentStep, setCurrentStep] = useState(stepKeys.diners);
  const [currentDinerIndex, setCurrentDinerIndex] = useState(-1);
  const [nextStepDisabled, setNextStepDisabled] = useState(true);

  const calculateTotal = (argDiners) => {
    setTotal(argDiners
      .reduce((sum, diner) => sum + diner.selectedMeals.reduce((accumulator, selectedMeal) => {
        const { id, type } = selectedMeal;
        const meals = menuData[type];
        const mealPrice = meals.find((meal) => meal.id === id)?.price || 0;
        return accumulator + mealPrice;
      }, 0), 0));
  };

  const checkNameValidity = (id, name) => {
    for (let i = 0; i < diners.length; i += 1) {
      if ((diners[i].id === id && !name) || (diners[i].id !== id && !diners[i].name)) {
        return false;
      }
    }
    return true;
  };

  const changeDinerName = (id, name) => {
    const diner = diners.find((d) => d.id === id);
    if (diner) {
      diner.name = name;
    }
    setDiners([...diners]);
    setNextStepDisabled(!checkNameValidity(id, name));
  };

  const addDiner = () => {
    setDiners([...diners, { ...initialDinerState, id: `diner-${v4()}` }]);
  };

  const removeDiner = (id) => {
    const index = diners.findIndex((diner) => diner.id === id);
    if (index !== -1) {
      diners.splice(index, 1);
      setDiners([...diners]);
    }
  };

  const onMenuItemClick = (id, menuItem, type) => {
    const diner = diners.find((d) => d.id === id);
    if (diner) {
      const mealIndex = diner.selectedMeals.findIndex((meal) => meal.id === menuItem.id);
      const { exclude = [] } = menuItem;
      if (mealIndex === -1) {
        diner.selectedMeals.push({ id: menuItem.id, type });
        diner.excludedMeals = [...diner.excludedMeals, ...exclude];
      } else {
        diner.selectedMeals.splice(mealIndex, 1);
        exclude.forEach((excludedId) => {
          const index = diner.excludedMeals.findIndex((excluded) => excluded === excludedId);
          if (index !== -1) {
            diner.excludedMeals.splice(index, 1);
          }
        });
      }
      diner.isValid = diner.selectedMeals.length > 1
        && !!diner.selectedMeals.find((meal) => meal.type === categoryKeys.mains);
      calculateTotal(diners);
      setNextStepDisabled(!diner.isValid);
      setDiners([...diners]);
    }
  };

  const getUsedCount = (mealId) => diners
    .reduce((sum, diner) => sum + diner.selectedMeals.reduce((accumulator, selectedMeal) => {
      if (selectedMeal.id === mealId) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0), 0);

  const nextStep = () => {
    if (currentStep === stepKeys.diners) {
      setCurrentStep(diners[0].id);
      setCurrentDinerIndex(0);
      setNextStepDisabled(!diners[0].isValid);
    } else if (currentDinerIndex + 1 === diners.length) {
      setCurrentStep(stepKeys.success);
      alert('Order placed successfully');
    } else {
      setCurrentStep(diners[currentDinerIndex + 1].id);
      setCurrentDinerIndex(currentDinerIndex + 1);
      setNextStepDisabled(!diners[currentDinerIndex + 1].isValid);
    }
  };

  const prevStep = () => {
    if (currentDinerIndex === 0) {
      setCurrentStep('diners');
      setCurrentDinerIndex(-1);
      setNextStepDisabled(!checkNameValidity());
    } else {
      setCurrentStep(diners[currentDinerIndex - 1].id);
      setCurrentDinerIndex(currentDinerIndex - 1);
      setNextStepDisabled(!diners[currentDinerIndex - 1].isValid);
    }
  };

  const reset = () => {
    setDiners(getInitialDinersState());
    setCurrentStep('diners');
    setCurrentDinerIndex(-1);
    setNextStepDisabled(false);
  };

  return (
    <MenuContext.Provider
      value={{
        diners,
        total,
        currentStep,
        nextStepDisabled,
        checkNameValidity,
        changeDinerName,
        addDiner,
        removeDiner,
        onMenuItemClick,
        getUsedCount,
        nextStep,
        prevStep,
        reset,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

MenuContextProvider.propTypes = {
  children: PropTypes.element,
};

export default MenuContextProvider;
