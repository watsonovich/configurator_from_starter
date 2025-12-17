import React from "react";
import { useGLTF } from "@react-three/drei";
import { Base } from "@react-three/csg";

export function TubeAlt(props) {
  const { nodes } = useGLTF("/models/CQ2a.glb");

  const activeGeometry = nodes[`PROFILE_CQ2${props.bore}`].geometry;
  const bodyLength = props.stroke;

  return <Base geometry={activeGeometry} scale-z={bodyLength} />;
}
