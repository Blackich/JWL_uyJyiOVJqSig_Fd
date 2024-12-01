import "./SocialAccount.css";
import { FC, MouseEvent } from "react";
import { AvatarMockSVG, TrashSVG } from "@User/utils/svg/HomeSvg";
import { UserSocial } from "@User/utils/types";
import { useTranslation } from "react-i18next";

type Props = {
  userCred: UserSocial;
  activeUserId: number;
  avatarColor?: { bg: string; person: string };
  handleClickTrash: (e: MouseEvent<HTMLButtonElement>) => void;
  handleClickProfile: (e: MouseEvent<HTMLDivElement>) => void;
  photoId?: number;
};

export const SocialAccount: FC<Props> = ({
  userCred,
  activeUserId,
  avatarColor,
  handleClickTrash,
  handleClickProfile,
  photoId,
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
        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
        role="button"
        aria-label={t("social_account.profile_selection_aria", {
          name: userCred.nickname,
        })}
      >
        {photoId ? (
          <img
            src={`https://reqres.in/img/faces/${photoId}-image.jpg`}
            alt={t("social_account.profile_photo_alt", {
              name: userCred.nickname,
            })}
            className="social-account__photo"
          />
        ) : (
          <AvatarMockSVG bg={avatarColor?.bg} person={avatarColor?.person} />
        )}
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

export const SkeletonSocialAccount = () => {
  return (
    <div className="social-account">
      <div className="social-account__photo skeleton" />
      <div className="social-account__username skeleton"></div>
    </div>
  );
};
