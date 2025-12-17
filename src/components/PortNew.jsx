import * as THREE from "three";
import { useCustomization } from "../contexts/Customization";
import { Addition, Base, Geometry, Subtraction } from "@react-three/csg";

export default function PortNew(props) {
  const { bore, setBore } = useCustomization();
  const { stroke, setStroke } = useCustomization();

  const rad = bore / 1000 / 2;
  const cutterShift = 2;
  const length = (stroke + 5 + cutterShift) / 1000;

  return (
    <Subtraction
      showOperation={false}
      // rotation-x={Math.PI / 2}
      // position-z={cutterShift / 2 / 1000}
      position-y={props.locationRef / 1000}
    >
      <PortConstruction />
    </Subtraction>
  );
}

function PortConstruction(props) {
  const chamStartRad = 6.1104 / 1000;
  const chamEndRad = 5.064 / 1000;
  const chamLength = 1.0464 / 1000;

  const threadStartRad = 5.0872 / 1000;
  const threadEndRad = 4.8 / 1000;
  const threadLength = 6.5 / 1000;
  const threadShift = threadLength / 2;

  const chamGeo = new THREE.CylinderGeometry(
    chamStartRad,
    chamEndRad,
    chamLength,
    32,
    1
  );
  const threadGeo = new THREE.CylinderGeometry(
    threadStartRad,
    threadEndRad,
    threadLength,
    32,
    1
  );

  return (
    <Geometry>
      <Base geometry={chamGeo} />
      <Addition geometry={threadGeo} position-y={-threadShift} />
    </Geometry>
  );
}
