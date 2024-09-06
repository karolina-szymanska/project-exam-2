import React, { useState } from "react";

/**
 * Component to truncate text and toggle between truncated and full text.
 *
 * @param {Object} props - Component props.
 * @param {string} props.text - The text to be truncated.
 * @param {number} props.maxLength - The maximum length of the truncated text.
 *
 * @component
 * @example
 * const exampleText = "This is an example of a long text that needs to be truncated.";
 * const maxLength = 20;
 * return (
 *   <TruncateText text={exampleText} maxLength={maxLength} />
 * );
 */
const TruncateText = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const handleToggle = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText =
    isTruncated && text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;

  return (
    <div>
      <span>{truncatedText}</span>
      {text.length > maxLength && (
        <button onClick={handleToggle} className="text-sm text-blue-700">
          ({isTruncated ? "View More" : "View Less"})
        </button>
      )}
    </div>
  );
};

export default TruncateText;
