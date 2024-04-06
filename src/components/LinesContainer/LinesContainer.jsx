import React from 'react'
import CurveLine from '../CurveLine/CurveLine' // Импортируем компонент CurveLine
import styles from './LinesContainer.module.css' // Подключаем модульные стили

const LinesContainer = ({
  circleInfo,
  circleLargeInfo,
  coordinatesStart,
  coordinates,
  data,
  allSkills,
}) => {
  const colorOrange = 'rgba(255, 122, 0, 1)'
  const colorViolet = 'rgba(143, 89, 185, 1)'
  // const colorLine =
  // const xStart = circleInfo.x || circleLargeInfo.x
  // const yStart = circleInfo.y || circleLargeInfo.y
  // Координаты начальной точки
  // const startPoint = { xStart, yStart }
  const startPoint = {
    x: coordinatesStart.x,
    y: coordinatesStart.y,
  }
  // Массив с координатами конечных точек для каждой линии

  return (
    <svg className={styles.svgContainer}>
      {/* Рендерим кривые линии для каждой пары начальной и конечной точек */}
      {Array.isArray(coordinates) &&
        coordinates.map((endPoint, index) => (
          <CurveLine
            key={index}
            startPoint={startPoint}
            endPointX={endPoint.x}
            endPointY={endPoint.y}
            color={endPoint.color === 'colorOrange' ? colorOrange : colorViolet}
          />
        ))}
    </svg>
  )
}

export default LinesContainer
