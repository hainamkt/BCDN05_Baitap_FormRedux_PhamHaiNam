import React, { Component } from 'react'
import FormDangKy from './FormDangKy'
import TableDSVS from './TableDSVS'

// Link Deloy: https://bcdn-05-baitap-form-redux-pham-hai-nam-hainamkt.vercel.app/

export default class TrangQuanLySV extends Component {
  render() {
    return (
      <div>
        <FormDangKy/>
        <TableDSVS/>
      </div>
    )
  }
}

