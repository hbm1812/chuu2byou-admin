import React, { createContext, useContext, useState, ReactNode } from "react";

interface TabContextType {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTab = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error("Lỗi provider");
    }
    return context;
};

interface TabProviderProps {
    children: ReactNode;
}

export const TabProvider = ({ children }: TabProviderProps) => {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    );
};
