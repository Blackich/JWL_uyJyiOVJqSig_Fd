import "./CardInfo.css";
import { FC, ReactNode } from "react";
import { Skeleton, Typography } from "@mui/material";
import { isNum, isStr } from "@utils/utils";

type Props = {
  titleCard: string;
  favicon: string | ReactNode;
  cardValue: string | number;
};

export const CardInfo: FC<Props> = ({ titleCard, favicon, cardValue }) => {
  return (
    <>
      <div className="card-info">
        <div className="card-info__content">
          <div className="card-info__wrapper">
            <div className="card-info__logo">
              {isStr(favicon) ? (
                <img
                  src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${favicon}`}
                  alt={`icon ${titleCard}`}
                />
              ) : (
                favicon
              )}
            </div>
            <Typography variant="h5" color="#636B74">
              {titleCard}
            </Typography>
          </div>
          {isNum(cardValue) || isStr(cardValue) ? (
            <Typography variant="h4" color="black" fontWeight="bold">
              {cardValue}
            </Typography>
          ) : (
            <Skeleton variant="text" animation="wave" height={41.99} />
          )}
        </div>
      </div>
    </>
  );
};
