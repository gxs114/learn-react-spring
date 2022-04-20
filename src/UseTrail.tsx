import { useState } from 'react'
import { useTrail, animated } from 'react-spring'

const colors = ['orange', 'slateblue', 'hotpink']
export function UseTrail() {
  const [open, setOpen] = useState(true)
  const springs = useTrail(3, {
    from: { width: '0%', height: 0 },
    to: { width: '100%', height: 50 },
    reset: true,
    reverse: open
  })

  console.log(open)
  return (
    <div style={{height: "180px"}}>
      {springs.map((style, i) => (
        <animated.div
          key={colors[i]}
          style={{ ...style, background: colors[i] }}
        ></animated.div>
      ))}

      <button
        onClick={() => {
          setOpen(!open)
        }}
      >
        toggle
      </button>
    </div>
  )
}
