import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { fakeFetchData } from './api'
import PointList from './components/PointList/PointList'

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [allSkills, setAllSkills] = useState([])
  const [circleInfo, setCircleInfo] = useState({})

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fakeFetchData()
      setData(result)

      // Собираем все навыки
      let allSkillsArray = []
      result.forEach((item) => {
        allSkillsArray = allSkillsArray.concat(
          item.mainSkills,
          item.otherSkills,
        )
      })

      // Получаем уникальные навыки с помощью Set
      const uniqueSkillsSet = new Set(allSkillsArray)
      const uniqueSkillsArray = Array.from(uniqueSkillsSet)

      // Ограничиваем массив уникальными навыками до 18 элементов
      const limitedUniqueSkillsArray = uniqueSkillsArray.slice(0, 18)

      setAllSkills(limitedUniqueSkillsArray) // Устанавливаем состояние уникальных навыков
      setLoading(false)
    }
    preload()
  }, [])

  // Функция для извлечения числового значения из строки
  function extractNumericValue(string) {
    const matches = string.match(/-?\d+\.?\d*/) // Ищем числовые символы
    return matches ? parseFloat(matches[0]) : NaN // Возвращаем первое найденное числовое значение или NaN
  }

  function handleCircleClick(angle, e) {
    const clickedText = e.target.innerText // Получаем текст элемента, на который произошел клик
    const topValue = extractNumericValue(e.target.style.top) // Получаем значение top
    const leftValue = extractNumericValue(e.target.style.left) // Получаем значение left
    const clickInfo = {
      angle: angle,
      text: clickedText,
      y: topValue,
      x: leftValue,
    }
    setCircleInfo(clickInfo)
    console.log(clickInfo)
  }

  return (
    <>
      <PointList
        data={data}
        allSkills={allSkills}
        handleClick={handleCircleClick}
      ></PointList>
    </>
  )
}

export default App
