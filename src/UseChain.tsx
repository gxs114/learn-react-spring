import { useRef, useState } from 'react'
import {
  useSprings,
  animated,
  useChain,
  useTrail,
  useSpring,
  useSpringRef
} from 'react-spring'

const configs = [
  {
    from: { width: '0%', height: '0px' },
    to: { width: '100%', height: '50px' },
    color: 'hotpink'
  },
  {
    from: { width: '0%', height: '0px' },
    to: { width: '100%', height: '50px' },
    color: 'deepskyblue'
  },
  {
    from: { width: '0%', height: '0px' },
    to: { width: '100%', height: '50px' },
    color: 'slateblue'
  }
]

export default function UseChain() {
  const [open, setOpen] = useState(false)
  const spring1Ref = useSpringRef()
  const spring1 = useSpring({
    from: { width: '0%', height: '10px' },
    to: { width: '100%', height: '50px' },
    ref: spring1Ref,
    reset: true,
    reverse: open
  })

  const spring2Ref = useSpringRef()
  const spring2 = useSpring({
    from: { width: '0%', height: '0px' },
    to: { width: '100%', height: '50px' },
    ref: spring2Ref,
    reset: true,
    reverse: open
  })

  useChain([spring1Ref, spring2Ref], [0, 1])

  return (
    <div style={{ height: '300px' }}>
      <animated.div style={{ ...spring1, background: 'hotpink' }}>
        <animated.div style={{...spring2, background: "slateblue"}}></animated.div>
      </animated.div>
      <button onClick={() => setOpen(!open)}>切换</button>

      <hr />
    </div>
  )
}
