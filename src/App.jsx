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
  const [circleLargeInfo, setCircleLargeInfo] = useState({})
  const [filteredData, setFilteredData] = useState([])
  const [filteredSkills, setFilteredSkills] = useState([])
  // let initialStates = (i) => Array(i).fill(false)
  const [circleStates, setCircleStates] = useState(Array(10).fill(false)) // Массив состояний для каждого круга
  const arrConstraint = 18
  const lastIndex = 18 - 1
  const [circleStatesLarge, setCircleStatesLarge] = useState(
    Array(18).fill(false),
  ) // Массив состояний для каждого круга

  const k = arrConstraint / data.length // коэфициент
  function replaceArrayPart(arr, startMiddle, start, deleteCount, ...elem) {
    const newArr = [...arr] // Создаем копию исходного массива
    if (startMiddle === 0) {
      // Замена элементов с обоих концов массива
      for (let i = 0; i < Math.floor(elem.length / 2); i++) {
        newArr[i] = elem[i] // Замена элементов с начала массива
        newArr[newArr.length - 1 - i] = elem[elem.length - 1 - i] // Замена элементов с конца массива
      }
      // Добавление центрального элемента elem к одному из концов массива
      if (elem.length % 2 !== 0) {
        // Добавление центрального элемента elem в начало массива
        newArr.unshift(elem[Math.floor(elem.length / 2)])
      }
      // else {
      //   // Добавление центрального элемента elem в конец массива
      //   newArr.push(elem[Math.floor(elem.length / 2)])
      // }
      return newArr
    }
    if (start < 0) {
      const absStartMiddle = Math.abs(startMiddle)

      // Замена элементов из конца массива newArr
      for (let i = 0; i < absStartMiddle; i++) {
        newArr[newArr.length - 1 - i] = elem[i]
      }

      // Замена оставшихся элементов из массива elem в начале массива newArr
      for (let i = absStartMiddle; i < elem.length; i++) {
        newArr[i - absStartMiddle] = elem[i]
      }

      return newArr
    } else if (elem.length + start > lastIndex) {
      const startForward = start + elem.length - arr.length

      // Замена элементов из начала массива newArr
      for (let i = 0; i < startForward; i++) {
        newArr[i] = elem[i]
      }

      // Замена оставшихся элементов из массива elem в конце массива newArr
      for (let i = 0; i < elem.length - startForward; i++) {
        newArr[newArr.length - elem.length + startForward + i] =
          elem[startForward + i]
      }

      return newArr
    } else {
      newArr.splice(start, deleteCount, ...elem)
      return newArr
    }
  }

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

  // const resetCircleStates = (setStates) => {
  //   setStates(Array(setStates.length).fill(false))
  // }

  function handleCircleClick(angle, index, e) {
    setCircleStatesLarge(Array(circleStatesLarge.length).fill(false))
    setCircleStates((prevStates) => {
      const newStates = prevStates.map((state, i) => i === index) // Устанавливаем true только для круга с заданным индексом
      return newStates
    })
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
    console.log(clickInfo)
  }

  function handleCircleLargeClick(angle, index, e) {
    setCircleStates(Array(circleStates.length).fill(false))
    setCircleStatesLarge((prevStates) => {
      const newStates = prevStates.map((state, i) => i === index) // Устанавливаем true только для круга с заданным индексом
      return newStates
    })
    // Удаление ключа 'active' из элементов в массиве filteredSkills, если он присутствует
    const updatedFilteredSkills = filteredSkills.map((skill) => {
      if (skill.hasOwnProperty('active')) {
        const { active, ...rest } = skill // Разделяем свойства объекта, оставляя только те, которые не 'active'
        return rest
      }
      return skill // Если ключ 'active' отсутствует, возвращаем объект без изменений
    })

    const clickedText = e.target.innerText
    const topValue = extractNumericValue(e.target.style.top)
    const leftValue = extractNumericValue(e.target.style.left)
    const clickInfo = {
      angle: angle,
      index: index,
      text: clickedText,
      y: topValue,
      x: leftValue,
    }
    setFilteredSkills(updatedFilteredSkills) // Устанавливаем новый массив без ключа 'active'
    debugger
    setCircleLargeInfo(clickInfo)
  }

  useEffect(() => {
    if (data.length > 0 && circleInfo.index !== undefined) {
      // const k = arrConstraint / data.length
      const i = circleInfo.index
      const element = data[i]
      if (element) {
        const arrSkills = [
          ...element.mainSkills.map((skill) => ({
            text: skill,
            active: true,
            skills: 'main',
          })),
          ...element.otherSkills.map((skill) => ({
            text: skill,
            active: true,
            skills: 'other',
          })),
        ]
        const startMiddle = Math.round(i * k)
        const startIndex = Math.round(startMiddle - arrSkills.length / 2)
        // i === 0
        //   ? lastIndex - element.mainSkills.length
        //   : Math.round(i * k - element.mainSkills.length)
        const correctedStartIndex = startIndex < 0 ? startIndex + 1 : startIndex
        const newSkills = replaceArrayPart(
          allSkills,
          startMiddle,
          correctedStartIndex,
          arrSkills.length,
          ...arrSkills,
        )
        setFilteredSkills(newSkills)
      }
    }
  }, [circleInfo, data])

  function searchArray(arr, large) {
    const searchText = large.text

    const result = arr.filter((item) => {
      // Проверяем, присутствует ли искомый текст хотя бы в одном из массивов mainSkills или otherSkills данного объекта
      return (
        item.mainSkills.includes(searchText) ||
        item.otherSkills.includes(searchText)
      )
    })

    // Если найдены соответствующие объекты, добавляем ключ active: search для каждого объекта
    const updatedResult = result.map((item) => ({
      ...item,
      search: true,
    }))

    return updatedResult
  }
  console.log(circleLargeInfo)

  useEffect(() => {
    const i = circleLargeInfo.index
    const searcData = searchArray(data, circleLargeInfo)
    const startMiddle = Math.round(i / k)
    const startIndex = Math.round(startMiddle - searcData.length / 2)
    const correctedStartIndex = startIndex < 0 ? startIndex + 1 : startIndex
    const newData = replaceArrayPart(
      data,
      startMiddle,
      correctedStartIndex,
      searcData.length,
      ...searcData,
    )
    setFilteredData(newData)
  }, [circleLargeInfo])

  return (
    <>
      <PointList
        data={filteredData}
        allSkills={filteredSkills}
        circleStates={circleStates}
        circleStatesLarge={circleStatesLarge}
        handleClick={handleCircleClick}
        handleLargeClick={handleCircleLargeClick}
      ></PointList>
    </>
  )
}

export default App
