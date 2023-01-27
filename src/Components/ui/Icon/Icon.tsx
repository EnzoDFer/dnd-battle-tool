import { Movable } from '../../util/Movable';
import styles from './Icon.module.scss';

type TIconProps = {

}

export default function Icon( ): JSX.Element {
  
  return (
    <Movable>
      <div
        className={styles.iconWrapper}
      />
    </Movable>
  )
}
