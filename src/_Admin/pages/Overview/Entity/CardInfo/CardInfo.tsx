import "./CardInfo.css";
import { FC, ReactNode } from "react";
import { Skeleton, Typography } from "@mui/material";

type Props = {
  titleCard: string;
  favicon: string | ReactNode;
  cardValue: string | number;
};

export const CardInfo: FC<Props> = ({ titleCard, favicon, cardValue }) => {
  return (
    <>
      <div className="cards__item">
        <div className="cards__item--content">
          <div className="cards__item--wrapper">
            <div className="cards__item--logo">
              {typeof favicon === "string" ? (
                <img
                  src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${favicon}`}
                  alt={`icon ${titleCard}`}
                />
              ) : (
                favicon
              )}
            </div>
            <div className="cards__item--title">
              <Typography variant="h5" color="#636B74">
                {titleCard}
              </Typography>
            </div>
          </div>
          <div className="cards__item--value">
            {cardValue ? (
              <Typography variant="h4" color="black" fontWeight="bold">
                {cardValue}
              </Typography>
            ) : (
              <Skeleton variant="text" animation="wave" height={41.99} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
