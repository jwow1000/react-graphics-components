import * as THREE from 'three';
import { randomInt } from "../../services/myMath.js";
import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { randFloat } from 'three/src/math/MathUtils.js';


function genPoints(amt, w, h, m) {
  // generate random xy points, array of xy objects
  const arr = [];
  for(let i=0; i<amt; i++) {
    
    const x = randFloat( m/2, w - (m/2) );
    const y = randFloat( m/2, h - (m/2) );
    arr.push( new THREE.Vector3(x - (w/2),y - (h/2),0) );
    
  }
  const geometry = new THREE.BufferGeometry().setFromPoints( arr );
  return geometry;
}

function RandomLines({ amount, width, height, margin, trigger }) {
  const [points, setPoints] = useState([]);
  // gen new points
  useEffect(() => {
    setPoints(genPoints(amount, width, height, margin ));
  },[amount, width, height, margin, trigger]) 
  
  const mat = new THREE.LineBasicMaterial({ 
    color: 'hotpink', 
    lineWidth: '10px' 
  });
  return (
      <Canvas >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <line geometry={points} material={ mat }></line>
      </Canvas>

  )
}

export default RandomLines