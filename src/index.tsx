import styled from '@emotion/styled'
import UseChain from './UseChain'
import UseSpring from './UseSpring'
import AAUseSpringssss from './UseSprings'
import { UseTrail } from './UseTrail'
import ZZUseTransition from './Transition'

const Block = styled.div`
  margin: 1rem 0;
  border: 1px solid red;
`

export default function ReactSpring() {
  return (
    <div>
      {/* <Block>
        <h1>UseSpring</h1>
        <UseSpring />
      </Block>

      <Block>
        <h1>UseSprings</h1>
        <AAUseSpringssss />
      </Block>

      <Block>
        <h1>UseSprings</h1>
        <UseTrail />
      </Block>

      <Block>
        <h1>useChain</h1>
        <UseChain />
      </Block> */}

      <Block>
        <h1>useTransition</h1>
        <ZZUseTransition />
      </Block>
    </div>
  )
}
