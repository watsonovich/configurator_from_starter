import * as THREE from "three";
import { useCustomization } from "../contexts/Customization";
import { Subtraction } from "@react-three/csg";

export default function RodCoreGroove(props) {
  const { bore } = useCustomization();
  const { stroke } = useCustomization();

  const rad = (bore + 3) / 1000 / 2;
  const chamberLength = (stroke + 5) / 1000;
  const halfChamber = chamberLength / 2;
  const halfTube = props.tubeLength / 1000 / 2;
  const halfZero = halfTube - halfChamber;
  const length = 0.001;
  const coreShift = halfTube + length / 2 - halfZero + 0.0025;

  return (
    <Subtraction
      showOperation={false}
      rotation-x={Math.PI / 2}
      position-z={coreShift}
    >
      <cylinderGeometry args={[rad, rad, length, 32, 1]} />
    </Subtraction>
  );
}
