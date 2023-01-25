import { Movable } from '../../util/Movable';
import styles from './Icon.module.scss';

type TIconProps = {
  ref: React.RefObject<HTMLDivElement>
}

export default function Icon( {ref}: TIconProps ): JSX.Element {
  
  return (
    <Movable>
      <div
        ref = {ref}
        className={styles.iconWrapper}
      />
    </Movable>
  )
}
