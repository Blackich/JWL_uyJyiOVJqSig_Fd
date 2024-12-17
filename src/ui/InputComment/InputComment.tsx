import "./InputComment.css";
import { t } from "i18next";
import { Input } from "@ui/Input/Input";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";

type Props = {
  min?: number;
  count: number;
  setCount: (count: number) => void;
  onLinesProcessed: (lines: string[]) => void;
};

export const InputComment: FC<Props> = ({
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

  return (
    <div className="input-comment">
      <div>
        <Input
          disabled
          placeholder={t("extra_services.input_count")}
          value={count}
        />
        <div className="input-comment__text">
          {t("extra_services.min_count_warn")}: {min || 10}
        </div>
      </div>
      <div
        className="input-comment__textaria-wrapper"
        data-placeholder={t("extra_services.input_comment_placeholder")}
      >
        <textarea
          className="input-comment__textaria"
          onChange={handleTextareaChange}
          spellCheck={false}
        />
      </div>
    </div>
  );
};
