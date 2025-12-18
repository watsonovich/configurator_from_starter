import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { Base } from "@react-three/csg";

export default function Tube(props) {
  const { nodes } = useGLTF("/models/CQ2a.glb");

  const newAlum = new THREE.MeshStandardMaterial({
    color: "#d6d6d6",
    metalness: 0.68,
    roughness: 0.2,
    transparent: false,
    opacity: 0.5,
  });

  const activeGeometry = nodes[`PROFILE_CQ2${props.profile}`].geometry;
  const bodyLength = props.tubeLength;

  return <Base geometry={activeGeometry} scale-z={bodyLength} />;
}
