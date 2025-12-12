import React, { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export function Port(props) {
  const { nodes, materials } = useGLTF("/models/PORTS.glb");

  const activeGeometry = nodes["01"].geometry;
  const chamfer = nodes["01"].geometry;
  const threads = nodes["01_1"].geometry;
  const bottom = nodes["01_2"].geometry;

  const chamferMat = materials.ALUMINUM;
  const threadMat = materials.THREAD_Z;
  const bottomMat = materials.ALUMINUM;

  chamferMat.metalness = 0.7;
  chamferMat.roughness = 0.15;

  bottomMat.metalness = 0;
  bottomMat.roughness = 0.2;

  return (
    <>
      {/* <mesh position={props.position}>
        <cylinderGeometry args={[0.005, 0.005, 0.002, 24, 1, true]} />
        <meshStandardMaterial
          color={"orange"}
          transparent={true}
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh> */}

      <group position={props.position}>
        <mesh geometry={chamfer} material={chamferMat} />
        <mesh geometry={threads} material={threadMat} />
        <mesh geometry={bottom} material={bottomMat} />
      </group>
    </>
  );
}
