import { Canvas } from "@react-three/fiber";
import Model from "./roullete";
import { Html, OrbitControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas
        shadows
        gl={{ antialias: true }}
      >
        <Html position={[0,2.4,1]} transform occlude> 
          <p>당첨 안되는건 모두 기분탓인 룰렛 돌리기</p>
        </Html>
        <ambientLight intensity={1} />
        <color attach={'background'} args={['skyblue']}/>
        <Model scale={3} />
        <directionalLight shadow-mapSize={4096} castShadow position={[1, 1, 1]} intensity={2} />
        <mesh position={[0, -1.5, 0]} receiveShadow rotation-x={-Math.PI / 2}>
          <planeGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;
