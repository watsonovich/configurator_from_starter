import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { Base, Geometry } from "@react-three/csg";

export function TubeAlt(props) {
  const { nodes, materials } = useGLTF("/models/CQ2a.glb");

  const activeGeometry = nodes[`PROFILE_CQ2${props.bore}`].geometry;
  const bodyLength = props.stroke;

  // const appliedMaterial = materials.ALUMINUM;
  // appliedMaterial.metalness = 0.7;
  // appliedMaterial.roughness = 0.15;

  // console.log(props.material);

  return (
    <Base
      geometry={activeGeometry}
      scale-z={bodyLength}
      material={props.material}
      castShadow
    />
  );
}
