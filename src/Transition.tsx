import { useLayoutEffect, useState } from 'react'
import {
  useTransition,
  animated,
  useSpring,
  useSpringRef,
  useChain
} from 'react-spring'
import shuffle from 'lodash/shuffle'
import { useLayoutUpdate } from '../common-hooks/useUpdate'
import { useRef } from 'react'
import { useToggle } from '../common-hooks/useToggle'

const list = [
  { name: 'a', color: 'orange' },
  { name: 'b', color: 'slateblue' },
  { name: 'c', color: 'hotpink' },
  { name: 'd', color: '#000' }
]
function Flip() {
  const [rows, set] = useState(list)
  let h = 0
  const transitions = useTransition(
    rows.map((data, i) => ({ ...data, y: i * 50 })),
    {
      key: (d: any) => d.name,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, height: 100, opacity: 1 }),
      update: ({ y }) => ({ y, height: 100, opacity: 0.8 }),
      trail: 200
    }
  )

  return (
    <div style={{ position: 'relative', height: '200vh' }}>
      <button onClick={() => set(shuffle(rows))}>set</button>

      {transitions((style, item, t, i) => (
        <animated.div
          style={{
            ...style,
            position: 'absolute',
            width: '100%',
            height: '50px',
            zIndex: rows.length - i
          }}
        >
          <div style={{ background: item.color, height: '100%' }}>
            {item.name}
            <button onClick={() => set(rows.filter((_, index) => i !== index))}>
              clear
            </button>
          </div>
        </animated.div>
      ))}
    </div>
  )
}

function SwitchTransition() {
  const [n, set] = useState(0)
  const [proxy, setProxy] = useState([n])
  const timer = useRef(0)
  useLayoutUpdate(() => {
    const old = proxy[0]
    if (old !== n) {
      setProxy([n, old])
      timer.current = setTimeout(() => setProxy([n]), 0)
    }
  }, [n])

  const transitions = useTransition(proxy, {
    from: { opacity: 0, y: '-200%' },
    enter: { opacity: 1, y: '0%' },
    leave: { opacity: 0, y: '100%' }
  })
  return (
    <div style={{ height: '300px' }}>
      <button onClick={() => set(n + 1)}>add</button>

      <div style={{ margin: '1rem' }}>
        {transitions((style, item) => (
          <animated.div style={{ ...style }}>{item}</animated.div>
        ))}
      </div>
    </div>
  )
}

function Box() {
  const [open, toggle] = useToggle(true)
  const openSpringRef = useSpringRef()
  const openSpring = useSpring({
    ...(open
      ? {
          width: '100%',
          height: '100%',
          borderRadius: '0px',
          background: '#fff'
        }
      : {
          width: '10%',
          height: '10%',
          borderRadius: '200px',
          background: 'orange'
        }),
    ref: openSpringRef,
    reverse: open
  })

  const openTransitionRef = useSpringRef()
  const transitions = useTransition(open ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [], {
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    ref: openTransitionRef
  })

  useChain(
    open
      ? [openSpringRef, openTransitionRef]
      : [openTransitionRef, openSpringRef],
    [0, .2]
  )

  return (
    <>
      <p>
        <button onClick={toggle}>toggle open</button> {String(open)}
      </p>

      <div
        style={{
          width: '500px',
          height: '500px',
          background: 'gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <animated.div
          style={{
            ...openSpring,
            border: '1px solid red',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 100
          }}
        >
          {transitions((style, item) => (
            <animated.div
              style={{
                ...style,
                width: 100,
                height: 100,
                background: 'hotpink'
              }}
            >
              {item}
            </animated.div>
          ))}
        </animated.div>
      </div>
    </>
  )
}

export default Box
