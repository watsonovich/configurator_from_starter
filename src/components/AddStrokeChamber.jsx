import * as THREE from "three";
import { useCustomization } from "../contexts/Customization";
import { Base, Geometry } from "@react-three/csg";

export default function AddStrokeChamber(props) {
  const { bore } = useCustomization();
  const { stroke } = useCustomization();

  const rad = bore / 1000 / 2;
  const cutterShift = 2;
  const length = (stroke + 5 + cutterShift) / 1000;

  return (
    <Base position-z={cutterShift / 2 / 1000}>
      <cylinderGeometry args={[rad, rad, length, 32, 1]} />
    </Base>
  );
}
