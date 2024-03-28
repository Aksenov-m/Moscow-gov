import React from 'react'
import styles from './PointList.module.css'
import Circle from '../Circle/Circle'
import LinesContainer from '../LinesContainer/LinesContainer'

const PointList = ({ data, allSkills, handleClick }) => {
  const radiusSmall = 135.315
  const radiusLarge = 266.625
  const numPointsSmall = data.length // Количество точек внутренних
  const numPointsLarge = allSkills.length
  const circleGap = 20 // Расстояние между кругами
  const centerYSmall = 533.25 / 2
  const centerYLarge = 533.25 / 2
  return (
    <div className={styles.roundContainer}>
      {/* Рендерим круги маленького размера */}
      <div className={styles.circleContainerSmall}>
        {data.map((item, index) => (
          <Circle
            key={index}
            index={index}
            sizeClass={'small'}
            colorClass={'grey'}
            text={item.name}
            angle={(Math.PI * 2 * index) / numPointsSmall} // Распределение точек по окружности
            radius={radiusSmall}
            handleClick={handleClick}
          />
        ))}
      </div>
      <div className={styles.circleContainerSmall}>
        {/* Рендерим круги большого размера */}
        {allSkills.map((item, index) => (
          <Circle
            key={index}
            index={index}
            sizeClass={'large'}
            colorClass={'red'}
            text={item}
            angle={(Math.PI * 2 * index) / numPointsLarge} // Распределение точек по окружности
            radius={radiusLarge}
            handleClick={handleClick}
          />
        ))}
      </div>
      <div className={styles.outerCircle}></div>
      <div className={styles.innerCircle}></div>
      {/* Рендерим линии между рядами */}
      <LinesContainer />
    </div>
  )
}

export default PointList
