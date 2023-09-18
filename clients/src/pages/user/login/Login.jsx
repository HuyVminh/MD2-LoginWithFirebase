import { Button, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate()
  // đăng nhập với API
  const handleLogin = () => {};
  // Đăng nhập với google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        const userLocal = {
          user: response.user.email,
          userName: response.user.displayName,
          image: response.user.photoURL,
          userId: response.user.uid,
        };
        // Lưu thông tin lên local
        localStorage.setItem("userLocal", JSON.stringify(userLocal));
        // chuyển hướng về trang home
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form className="p-6 border rounded w-96">
          <h3 className="text-center text-3xl mb-4">Đăng Nhập</h3>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              className="mt-2"
              placeholder="Nhập địa chỉ email"
              status="error"
            />
            <div className="text-red-400">Email không được để trống.</div>
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              className="mt-2"
              placeholder="Nhập mật khẩu"
            />
            <div className="text-red-400">Password không được để trống.</div>
          </div>
          <div className="mb-4">
            <Button type="primary" className="w-full q-btn-primary">
              Đăng Nhập
            </Button>
          </div>
          <div className="flex text-center justify-between gap-2">
            <Link to="/">Quay lại</Link>
            <Link to="/forget-password">Quên mật khẩu</Link>
          </div>
          <div className="text-center my-3">
            <span>Hoặc</span>
          </div>
          <div>
            <Button
              className="w-full flex items-center justify-center gap-2"
              onClick={signInWithGoogle}
            >
              <img
                width={20}
                height={20}
                src="https://banner2.cleanpng.com/20181108/bow/kisspng-google-logo-google-search-search-engine-optimizati-5be4b4e62f2cf8.5260885315417151741932.jpg"
              />
              Đăng nhập với tài khoản Google
            </Button>
          </div>
          <div className="text-center my-3">
            Bạn có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </form>
      </div>
    </>
  );
}
