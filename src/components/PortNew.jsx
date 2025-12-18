import * as THREE from "three";
import { Addition, Base, Geometry, Subtraction } from "@react-three/csg";
import { portDims } from "../data/portDims";

export default function PortNew(props) {
  return (
    <Subtraction showOperation={false} position={props.position}>
      <PortConstruction size={props.size} />
    </Subtraction>
  );
}

function PortConstruction(props) {
  console.log("port construction", props.size);

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

  console.log("processed size", size);

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

  console.log(
    "using vals:",
    chamStartRad,
    chamEndRad,
    chamLength,
    threadStartRad,
    threadEndRad,
    threadLength,
    drillRadius,
    drillLength
  );

  const chamGeo = new THREE.CylinderGeometry(
    chamStartRad,
    chamEndRad,
    chamLength,
    32,
    1
  );
  const threadGeo = new THREE.CylinderGeometry(
    threadStartRad,
    threadEndRad,
    threadLength,
    32,
    1
  );

  const drillGeo = new THREE.CylinderGeometry(
    drillRadius,
    drillRadius,
    drillLength,
    24,
    1
  );

  return (
    <Geometry>
      <Base geometry={chamGeo} />
      <Addition geometry={threadGeo} position-y={-threadShift} />
      <Addition geometry={drillGeo} position-y={-drillShift} />
    </Geometry>
  );
}
