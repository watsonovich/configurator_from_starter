import { Base, Geometry, Subtraction } from "@react-three/csg";
import { useRef } from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function ActuatorBody(props) {
  console.log(props);

  const csg = useRef();
  const { nodes } = useGLTF("/models/CQ2a.glb");

  const activeGeometry = nodes[`PROFILE_CQ2${props.profile}`].geometry;
  const bodyLength = props.tubeLength;

  return (
    <mesh castShadow receiveShadow>
      <Geometry ref={csg} useGroups>
        <Base geometry={activeGeometry} scale-z={bodyLength}>
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={512}
            thickness={0.3}
            roughness={0.2}
            anisotropy={1}
            chromaticAberration={0.2}
          />
          {/* <meshStandardMaterial color="hotpink" side={THREE.DoubleSide} /> */}
        </Base>
        <Subtraction position={[0.05, 0.05, 0]}>
          <boxGeometry args={[0.1, 0.1, bodyLength / 1000 + 0.01]} />
          <meshStandardMaterial color="blue" side={THREE.DoubleSide} />
        </Subtraction>
      </Geometry>
    </mesh>
  );
}
