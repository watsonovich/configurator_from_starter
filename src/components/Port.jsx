import React, { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export function Port(props) {
  const { nodes, materials } = useGLTF("/models/PORTS.glb");

  // console.log("nodes:", nodes);
  // console.log("size:", props.size);
  let size;

  if (props.size == "M3x0.5") {
    size = "M3";
  }

  if (props.size == "M5x0.8") {
    size = "M5";
  }

  if (props.size == "1/8") {
    size = "01";
  }

  if (props.size == "1/4") {
    size = "02";
  }

  if (props.size == "3/8") {
    size = "03";
  }

  if (props.size == "1/2") {
    size = "04";
  }

  // let chamGeoString = `${size}_1`;
  // let threadGeoString = `${size}_2`;
  // let bottomGeoString = `${size}_3`;

  // console.log(
  //   "cham",
  //   chamGeoString,
  //   "thread",
  //   threadGeoString,
  //   "bott",
  //   bottomGeoString
  // );

  // console.log("Processed Size:", size);

  // const chamfer = nodes["01"].geometry;
  // const threads = nodes["01_1"].geometry;
  // const bottom = nodes["01_2"].geometry;

  const chamfer = nodes[`${size}_1`].geometry;
  const threads = nodes[`${size}_2`].geometry;
  const bottom = nodes[`${size}_3`].geometry;

  const chamferMat = props.mat;

  const threadMat = new THREE.MeshStandardMaterial({
    color: "#9e9e9e",
    metalness: 0.6,
    roughness: 0.2,

    side: THREE.DoubleSide,
  });

  const bottomMat = new THREE.MeshStandardMaterial({
    color: "#b4b4b4",
    metalness: 0,
    roughness: 0.2,

    side: THREE.DoubleSide,
  });

  return (
    <group position={props.position}>
      <mesh geometry={chamfer} material={chamferMat} />
      <mesh geometry={threads} material={threadMat} />
      <mesh geometry={bottom} material={bottomMat} />
    </group>
  );
}
