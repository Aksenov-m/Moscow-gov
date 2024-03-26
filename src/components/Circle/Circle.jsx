import React from 'react'
import styles from './Circle.module.css' // Подключаем модульные стили

function Circle({ sizeClass, colorClass, text, angle, radius, handleClick }) {
  // Преобразуем угол в градусы
  const angleInDegrees = angle * (180 / Math.PI)
  const center = 23.7 / 2
  const circleRadius = radius
  const centerX = 533.25 / 2 - center // координата центра по X
  const centerY = 533.25 / 2 - center // координата центра по Y
  // const angleInDegrees = angle * (Math.PI / 180)
  const circleStyle = {
    position: 'absolute',
    // top: `calc(50% + ${radius}px * ${Math.sin(
    //   angleInDegrees,
    // )} - ${radius}px * ${Math.sin(angleInDegrees)})`,
    // left: `calc(50% + ${radius}px * ${Math.cos(
    //   angleInDegrees,
    // )} - ${radius}px * ${Math.cos(angleInDegrees)})`,
    top: `calc(${centerX}px + ${circleRadius}px * ${Math.cos(angle)})`,
    left: `calc(${centerY}px + ${circleRadius}px * ${Math.sin(angle)})`,
  }

  let textPosition = {}

  switch (true) {
    case angleInDegrees === 0:
      textPosition = { bottom: '-65px', top: 'auto' }
      break
    case angleInDegrees === 180:
      textPosition = { bottom: 'auto', top: '-40px' }
      break
    case angleInDegrees < 180:
      textPosition = { left: '70px', right: 'auto', top: 'auto' }
      break
    default:
      textPosition = { left: '-40px', right: 'auto', top: 'auto' }
      break
  }

  function circleClick(e) {
    handleClick(angleInDegrees, e)
    // console.log(angleInDegrees, e.target)
  }

  // handleClick = { processPayment }

  // console.log(angleInDegrees, Math.sin(angleInDegrees))
  return (
    <div
      className={`${styles.circle} ${styles[sizeClass]} ${styles[colorClass]}`}
      style={circleStyle}
      onClick={circleClick}
    >
      <p className={styles.text} style={textPosition}>
        {text}
      </p>
    </div>
  )
}

export default Circle
