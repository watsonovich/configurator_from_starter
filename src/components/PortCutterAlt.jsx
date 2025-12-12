import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Geometry, Subtraction, Base } from "@react-three/csg";

export function PortCutterAlt(props) {
  const { nodes, materials } = useGLTF("/models/PORTS.glb");

  // console.log(nodes["RC_cutter001"]);
  // console.log(materials);

  const cutterGeometry = nodes["RC_cutter001"].geometry;
  const cutterMat = materials.ALUMINUM;

  return (
    <Subtraction
      showOperation
      position={props.position}
      geometry={cutterGeometry}
      material={cutterMat}
    />
  );
}
