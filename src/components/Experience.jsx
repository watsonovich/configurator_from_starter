/* eslint-disable no-unused-vars */

import { useCustomization } from "../contexts/Customization";
import { tubeDimsCQ2 } from "../data/dims";
import ActuatorBody from "./ActuatorBody";
import Collar from "./Collar";

const Experience = () => {
  const { magnet, setMagnet } = useCustomization();
  const { bore, setBore } = useCustomization();
  const { stroke, setStroke } = useCustomization();

  const selection = tubeDimsCQ2.bores[bore];

  const basicLength = selection.basicLength;
  const basicLengthMod = selection.basicLengthMod;
  const rodPortDistance = selection.rodPortDistance;
  const rodPortDistanceMod = selection.rodPortDistanceMod;
  const headPortDistance = selection.headPortDistance;
  const headPortDistanceMod = selection.headPortDistanceMod;
  const portSurfaceDistance = selection.portSurfaceDistance;
  const portAngle = selection.portAngle;
  const portAngleMod = selection.portAngleMod;
  let portSize = selection.portSize;
  const portSizeMod = selection.portSizeMod;
  const rodDiameter = selection.rodDiameter;

  let profileModifier = "";
  let tubeLength = basicLength + stroke;
  let rodPort = "";
  let headPort = "";
  let rodPortAngle = 0;
  let headPortAngle = 0;

  // profile modifier logic
  if (bore >= 12 && bore <= 25) {
    magnet ? (profileModifier = "Z") : (profileModifier = "");
    rodPortAngle = magnet ? portAngleMod : portAngle;
    headPortAngle = rodPortAngle;
  }

  // tube length logic
  if (magnet || stroke > 50) {
    console.log("modify tube length");

    tubeLength += basicLengthMod;
  }

  // rod port position logic
  if (bore == 12 || bore == 16) {
    magnet
      ? (rodPort = [
          0,
          portSurfaceDistance / 1000,
          (tubeLength / 2 - (rodPortDistance + rodPortDistanceMod)) / 1000,
        ])
      : (rodPort = [
          0,
          portSurfaceDistance / 1000,
          (tubeLength / 2 - rodPortDistance) / 1000,
        ]);
  } else {
    rodPort = [
      0,
      portSurfaceDistance / 1000,
      (tubeLength / 2 - rodPortDistance) / 1000,
    ];
  }

  // head port position logic
  if (bore == 12 && magnet) {
    // console.log("modify head port for 12  + magnet");
    headPort = [
      0,
      portSurfaceDistance / 1000,
      (-(tubeLength / 2) + headPortDistance + headPortDistanceMod) / 1000,
    ];
  } else if (bore == 32 && stroke == 5 && !magnet) {
    // console.log("modify head port for 32 5");
    headPort = [
      0,
      portSurfaceDistance / 1000,
      (-(tubeLength / 2) + headPortDistance + headPortDistanceMod) / 1000,
    ];
  } else {
    headPort = [
      0,
      portSurfaceDistance / 1000,
      (-(tubeLength / 2) + headPortDistance) / 1000,
    ];
  }

  // port size change logic
  if (bore == 32 && stroke == 5 && !magnet) {
    portSize = portSizeMod;
  }

  const profile = bore + profileModifier;

  // console.log(
  //   "BORE",
  //   bore,
  //   // "PROFILE",
  //   // profile,
  //   "STROKE",
  //   stroke,
  //   "TUBE LENGTH",
  //   tubeLength,
  //   // "BLen",
  //   // basicLength,
  //   // "BLenMod",
  //   // basicLengthMod,
  //   // "HALF TUBE",
  //   // tubeLength / 2,
  //   "ROD PORT",
  //   tubeLength / 2 - rodPort[2] * 1000,
  //   "HEAD PORT:",
  //   tubeLength / 2 + headPort[2] * 1000
  // );

  return (
    <>
      <ActuatorBody
        profile={profile}
        tubeLength={tubeLength}
        rodPortPosition={rodPort}
        headPortPosition={headPort}
        size={portSize}
        portAngle={rodPortAngle}
      />
      <Collar />
    </>
  );
};

export default Experience;
