import { useGLTF } from "@react-three/drei";

export function PortCutter(props) {
  const { nodes, materials } = useGLTF("/models/PORTS.glb");

  // console.log(nodes["RC_cutter001"]);
  // console.log(materials);

  const cutterGeometry = nodes["RC_cutter001"].geometry;
  const cutterMat = materials.ALUMINUM;

  return (
    <mesh
      position={props.position}
      geometry={cutterGeometry}
      material={cutterMat}
    />
  );
}
