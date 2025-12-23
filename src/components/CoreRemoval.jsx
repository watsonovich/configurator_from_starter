import * as THREE from "three";
import { Addition, Base, Geometry, Subtraction } from "@react-three/csg";
import AddStrokeChamber from "./AddStrokeChamber";
import { useCustomization } from "../contexts/Customization";

export default function CoreRemoval(props) {
  return <AssembledCoreGeometry tubeLength={props.tubeLength} />;
}

function AssembledCoreGeometry(props) {
  const { bore } = useCustomization();
  const { stroke } = useCustomization();

  const rad = bore / 1000 / 2;
  const chamberShift = 6;
  const chamberLength = (stroke + 5 + chamberShift) / 1000;
  console.log("AssembledCoreGeometry:", props);

  console.log("radius:", rad, "LEN", chamberLength);

  return (
    <Geometry>
      <Base>
        <cylinderGeometry
          args={[rad, rad, chamberLength, 32, 1]}
          // position-z={chamberShift / 2 / 1000}
        />
      </Base>
    </Geometry>
  );
}
