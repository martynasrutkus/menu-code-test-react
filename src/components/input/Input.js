import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label,
  value,
  onChange,
  canRemove = false,
  onRemove,
}) => (
  <div className="input">
    <div>
      {label && (
        <span>{label}</span>
      )}
      <input value={value} onChange={onChange} />
    </div>
    {canRemove && (
      <span onClick={onRemove}>Remove Guest</span>
    )}
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  canRemove: PropTypes.bool,
  onRemove: PropTypes.func,
};

const areEqual = (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.canRemove === nextProps.canRemove;

export default React.memo(Input, areEqual);
