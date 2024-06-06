import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import styles from "./styles.module.css";
import { randInt } from 'three/src/math/MathUtils.js';
import { useEffect, useState } from 'react';
import { div } from 'three/examples/jsm/nodes/Nodes.js';

function genPoints(amt, w, h) {
  // generate random xy points, array of xy objects
  const arr = [];
  const push2 = (x1,y1,x2,y2) => {
    arr.push([ 
      new THREE.Vector2(x1,y1),
      new THREE.Vector2(x2,y2),
    ])   
  }
  
  for(let y=0; y<amt; y++) {
    for( let x=0; x<amt; x++) {
      const xPos = x * w;
      const yPos = y * h;
      const dir = randInt(0, 6);
      if(dir === 0 ) {
        // top
        push2(xPos,yPos,xPos+w,yPos); 
      } else if(dir === 1) {
        // right
        push2(xPos+w,yPos,xPos+w,yPos+h); 
      } else if(dir === 2) {
        // bottom
        push2(xPos,yPos+h,xPos+w,yPos+h); 
      } else if(dir === 3) {
        // left
        push2(xPos,yPos,xPos,yPos+h); 
      } else if(dir === 4) {
        // diag top left bottom right
        push2(xPos,yPos,xPos+w,yPos+h); 
      } else if(dir === 5) {
        // diag bottom left to top right
        push2(xPos,yPos+h,xPos+w,yPos); 
      } else {
        // none
        arr.push(0);
      }
    }
  }
  return arr;
}

function RandomBGLines() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    setPoints( genPoints(20,0.5,0.25) );
  },[])

  const mat = new THREE.LineBasicMaterial({ 
    color: 'hotpink', 
    linewidth: 10 
  });

  let camera = new THREE.PerspectiveCamera (45, 1, 1, 1000);

  return (
    <Canvas camera={camera}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {
        points.map((item, idx) => {
          if(item !== 0) {
            const geo = new THREE.BufferGeometry().setFromPoints(item);
            console.log('geo', item);
            return <line geometry={geo} material={ mat }></line>
          } else {
            return null;
          }
        })
      }
    </Canvas>
  )
}

export default RandomBGLines