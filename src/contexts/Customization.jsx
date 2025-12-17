import { useContext, createContext, useState } from "react";

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [magnet, setMagnet] = useState(false);
  const [bore, setBore] = useState(32);
  const [stroke, setStroke] = useState(40);

  return (
    <CustomizationContext.Provider
      value={{ bore, setBore, magnet, setMagnet, stroke, setStroke }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
};
