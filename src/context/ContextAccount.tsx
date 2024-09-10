import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IThongTinTaiKhoan,
} from "../interfaces/account.interface";
import {getThongTinTaiKhoan} from "../services/utils/account";

export interface DataNodeDC {
  title: string;
  key: string;
  disabled?: boolean;
  isLeaf?: boolean;
  children?: DataNodeDC[];
}

interface AccountContextType {
  userInfo?: IThongTinTaiKhoan | null;
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("Lỗi provider");
  }
  return context;
};

export const AccountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUser] = useState<IThongTinTaiKhoan>();

  const loadUserInfo = async () => {
   try {
      const response = await getThongTinTaiKhoan();
     if (response.status) {
       const userInfo = response.result;

       if (userInfo?.authorities) {
         // @ts-ignore
         userInfo.authorities = userInfo.authorities.map((auth: { authority: string }) => {
           const [code, privileges] = auth.authority.split('/');
           return { code, privileges };
         });
       }

       setUser(userInfo);
     }
      // setUser(response.result);
    } catch (error) {
      console.error("Failed to load cities", error);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);
  return (
    <AccountContext.Provider value={{ userInfo }}>
      {children}
    </AccountContext.Provider>
  );
};
