import React, { useState, useEffect } from "react";
import { render } from "react-dom";

const Notification = ({ text }: { text: string }) => (
  <div
    style={{
      backgroundColor: "#ccc",
      padding: "1rem"
    }}
  >
    {text}
  </div>
);

const useNotification = (interval = 1000) => {
  const [message, updateMessage] = useState("");
  const notify = ({ text }: { text: string }) => {
    updateMessage(text);
  };

  // ref: https://stackoverflow.com/a/53090848/3551441
  useEffect(() => {
    let timer: number;
    if (message) {
      timer = setTimeout(() => {
        updateMessage("");
      }, interval);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, interval]);

  return {
    notify,
    message
  };
};

function App() {
  const notification = useNotification();

  const handleClick = () => {
    notification.notify({
      text: `Button clicked!, ${new Date().getSeconds()}.${new Date().getMilliseconds()}s`
    });
  };

  return (
    <div>
      {notification.message ? (
        <Notification text={notification.message} />
      ) : null}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <button
          style={{
            padding: "0.5rem",
            appearance: "none",
            border: "1px solid #ccc",
            backgroundColor: "#eee"
          }}
          onClick={handleClick}
        >
          notify
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
