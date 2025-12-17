/* eslint-disable no-unused-vars */

import * as THREE from "three";
import { Tube } from "./Tube";
import { useCustomization } from "../contexts/Customization";
import { tubeDimsCQ2 } from "../data/dims";
import { Port } from "./Port";
import { PortCutter } from "./PortCutter";
import { Base, Geometry, Subtraction } from "@react-three/csg";
import { useRef } from "react";
import CoreRemoval from "./CoreRemoval";
import StrokeChamber from "./StrokeChamber";
import RodCore from "./RodCore";

const Experience = () => {
  const csg = useRef();
  const { magnet, setMagnet } = useCustomization();
  const { bore, setBore } = useCustomization();
  const { stroke, setStroke } = useCustomization();

  const selection = tubeDimsCQ2.bores[bore];
  console.log(selection);

  const basicLength = selection.basicLength;
  const basicLengthMod = selection.basicLengthMod;
  const rodPortDistance = selection.rodPortDistance;
  const rodPortDistanceMod = selection.rodPortDistanceMod;
  const headPortDistance = selection.headPortDistance;
  const headPortDistanceMod = selection.headPortDistanceMod;
  const portSurfaceDistance = selection.portSurfaceDistance;
  const portAngle = selection.portAngle;
  const portAngleMod = selection.portAngleMod;
  let portSize = selection.portSize;
  const portSizeMod = selection.portSizeMod;
  const rodDiameter = selection.rodDiameter;

  let profileModifier = "";
  let tubeLength = basicLength + stroke;
  let rodPort = "";
  let headPort = "";
  let rodPortAngle = 0;

  let headPortAngle = 0;

  // profile modifier logic
  if (bore >= 12 && bore <= 25) {
    magnet ? (profileModifier = "Z") : (profileModifier = "");
    rodPortAngle = magnet ? portAngleMod : portAngle;
    headPortAngle = rodPortAngle;
  }

  // tube length logic
  if (magnet || stroke > 50) {
    console.log("modify tube length");

    tubeLength += basicLengthMod;
  }

  // rod port position logic
  if (bore == 12 || bore == 16) {
    magnet
      ? (rodPort = [
          0,
          portSurfaceDistance / 1000,
          (tubeLength / 2 - (rodPortDistance + rodPortDistanceMod)) / 1000,
        ])
      : (rodPort = [
          0,
          portSurfaceDistance / 1000,
          (tubeLength / 2 - rodPortDistance) / 1000,
        ]);
  } else {
    rodPort = [
      0,
      portSurfaceDistance / 1000,
      (tubeLength / 2 - rodPortDistance) / 1000,
    ];
  }

  // head port position logic
  if (bore == 12 && magnet) {
    // console.log("modify head port for 12  + magnet");
    headPort = [
      0,
      portSurfaceDistance / 1000,
      (-(tubeLength / 2) + headPortDistance + headPortDistanceMod) / 1000,
    ];
  } else if (bore == 32 && stroke == 5 && !magnet) {
    // console.log("modify head port for 32 5");
    headPort = [
      0,
      portSurfaceDistance / 1000,
      (-(tubeLength / 2) + headPortDistance + headPortDistanceMod) / 1000,
    ];
  } else {
    headPort = [
      0,
      portSurfaceDistance / 1000,
      (-(tubeLength / 2) + headPortDistance) / 1000,
    ];
  }

  // port size change logic
  if (bore == 32 && stroke == 5 && !magnet) {
    portSize = portSizeMod;
  }

  const profile = bore + profileModifier;

  console.log(
    "BORE",
    bore,
    // "PROFILE",
    // profile,
    "STROKE",
    stroke,
    "TUBE LENGTH",
    tubeLength,
    // "BLen",
    // basicLength,
    // "BLenMod",
    // basicLengthMod,
    // "HALF TUBE",
    // tubeLength / 2,
    "ROD PORT",
    tubeLength / 2 - rodPort[2] * 1000,
    "HEAD PORT:",
    tubeLength / 2 + headPort[2] * 1000
  );

  const sectionCutter = new THREE.BoxGeometry(
    0.1,
    0.1,
    tubeLength / 1000 + 0.01
  );

  const myAluminum = new THREE.MeshStandardMaterial({
    color: "#d6d6d6",
    metalness: 0.68,
    roughness: 0.2,
    transparent: false,
    opacity: 0.5,
  });

  const sectionMaterial = new THREE.MeshStandardMaterial({
    color: "red",
    side: THREE.DoubleSide,
    metalness: 0,
    roughness: 0.2,
  });

  return (
    <group>
      <mesh castShadow material={myAluminum}>
        <Geometry ref={csg} useGroups>
          <Tube profile={profile} tubeLength={tubeLength} />
          <StrokeChamber />
          <RodCore tubeLength={tubeLength} />
          <group rotation-z={(-Math.PI / 180) * rodPortAngle}>
            <PortCutter position={rodPort} size={portSize} />
          </group>
          <group rotation-z={(-Math.PI / 180) * rodPortAngle}>
            <PortCutter position={headPort} size={portSize} />
          </group>

          <group>
            <Subtraction position={[0.05, 0.05, 0]}>
              <boxGeometry args={[0.1, 0.1, tubeLength / 1000 + 0.01]} />
              <meshStandardMaterial color="blue" side={THREE.DoubleSide} />
            </Subtraction>
          </group>
        </Geometry>
        <group rotation-z={(-Math.PI / 180) * rodPortAngle}>
          <Port position={rodPort} size={portSize} mat={myAluminum} />
          <Port position={headPort} size={portSize} />
        </group>
      </mesh>
    </group>
  );
};

export default Experience;
