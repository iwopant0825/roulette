
import React, { useState, useEffect } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

export default function Model({ setModalIsOpen, setT, R, sR }) {
  const { nodes, materials } = useGLTF("/roullete.glb");
  const jj = useGLTF("/jj.glb");
  const [rotationY, setRotationY] = useState(0);
  const [rotationAmount, setRotationAmount] = useState(Math.PI * 9.95); // 회전 각도 설정
  const [result, setResult] = useState(null); // 새로운 상태 변수 생성
  const [jc, setjc] = useState(0); // 새로운 상태 변수 생성
  const [RRRR, sRRRR] = useState(true); // 새로운 상태 변수 생성
  const { rotation } = useSpring({
    rotation: [Math.PI / 2, rotationY, 0],
    config: { tension: 170, friction: 150 }, // 부드럽게 천천히 멈추도록 설정
  });
  const jjj = useSpring({
    position:
      jc == 1
        ? [1.4, 1, 1]
        : jc == 2
        ? [1.5, 0.8, 1]
        : jc == 3
        ? [1.1, 1.1, 1]
        : [1.4, -5, 1],
    config: { tension: 300, friction: 20 },
  });
  useEffect(() => {
    if (R === true) {
      setRotationY(0);
      sRRRR(false);
      sR(false); // 상태를 다시 false로 설정하여 리셋이 반복되도록 함
    }
  }, [R, sR]);
  const handleClick = () => {
    sRRRR(true);
    setRotationY(rotationY - rotationAmount); // 설정된 각도만큼 반대 방향으로 회전

    // 랜덤 값을 생성하여 result 설정
    const randomValue = Math.random();

    if (randomValue < 0.5) {
      setResult(1); // 50% 확률
    } else if (randomValue < 0.95) {
      setResult(2); // 45% 확률
    } else {
      setResult(3); // 5% 확률
    }
  };
  useEffect(() => {
    console.log(result);
    if (result !== null) {
      const timer = setTimeout(() => {
        if (result === 1) {
          setjc(1);
          setTimeout(() => {
            setjc(2);
          }, 700);
          setTimeout(() => {
            setRotationY(rotationY - 0.6);
            setResult(3);
            setTimeout(() => {
              setjc(0);
              setT("간식");
              setModalIsOpen(true);
            }, 400);
          }, 800);
        } else if (result === 2) {
          setjc(1);
          setTimeout(() => {
            setjc(3);
          }, 700);
          setTimeout(() => {
            setRotationY(rotationY + 0.3);
            setResult(3);
            setTimeout(() => {
              setjc(0);
              setT("스티커");
              setModalIsOpen(true);
            }, 700);
          }, 800);
        }
      }, 5300);
      return () => clearTimeout(timer);
    }
  }, [result, rotationY]);
  return (
    <>
      <animated.group
        scale={3.1}
        position={jjj.position}
        rotation={[-Math.PI / 2, -Math.PI / 2, -Math.PI / 2]}
        dispose={null}
      >
        <mesh
          geometry={jj.nodes.Group_1.geometry}
          material={jj.materials["Group 1"]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        />
      </animated.group>

      <group scale={3} dispose={null} onClick={handleClick}>
        <group position={[0, -0.5, 0.024]}>
          <group position={[0, 0.703, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              geometry={nodes.Object_6.geometry}
              material={materials.Metal_Pulido_Centro}
            />
            <mesh
              castShadow
              geometry={nodes.Object_7.geometry}
              material={materials.Marco}
            />
            <mesh
              castShadow
              geometry={nodes.Object_8.geometry}
              material={materials.Luz_02}
            />
          </group>
          <group position={[0, 0.703, 0.171]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              geometry={nodes.Object_12.geometry}
              material={materials.Marco}
            />
            <mesh
              castShadow
              geometry={nodes.Object_13.geometry}
              material={materials.Luz_02}
            />
          </group>
          <group
            position={[0.188, 1.123, 0.223]}
            rotation={[-Math.PI / 2, 0.4, 0]}
            scale={[-0.036, 0.036, 0.036]}
          >
            <mesh
              castShadow
              geometry={nodes.Object_15.geometry}
              material={materials["Material.005"]}
            />
            <mesh
              castShadow
              geometry={nodes.Object_16.geometry}
              material={materials["Luz.001"]}
            />
          </group>
          <animated.group
            position={[0, 0.703, 0.192]}
            rotation={RRRR ? rotation : [Math.PI / 2, rotationY, 0]}
          >
            <mesh
              castShadow
              geometry={nodes.Object_18.geometry}
              material={materials.Color_01}
            />
            <mesh
              castShadow
              geometry={nodes.Object_19.geometry}
              material={materials.Color_02}
            />
            <mesh
              castShadow
              geometry={nodes.Object_20.geometry}
              material={materials.Color_03}
            />
            <mesh
              castShadow
              geometry={nodes.Object_21.geometry}
              material={materials.Color_04}
            />
          </animated.group>
          <mesh
            castShadow
            geometry={nodes.Object_4.geometry}
            material={materials.Marco}
          />
          <mesh
            castShadow
            geometry={nodes.Object_10.geometry}
            material={materials["Luz.001"]}
            position={[0, 0.703, 0.175]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/roullete.glb");