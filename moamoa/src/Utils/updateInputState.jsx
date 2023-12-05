import _ from 'lodash';

export const updateInputState = (e, setTargetData, key) => {
  const { name, value } = e.target;
  setTargetData((prevState) => _.set({ ...prevState }, `${key}.${name}`, value));
};
