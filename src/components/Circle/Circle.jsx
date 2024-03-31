import { useEffect, useState } from 'react'
import styles from './Circle.module.css' // Подключаем модульные стили

function Circle({
  sizeClass,
  colorClass,
  text,
  angle,
  radius,
  handleClick,
  index,
  active,
  circleStates,
}) {
  const radiusSmall = 135.315
  const radiusLarge = 266.625
  const [clickedIndex, setClickedIndex] = useState(null) // Состояние для отслеживания индекса круга, на который произошел клик
  // const [isActive, setIsActive] = useState(false)
  // const [isActiveLarge, setIsActiveLarge] = useState(false)
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

  const circleClick = (e) => {
    handleClick(angle, index, e) // Вызываем функцию handleClick с передачей угла и индекса текущего круга
    setClickedIndex(index) // Устанавливаем состояние clickedIndex в индекс текущего круга
  }

  return (
    <div
      className={`${styles.circle} ${styles[sizeClass]} ${styles[colorClass]} 
      ${circleStates ? `${(styles.green, styles.active)}` : ''} ${
        active && radius !== radiusSmall ? styles.redActive : ''
      } ${circleStates && radius !== radiusSmall ? styles.activeLarge : ''}`}
      style={circleStyle}
      onClick={circleClick}
    >
      <p
        className={`${styles.text} 
        ${radius === radiusSmall ? styles.textSmall : ''}
        ${circleStates && radius === radiusSmall ? styles.activeText : ''}
        ${circleStates && radius !== radiusSmall ? styles.activeTextLarge : ''}
        ${active ? styles.activeTextLarge : ''}
        `}
        style={textPosition}
      >
        {index} {text}
      </p>
    </div>
  )
}

export default Circle
