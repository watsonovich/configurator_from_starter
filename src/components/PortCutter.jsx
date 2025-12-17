import { useGLTF } from "@react-three/drei";
import { Subtraction } from "@react-three/csg";

export function PortCutter(props) {
  const { nodes, materials } = useGLTF("/models/PORTS.glb");

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

  // console.log(nodes["RC_cutter001"]);
  // console.log(materials);

  const cutterGeometry = nodes[`cutter${size}`].geometry;
  const cutterMat = materials.ALUMINUM;

  return (
    <Subtraction
      showOperation={false}
      position={props.position}
      geometry={cutterGeometry}
    />
  );
}
