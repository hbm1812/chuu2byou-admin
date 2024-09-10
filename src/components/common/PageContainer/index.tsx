import React, { ReactElement } from "react";
import { Card} from 'antd';

type Props = {
  children: any;
  title: any;
  icon?: ReactElement;
  extra?: any;
};

const PageContainer: React.FC<Props> = ({ children, title, extra, icon }) => {
  return (
    <Card className="page_container">
      <div className="page_container_header">
        <div className="page_container_header_title">
          {icon}
          <h2>{title}</h2>
        </div>
        {extra}
      </div>
      {children}
    </Card>
  );
};

export default PageContainer;
