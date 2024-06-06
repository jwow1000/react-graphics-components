import {useState, useEffect} from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { randInt } from 'three/src/math/MathUtils.js';
import styles from "./styles.module.css";

function genPoints(amt, w, h) {
  // generate random xy points, array of xy objects
  const arr = [];
  const push2 = (x1,y1,x2,y2) => {
    arr.push([x1,y1,x2,y2]);   
  }
  
  for(let y=0; y<=amt; y++) {
    for( let x=0; x<=amt; x++) {
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

function Canvas({reRender}) {
  const [points, setPoints] = useState([]);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [reSize, setReSize] = useState(true);
  const [color, setColor] = useState({});

  useEffect(() => {
    const changeSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // console.log('change the size')
    };

    const randoColor = () => {
      setColor({
        'r': randInt(130,225),
        'g': randInt(130,225),
        'b': randInt(130,225)

      })
    }
    
    const reDraw = () => {
      const width = Math.floor(size.width / 20);
      const height = Math.floor(size.height / 20);
      setPoints( genPoints(20, width, height) ); 
      // console.log('reDraw')
    };
    
    if(reSize) {
      changeSize();
      reDraw();
      randoColor();
    }

    const checkSize = () => {
      const xChange = Math.abs(window.innerWidth - size.width);
      const yChange = Math.abs(window.innerHeight - size.height); 
      if(xChange > 50 || yChange > 50) {
        changeSize();
        reDraw();
        randoColor();
      }
    }
  
  window.addEventListener('resize', checkSize);
  return () => window.removeEventListener('resize', checkSize);

  }, [size.height, size.width, reRender]);

  return (

    <Stage 
      width={window.innerWidth} 
      height={window.innerHeight}
      className={styles.root}

    >

      <Layer>
        {
          points.map( (item, idx) => {
            if(item !== 0) {
              return <Line x={0} y={0} points={item} stroke={`rgb(${color.r}, ${color.g}, ${color.b})`} key={`bgLine-${idx}`} />
            } else {
              return null
            }

          })
        }
        

      </Layer>

    </Stage>

  );

}


export default Canvas;