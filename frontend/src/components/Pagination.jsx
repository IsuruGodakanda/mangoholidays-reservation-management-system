import React from 'react'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'

const PaginationComponent = ({ current = 1, pageSize = 10, total, paginate }) => {
  return (
    <Pagination
      className='ant-pagination'
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={(e) => {
        paginate(e)
      }}
    />
  )
}

export default PaginationComponent
