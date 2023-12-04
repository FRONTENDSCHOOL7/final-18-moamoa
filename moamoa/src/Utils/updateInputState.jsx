export const updateInputState = (e, setTargetData, key) => {
  const { name, value } = e.target;
  setTargetData((prevState) => ({
    ...prevState,
    [key]: {
      ...prevState[key],
      [name]: value,
    },
  }));
};
