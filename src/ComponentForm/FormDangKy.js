import React, { Component } from 'react'
import { connect } from 'react-redux'

class FormDangKy extends Component {
  state = {
    values: {
      id: '',
      hoTen: '',
      sdt: '',
      email: ''
    },

    errors: {
      id: '',
      hoTen: '',
      sdt: '',
      email: ''
    }
  }

  handleInput = (event) => {
    let { name, value } = event.target;
    let newValues = { ...this.state.values };
    newValues[name] = value;

    let newError = { ...this.state.errors };

    let message = "";
    if (value.trim() === "") {
      message = name + " không được để trống";
    }
    let attrValue = event.target.getAttribute("data-type");
    let reg = "";
    if (attrValue === "email") {
      reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!reg.test(value)) {
        message = name + " không đúng định dạng";
      }
    }
    if (attrValue === "sdt") {
      reg = /^(\d{1,10}(\.\d{1,10})?)$/;
      if (!reg.test(value)) {
        message = name + " không đúng định dạng";
      }
    }


    newError[name] = message;

    this.setState({
      values: newValues,
      errors: newError
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;
    for (let key in this.state.errors) {
      if (this.state.errors[key] !== "") {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      alert("Còn lỗi nè");
      return;
    }

    let action = {
      type: 'THEM_SINH_VIEN',
      sinhVien: this.state.values
    }
    this.props.dispatch(action)
  }

  static getDerivedStateFromProps(newProps, currentState) {
    if (currentState.values.id !== newProps.thongTinSV.id) {
      return {
        ...currentState,
        values: newProps.thongTinSV
      }
    }
    return currentState
  }

  render() {
    let { id, hoTen, sdt, email } = this.state.errors
    let { values } = this.state
    return (
      <div className='card my-4'>
        <form>
          <div className="card-header bg-dark text-white">
            Form Đăng Ký
          </div>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Mã Sinh Viên</label>
                <input onChange={this.handleInput} type="text" name="id" className="form-control" value={values.id} />
                <p className='text-danger'>{id}</p>
              </div>
              <div className="form-group col-md-6">
                <label>Họ Tên</label>
                <input onChange={this.handleInput} type="text" name="hoTen" className="form-control" value={values.hoTen} />
                <p className='text-danger'>{hoTen}</p>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Số điện thoại</label>
                <input data-type='sdt' onChange={this.handleInput} type="text" name="sdt" className="form-control" value={values.sdt} />
                <p className='text-danger'>{sdt}</p>
              </div>
              <div className="form-group col-md-6">
                <label>Email</label>
                <input data-type='email' onChange={this.handleInput} type="text" name="email" className="form-control" value={values.email} />
                <p className='text-danger'>{email}</p>
              </div>
            </div>
          </div>
          <div className="card-footer bg-dark">
            <button className='btn btn-success' onClick={this.handleSubmit}>Đăng Ký</button>
            <button className='btn btn-primary ml-3' type="button" onClick={() => {
              let action = {
                type: 'CAP_NHAT',
                thongTinSV: this.state.values
              }
              this.props.dispatch(action);
            }} >Cập Nhật</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (RootReducer) => {
  return {
    thongTinSV: RootReducer.quanLySinhVienReducer.thongTinSinhVien,
    sinhVien: RootReducer.quanLySinhVienReducer.sinhVien
  }
}

export default connect(mapStateToProps)(FormDangKy)