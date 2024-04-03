import React from 'react'
import CurveLine from '../CurveLine/CurveLine' // Импортируем компонент CurveLine
import styles from './LinesContainer.module.css' // Подключаем модульные стили

const LinesContainer = ({ circleInfo, circleLargeInfo, data, allSkills }) => {
  const colorOrange = 'rgba(255, 122, 0, 1)'
  const colorViolet = 'rgba(143, 89, 185, 1)'
  // const colorLine =
  // const xStart = circleInfo.x || circleLargeInfo.x
  // const yStart = circleInfo.y || circleLargeInfo.y
  // Координаты начальной точки
  // const startPoint = { xStart, yStart }
  const startPoint = {
    x: 268,
    y: 348,
  }
  // Массив с координатами конечных точек для каждой линии
  const endPoints = [
    { x: 100, y: 200 },
    { x: 200, y: 150 },
    { x: 250, y: 300 },
    // Добавьте больше объектов, если нужно
  ]
  // const endPoints = [
  //   { x: 100, y: 200, colorLine: },
  //   { x: 200, y: 150, colorLine: },
  //   { x: 250, y: 300,  colorLine: },
  //   // Добавьте больше объектов, если нужно
  // ]

  return (
    <svg className={styles.svgContainer}>
      {/* Рендерим кривые линии для каждой пары начальной и конечной точек */}
      {endPoints.map((endPoint, index) => (
        <CurveLine
          key={index}
          startPoint={startPoint}
          endPoint={endPoint}
          // color={colorLine}
        />
      ))}
    </svg>
  )
}

export default LinesContainer
