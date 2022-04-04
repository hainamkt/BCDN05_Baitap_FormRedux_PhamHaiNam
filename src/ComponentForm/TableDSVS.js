import React, { Component } from 'react';
import { connect } from 'react-redux'

class TableDSVS extends Component {
  renderTable = () => {
    let { mangSV } = this.props;
    let count = 1;
    return mangSV.map((sv,index) => {
      return (
        <tr key={`sv${index}`}>
          <td>{sv.id}</td>
          <td>{sv.hoTen}</td>
          <td>{sv.sdt}</td>
          <td>{sv.email}</td>
          <td>
            <button className='btn btn-info' onClick={() => {
              let action = {
                type: 'XEM_THONG_TIN',
                thongTinSV: sv
              }
              this.props.dispatch(action)
            }}>Xem</button>
            <button className='btn btn-danger ml-2' onClick={() => {
              let action = {
                type: 'XOA_SINH_VIEN',
                maSVXoa: sv.id
              }
              this.props.dispatch(action)
            }}>Xóa</button>
          </td>
        </tr>
      )
    })
  }

  sreachSV = (event) => {
    let { value } = event.target;
    
    let action = {
      type:'TIM_KIEM',
      sreachTK: value.toLowerCase()
    }
    this.props.dispatch(action)
    
  }

  render() {
    return (
      <div className='card'>
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-4">
          <h2 className=''>Danh sách sinh viên</h2>
          <input onChange={this.sreachSV} name="sreach" style={{ width: '50%' }} type="sreach" className="form-control mr-5" placeholder="Tìm kiếm" />
        </div>
        <div className="card-body text-center">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Mã SV</th>
                <th scope="col">Họ tên</th>
                <th scope="col">SĐT</th>
                <th scope="col">Email</th>
                <th scope="col">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (RootReducer) => {
  return {
    mangSV: RootReducer.quanLySinhVienReducer.mangSV
  }
}

export default connect(mapStateToProps)(TableDSVS)