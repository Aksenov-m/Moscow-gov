import React, { useState, useEffect } from 'react'
import styles from './CurveLine.module.css' // Подключаем модуль стилей

const CurveLine = ({ startPoint, endPointX, endPointY, color }) => {
  // Создаем состояние для хранения класса
  const [curveLineClass, setCurveLineClass] = useState(styles.curveLine)

  const controlX = (startPoint.x + endPointX) / 2
  const controlY = startPoint.y - 4

  const pathData = `M ${startPoint.x} ${startPoint.y} Q ${controlX} ${controlY}, ${endPointX} ${endPointY}`

  return (
    <path
      d={pathData}
      stroke={color || 'black'}
      fill="none"
      strokeWidth={2}
      className={curveLineClass} // Используем класс из CSS модуля
    />
  )
}

export default CurveLine
