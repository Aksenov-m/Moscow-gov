import React from 'react'
import CurveLine from '../CurveLine/CurveLine' // Импортируем компонент CurveLine

const LinesContainer = () => {
  const colorOrange = 'rgba(255, 122, 0, 1)'
  const colorViolet = 'rgba(143, 89, 185, 1)'
  // Координаты начальной точки
  const startPoint = { x: 50, y: 50 }

  // Массив с координатами конечных точек для каждой линии
  const endPoints = [
    { x: 100, y: 200 },
    { x: 200, y: 150 },
    { x: 250, y: 300 },
    // Добавьте больше объектов, если нужно
  ]

  return (
    <svg>
      {/* Рендерим кривые линии для каждой пары начальной и конечной точек */}
      {endPoints.map((endPoint, index) => (
        <CurveLine
          key={index}
          startPoint={startPoint}
          endPoint={endPoint}
          //   color={colorOrange}
        />
      ))}
    </svg>
  )
}

export default LinesContainer
