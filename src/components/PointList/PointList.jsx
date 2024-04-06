import React from 'react'
import styles from './PointList.module.css'
import Circle from '../Circle/Circle'
import LinesContainer from '../LinesContainer/LinesContainer'

const PointList = ({
  data,
  allSkills,
  handleClick,
  handleLargeClick,
  circleStates,
  circleStatesLarge,
  circleInfo,
  circleLargeInfo,
  coordinatesStart,
  coordinates,
}) => {
  const radiusSmall = 135.315
  const radiusLarge = 266.625
  const numPointsSmall = data.length // Количество точек внутренних
  const numPointsLarge = allSkills.length
  const circleGap = 20 // Расстояние между кругами
  const centerYSmall = 533.25 / 2
  const centerYLarge = 533.25 / 2

  return (
    <div className={styles.roundContainer} id="roundContainer">
      {/* Рендерим круги маленького размера */}
      <div className={styles.circleContainerSmall}>
        {data.map((item, index) => (
          <Circle
            key={index}
            active={
              typeof item === 'object' && item.active ? item.active : false
            }
            index={index}
            sizeClass={'small'}
            colorClass={'grey'}
            text={item.name || item.text}
            angle={(Math.PI * 2 * index) / numPointsSmall} // Распределение точек по окружности
            radius={radiusSmall}
            handleClick={handleClick}
            circleStates={circleStates[index]}
            search={typeof item === 'object' && item.search && true}
          />
        ))}
      </div>
      <div className={styles.circleContainerSmall}>
        {/* Рендерим круги большого размера */}
        {allSkills.map((item, index) => (
          <Circle
            key={index}
            active={typeof item === 'object' && item.active && true}
            index={index}
            sizeClass={'large'}
            colorClass={'red'}
            text={typeof item === 'object' ? item.text : item}
            angle={(Math.PI * 2 * index) / numPointsLarge}
            radius={radiusLarge}
            handleClick={handleLargeClick}
            circleStates={circleStatesLarge[index]}
          />
        ))}
      </div>
      <div className={styles.outerCircle}></div>
      <div className={styles.innerCircle}></div>
      {/* Рендерим линии между рядами */}
      <LinesContainer
        circleInfo={circleInfo}
        circleLargeInfo={circleLargeInfo}
        data={data}
        allSkills={allSkills}
        coordinatesStart={coordinatesStart}
        coordinates={coordinates}
      />
    </div>
  )
}

export default PointList
