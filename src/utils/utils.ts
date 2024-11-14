import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AxiosError } from "axios";

export const formatUSD = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

export const formatRUB = (value: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (value: string) => {
  const date = new Date(value);
  return Intl.DateTimeFormat("ru-RU", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  }).format(date);
};

export const remainingTime = (date: string): number => {
  const month = 1000 * 60 * 60 * 24 * 30;
  const ms = new Date(date).getTime() + month;
  return ms - Date.now();
};

export const daysUntilFutureDate = (date: string) => {
  const ms = new Date(date).getTime() + 1000 * 60 * 60 * 24 * 30;
  const future = new Date(ms);
  const today = new Date();
  const differenceInMilliseconds = future.getTime() - today.getTime();
  const daysDifference = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );
  const hoursDifference = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60),
  );
  return daysDifference > 0
    ? `${daysDifference} ${pluralize(daysDifference, ["день", "дня", "дней"])}`
    : hoursDifference > 0
    ? `${hoursDifference} ${pluralize(hoursDifference, [
        "час",
        "часа",
        "часов",
      ])}`
    : 0;
};

export const pluralize = (num: number, titles: string[]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
};

export const handlerErrorAxios = (
  error: FetchBaseQueryError | SerializedError,
) => {
  if (error && "data" in error && typeof error.data === "object")
    return error.data as AxiosError;
};
