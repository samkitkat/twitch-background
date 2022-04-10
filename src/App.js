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
  const [_authUrl, setAuthUrl] = useState("/twitch-background");

  const [userId, setUserId] = useState();
  const [first, setFirst] = useState({ r: 102, g: 0, b: 204 });
  const [second, setSecond] = useState({ r: 255, g: 255, b: 255 });
  const [third, setThird] = useState({ r: 255, g: 255, b: 255 });
  const [fourth, setFourth] = useState({ r: 255, g: 255, b: 255 });
  const [inputHex, setInputHex] = useState(0);

  var ws = useRef();

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
      console.log(new Date().toLocaleString(), "RECV:", message, "USER_ID:", userId);
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
        if (userId) {
          if (!rgbValue.valid) {
            updateRedeemStatus(clientId, userId, message.data.redemption.reward.id, message.data.redemption.id, status.canceled);
            return;
          }

          if (message.data.redemption.reward.title.includes("gradient")) {

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

            setInputHex(currentState => {
              if (currentState > 3) {
                return 0;
              }
              return currentState+1;
            });
            console.log(setInputHex);
            //idk why its not working :(
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
  }, [ws, listen, userId, inputHex]);

  useEffect(() => {
    if (document.location.hash.match(/access_token=(\w+)/))
      parseFragment(document.location.hash);
    if (sessionStorage.twitchOAuthToken) {
      connect();
      setReady(true);
    } else {
      setAuthUrl(authUrl());
      setReady(false);
    }
  }, [authUrl, connect]);

  return (
    <div
      className="header"
      style={{
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
    </div>
  );
}

export default App;
