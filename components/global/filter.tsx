import React from 'react'
import AccountFilter from './account-filter'
import DateFilter from './date-filter'

type Props = {}

const Filters = () => {
    
  return (
    <div className='flex flex-col lg:flex-row items-start gap-y-2 lg:gap-y-0 lg:gap-x-2'>
        <AccountFilter/>
        <DateFilter />
    </div>
  )
}

export default Filters