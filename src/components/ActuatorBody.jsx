import { Addition, Base, Geometry, Subtraction } from "@react-three/csg";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import StrokeChamber from "./StrokeChamber";
import RodCoreGroove from "./RodCoreGroove";
import RodCore from "./RodCore";

import { portDims } from "../data/portDims";
import PortNew from "./PortNew";
import Chambos from "./Chambos";
import Thrombos from "./Thrombos";

export default function ActuatorBody(props) {
  const csg = useRef();
  const csgPorts = useRef();
  const { nodes } = useGLTF("/models/CQ2a.glb");
  const activeGeometry = nodes[`PROFILE_CQ2${props.profile}`].geometry;
  const bodyLength = props.tubeLength;

  const myAluminum = new THREE.MeshStandardMaterial({
    color: "#d6d6d6",
    metalness: 0.68,
    roughness: 0.2,
    transparent: false,
    opacity: 0.65,
  });

  const sectionMaterial = new THREE.MeshStandardMaterial({
    color: "red",
    side: THREE.DoubleSide,
    metalness: 0,
    roughness: 0.2,
  });

  const constructionMaterial = new THREE.MeshStandardMaterial({
    color: "orange",
    side: THREE.DoubleSide,
    metalness: 0,
    roughness: 0.2,
  });

  // Local Port Construction **************************************************

  let size;
  let portRotation;

  props.portAngle > 0 ? (portRotation = Math.PI / 1.3333) : (portRotation = 0);

  if (props.size == "M3x0.5") {
    size = props.size;
  }

  if (props.size == "M5x0.8") {
    size = "m5";
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

  const selection = portDims.ports[size];

  const chamStartRad = selection.chamferStartRadius / 1000;
  const chamEndRad = selection.chamferEndRadius / 1000;
  const chamLength = selection.chamferLength / 1000;

  const threadStartRad = selection.threadStartRadius / 1000;
  const threadEndRad = selection.threadEndRadius / 1000;
  const threadLength = selection.threadLength / 1000;
  const threadShift = threadLength / 2;

  const drillRadius = selection.drillRadius / 1000;
  const drillLength = selection.drillLength / 1000;
  const drillShift = drillLength / 2;

  const portDrillArgs = [drillRadius, drillRadius, drillLength];
  const portThreadArgs = [threadStartRad, threadEndRad, threadLength];
  const portChamferArgs = [chamStartRad, chamEndRad, chamLength];

  return (
    <mesh castShadow receiveShadow>
      <Geometry ref={csg} useGroups>
        <Base
          geometry={activeGeometry}
          scale-z={bodyLength}
          material={myAluminum}
        />
        <StrokeChamber material={constructionMaterial} />
        <RodCore tubeLength={bodyLength} material={myAluminum} />
        <RodCoreGroove tubeLength={bodyLength} material={myAluminum} />
        <Subtraction
          material={constructionMaterial}
          showOperation={false}
          position={props.rodPortPosition}
          rotation-z={-portRotation}
        >
          <Geometry ref={csgPorts}>
            <Base>
              <Chambos data={portChamferArgs} />
            </Base>
            <Addition position-y={-threadShift}>
              <Thrombos data={portThreadArgs} />
            </Addition>
          </Geometry>
        </Subtraction>

        {/* <PortNew
          size={size}
          material={constructionMaterial}
          position={props.rodPortPosition}
          rotation={[0, 0, -portRotation]}
        /> */}

        {/* <Subtraction
          name="rodPortDrill"
          showOperation={false}
          material={constructionMaterial}
          position-x={props.rodPortPosition[0]}
          position-y={props.rodPortPosition[1] - drillShift}
          position-z={props.rodPortPosition[2]}
        >
          <cylinderGeometry args={portDrillArgs} />
        </Subtraction>
        <Subtraction
          name="rodPortThread"
          showOperation={false}
          material={constructionMaterial}
          position-x={props.rodPortPosition[0]}
          position-y={props.rodPortPosition[1] - threadShift}
          position-z={props.rodPortPosition[2]}
        >
          <cylinderGeometry args={portThreadArgs} />
        </Subtraction>
        <Subtraction
          name="rodPortChamfer"
          showOperation={false}
          material={constructionMaterial}
          position={props.rodPortPosition}
        >
          <cylinderGeometry args={portChamferArgs} />
        </Subtraction> */}

        <Subtraction
          name="headPortDrill"
          showOperation={false}
          material={myAluminum}
          position-x={props.headPortPosition[0]}
          position-y={props.headPortPosition[1] - drillShift}
          position-z={props.headPortPosition[2]}
        >
          <cylinderGeometry args={portDrillArgs} />
        </Subtraction>
        <Subtraction
          name="rodPortThread"
          showOperation={false}
          material={myAluminum}
          position-x={props.headPortPosition[0]}
          position-y={props.headPortPosition[1] - threadShift}
          position-z={props.headPortPosition[2]}
        >
          <cylinderGeometry args={portThreadArgs} />
        </Subtraction>
        <Subtraction
          name="rodPortChamfer"
          showOperation={false}
          material={myAluminum}
          position={props.headPortPosition}
        >
          <cylinderGeometry args={portChamferArgs} />
        </Subtraction>
        <Subtraction position={[0.05, 0.05, 0]} material={sectionMaterial}>
          <boxGeometry args={[0.1, 0.1, bodyLength / 1000 + 0.01]} />
        </Subtraction>
      </Geometry>
    </mesh>
  );
}
