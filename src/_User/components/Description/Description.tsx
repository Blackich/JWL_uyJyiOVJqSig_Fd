import { useAdaptive } from "@utils/screenWidth";
import { FC } from "react";

type Props = {
  title: string;
  text: string;
};

export const Description: FC<Props> = ({ title, text }) => {
  const { isDesktop } = useAdaptive();
  return (
    <div style={{ padding: "10px" }}>
      <div
        className="description__title"
        style={
          isDesktop
            ? {
                marginBottom: "20px",
                fontSize: "20px",
                textAlign: "center",
                fontWeight: "600",
              }
            : {
                marginBottom: "10px",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "500",
              }
        }
      >
        {title}
      </div>
      <div
        className="description__text"
        style={
          isDesktop
            ? { fontSize: "14px", textAlign: "left", fontWeight: "500" }
            : { fontSize: "14px", textAlign: "left", fontWeight: "400" }
        }
      >
        {text}
      </div>
    </div>
  );
};
