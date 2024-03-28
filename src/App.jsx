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
  const [filteredData, setFilteredData] = useState([])
  const [filteredSkills, setFilteredSkills] = useState([])

  const arrConstraint = 18
  const lastIndex = 18 - 1

  // const k = arrConstraint / data.length // коэфициент

  function replaceArrayPart(startMiddle, start, deleteCount, ...elem) {
    const newArr = [...allSkills] // Создаем копию исходного массива
    if (startMiddle === 0 || start <= 0) {
      // Замена элементов с обоих концов массива
      for (let i = 0; i < Math.floor(elem.length / 2); i++) {
        newArr[i] = elem[i] // Замена элементов с начала массива
        newArr[newArr.length - 1 - i] = elem[elem.length - 1 - i] // Замена элементов с конца массива
      }

      // Добавление центрального элемента elem к одному из концов массива
      if (elem.length % 2 !== 0) {
        // Добавление центрального элемента elem в начало массива
        newArr.unshift(elem[Math.floor(elem.length / 2)])
      } else {
        // Добавление центрального элемента elem в конец массива
        newArr.push(elem[Math.floor(elem.length / 2)])
      }
      return newArr
    } else {
      debugger
      newArr.splice(start, deleteCount, ...elem)
      return newArr
      // Используем splice для замены части массива}
      // const newArr = [...arr] // Создаем копию исходного массива
    }
  }

  // function replaceArrayPart(arr, start, deleteCount, ...elem) {
  //   // Создаем копию исходного массива
  //   const newArr = [...arr]

  //   // Обрабатываем замену элементов, начиная с заданного индекса
  //   for (let i = 0; i < deleteCount; i++) {
  //     const index = (start + i) % newArr.length // Получаем текущий индекс с учетом прокрутки до начала массива
  //     newArr[index] = elem[i] // Заменяем элемент в массиве
  //   }

  //   return newArr
  // }

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fakeFetchData()
      setData(result)
      setFilteredData(result)

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
      const limitedUniqueSkillsArray = uniqueSkillsArray.slice(0, arrConstraint)

      setAllSkills(limitedUniqueSkillsArray) // Устанавливаем состояние уникальных навыков
      setFilteredSkills(limitedUniqueSkillsArray)
      setLoading(false)
    }
    preload()
  }, [])

  // Функция для извлечения числового значения из строки
  function extractNumericValue(string) {
    const matches = string.match(/-?\d+\.?\d*/) // Ищем числовые символы
    return matches ? parseFloat(matches[0]) : NaN // Возвращаем первое найденное числовое значение или NaN
  }

  function handleCircleClick(angle, index, e) {
    const clickedText = e.target.innerText // Получаем текст элемента, на который произошел клик
    const topValue = extractNumericValue(e.target.style.top) // Получаем значение top
    const leftValue = extractNumericValue(e.target.style.left) // Получаем значение left
    const clickInfo = {
      angle: angle,
      index: index,
      text: clickedText,
      y: topValue,
      x: leftValue,
    }
    setCircleInfo(clickInfo)
  }

  useEffect(() => {
    if (data.length > 0 && circleInfo.index !== undefined) {
      const k = arrConstraint / data.length
      const i = circleInfo.index
      const element = data[i]
      if (element) {
        const arrSkills = [...element.mainSkills, ...element.otherSkills]
        const startMiddle = Math.round(i * k)
        const startIndex = Math.round(i * k - (element.mainSkills.length + 1))
        // i === 0
        //   ? lastIndex - element.mainSkills.length
        //   : Math.round(i * k - element.mainSkills.length)
        const correctedStartIndex =
          startIndex < 0 ? allSkills.length + startIndex - 1 : startIndex
        const newSkills = replaceArrayPart(
          startMiddle,
          startIndex,
          arrSkills.length,
          ...arrSkills,
        )
        debugger
        setFilteredSkills(newSkills)
        console.log(
          startMiddle,
          // newSkills,
          // i,
          // start,
          // startIndex,
          // element.mainSkills.length,
          // correctedStartIndex,
          // arrSkills.length,
          // arrSkills,
          // newSkills,
        )
      }
    }
  }, [circleInfo, data])

  return (
    <>
      <PointList
        data={filteredData}
        allSkills={filteredSkills}
        handleClick={handleCircleClick}
      ></PointList>
    </>
  )
}

export default App
