import { useState, useEffect } from "react";
import throttle from "lodash.throttle";

export enum Version {
  mobile,
  desktop,
}

const getVersion = (): Version =>
  document.body.clientWidth < 990 ? Version.mobile : Version.desktop;

export const useAdaptive = (): { isMobile: boolean; isDesktop: boolean } => {
  const [version, setVersion] = useState(getVersion());
  const handleResize = throttle(() => {
    setVersion(getVersion());
  }, 100);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return {
    isMobile: version === Version.mobile,
    isDesktop: version === Version.desktop,
  };
};
