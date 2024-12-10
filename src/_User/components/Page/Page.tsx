import "./Page.css";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@User/components/Header/Header";
import { authUser } from "@User/auth/_authApi";
import { userApi } from "@User/utils/utils";
import { Footer } from "@User/components/Footer/Footer";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppDispatch } from "@store/store";
import {
  logoutUser,
  selectSocialAccId,
  selectSocialAccName,
  setUserId,
} from "@User/auth/_user.slice";

type Props = {
  children: React.ReactNode;
};

export const Page: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [fetchLogoutUser] = authUser.useLazyLogoutUserQuery();
  const { data: userCred } = authUser.useCheckAuthUserQuery();
  const { data: userList } = userHomeApi.useGetSocialListQuery(
    userCred?.id || skipToken,
  );

  const activeSocAccLS = localStorage.getItem("activeUserId");

  const onClickLogout = async () => {
    await fetchLogoutUser().then((res) => {
      if (res?.data) {
        navigate("/login", { replace: true });
        dispatch(logoutUser());
        dispatch(userApi.util.resetApiState());
      }
    });
  };

  const validateLS =
    localStorage.getItem("activeUserId") &&
    userList?.find(
      (user) => user.id === Number(localStorage.getItem("activeUserId")),
    );
  useEffect(() => {
    if (!userList) return;
    if (userList?.length === 0) {
      return localStorage.removeItem("activeUserId");
    }
    if (!activeSocAccLS) {
      dispatch(selectSocialAccId(userList[0].id));
      dispatch(selectSocialAccName(userList[0].nickname));
      return localStorage.setItem("activeUserId", userList[0].id.toFixed());
    }
    if (!validateLS) {
      dispatch(selectSocialAccId(userList[0].id));
      dispatch(selectSocialAccName(userList[0].nickname));
      localStorage.setItem("activeUserId", userList[0].id.toFixed());
      console.log("pздесь 1");
    } else {
      dispatch(selectSocialAccName(validateLS.nickname));
      dispatch(selectSocialAccId(validateLS.id));
      console.log("pздесь 2");
    }
  }, [userList, validateLS, dispatch, activeSocAccLS]);

  useEffect(() => {
    if (!userCred) return;
    dispatch(setUserId(userCred.id));
  }, [userCred, dispatch]);

  return (
    <>
      <div className="content">
        <Header onClickLogout={onClickLogout} userId={userCred?.id} />
        <div className="scroll">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};
