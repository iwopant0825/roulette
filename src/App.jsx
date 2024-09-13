import { Canvas } from "@react-three/fiber";
import Model from "./roullete";
import { Html, OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import Modal from "react-modal";

function App() {
  const [T, sT] = useState();
  const [R, sR] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Q, sQ] = useState();
  return (
    <>
      <Modall Q={Q} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} sR={sR} title={T} />
      <Canvas shadows>
        <Html position={[0, 2.4, 1]} transform occlude>
          <p>당첨 안되는건 모두 기분탓인 룰렛 돌리기</p>
        </Html>
        <Html position={[-3.4, 0, 1]} transform occlude>
          <p style={{fontSize:'13px', color:'orange',fontWeight:'bold'}}>주황색 뜨면 키보드 당첨</p>
          <p style={{fontSize:'10px', color:'white'}}>하얀색 뜨면 마이쮸 당첨</p>
          <p style={{fontSize:'10px', color:'blue'}}>파란색 뜨면 피크닉 당첨</p>
        </Html>
        <ambientLight intensity={1} />
        <color attach={"background"} args={["skyblue"]} />
        <OrbitControls
          minDistance={3}
          maxDistance={6}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Model sQ={sQ} Q={Q} R={R} sR={sR} setModalIsOpen={setModalIsOpen} setT={sT} />
        <directionalLight
          shadow-mapSize={4096}
          castShadow
          position={[1, 1, 1]}
          intensity={2}
        />
        <mesh position={[0, -1.5, 0]} receiveShadow rotation-x={-Math.PI / 2}>
          <planeGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </Canvas>
    </>
  );
}

function Modall({ title, sR, modalIsOpen, setModalIsOpen,Q }) {
  const showAnswer = () => {
    setModalIsOpen(!modalIsOpen);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "lightblue",
      padding: "40px",
      borderRadius: "10px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={showAnswer}
      style={customStyles}
      ariaHideApp={false}
      onRequestClose={() => {
        setModalIsOpen(false);
        sR(true);
       
      }}
    >
      <h2>{title}당첨!</h2>
      <img style={{width:'300px'}} src={Q==3? '/2.png':'/1.png'}></img>
    </Modal>
  );
}

export default App;