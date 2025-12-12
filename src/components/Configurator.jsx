import { useCustomization } from "../contexts/Customization";

const boreSizes = ["04", "06", 10, 12, 16, 20, 25, 32, 40, 50, 63, 80, 100]; // excludes 125, 140, 160, 180, 200 for now
const strokes = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100, 125, 150, 175, 200, 250, 300,
];

const boreOptions = boreSizes.map((size) => ({
  label: `${size} mm`,
  value: size,
}));

const strokeOptions = strokes.map((size) => ({
  label: `${size} mm`,
  value: size,
}));

// console.log(boreOptions);

const Configurator = () => {
  const { magnet, setMagnet } = useCustomization();
  const { bore, setBore } = useCustomization();
  const { stroke, setStroke } = useCustomization();

  return (
    <div className="configurator">
      <div className="configurator__section">
        <div className="configurator__section__title">Switch Magnet</div>
        <div className="configurator__section__options">
          <div
            className={`option__item ${magnet ? "item--active" : ""}`}
            onClick={() => setMagnet(true)}
          >
            <div className="option__item__label">With Magnet</div>
          </div>
          <div
            className={`option__item ${!magnet ? "item--active" : ""}`}
            onClick={() => setMagnet(false)}
          >
            <div className="option__item__label">Without Magnet</div>
          </div>
        </div>
      </div>

      <div className="configurator__section">
        <div className="configurator__section__title">Bore</div>
        <div className="configurator__section__options">
          {boreOptions.map((option, index) => (
            <div
              key={index}
              className={`option__item ${
                bore === option.value ? "item--active" : ""
              }`}
              onClick={() => setBore(option.value)}
            >
              <div className="option__item__label">{option.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="configurator__section">
        <div className="configurator__section__title">Stroke</div>
        <div className="configurator__section__options">
          {strokeOptions.map((option, index) => (
            <div
              key={index}
              className={`option__item ${
                stroke === option.value ? "item--active" : ""
              }`}
              onClick={() => setStroke(option.value)}
            >
              <div className="option__item__label">{option.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Configurator;
