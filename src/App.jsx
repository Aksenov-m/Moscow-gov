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
      setAllSkills(allSkillsArray) // Устанавливаем состояние всех навыков
      setLoading(false)
    }
    preload()
  }, [])

  return (
    <>
      <PointList data={data} allSkills={allSkills}></PointList>
    </>
  )
}

export default App
