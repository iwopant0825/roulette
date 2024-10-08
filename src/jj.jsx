/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 ./public/jj.glb -o ./src/jj.jsx 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Jj(props) {
  const { nodes, materials } = useGLTF('/jj.glb')
  return (
    <group  rotation={[-Math.PI / 2, -Math.PI / 2, -Math.PI / 2]} {...props} dispose={null}>
      <mesh geometry={nodes.Group_1.geometry} material={materials['Group 1']} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
    </group>
  )
}

useGLTF.preload('/jj.glb')
