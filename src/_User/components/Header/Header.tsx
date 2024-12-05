import "./Header.css";
import { FC } from "react";
import { HeaderDesktop } from "./Entity/HeaderDesktop";
import { useAdaptive } from "@/utils/screenWidth";
import { HeaderMobile } from "./Entity/Mobile/HeaderMobile";

type Props = {
  onClickLogout: () => void;
  userId?: number;
};

export const Header: FC<Props> = ({ userId, onClickLogout }) => {
  const { isDesktop } = useAdaptive();
  return isDesktop ? (
    <HeaderDesktop userId={userId} onClickLogout={onClickLogout} />
  ) : (
    <HeaderMobile userId={userId} onClickLogout={onClickLogout} />
  );
};
