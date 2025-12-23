import * as THREE from "three";
import { useCustomization } from "../contexts/Customization";
import { Subtraction } from "@react-three/csg";

export default function RodCore(props) {
  const { bore } = useCustomization();
  const { stroke } = useCustomization();

  let usableBore;
  bore == "06"
    ? (usableBore = 6)
    : bore == "04"
    ? (usableBore = 4)
    : (usableBore = bore);

  const rad = (usableBore + 1) / 1000 / 2;
  const chamberLength = (stroke + 5) / 1000;
  const halfChamber = chamberLength / 2;
  const halfTube = props.tubeLength / 1000 / 2;
  const halfZero = halfTube - halfChamber;
  const length = halfZero + 0.01;
  const coreShift = halfTube + length / 2 - halfZero;

  console.log(props.tubeLength);

  console.log("1/2 zero:", halfZero);

  return (
    <Subtraction
      showOperation={false}
      rotation-x={Math.PI / 2}
      position-z={coreShift}
      material={props.material}
    >
      <cylinderGeometry args={[rad, rad, length, 64, 1]} />
    </Subtraction>
  );
}
