import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { MenuContext } from '../../../context/MenuContext';
import { stepKeys, builderTitles, builderText } from '../../../common/constants';

import './layout.scss';

const Layout = ({ children }) => {
  const {
    diners,
    currentStep,
    total,
    nextStepDisabled,
    nextStep,
    prevStep,
    reset,
  } = useContext(MenuContext);
  const buttons = useMemo(() => {
    if (currentStep === stepKeys.diners) {
      return (
        <div className="layout__buttons layout__buttons--diners">
          <button onClick={nextStep} type="button" disabled={nextStepDisabled}>Next Step</button>
        </div>
      );
    }
    if (currentStep === stepKeys.success) {
      return (
        <div className="layout__buttons">
          <button onClick={reset} type="button">Create New Order</button>
        </div>
      );
    }
    return (
      <div className="layout__buttons">
        <button onClick={prevStep} type="button">Previous Step</button>
        <span>
          Total - &euro;
          {total}
        </span>
        <button onClick={nextStep} type="button" disabled={nextStepDisabled}>Next Step</button>
      </div>
    );
  }, [currentStep, nextStepDisabled, total]);

  const diner = useMemo(() => {
    if (currentStep === stepKeys.diners || currentStep === stepKeys.success) {
      return undefined;
    }
    return diners.find((d) => d.id === currentStep);
  }, [currentStep]);

  return (
    <div className="layout">
      <div className="layout--title">{builderTitles[currentStep] || builderTitles.meals(diner.name)}</div>
      <p>{builderText[currentStep] || builderText.meals}</p>
      {children}
      {buttons}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
