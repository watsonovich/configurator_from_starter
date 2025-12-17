import * as THREE from "three";
import { useCustomization } from "../contexts/Customization";
import { Subtraction } from "@react-three/csg";

export default function StrokeChamber() {
  const { bore, setBore } = useCustomization();
  const { stroke, setStroke } = useCustomization();

  const rad = bore / 1000 / 2;
  const length = (stroke + 5) / 1000;

  return (
    <Subtraction rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[rad, rad, length, 32, 1]} />
    </Subtraction>
  );
}
