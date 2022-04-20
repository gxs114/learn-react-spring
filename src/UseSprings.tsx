import { useState } from 'react'
import { useSprings, animated } from 'react-spring'

const categorys = [
  {
    color: 'red',
    from: {
      width: '1px'
    },
    to: {
      width: '160px'
    },
    config: {
      mass: 20
    }
  },
  {
    color: 'green',
    from: {
      width: '1px'
    },
    to: {
      width: '160px'
    },
    config: {
      mass: 1
    }
  },
  {
    color: 'blue',
    from: {
      width: '1px'
    },
    to: {
      width: '160px'
    },
    config: {
      mass: 6
    }
  },
  {
    color: 'orange',
    from: {
      width: '1px'
    },
    to: {
      width: '240px'
    },
    config: {
      mass: 13
    }
  },
  {
    color: 'purple',
    from: {
      width: '1px'
    },
    to: {
      width: '200px'
    },
    config: {
      mass: 13,
      clamp: true
    }
  },
  {
    color: 'yellow',
    from: {
      width: '1px'
    },
    to: {
      width: '260px'
    },
    config: {
      mass: 10
    }
  }
]

export default function UseSprings() {
  const [visible, setVisible] = useState(true)
  const springs = useSprings(
    6,
    categorys.map(({ color, ...config }) => ({
      ...config,
      reset: true,
      reverse: visible
    }))
  )
  console.log(visible)
  return (
    <div>
      123
      {springs.map((spring, index) => {
        return (
          <animated.div
            key={categorys[index].color}
            className="spring"
            style={{
              ...spring,
              backgroundColor: categorys[index].color
            }}
          >
            <div style={{height: "50px"}}></div>
          </animated.div>
        )
      })}
      <button
        onClick={() => {
          console.log('??')
          setVisible(v => !v)
        }}
      >
        切换
      </button>
    </div>
  )
}
