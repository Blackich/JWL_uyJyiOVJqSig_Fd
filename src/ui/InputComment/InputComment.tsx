import "./InputComment.css";
import { t } from "i18next";
import { Input } from "@ui/Input/Input";
import {
  ChangeEvent,
  CSSProperties,
  FC,
  HTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";

type Props = {
  bg?: string;
  min?: number;
  count: number;
  setCount: (count: number) => void;
  onLinesProcessed: (lines: string[]) => void;
} & HTMLAttributes<HTMLDivElement>;

export const InputComment: FC<Props> = ({
  bg,
  min,
  count,
  setCount,
  onLinesProcessed,
}) => {
  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const trimmedLines = useMemo(() => {
    const lines = textareaValue.split("\n");
    return lines
      .map((line) => (line === "" ? null : line))
      .map((line) => line?.trim())
      .map((line) => line?.replace(/\s+/g, " "))
      .filter(Boolean);
  }, [textareaValue]);

  useEffect(() => {
    if (trimmedLines.length > 0) {
      onLinesProcessed(trimmedLines as string[]);
    }
    setCount(trimmedLines.length);
  }, [trimmedLines, setCount, onLinesProcessed]);

  const bgColor = { "--bg-color-input-comment": bg || "#fff" } as CSSProperties;

  return (
    <div className="input-comment">
      <div>
        <Input
          disabled
          placeholder={t("extra_services.input_count")}
          value={count}
          bg={bg ? bg : "#fff"}
        />
        {min && (
          <div className="input-comment__text">
            {t("extra_services.min_count_warn")}: {min || 10}
          </div>
        )}
      </div>
      <div
        className="input-comment__textaria-wrapper"
        data-placeholder={t("extra_services.input_comment_placeholder")}
        style={bgColor}
      >
        <textarea
          className="input-comment__textaria"
          onChange={handleTextareaChange}
          spellCheck={false}
          style={bgColor}
        />
      </div>
    </div>
  );
};
