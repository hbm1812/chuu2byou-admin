import React, {ReactNode} from "react";
import * as AntdIcons from "@ant-design/icons";

type IconProps = {
    iconName: ReactNode | string;
};

const AppIcon: React.FC<IconProps> = ({ iconName }) => {
    const IconComponent = AntdIcons[iconName as keyof typeof AntdIcons] as React.ComponentType;

    if (!IconComponent) {
        return null;
    }

    return <IconComponent />;
};

export default AppIcon;