import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { useDrag } from '@use-gesture/react'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/roullete.glb')
  const [rotation, setRotation] = React.useState([Math.PI / 2, 0, 0])
  const rotationSpeed = 0.1 // 회전 속도를 더 빠르게 조절할 수 있는 변수
  
  const bind = useDrag(({ offset: [x, y] }) => {
    const direction = y > 0 ? -1 : 1 // y 좌표에 따라 회전 방향 설정
    setRotation([Math.PI / 2, direction * x * rotationSpeed, 0])
  })

  const { rot } = useSpring({
    rot: rotation,
    config: { mass: 400, tension: 300, friction: 200 } // 더 많이 회전하도록 설정
  })

  return (
    <group {...props} dispose={null}>
      <group position={[0, -0.5, 0.024]}>
        <group position={[0, 0.703, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow geometry={nodes.Object_6.geometry} material={materials.Metal_Pulido_Centro} />
          <mesh castShadow geometry={nodes.Object_7.geometry} material={materials.Marco} />
          <mesh castShadow geometry={nodes.Object_8.geometry} material={materials.Luz_02} />
        </group>
        <group position={[0, 0.703, 0.171]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow geometry={nodes.Object_12.geometry} material={materials.Marco} />
          <mesh castShadow geometry={nodes.Object_13.geometry} material={materials.Luz_02} />
        </group>
        <group position={[0.188, 1.123, 0.223]} rotation={[-Math.PI / 2, 0.4, 0]} scale={[-0.036, 0.036, 0.036]}>
          <mesh castShadow geometry={nodes.Object_15.geometry} material={materials['Material.005']} />
          <mesh castShadow geometry={nodes.Object_16.geometry} material={materials['Luz.001']} />
        </group>
        <animated.group position={[0, 0.703, 0.192]} rotation={rot} {...bind()}>
          <mesh castShadow geometry={nodes.Object_18.geometry} material={materials.Color_01} />
          <mesh castShadow geometry={nodes.Object_19.geometry} material={materials.Color_02} />
          <mesh castShadow geometry={nodes.Object_20.geometry} material={materials.Color_03} />
          <mesh castShadow geometry={nodes.Object_21.geometry} material={materials.Color_04} />
        </animated.group>
        <mesh castShadow geometry={nodes.Object_4.geometry} material={materials.Marco} />
        <mesh castShadow geometry={nodes.Object_10.geometry} material={materials['Luz.001']} position={[0, 0.703, 0.175]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/roullete.glb')