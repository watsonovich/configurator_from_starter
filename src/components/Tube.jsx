import React from "react";
import { useGLTF } from "@react-three/drei";
import { Base } from "@react-three/csg";

export function Tube(props) {
  const { nodes } = useGLTF("/models/CQ2a.glb");

  const activeGeometry = nodes[`PROFILE_CQ2${props.profile}`].geometry;
  const bodyLength = props.tubeLength;

  return <Base geometry={activeGeometry} scale-z={bodyLength} />;
}

export default Tube;
