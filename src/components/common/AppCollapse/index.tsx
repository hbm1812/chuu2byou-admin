import React, {ReactElement} from "react";
import {Collapse} from "antd";

type Props = {
    children?: any;
    title: any;
    key: string | number;
    icon?: ReactElement;
    extra?: any;
};
const AppCollapse : React.FC<Props> = ({ children, title, extra, icon, key }) => {
    return (
        <Collapse
            items={[{ key: key, label: title, children: children}]}
        />
    );
};
export default AppCollapse;
