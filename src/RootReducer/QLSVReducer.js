const qlvs = {
    mangSV: [
        { id: '1', hoTen: 'Phạm Văn A', sdt: '0907068860', email: 'VanA@gmail.com' },
        { id: '2', hoTen: 'Nguyễn Thị B', sdt: '0399783716', email: 'ThiB@gmail.com' }
    ],
    thongTinSinhVien: {

    },
    sinhVien: {
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
}

export const quanLySinhVienReducer = (state = qlvs, action) => {
    switch (action.type) {
        case 'THEM_SINH_VIEN':
            state.mangSV = [...state.mangSV, action.sinhVien];
            return { ...state }
        case 'XOA_SINH_VIEN':
            state.mangSV = [...state.mangSV].filter((sv) => {
                return sv.id !== action.maSVXoa
            })
            return { ...state }
        case 'XEM_THONG_TIN':
            state.thongTinSinhVien = action.thongTinSV
            return { ...state }
        case 'CAP_NHAT':
            let mangCapNhat = [...state.mangSV]
            let sinhVienCapNhat = mangCapNhat.find((sv) => {
                return sv.id === action.thongTinSV.id;
            });

            if (sinhVienCapNhat) {
                sinhVienCapNhat.hoTen = action.thongTinSV.hoTen;
                sinhVienCapNhat.sdt = action.thongTinSV.sdt;
                sinhVienCapNhat.email = action.thongTinSV.email;

            }
            state.mangSV = mangCapNhat;

            return { ...state };
        case 'TIM_KIEM':
            let mangTK = [...state.mangSV].filter((sv) => {
                let nameLower = sv.hoTen.toLowerCase()
                let indexName = nameLower.indexOf(action.sreachTK)
                return indexName > -1
            })
            state.mangSV = mangTK

            return { ...state }
        default: return state
    }
}