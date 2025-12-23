import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export default function Collar(props) {
  const { nodes } = useGLTF("/models/COLLAR.glb");

  console.log(nodes);

  const retainingRing = nodes["25RR"].geometry;
  const collar = nodes["25"].geometry;

  const ringMaterial = new THREE.MeshStandardMaterial({
    color: "#494949",
    roughness: 0.8,
    metalness: 0.5,
  });

  const myAluminum = new THREE.MeshStandardMaterial({
    color: "#949494",
    metalness: 0.2,
    roughness: 0.5,
    transparent: false,
    opacity: 0.65,
  });

  const adjustment = 22.4 / 1000 - 0.000533;

  return (
    <>
      <mesh
        {...props}
        material={ringMaterial}
        geometry={retainingRing}
        position-z={adjustment}
      />

      <mesh
        {...props}
        material={myAluminum}
        geometry={collar}
        position-z={adjustment}
      />
    </>
  );
}
