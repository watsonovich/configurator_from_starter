import * as THREE from "three";
import { useCustomization } from "../contexts/Customization";
import { Subtraction } from "@react-three/csg";

export default function StrokeChamber() {
  const { bore } = useCustomization();
  const { stroke } = useCustomization();

  const rad = bore / 1000 / 2;
  const cutterShift = 2;
  const length = (stroke + 5 + cutterShift) / 1000;

  return (
    <Subtraction
      showOperation={false}
      rotation-x={Math.PI / 2}
      position-z={cutterShift / 2 / 1000}
    >
      <cylinderGeometry args={[rad, rad, length, 32, 1]} />
      <meshStandardMaterial
        color="goldenrod"
        side={THREE.DoubleSide}
        metalness={0.65}
        roughness={0.2}
      />
    </Subtraction>
  );
}
