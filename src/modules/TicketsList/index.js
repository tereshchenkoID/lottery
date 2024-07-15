import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { getData, postData } from 'helpers/api'

import classNames from 'classnames'

import Loader from 'components/Loader'
import Pagination from 'modules/Pagination'
import Empty from 'modules/Empty'
import TicketBlock from 'modules/TicketBlock'
import TicketPreview from 'modules/TicketPreview'
import FilterGames from './FilterGames'
import FilterStatus from './FilterStatus'

import style from './index.module.scss'

const TicketsList = () => {
  const { games } = useSelector(state => state.games)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [active, setActive] = useState(null)
  const [myGames, setMyGames] = useState([])
  const [filter, setFilter] = useState({
    gameId: -1,
    status: -1,
  })

  const filterGames = useMemo(() => {
    return myGames
      ?.map(el => games.find(game => game.id === el))
      .filter(Boolean)
  }, [myGames, games])

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const [pagination, setPagination] = useState({
    page: 0,
    pages: 0,
    quantity: 0,
    results: 0,
  })

  const handleLoad = (page) => {
    setLoading(true)

    const formData = new FormData()
    formData.append('page', page)
    formData.append('status', filter.status)
    formData.append('gameId', filter.gameId)

    postData('tickets/', formData).then(json => {
      setData(json.data)

      setPagination({
        page: json.page,
        pages: json.pages,
        quantity: json.quantity,
        results: json.results,
      })

      setLoading(false)
    })
  }

  const handlePagination = (fieldName, fieldValue) => {
    setPagination(prevPagination => ({
      ...prevPagination,
      [fieldName]: fieldValue,
    }))
    handleLoad(fieldValue)
  }

  const handlePrev = () => {
    const prev = pagination.page > 0 ? pagination.page - 1 : 0
    handlePagination('page', prev)
  }

  const handleNext = () => {
    const next =
      pagination.page < pagination.pages
        ? pagination.page + 1
        : pagination.pages
    handlePagination('page', next)
  }

  useEffect(() => {
    getData('mygames/').then(json => {
      setMyGames(json)
    })
  }, [])

  useEffect(() => {
    handleLoad(0)
    setActive(null)
  }, [filter])

  return (
    <div className={style.block}>
      {
        loading 
        ?
          <Loader type={'inline'} />
        :
          <div className={style.wrapper}>
            <div
              className={classNames(style.shadow, active && style.active)}
              onClick={() => {
                setActive(null)
              }}
            />
            <div className={style.left}>
              <FilterStatus 
                active={filter.status} 
                onChange={handlePropsChange} 
              />
              <FilterGames 
                data={filterGames} 
                active={filter.gameId} 
                onChange={handlePropsChange} 
              />
              {
                data?.length > 0 
                ?
                  <>
                    <div className={style.list}>
                      {
                        data.map((el, idx) =>
                          <TicketBlock
                            key={idx}
                            data={el}
                            active={active}
                            setActive={setActive}
                          />
                        )
                      }
                    </div>
                    {
                      pagination.pages > 1 &&
                      <div className={style.pagination}>
                        <Pagination
                          pagination={pagination}
                          handlePrev={() => handlePrev()}
                          handleNext={() => handleNext()}
                        />
                      </div>
                    }
                  </>
                :
                  <Empty />
              }
            </div>
            <div className={style.right}>
              <TicketPreview data={active} active={active} setActive={setActive} />
            </div>
          </div>
      }
    </div>
  )
}

export default TicketsList
