import { CardClassName, PackageDetailsUser } from "@User/utils/types";

export const cardListAddClass = (packageDetails: PackageDetailsUser[]) =>
  packageDetails?.map((detail, i) => {
    return {
      ...detail,
      className: cardClassNameList[i]["className"],
    };
  });

export const cardClassNameList: CardClassName[] = [
  {
    className: "one",
  },
  {
    className: "two",
  },
  {
    className: "three",
  },
  {
    className: "four",
  },
  {
    className: "five",
  },
  {
    className: "six",
  },
  {
    className: "seven",
  },
  {
    className: "eight",
  },
];
