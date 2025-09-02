import React, { useState } from "react";
import Markdown from "react-markdown";
import YouTube from "react-youtube";
import { FiCopy, FiCheck } from "react-icons/fi";
import remarkGfm from "remark-gfm";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  const [copiedIndex, setCopiedIndex] = useState(null); // Track which code block was copied

  // Function to copy code to clipboard
  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);

    // Reset "copied" state after a short delay
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (content && chapter) {
    return (
      <div className="p-10">
        <h2 className="font-medium text-2xl mb-2">{chapter?.chapter_name}</h2>
        <p className="text-gray-500 mb-6">{chapter?.description}</p>

        {content?.videoId && (
          <div className="flex justify-center my-6">
            <YouTube videoId={content?.videoId} opts={opts} />
          </div>
        )}

        <div className="space-y-4">
          {content?.content?.map((item, index) => (
            <div key={index} className="p-5 bg-sky-50 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{item?.title}</h3>
              <Markdown
                className="whitespace-pre-wrap mb-3 text-gray-700"
                remarkPlugins={[remarkGfm]}
              >
                {item?.explanation}
              </Markdown>

              {item?.code && (
                <div className="relative p-4 bg-gray-800 text-white rounded-lg overflow-auto">
                  <button
                    onClick={() =>
                      handleCopy(item?.code.replace(/<\/?precode>/g, ""), index)
                    }
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    {copiedIndex === index ? <FiCheck /> : <FiCopy />}
                  </button>
                  <pre>
                    <code>{item?.code.replace(/<\/?precode>/g, "")}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-10 text-center text-gray-500">Loading content...</div>
    );
  }
}

export default ChapterContent;
