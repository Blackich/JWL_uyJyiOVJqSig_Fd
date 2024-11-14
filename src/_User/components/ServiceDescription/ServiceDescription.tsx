import "./ServiceDescription.css";
import React, { FC } from "react";
import { ServiceLogo } from "./ServiceLogo";

type Props = {
  logo: React.ReactNode;
  title: string;
  text: string;
  className: string;
};

export const ServiceDescription: FC<Props> = ({ logo, title, text, className }) => {
  return (
    <div className="service-description">
      <ServiceLogo logo={logo} className={className} />
      <div className="service-description__wrapper">
        <div className="service-description__title">{title}</div>
        <div className="service-description__text">{text}</div>
      </div>
    </div>
  );
};
