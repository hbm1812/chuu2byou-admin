export const API_CATEGORY = import.meta.env.VITE_API_CATEGORY;
export const API_SECURITY = import.meta.env.VITE_API_SECURITY;
export const API_CONTRACT = import.meta.env.VITE_API_CONTRACT;
export const API_REPORT = import.meta.env.VITE_API_REPORT;

export const endpoints = {
  security: {
    authenticate: `authenticate`,
    profile: `profile`,
    getMenu: `menu`,
    role: {
      addRole: `roles`,
      getListRole: `roles/search`,
      getListPrivilegeRole: `roles/privilege/flat`,
      getListPrivilegeTree: `roles/privilege/tree`,
      detailRole: `roles/detail`,
      updateRole: `roles/update`,
      deleteRole: `roles/delete`,
    },
    user: {
      getList: `users/search`,
      create: `users`,
      update: `users/update`,
      delete: `users/delete`,
      detail: `users/detail`,
      changePassword: `users/change-password`,
    },
    forgotPassword: {
      forgot: "forgot-password",
      reset: "reset-password",
      verify: "verify-token",
    },
  },
  category: {
    dmDiaChinh: {
      danhSachDm: `dia-chinh`,
      layDsachDiaChinhTheoTen: `dia-chinh/find-all-by-name`,
    },
    dmNhanSu: {
      layDanhSach: `personnel/search`,
      themMoiNhanSu: `personnel`,
      chiTiet: `personnel/detail`,
      suaNhanSu: `personnel/update`,
      xoaNhanSu: `personnel/delete`,
    },
    dmPhongBan: {
      layDanhSach: `department/search`,
      layDanhSachKhongPhanTrang: `department/all`,
      themMoiPhongBan: `department`,
      chiTiet: `department/detail`,
      suaPhongBan: `department/update`,
      xoaPhongBan: `department/delete`,
      privilege: `department/privilege`,
    },
    dmHangHoa: {
      layDanhSach: `products/search`,
      themMoiHangHoa: `products`,
      suaHangHoa: `products/update`,
      xoaHangHoa: `products/delete`,
      layDonViTinh: `products/get-product-units`,
      dsDonVi: `products/get-product-units`,
      chiTiet: `products/detail`,
    },

    dmKhachHang: {
      layDanhSach: `customers/search`,
      detail: `customers/detail`,
      themMoiKhachHang: `customers`,
      suaKhachHang: `customers/update`,
      xoaKhachHang: `customers/delete`,
      gis: `gis`,
    },
    dmHopDong: {
      getLoaiHopDong: `contract-types/search`,
    },
    dmDauCongViec: {
      layDanhSach: `tasks/search`,
      chiTiet: `tasks/detail`,
      themMoi: `tasks`,
      sua: `tasks/update`,
      xoa: `tasks/delete`,
      layDSLoaiHopDong: `contract-types/search`,
    },
    dmMauCongViec: {
      getListMauCongViec: "task-template/search",
      createMauCongViec: "task-template",
      updateMauCongViec: "task-template/update",
      detailMauCongViec: "task-template/detail",
      deleteMauCongViec: "task-template/delete",
    },
    dmMauCongViecCon: {
      getListMauCongViecCon: "template-element/search",
      createMauCongViecCon: "template-element",
      createMauCongViecParent: "template-element/parent",
      updateMauCongViecCon: "template-element/update",
      detailMauCongViecCon: "template-element/detail",
      deleteMauCongViecCon: "template-element/delete",
    },
    dmHoSo: {
      getListHoSo: "document/search",
    },
  },
  contract: {
    hopDongPhanCung: {
      search: `contracts/search`,
      detail: `contracts/detail`,
      taoMoi: `contracts`,
      sua: `contracts/update`,
      xoa: `contracts/delete`,
    },
    hopDongPhanMem: {
      search: `contracts/search`,
      detail: `contracts/detail`,
      taoMoi: `software-contract`,
      sua: `contracts/update`,
      xoa: `contracts/delete`,
    },
    hopDongDichVu: {
      taoMoi: `support-contract`,
      sua: `support-contract/update`,
    },
    hopDongHonHop: {
      taoMoi: `composite-contract`,
      sua: `composite-contract/update`,
      detail:`composite-contract/detail`,
    },
    paymentInstallment: {
      getList: `payment-installments/all`,
      add: `payment-installments`,
      update: `payment-installments/update`,
      detail: `payment-installments/detail`,
      delete: `payment-installments/delete`,
    },
    paymentDocument: {
      getList: `payment-documents/all`,
      add: `payment-documents`,
      delete: `payment-documents/delete`,
      update: `payment-documents/update`,
    },
    paymentProduct: {
      getList: `payment-products/all`,
      add: `payment-products`,
      delete: `payment-products/delete`,
      update: `payment-products/update`,
    },
    paymentDetail: {
      getList: `payment-details/all`,
      add: `payment-details`,
      delete: `payment-details/delete`,
      update: `payment-details/update`,
    },
    hangHoa: {
      getList: `contract-products/search`,
      delete: `contract-products/delete`,
      update: `contract-products/update`,
      add: `contract-products/batch`,
    },
    hoaDon: {
      getList: `contract-invoice/list`,
      add: `contract-invoice`,
      update: `contract-invoice/update`,
      delete: `contract-invoice/delete`,
      detail: `contract-invoice/detail`,
    },
    congViec: {
      getList: `contract-task/search`,
      create: `contract-task`,
      delete: `contract-task/delete`,
      parent: `contract-task/parent`,
      update: `contract-task/update`,
      detail: `contract-task/detail`,
      template: `contract-task/template`,
    },
    nhanSu: {
      getList: `contract-personnel/search`,
      create: `contract-personnel/batch`,
      update: `contract-personnel/update`,
      detail: `contract-personnel/detail`,
      delete: `contract-personnel/delete`,
    },
  },
  report: {
    baoCaoDoanhThu: {
      layDanhSach: `total-revenue`,
    },
    baoCaoTienDoTrienKhaiHopDong: {
      layDanhSach: `deployment-progress`,
      export: `deployment-progress/export`,
    },
    dashboard: {
      statisticContract: "statistic-contract",
    },
  },

  main: {
    test: {
      test1: `test`,
    },
  },
};
