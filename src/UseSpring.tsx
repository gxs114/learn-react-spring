import { useState } from 'react'
import { useSpring, animated, config } from 'react-spring'

export default function UseSpring() {
  return (
    <div>
      <Base />
      <Queue />
    </div>
  )
}

// 只有在useSprings这个允许使用多个动画属性配置的hook中，key才会作为回调函数的参数
// interface useSpringsProps {
//   // 动画的起始值
//   from?: object
//   // 动画的终点值
//   to?: object | key => object | Array<object>
//   // 动画开始的延迟时间
//   delay?: number | key => number
//   // 如果为真，则停止动画(直接跳转到结束状态)
//   immediate?: boolean | key => boolean
//   // 如果为true，将跳过渲染组件，直接写入dom
//   native?: boolean default false
//   // 弹簧的基本属性(影响动画的速度、轨迹等)
//   config?: SpringConfig | key => SpringConfig
//   //  是否重头开始重新执行动画，只有设置reset才能达到想要的过渡动画效果
//   reset?: boolean default false
//   // 如果为真，from和to设置的值将会对换，该属性只能和reset一起使用才能达到预期效果
//   reverse?: boolean default false
//   // 动画开始时执行
//   onStart?: (ds: DS) => void
//   // 所有动画都停止时执行
//   onRest?: (ds: DS) => void
//   // 动画执行过程中，每一帧间隔执行
//   onFrame?: (ds: DS) => void
// }

// interface SpringConfig {
//   // 弹簧质量，即：与动画的加速度有关，mass的值越大，动画执行的速度也会随着执行的时间越变越大
//   mass?: number default 1
//   // 弹簧张力，影响整体速度，即：动画在有一个点向下一个点运动时，递增的步长(受张力影响)如果过大，就会一下子超过范围，在下一点回来时又会距离终点较远，导致在同一点周围来回运动
//   // 即使是线性运动的过渡效果，设置tension之后可以实现曲线运动
//   tension?: number  default 170
//   // 摩擦力(阻力)，即动画执行时的反向加速度，可以与mass、tension的效果相互抵消
//   friction?: number default 26
//   // 动画执行速度
//   velocity?: number default 0
//   // 当动画弹簧越过边界时，是否立即结束动画
//   clamp?: boolean default false
//   // 准确率
//   precision?: number default 0.01
//   // 动画开始的延迟
//   delay?: number
//   // 当duration大于0时，动画将在规定的时间范围内执行，一旦超过就结束动画；否则将一直执行到动画结束，没有时间限制
//   duration?: number default undefined | 0 ms
//   // 缓动函数，默认是线性的，可以换成其他的如d3-ease(动画运行轨迹函数)
//   easing?: (t: number) => number default false
// }
function Base() {
  const [open, setOpen] = useState(true)
  const style = useSpring({
    from: { opacity: 1, color: 'red', background: 'pink', width: 0 },
    to: { opacity: 1, color: 'orange', background: 'slateblue', width: 500 },
    delay: 200,
    // loop: true,
    reset: true,
    reverse: open,
    onRest: () => setOpen(!open),
    config: config.molasses
  })
  return (
    <animated.div
      style={{
        ...style,
        padding: '30px 0',
        borderTopRightRadius: '200px',
        borderBottomRightRadius: '200px'
      }}
    >
      {/* 只能有一个子元素 */}
      {/* 如果是 to 这种的就会有过度数字的效果 */}
      {style.width.to(x => x.toFixed(2))}
    </animated.div>
  )
}

function Queue() {
  // const [open, setOpen] = useState(true)
  const style = useSpring({
    from: { width: 200, background: 'pink' },
    to: async (next, cancel) => {
      await next({ width: 400, background: 'hotpink' })
      await next({ width: 600, background: 'slateblue' })
      await next({ width: 200, background: 'orange' })
    },
    loop: true,
    // reset: true,
    // reverse: open,
    // onRest: () => setOpen(!open),
    config: {
      ...config.default,
      duration: 1000
    }
  })
  return (
    <animated.div
      style={{
        ...style,
        marginTop: '1rem',
        padding: '30px 0',
        borderTopRightRadius: '200px',
        borderBottomRightRadius: '200px'
      }}
    >
      阶段性动画
    </animated.div>
  )
}
