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
  search,
}) {
  const radiusSmall = 135.315
  const radiusLarge = 266.625
  const circleDiameter = 23.7
  const circleDiameterLarge = 27.53

  const [clickedIndex, setClickedIndex] = useState(null) // Состояние для отслеживания индекса круга, на который произошел клик
  // const [isActive, setIsActive] = useState(false)
  // const [isActiveLarge, setIsActiveLarge] = useState(false)
  // Преобразуем угол в градусы
  const angleInDegrees = angle * (180 / Math.PI)
  const center =
    radius === radiusSmall ? circleDiameter / 2 : circleDiameterLarge / 2
  const circleRadius = radius
  const centerX = 533.25 / 2 - center // координата центра по X
  const centerY = 533.25 / 2 - center // координата центра по Y

  const top = centerY + circleRadius * Math.cos(angle)
  const left = centerX + circleRadius * Math.sin(angle)

  const circleStyle = {
    position: 'absolute',

    top: `${top}px`,
    left: `${left}px`,
  }

  const x =
    left +
    (radius === radiusSmall ? circleDiameter / 2 : circleDiameterLarge / 2)
  const y =
    top +
    (radius === radiusSmall ? circleDiameter / 2 : circleDiameterLarge / 2)

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

  // const x = circleRadius * Math.cos(angle)
  // const y = circleRadius * Math.sin(angle)

  const circleClick = (e) => {
    handleClick(x, y, index, e, angleInDegrees) // Вызываем функцию handleClick с передачей угла и индекса текущего круга
    setClickedIndex(index) // Устанавливаем состояние clickedIndex в индекс текущего круга
  }

  return (
    <div
      className={`${styles.circle} ${styles[sizeClass]} ${styles[colorClass]} 
      ${circleStates ? `${(styles.green, styles.active)}` : ''} ${
        active && radius !== radiusSmall ? styles.redActive : ''
      } ${circleStates && radius !== radiusSmall ? styles.activeLarge : ''} ${
        search ? styles.green : ''
      }`}
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
        {text}
      </p>
    </div>
  )
}

export default Circle
