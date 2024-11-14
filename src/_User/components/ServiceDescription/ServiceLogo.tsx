import "./ServiceLogo.css";
import React, { FC } from "react";

type Props = {
  logo: React.ReactNode;
  className: string;
};

export const ServiceLogo: FC<Props> = ({ logo, className }) => {
  return (
    <div className={`service-description__logo ${className}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span>{logo}</span>
    </div>
  );
};
