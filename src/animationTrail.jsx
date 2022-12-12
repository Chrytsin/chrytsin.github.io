import React from 'react';
import { useTrail, animated } from 'react-spring';
import { List } from "semantic-ui-react"
import animationTrail from './animationTrail.css';

function AnimationTrail(props) {
  const config = { mass: 5, tension: 2000, friction: 200 }
  let items = props.items;
  let toggle = props.tog;

  const trail = useTrail(
    () => items.length, {
      config,
      opacity: toggle ? 1 : 0,
      y: toggle ? 0 : 20,
      height: toggle ? 160 : 0,
      from: { opacity: 0, y: 20, height: 0 },
    }
  )

  return (
    <div className="trails-main">
      <div>
          {trail.map(({ y, height, ...rest }, index) => (
          <animated.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: y.interpolate(y => `translate3d(0,${y}px,0)`) }}>
            <List style={{ height }}>{items.map((v)=><List.Item>{v}</List.Item>)}</List>
          </animated.div>
        ))} 
      </div>
    </div>
  )
}
 
export default AnimationTrail;