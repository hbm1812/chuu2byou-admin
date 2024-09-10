import React, { ReactNode } from "react";
import AppInput from "../AppInput";

export interface IListDmDf {
  label: string;
  icon?: ReactNode;
  keyRef: string | number;
  handleChange?: () => void;
}

type Props = {
  showSearch?: boolean;
  listDm: IListDmDf[];
  handleCollapse: (key: string | number) => void;
};

const AppPanelSearchDm: React.FC<Props> = ({
  showSearch,
  listDm,
  handleCollapse,
}) => {
  return (
    <div className="app_panel_dm">
      {showSearch && <AppInput placeholder="Nhập từ khóa để tìm kiếm" />}
      <div className="list_dm">
        {listDm &&
          listDm.map((item) => (
            <div
              className="list_dm_item"
              onClick={() => handleCollapse(item.keyRef)}
              key={item.keyRef}
            >
              {item.icon}
              <div className="list_dm_item_label">{item.label}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AppPanelSearchDm;
