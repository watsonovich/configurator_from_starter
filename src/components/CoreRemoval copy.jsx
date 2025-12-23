import * as THREE from "three";
import { Addition, Base, Geometry, Subtraction } from "@react-three/csg";

export default function CoreRemoval(props) {
  const style1 = (
    <Subtraction rotation={[Math.PI / 2, 0, 0]} showOperation={false}>
      <RodStrokeChamber
        bore={props.bore}
        stroke={props.stroke}
        rodDia={props.rodDia}
        tubeLength={props.tubeLength}
      />
    </Subtraction>
  );

  const style2 = (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <RodStrokeChamber
        bore={props.bore}
        stroke={props.stroke}
        rodDia={props.rodDia}
        tubeLength={props.tubeLength}
      />
    </group>
  );

  return style1;
}

function RodStrokeChamber(props) {
  const bore = props.bore / 1000;
  const chamberLength = (props.stroke + 5) / 1000;
  const rodDiameter = props.rodDia / 1000;
  const tubeLength = props.tubeLength / 1000;
  const halfTube = tubeLength / 2;
  const halfChamber = chamberLength / 2;

  const chamberGeo = new THREE.CylinderGeometry(
    bore / 2,
    bore / 2,
    chamberLength,
    24,
    1
  );
  const rodPassageGeo = new THREE.CylinderGeometry(
    rodDiameter / 2,
    rodDiameter / 2,
    tubeLength / 2, // + 0.0005,
    24,
    1
  );

  // const coreDepth = 0.007;
  // const coreShift = tubeLength / 2 - (coreDepth - 0.001) / 2;

  const halfZero = halfTube - halfChamber;
  const coreDepth = halfZero + 0.01;
  const coreShift = halfTube + coreDepth / 2 - halfZero;
  const coreRadius = (bore + 0.002) / 2;

  const coreDiameterGeo = new THREE.CylinderGeometry(
    coreRadius,
    coreRadius,
    coreDepth,
    48,
    1
  );

  const coreRetainerGeo = new THREE.CylinderGeometry(
    coreRadius + 0.001,
    coreRadius + 0.001,
    0.001,
    48,
    1
  );

  console.log(
    "RodStrokeChamber using:",
    bore,
    chamberLength,
    rodDiameter,
    tubeLength
  );

  const visualMat = new THREE.MeshStandardMaterial({ color: "dodgerBlue" });

  return (
    <Geometry>
      <Base geometry={chamberGeo} />
      {/* <Addition geometry={rodPassageGeo} position={[0, tubeLength / 4, 0]} /> */}
      {/* <Addition geometry={coreDiameterGeo} position={[0, coreShift, 0]} /> */}
      {/* <Addition
        geometry={coreRetainerGeo}
        position={[0, tubeLength / 2 - coreDepth + 0.002, 0]}
      /> */}
    </Geometry>
    // <group>
    //   <mesh geometry={chamberGeo} material={visualMat} />
    //   <mesh
    //     geometry={rodPassageGeo}
    //     position={[0, tubeLength / 4, 0]}
    //     material={visualMat}
    //   />
    //   <mesh
    //     geometry={coreDiameterGeo}
    //     position={[0, coreShift, 0]}
    //     material={visualMat}
    //   />
    //   <mesh
    //     geometry={coreRetainerGeo}
    //     position={[0, tubeLength / 2 - coreDepth + 0.001, 0]}
    //     material={visualMat}
    //   />
    // </group>
  );
}
