import React from 'react'
import styles from './PointList.module.css'
import Circle from '../Circle/Circle'

const PointList = ({ data, allSkills }) => {
  const radiusSmall = 135.315
  const radiusLarge = 266.625
  const numPointsSmall = data.length // Количество точек внутренних
  const numPointsLarge = allSkills.length
  return (
    <div className={styles.roundContainer}>
      <div className={styles.circleContainerSmall}>
        {data.map((item, index) => (
          <Circle
            key={index}
            sizeClass={'small'}
            colorClass={'grey'}
            text={item.name}
            angle={(Math.PI * 2 * index) / numPointsSmall} // Распределение точек по окружности
            radius={radiusSmall}
          />
        ))}
      </div>
      <div className={styles.circleContainerSmall}>
        {allSkills.map((item, index) => (
          <Circle
            key={index}
            sizeClass={'large'}
            colorClass={'red'}
            text={item}
            angle={(Math.PI * 2 * index) / numPointsLarge} // Распределение точек по окружности
            radius={radiusLarge}
          />
        ))}
      </div>
      <div className={styles.outerCircle}></div>
      <div className={styles.innerCircle}></div>
    </div>
  )
}

export default PointList
