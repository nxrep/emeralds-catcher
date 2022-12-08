import { SpikedBall } from '../models/SpikedBall';
import { Emerald } from '../models/Emerald';
import { TrackHalfpipe } from '../models/TrackHalfpipe';
import { Item } from '../types';

type Props = {
  playfieldItems: Item[];
};

const Playfield = ({ playfieldItems }: Props): React.ReactElement => {
  return (
    <>
      <TrackHalfpipe position={[0, 0, 2]} />
      <TrackHalfpipe position={[0, 0, -198]} />
      <TrackHalfpipe position={[0, 0, -398]} />

      {playfieldItems
        .filter(item => item.model.includes('EMERALD'))
        .map(
          item => item.active && <Emerald position={[-2 + item.position * 2, 1.6, -item.index - 2]} key={item.index} />,
        )}
      {playfieldItems
        .filter(item => item.model.includes('BOMB'))
        .map(
          item =>
            item.active && <SpikedBall position={[-2 + item.position * 2, 1.7, -item.index - 2]} key={item.index} />,
        )}
    </>
  );
};
export default Playfield;
