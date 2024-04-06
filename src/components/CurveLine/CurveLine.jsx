import React from 'react'

const CurveLine = ({ startPoint, endPointX, endPointY, color }) => {
  // Формируем координаты управляющей точки для кривой Безье
  const controlX = (startPoint.x + endPointX) / 2
  const controlY = startPoint.y - 4

  // Формируем атрибут d для элемента path
  const pathData = `M ${startPoint.x} ${startPoint.y} Q ${controlX} ${controlY}, ${endPointX} ${endPointY}`

  return (
    <path d={pathData} stroke={color || 'black'} fill="none" strokeWidth={2} />
  )
}

export default CurveLine
