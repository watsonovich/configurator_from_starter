export default function Chambos(props) {
  //   console.log("chambos", props.data);

  return (
    <cylinderGeometry args={[props.data[0], props.data[1], props.data[2]]} />
  );
}
