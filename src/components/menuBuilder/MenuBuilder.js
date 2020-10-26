import React, { useContext, useMemo } from 'react';

import Layout from './layout/Layout';
import Diners from './diners/Diners';
import Builder from './builder/Builder';

import { MenuContext } from '../../context/MenuContext';

const MenuBuilder = () => {
  const { currentStep } = useContext(MenuContext);

  const component = useMemo(() => {
    if (currentStep === 'diners') {
      return <Diners />;
    }
    if (currentStep === 'success') {
      return undefined;
    }
    return (
      <Builder />
    );
  }, [currentStep]);

  return (
    <Layout>
      {component}
    </Layout>
  );
};

export default React.memo(MenuBuilder);
