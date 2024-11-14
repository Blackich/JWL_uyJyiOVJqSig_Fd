import { CardClassName, PackageUser } from "@User/utils/types";

export const cardListAddClass = (packageList: PackageUser[]) => (
  packageList?.map((pack, i) => {
    return {
      ...pack,
      className: cardClassNameList[i]["className"],
    };
  })
)

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
