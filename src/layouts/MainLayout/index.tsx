import { useState } from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import logoCMS from "../../assets/images/tecapro_logo.png";
import { useAccount } from "../../context/ContextAccount";
import { useMenu } from "../../context/ContextMenu";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import SEnumParentCode from "../../utils/SEnumParentCode";
import { IRoute } from "../../routes/routes";
import AppIcon from "../../components/shared/AppIcon";
import ModalChangePassword from "../../modules/PhanQuyenTaiKhoan/components/ModalChangePassword";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
type Props = {
  children: React.ReactNode;
};
const MainLayout = (props: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [openModalPassword, setOpenModalPassword] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { userInfo } = useAccount();
  const { menuByUser } = useMenu();
  const isAuthenticatedStr = localStorage.getItem("isLogin");
  const isAuthenticated: boolean = isAuthenticatedStr
    ? JSON.parse(isAuthenticatedStr)
    : null;

  const navigate = useNavigate();
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const location = useLocation();
  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <span>Thông tin cá nhân</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setOpenModalPassword(true)}>
        <span>Đổi mật khẩu</span>
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() => {
          window.localStorage.clear();
          window.location.href = "/dang-nhap";
        }}
      >
        <span>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const handleMenuClick = (key: string) => {
    if (openKeys.includes(key)) {
      setOpenKeys(openKeys.filter((openKey) => openKey !== key));
    } else {
      setOpenKeys([...openKeys, key]);
    }
  };

  const handleLink = (path: string | undefined, authority: string | undefined) => {
        navigate(path ?? "/404", { state: { authority: authority } });
      // console.log(path, 'path')
  }
  const findMenuItemByPath = (
    menuItems: IRoute[],
    path: string
  ): IRoute | null => {
    if (!Array.isArray(menuItems)) {
      return null; // Trả về null nếu menuItems không phải là một mảng
    }
    for (const item of menuItems) {
      if (item.path === path) {
        return item;
      }
      if (item.children) {
        const found = findMenuItemByPath(item.children, path);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  // Sử dụng hàm này để tìm đối tượng có trường path trùng với location.pathname
  const matchedMenuItem = findMenuItemByPath(menuByUser, location.pathname);
  const parentCode = matchedMenuItem?.parentCode
    ? matchedMenuItem.parentCode
    : "";

  const filterMenuRecursive = (items: IRoute[]): IRoute[] => {
    return items
      .filter((item) => item.isShowMenu !== false && item.path)
      .map((item) => ({
        ...item,
        children: item.children ? filterMenuRecursive(item.children) : item.key === "Dashboard" ? null : [],
      }))
      .filter((item) =>  item.children && item.children.length > 0 || item.path);
  };

  const filteredMenu = filterMenuRecursive(menuByUser);
  const renderMenuByLevel = (menuItems: IRoute[]): JSX.Element[] => {
    return menuItems.map((item) => {
      if (item.children && item.children.length > 0) {
          // console.log(item.children.some((child) => child.path === location.pathname) ? "hi" : "he")
        return (
            <SubMenu
                key={item.key}
                title={item.label}
                icon={<AppIcon iconName={item.icon} />}
                className={
                  openKeys.includes(item.key) ||
                  item.children.some((child) => child.path === location.pathname)
                      ? "sub_menu_layout ant-menu-item-selected"
                      : "sub_menu_layout ant-menu-item-no-selected"
                }
                onTitleClick={() => handleMenuClick(item.key)}
            >
              {renderMenuByLevel(item.children)} {/* Gọi lại hàm đệ quy để render các mục con */}
            </SubMenu>
        );
      }
// console.log(  location.pathname === item.path ? "hi" : "he")
      return (
          <Menu.Item
              key={item.key}
              icon={<AppIcon iconName={item.icon} />}
              className={
                location.pathname === item.path
                    ? "ant-menu-item-selected"
                    : "ant-menu-item-no-selected"
              }
              onClick={() => handleLink(item.path, item.authority)}
          >
            {item.label}
          </Menu.Item>
      );
    });
  };
  return (
    <Layout className="main_layout">
      <Header className="header_layout">
        <div className="remix-logo-title">
          <img
            src={logoCMS}
            style={{ width: 53, height: "auto", borderRadius: 15 }}
            alt="logo"
            onClick={() => navigate("/")}
          />
          <h2>Hệ thống quản lý triển khai hợp đồng</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 40 }}>
          <div style={{ position: "relative", top: 8 }}></div>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 15,
                alignItems: "center",
                cursor: "pointer",
                marginRight: 25,
              }}
            >
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <div className="thong_tin_tai_khoan">
                <span className="ten_tai_khoan">
                  {isAuthenticated ? userInfo?.username : "Chưa đăng nhập"}
                </span>
                <span className="don_vi_tai_khoan">
                  {" "}
                  {isAuthenticated && userInfo?.departmentName}
                </span>
              </div>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={!collapsed}
          collapsedWidth={50}
          width={250}
          className="sider_layout"
        >
          <Menu
            selectedKeys={[location.pathname]}
            mode="inline"
            className="menu_layout"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
          >
            {renderMenuByLevel(filteredMenu)}
          </Menu>
        </Sider>

        <Layout className="content_main_layout">
          <div className="header_pathname">
            {collapsed ? (
              <AiOutlineMenuFold className="icon_pathname" onClick={toggle} />
            ) : (
              <AiOutlineMenuUnfold className="icon_pathname" onClick={toggle} />
            )}
            <div className="breadcrumb_pathname">
              <span> {SEnumParentCode(parentCode)}</span>
              <span>/</span>
              <span> {matchedMenuItem?.label}</span>
            </div>
          </div>
          <Content className="content">{props.children}</Content>
        </Layout>
      </Layout>
      {openModalPassword && (
        <ModalChangePassword
          open={openModalPassword}
          setOpenModalPassword={setOpenModalPassword}
        />
      )}
    </Layout>
  );
};

export default MainLayout;
