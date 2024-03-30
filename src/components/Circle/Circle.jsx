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
}) {
  const radiusSmall = 135.315
  const radiusLarge = 266.625
  const [isActive, setIsActive] = useState(false)
  const [isActiveLarge, setIsActiveLarge] = useState(false)
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

  // function activeClick(currentCircle) {
  //   // Снимаем активность с предыдущего круга
  //   const circles = document.querySelectorAll(`.${styles.circle}`)
  //   circles.forEach((circle) => {
  //     if (circle !== currentCircle) {
  //       circle.classList.remove(styles.active)
  //     }
  //   })
  // }

  function circleClick(e) {
    const currentCircle = e.currentTarget
    debugger

    // Снимаем класс active с предыдущего круга
    const circles = document.querySelectorAll(`.${styles.circle}`)
    const texts = document.querySelectorAll(`.${styles.text}`)

    circles.forEach((circle) => {
      if (circle !== currentCircle) {
        circle.classList.remove(
          styles.active,
          styles.activeLarge,
          styles.redActive,
        )
      }
    })

    texts.forEach((text) => {
      if (text.parentNode !== currentCircle) {
        text.classList.remove(styles.activeText, styles.activeTextLarge)
      }
    })
    // Добавляем класс active к текущему кругу
    // currentCircle.classList.add(styles.active)
    if (radius === radiusSmall) {
      setIsActive(true)
    } else {
      setIsActiveLarge(true)
    }
    handleClick(angle, index, e)
  }

  // useEffect(() => {
  //   activeClick()
  // }, [isActive])

  // handleClick = { processPayment }

  // console.log(angleInDegrees, Math.sin(angleInDegrees))

  // Добавляем классы green и redActive в зависимости от свойств active и radius
  // let circleClasses = `${styles.circle} ${styles[sizeClass]} ${styles[colorClass]}`

  // if (active && radius === 135.315) {
  //   circleClasses += ` ${styles.green}`
  // } else {
  //   circleClasses += ` ${styles.redActive}`
  // }

  return (
    <div
      className={`${styles.circle} ${styles[sizeClass]} ${styles[colorClass]} ${
        active && radius === radiusSmall
          ? styles.green
          : active && radius !== radiusSmall
          ? styles.redActive
          : ''
      } ${isActive ? styles.active : ''} ${
        isActiveLarge ? styles.activeLarge : ''
      }`}
      style={circleStyle}
      onClick={circleClick}
    >
      <p
        className={`${styles.text} ${
          radius === radiusSmall ? styles.textLarge : styles.text
        }
        ${isActive ? styles.activeTextLarge : ''}
        ${isActiveLarge ? styles.activeText : ''}
        `}
        style={textPosition}
      >
        {index} {text}
      </p>
    </div>
  )
}

export default Circle
