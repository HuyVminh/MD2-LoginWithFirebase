import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  KeyOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal } from "antd";
import confirm from "antd/es/modal/confirm";
import "./header.css";

export default function Header() {
  const navigate = useNavigate();
  // sau khi danh nhap bang gg thanh cong, lay thong tin user da dang nhap
  const userLogin = JSON.parse(localStorage.getItem("userLocal"));

  //
  const handleLogout = () => {
    // xoa du kieu tren local
    localStorage.removeItem("userLocal");
    // chuyen huong ve trang chu
    navigate("/");
  };

  // ham xu li dang xuat
  const handleConfirmLogout = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn đăng xuất?",
      onOk() {
        handleLogout();
      },
      cancelText: "Hủy bỏ",
      okText: "Đăng xuất",
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to={"/profile"}>
          <UserAddOutlined className=" mr-2" />
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/change-password"}>
          <KeyOutlined className=" mr-2" />
          Đổi mật khẩu
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <a onClick={handleConfirmLogout}>
          <LogoutOutlined className=" mt-2" />
          Đăng xuất
        </a>
      ),
    },
  ];

  return (
    <>
      {}
      <div className="w-full bg-orange-400 h-14 text-white flex items-center justify-between px-5">
        <div className="flex gap-4 items-center">
          <NavLink to={"/"}>LOGO</NavLink>
          <NavLink to={"/"}>Trang chủ</NavLink>
          <NavLink to={"/list-product"}>Sản phẩm</NavLink>
          <NavLink to={"/cart"}>
            <ShoppingCartOutlined className="text-2xl relative" />
            <span className="bg-white px-2 rounded-xl text-black absolute left-0"></span>
          </NavLink>
        </div>
        <div className="flex gap-4 items-center">
          <NavLink to={"/about"}>Giới thiệu</NavLink>
          <NavLink to={"/contact"}>Liên hệ</NavLink>

          {userLogin !== null ? (
            <>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
                arrow
              >
                <Button className="border-none shadow-none text-white hover:text-white">
                  <div className="flex items-center gap-2">
                    <img
                      className="rounded-full"
                      src={userLogin.image}
                      height={26}
                      width={26}
                      alt="avatar"
                    />
                    {userLogin.userName}
                  </div>
                </Button>
              </Dropdown>
            </>
          ) : (
            <>
              <NavLink to={"/register"}>Đăng kí</NavLink>
              <NavLink to={"/login"}>Đăng nhập</NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}
