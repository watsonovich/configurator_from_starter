/* eslint-disable no-unused-vars */

import { Tube } from "./Tube";
import { useCustomization } from "../contexts/Customization";
import { tubeDimsCQ2 } from "../data/dims";
import { Port } from "./Port";
import { PortCutter } from "./PortCutter";

const Experience = (props) => {
  const { magnet, setMagnet } = useCustomization();
  const { bore, setBore } = useCustomization();
  const { stroke, setStroke } = useCustomization();

  const selection = tubeDimsCQ2.bores[bore];
  // console.log(selection);

  const basicLength = selection.basicLength;
  const basicLengthMod = selection.basicLengthMod;
  const rodPortDistance = selection.rodPortDistance;
  const rodPortDistanceMod = selection.rodPortDistanceMod;
  const headPortDistance = selection.headPortDistance;
  const headPortDistanceMod = selection.headPortDistanceMod;
  const portSurfaceDistance = selection.portSurfaceDistance;
  const portAngle = selection.portAngle;
  const portAngleMod = selection.portAngleMod;
  const portSize = selection.portSize;
  const portSizeMod = selection.portSizeMod;

  let profileModifier = "";
  let tubeLength = basicLength + stroke;
  let rodPort = "";
  let rodPortAngle = 0;

  let headPort = [
    0,
    portSurfaceDistance / 1000,
    (-(tubeLength / 2) + headPortDistance) / 1000,
  ];
  let headPortAngle = 0;

  // profile modifier logic
  if (bore >= 12 && bore <= 25) {
    magnet ? (profileModifier = "Z") : (profileModifier = "");
    rodPortAngle = magnet ? portAngleMod : portAngle;
    headPortAngle = rodPortAngle;
  }

  // tube length logic
  if (magnet || stroke > 50) {
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
    headPort = [
      0,
      portSurfaceDistance / 1000,
      (-(tubeLength / 2) + headPortDistance + headPortDistanceMod) / 1000,
    ];
  }

  const profile = bore + profileModifier;

  // console.log(
  //   "BORE",
  //   bore,
  //   "PROFILE",
  //   profile,
  //   "STROKE",
  //   stroke,
  //   "TUBE LENGTH",
  //   tubeLength,
  //   "BLen",
  //   basicLength,
  //   "BLenMod",
  //   basicLengthMod,
  //   "HALF TUBE",
  //   tubeLength / 2,
  //   "ROD PORT",
  //   rodPort
  // );

  return (
    <group position={props.position}>
      <Tube bore={profile} stroke={tubeLength} />

      <group rotation-z={(-Math.PI / 180) * rodPortAngle}>
        <Port position={rodPort} />
        <Port position={headPort} />
        <PortCutter position={rodPort} />
        <PortCutter position={headPort} />
      </group>
    </group>
  );
};

export default Experience;
