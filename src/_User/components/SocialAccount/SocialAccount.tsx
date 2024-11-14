import "./SocialAccount.css";
import { FC, MouseEvent } from "react";
import { TrashSVG } from "@User/utils/svg/HomeSvg";
import { UserSocial } from "@User/utils/types";
import { useTranslation } from "react-i18next";

type Props = {
  userCred: UserSocial;
  activeUserId: number;
  handleClickTrash: (e: MouseEvent<HTMLButtonElement>) => void;
  handleClickProfile: (e: MouseEvent<HTMLDivElement>) => void;
};

export const SocialAccount: FC<Props> = ({
  userCred,
  activeUserId,
  handleClickTrash,
  handleClickProfile,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className={`social-account ${
          activeUserId === userCred.id ? "active" : ""
        }`}
        data-username={userCred.nickname}
        onClick={(e) => handleClickProfile(e)}
        tabIndex={0}
        aria-label={t("social_account.chose_profile_aria", {
          name: userCred.nickname,
        })}
      >
        <img
          src="https://loremflickr.com/100/100/cat"
          alt={t("social_account.profile_photo_alt", {
            name: userCred.nickname,
          })}
          className="social-account__photo"
        />
        <div className="social-account__username">{userCred.nickname}</div>
        <button
          className="social-account__del-btn"
          onClick={(e) => handleClickTrash(e)}
          aria-label={t("social_account.profile_delete_aria", {
            name: userCred.nickname,
          })}
        >
          <TrashSVG />
        </button>
      </div>
    </>
  );
};
