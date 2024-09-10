import React, {createContext, useContext, useState, useEffect} from "react";
import {IFormHopDong} from "../modules/QuanLyHopDong/interfaces/themMoiHopDong.interface";
import {formatDateMonthYear} from "../utils";
import {useDispatch} from "react-redux";
import {startLoading, stopLoading} from "../redux/reducers/loadingReducer";
import {
    getLoaiHopDong, postChinhSuaHopDongDichVu,
    postChinhSuaHopDongHonHop,
    postChinhSuaHopDongPhanCung,
    postChinhSuaHopDongPhanMem, postThemMoiHopDongDichVu,
    postThemMoiHopDongHonHop,
    postThemMoiHopDongPhanCung,
    postThemMoiHopDongPhanMem,
} from "../modules/QuanLyHopDong/api/hopDong.api";
import {showNotification} from "../redux/reducers/notificationReducer";
import useRefresh from "../hooks/useRefresh";
import {ILoaiHopDong} from "../modules/QuanLyHopDong/interfaces/danhSachHopDong.interface";
import {useLocation, useNavigate} from "react-router-dom";
import {addHangHoaHopDong} from "../modules/QuanLyHopDong/api/hangHoaHopDong.api";
import {
    IContractProduct,
    ITableHangHoaHopDong,
} from "../modules/QuanLyHopDong/interfaces/hangHoaHopDong.interface";

interface HopDongContextType {
    body: IFormHopDong | undefined;
    dsLoaiHopDong: ILoaiHopDong[];
    setBody: React.Dispatch<React.SetStateAction<IFormHopDong | undefined>>;
    onSubmitThongTinChung: (values: IFormHopDong) => Promise<void>;
    onSubmitHangHoaHopDong: () => Promise<void>;
    contractValue: number;
    setContractValue: React.Dispatch<React.SetStateAction<number>>;
    vat: number;
    setVat: React.Dispatch<React.SetStateAction<number>>;
    percentRate: number;
    setPercentRate: React.Dispatch<React.SetStateAction<number>>;
    isJointVenture: boolean;
    setIsJointVenture: React.Dispatch<React.SetStateAction<boolean>>;
    paidContractValue: number;
    setPaidContractValue: React.Dispatch<React.SetStateAction<number>>;
    bondFulfillPercent: number;
    setBondFulfillPercent: React.Dispatch<React.SetStateAction<number>>;
    typeContract: number;
    setTypeContract: React.Dispatch<React.SetStateAction<number>>;
    dataTableHangHoa: ITableHangHoaHopDong[];
    setDataTableHangHoa: React.Dispatch<
        React.SetStateAction<ITableHangHoaHopDong[] | []>
    >;
    statusPaymentInstallment: number;
    setStatusPaymentInstallment: React.Dispatch<React.SetStateAction<number>>;
    percentAmountPaymentForm: number;
    setPercentAmountPaymentForm: React.Dispatch<React.SetStateAction<number>>;
    idDotThanhToan: number;
    setIdDotThanhToan: React.Dispatch<React.SetStateAction<number>>;
}

const HopDongContext = createContext<HopDongContextType | undefined>(undefined);

export const useHopDongContext = () => {
    const context = useContext(HopDongContext);
    if (!context) {
        throw new Error("Lỗi provider");
    }
    return context;
};

export const HopDongProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                             children,
                                                                         }) => {
    const dispatch = useDispatch();
    const {state} = useLocation();
    const idHopDong = state.idHopDong;
    const [refresh, refecth] = useRefresh();
    const [body, setBody] = useState<IFormHopDong>();
    const [dsLoaiHopDong, setDsLoaiHopDong] = useState<ILoaiHopDong[]>([]);
    const [contractValue, setContractValue] = useState(0);
    const [vat, setVat] = useState(0);
    const [isJointVenture, setIsJointVenture] = useState(false);
    const [percentRate, setPercentRate] = useState<number>(0);
    const [paidContractValue, setPaidContractValue] = useState<number>(0);
    const [bondFulfillPercent, setBondFulfillPercent] = useState<number>(0);
    const [typeContract, setTypeContract] = useState<number>(0);
    const [percentAmountPaymentForm, setPercentAmountPaymentForm] =
        useState<number>(0);
    const [dataTableHangHoa, setDataTableHangHoa] = useState<
        ITableHangHoaHopDong[] | []
    >([]);
    const [statusPaymentInstallment, setStatusPaymentInstallment] =
        useState<number>(0);
    const [idDotThanhToan, setIdDotThanhToan] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const getDataCombobox = async () => {
            try {
                dispatch(startLoading());
                const [responseDsLoaiHopDong] = await Promise.all([getLoaiHopDong()]);
                setDsLoaiHopDong(responseDsLoaiHopDong);
            } catch (e) {
                console.error(e);
            } finally {
                dispatch(stopLoading());
            }
        };
        getDataCombobox();
    }, [refresh]);
    const onSubmitThongTinChung = async (values: IFormHopDong) => {
        const formatDatesInArray = (
            array: {
                fromDate: string | undefined;
                toDate: string | undefined;
                status: string | undefined;
            }[]
        ) => {
            return array.map((item) => ({
                ...item,
                fromDate: formatDateMonthYear(item.fromDate),
                toDate: formatDateMonthYear(item.toDate),
            }));
        };

        const payload = {
            ...values,
            signDate: formatDateMonthYear(values.signDate),
            timelineFrom: formatDateMonthYear(values.timelineFrom),
            timelineTo: formatDateMonthYear(values.timelineTo),
            bondFulfillDate: formatDateMonthYear(values.bondFulfillDate),
            bondFulfillExpiredDate: formatDateMonthYear(
                values.bondFulfillExpiredDate
            ),
            bondAdvancePaymentDate: formatDateMonthYear(
                values.bondAdvancePaymentDate
            ),
            bondAdvancePaymentExpiredDate: formatDateMonthYear(
                values.bondAdvancePaymentExpiredDate
            ),
            bondAdvancePaymentReceivedDate: formatDateMonthYear(
                values.bondAdvancePaymentReceivedDate
            ),
            bondGuaranteeDate: formatDateMonthYear(values.bondGuaranteeDate),
            bondGuaranteeExpiredDate: formatDateMonthYear(
                values.bondGuaranteeExpiredDate
            ),
            uatSubmitDate: formatDateMonthYear(values.uatSubmitDate),
            uatApprovedDate: formatDateMonthYear(values.uatApprovedDate),
            oatSubmitDate: formatDateMonthYear(values.oatSubmitDate),
            oatApprovedDate: formatDateMonthYear(values.oatApprovedDate),
            trialFromDate: formatDateMonthYear(values.trialFromDate),
            trialToDate: formatDateMonthYear(values.trialToDate),
            lsUat: formatDatesInArray(values.lsUat || []),
            lsOat: formatDatesInArray(values.lsOat || []),
        };

        const apiCall = async () => {

            const isUpdate = state.routeType === "update";
            const contractTypeId = values.contractTypeId ?? 1;
            type ApiMap = Record<number, ContractActions>;
            const apiMap: ApiMap = {
                1: {
                    add: postThemMoiHopDongPhanCung,
                    update: (payload: any) =>
                        postChinhSuaHopDongPhanCung(payload, idHopDong),
                },
                2: {
                    add: postThemMoiHopDongPhanMem,
                    update: (payload: any) =>
                        postChinhSuaHopDongPhanMem(payload, idHopDong),
                },
                3: {
                    add: postThemMoiHopDongDichVu,
                    update: (payload: any) =>
                        postChinhSuaHopDongDichVu(payload, idHopDong),
                },
                5: {
                    add: postThemMoiHopDongHonHop,
                    update: (payload: any) =>
                        postChinhSuaHopDongHonHop(payload, idHopDong),
                },
                // Thêm các trường hợp khác nếu cần
            };

            const apiFunction = isUpdate
                ? apiMap[contractTypeId].update
                : apiMap[contractTypeId].add;
            return await apiFunction(payload);
        };
        try {
            dispatch(startLoading());
            const rp = await apiCall();
            if (rp.status) {
                dispatch(
                    showNotification({
                        message: `${
                            state.routeType === "add" ? "Thêm mới" : "Cập nhật"
                        } thành công!`,
                        type: "success",
                    })
                );
                state.routeType === "add" && navigate("/quan-ly-hop-dong/tra-cuu-hop-dong");
                state.routeType === "update" && navigate("/quan-ly-hop-dong/tra-cuu-hop-dong");
            }
        } catch (error: any) {
            dispatch(
                showNotification({
                    message: error?.response?.data?.detail || "Có lỗi xảy ra, vui lòng thử lại sau",
                    type: "error",
                })
            );

        } finally {
            dispatch(stopLoading());
        }
    };

    const onSubmitHangHoaHopDong = async () => {
        const payload: IContractProduct[] = dataTableHangHoa
            .filter((item) => item.typeAdd === 0)
            .map((item) => ({
                contractId: idHopDong,
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item?.unitPrice,
                price: item.price,
                taxRate: item.taxRate,
                tax: item.tax,
                orderDate: formatDateMonthYear(item.orderDate),
                expectedArrivalDate: formatDateMonthYear(item.expectedArrivalDate),
                contractProductStatusId: item.contractProductStatusName,
            }));

        try {
            dispatch(startLoading());
            const rp = await addHangHoaHopDong(payload);
            if (rp.status) {
                dispatch(
                    showNotification({
                        message: `${
                            state.routeType === "add" ? "Thêm mới" : "Cập nhật"
                        } thành công!`,
                        type: "success",
                    })
                );
            }
        } catch (err) {
            console.error(err);
        } finally {
            dispatch(stopLoading());
        }
    };
    return (
        <HopDongContext.Provider
            value={{
                body,
                setBody,
                onSubmitThongTinChung,
                onSubmitHangHoaHopDong,
                dsLoaiHopDong,
                contractValue,
                setContractValue,
                vat,
                setVat,
                isJointVenture,
                setIsJointVenture,
                percentRate,
                setPercentRate,
                paidContractValue,
                setPaidContractValue,
                bondFulfillPercent,
                setBondFulfillPercent,
                typeContract,
                setTypeContract,
                dataTableHangHoa,
                setDataTableHangHoa,
                statusPaymentInstallment,
                setStatusPaymentInstallment,
                percentAmountPaymentForm,
                setPercentAmountPaymentForm,
                idDotThanhToan,
                setIdDotThanhToan,
            }}
        >
            {children}
        </HopDongContext.Provider>
    );
};
