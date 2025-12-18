import { Canvas, useThree } from "@react-three/fiber";
import "./App.css";
import Configurator from "./components/Configurator";
import { CustomizationProvider } from "./contexts/Customization";
// import { Environment } from "./components/Environment";
import { Environment, OrbitControls } from "@react-three/drei";
import Experience from "./components/Experience";
import ExperienceAlt from "./components/ExperienceAlt";

function App() {
  return (
    <CustomizationProvider>
      <div className="App">
        <Canvas shadows camera={{ position: [1, 0.75, 1], fov: 25 }}>
          <color attach="background" args={["#dae2f3"]} />
          <OrbitControls
            makeDefault
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            // minAzimuthAngle={-Math.PI / 1.25}
            // maxAzimuthAngle={Math.PI / 2}
            minDistance={0.12}
            maxDistance={0.9}
            rotateSpeed={1.5}
          />

          <Experience />
          <Environment preset="city" background blur={1} />
        </Canvas>
        <Configurator />
      </div>
    </CustomizationProvider>
  );
}

export default App;
