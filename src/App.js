import logo from "./logo.svg";
import "./App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { hexToRgb } from "./utils/hexToRgb";
import { updateRedeemStatus, status } from "./utils/updateRedeemStatus";

const clientId = "5styqm5roq5f90rfyylk9fezdiu1mm";
const redirectURI = "https://samkitkat.github.io/twitch-background/";
const scope = "channel:read:redemptions%20user:read:email%20channel:manage:redemptions";

// const getRandomInt = () => {
//   return Math.floor(Math.random() * 256);
// };



function App() {
  const [ready, setReady] = useState(false);
  //const [demo, setDemo] = useState(true);
  const [_authUrl, setAuthUrl] = useState("/twitch-background");

  //const [left, setLeft] = useState({ r: 0, g: 255, b: 0 });
  //const [right, setRight] = useState({ r: 255, g: 255, b: 255 });

  const [userId, setUserId] = useState();
  const [first, setFirst] = useState({ r: 102, g: 0, b: 204 });
  const [second, setSecond] = useState({ r: 255, g: 255, b: 255 });
  const [third, setThird] = useState({ r: 255, g: 255, b: 255 });
  const [fourth, setFourth] = useState({ r: 255, g: 255, b: 255 });

  var inputHex = 0;

  var ws = useRef();

  /* for testing to generate random colors */
  // useEffect(() => {
  //   let clock;
  //   if (demo) {
  //     clock = setInterval(() => {
  //       setFirst({ r: getRandomInt(), g: getRandomInt(), b: getRandomInt() });
  //       setSecond({ r: getRandomInt(), g: getRandomInt(), b: getRandomInt() });
  //       setThird({ r: getRandomInt(), g: getRandomInt(), b: getRandomInt() });
  //       setFourth({ r: getRandomInt(), g: getRandomInt(), b: getRandomInt() });
  //     }, 5000);
  //   }
  //   return () => {
  //     clearInterval(clock);
  //   };
  // }, [demo]);

  var parseFragment = (hash) => {
    var hashMatch = function (expr) {
      var match = hash.match(expr);
      return match ? match[1] : null;
    };
    var state = hashMatch(/state=(\w+)/);
    if (sessionStorage.twitchOAuthState === state)
      sessionStorage.twitchOAuthToken = hashMatch(/access_token=(\w+)/);
  };

  var authUrl = useCallback(() => {
    sessionStorage.twitchOAuthState = nonce(15);
    var url =
      "https://id.twitch.tv/oauth2/authorize" +
      "?response_type=token" +
      "&client_id=" +
      clientId +
      "&redirect_uri=" +
      redirectURI +
      "&state=" +
      sessionStorage.twitchOAuthState +
      "&scope=" +
      scope;
    return url;
  }, []);

  var getUserId = () => {
    return fetch("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${sessionStorage.twitchOAuthToken}`,
        "Client-Id": clientId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserId(data.data[0].id)
        return data.data[0].id
      });
  };

  var nonce = (length) => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  var listen = useCallback((channelId) => {
    let message = {
      type: "LISTEN",
      nonce: nonce(15),
      data: {
        topics: [`channel-points-channel-v1.${channelId}`],
        auth_token: sessionStorage.twitchOAuthToken,
      },
    };
    console.log(new Date().toLocaleString(), "SENT:", message);
    ws.current.send(JSON.stringify(message));
  }, []);

  var heartbeat = () => {
    let message = {
      type: "PING",
    };
    ws.current.send(JSON.stringify(message));
  };

  var connect = useCallback(() => {
    var heartbeatInterval = 1000 * 60;
    var reconnectInterval = 1000 * 3;
    var heartbeatHandle;
    var connected = false;

    ws.current = new WebSocket("wss://pubsub-edge.twitch.tv");

    ws.current.onopen = function (event) {
      console.log(new Date().toLocaleString(), "INFO: Socket Opened");
      heartbeat();
      heartbeatHandle = setInterval(heartbeat, heartbeatInterval);
    };

    ws.current.onerror = function (error) {
      console.error(new Date().toLocaleString(), "ERR:", error);
    };

    ws.current.onmessage = function (event) {
      let message = JSON.parse(event.data);
      var data = message.data && message.data.message;
      if (data) message = JSON.parse(data);
      console.log(new Date().toLocaleString(), "RECV:", message);
      if (message.type === "PONG") {
        if (!connected) {
          getUserId().then((channelId) => {
            connected = true;
            listen(channelId);
          });
        }
      }
      if (message.type === "RECONNECT") {
        console.log(new Date().toLocaleString(), "INFO: Reconnecting...");
        setTimeout(connect, reconnectInterval);
      }
      if (message.type === "reward-redeemed") {
        let color = message.data.redemption.user_input;
        let rgbValue = hexToRgb(color);
        if (!userId) {
          if (!rgbValue.valid) {
            updateRedeemStatus(clientId, userId, message.data.redemption.reward.id, message.data.redemption.id, status.canceled);
            return;
          }
          // let inputHex = 0;

          // if (message.data.reward.title.includes("left")) {
          //   setLeft(rgbValue);
          // } 

          // else if (message.data.reward.title.includes("right")) {
          //   setRight(rgbValue);
          // } 

          if (message.data.redemption.reward.title.includes("gradient")) {

            // setFirst(rgbValue);

            if (inputHex === 0) {
              setFirst(rgbValue);
            }
            else if (inputHex === 1) {
              setSecond(rgbValue);
            }
            else if (inputHex === 2) {
              setThird(rgbValue);
            }
            else if (inputHex === 3) {
              setFourth(rgbValue);
            }

            inputHex++;

            if (inputHex > 3) {
              inputHex = 0;
            }
            updateRedeemStatus(clientId, userId, message.data.redemption.reward.id, message.data.redemption.id, status.fulfilled);
          }
        }
      }
    };

    ws.current.onclose = function () {
      console.log(new Date().toLocaleString(), "INFO: Socket Closed");
      clearInterval(heartbeatHandle);
      console.log(new Date().toLocaleString(), "INFO: Reconnecting...");
      setTimeout(connect, reconnectInterval);
      connected = false;
    };
  }, [ws, listen]);

  useEffect(() => {
    if (document.location.hash.match(/access_token=(\w+)/))
      parseFragment(document.location.hash);
    if (sessionStorage.twitchOAuthToken) {
      connect();
      setReady(true);
      //setDemo(false);
    } else {
      setAuthUrl(authUrl());
      setReady(false);
    }
  }, [authUrl, connect]);

  return (
    <div
      className="header"
      style={{
        //background: `linear-gradient(60deg, rgba(${left.r},${left.g},${left.b}) 0%, rgba(${right.r},${right.g},${right.b}) 100%)`,

        background: `linear-gradient(60deg, rgba(${first.r},${first.g},${first.b}) 0%, rgba(${second.r},${second.g},${second.b}), 
        rgba(${third.r},${third.g},${third.b}), rgba(${fourth.r},${fourth.g},${fourth.b}) 100%) 0% 0% / 400% 400%`,
        animation: 'gradient 20s ease infinite',
        animationDirection: 'alternate',
      }}
    >
      <div className="inner-header flex">
        <div className="container">
          <div className="row">
            <div
              style={{ display: ready ? "none" : "block" }}
              className="auth text-center"
            >
              <p>First, connect with your Twitch Account:</p>
              <a id="auth-link" href={_authUrl}>
                <img src={logo} alt="logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use
              href="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              href="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use href="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div> */}
    </div>
  );
}

export default App;
