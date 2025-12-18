import { Base, Geometry, Subtraction } from "@react-three/csg";
import { useRef } from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import StrokeChamber from "./StrokeChamber";
import RodCoreGroove from "./RodCoreGroove";
import RodCore from "./RodCore";
import PortNew from "./PortNew";

export default function ActuatorBody(props) {
  const csg = useRef();
  const { nodes } = useGLTF("/models/CQ2a.glb");
  const activeGeometry = nodes[`PROFILE_CQ2${props.profile}`].geometry;
  const bodyLength = props.tubeLength;

  return (
    <mesh castShadow receiveShadow>
      <meshStandardMaterial
        color="Gainsboro"
        side={THREE.DoubleSide}
        metalness={0.68}
        roughness={0.2}
      />
      <Geometry ref={csg} useGroups>
        <Base geometry={activeGeometry} scale-z={bodyLength}>
          {/* <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={512}
            thickness={0.3}
            roughness={0.2}
            anisotropy={1}
            chromaticAberration={0.2}
          /> */}
          {/* <meshStandardMaterial color="hotpink" side={THREE.DoubleSide} /> */}
        </Base>

        <RodCore tubeLength={bodyLength} />
        <RodCoreGroove tubeLength={bodyLength} />
        <PortNew position={props.rodPortPosition} size={props.size} />
        <PortNew position={props.headPortPosition} size={props.size} />
        <Subtraction position={[0.05, 0.05, 0]}>
          <boxGeometry args={[0.1, 0.1, bodyLength / 1000 + 0.01]} />
          <meshStandardMaterial color="blue" side={THREE.DoubleSide} />
        </Subtraction>
        <StrokeChamber />
      </Geometry>
    </mesh>
  );
}
