import "./Page.css";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@User/components/Header/Header";
import { authUser } from "@User/auth/_authApi";
import { useDispatch } from "react-redux";
import { userApi } from "@User/utils/utils";
import { Footer } from "../Footer/Footer";

type Props = {
  children: React.ReactNode;
};

export const Page: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchLogoutUser] = authUser.useLazyLogoutUserQuery();
  const { data: userCred } = authUser.useCheckAuthUserQuery();

  const onClickLogout = async () => {
    await fetchLogoutUser().then((res) => {
      if (res.isSuccess) {
        localStorage.removeItem("activeUserId");
        dispatch(userApi.util.resetApiState());
        navigate("/login", { replace: true });
      }
    });
  };

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
