import React from 'react'

const CurveLine = ({ startPoint, endPoint, color }) => {
  // Формируем координаты управляющей точки для кривой Безье
  const controlX = (startPoint.x + endPoint.x) / 2
  const controlY = startPoint.y - 50

  // Формируем атрибут d для элемента path
  const pathData = `M ${startPoint.x} ${startPoint.y} Q ${controlX} ${controlY}, ${endPoint.x} ${endPoint.y}`

  return (
    <path d={pathData} stroke={color || 'black'} fill="none" strokeWidth={2} />
  )
}

export default CurveLine
