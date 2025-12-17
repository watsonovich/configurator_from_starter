import * as THREE from "three";
import { useCustomization } from "../contexts/Customization";
import { Subtraction } from "@react-three/csg";

export default function RodCore(props) {
  const { bore } = useCustomization();
  const { stroke } = useCustomization();

  const rad = (bore + 2) / 1000 / 2;
  const chamberLength = (stroke + 5) / 1000;
  const halfChamber = chamberLength / 2;
  const halfTube = props.tubeLength / 1000 / 2;
  const halfZero = halfTube - halfChamber;
  const length = halfZero + 0.01;
  const coreShift = halfTube + length / 2 - halfZero;

  return (
    <Subtraction
      showOperation={false}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, coreShift]}
    >
      <cylinderGeometry args={[rad, rad, length, 32, 1]} />
    </Subtraction>
  );
}
