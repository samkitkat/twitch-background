(this["webpackJsonptwitch-background"]=this["webpackJsonptwitch-background"]||[]).push([[0],{10:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(4),o=n.n(r),s=(n(9),n(2)),i=n.p+"static/media/logo.6ce24c58.svg",l=(n(10),n(0)),u="jzrppcr9rjx38gwy84w3v6s56t0v2t",h=function(){return Math.floor(256*Math.random())};var d=function(){var e=Object(c.useState)(!1),t=Object(s.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(!0),o=Object(s.a)(r,2),d=o[0],g=o[1],b=Object(c.useState)(!1),j=Object(s.a)(b,2),f=j[0],O=j[1],w=Object(c.useState)("/twitch-background"),v=Object(s.a)(w,2),p=v[0],S=v[1],x=Object(c.useState)({r:84,g:58,b:183}),m=Object(s.a)(x,2),k=m[0],N=m[1],y=Object(c.useState)({r:0,g:172,b:193}),I=Object(s.a)(y,2),T=I[0],A=I[1],C=Object(c.useRef)();Object(c.useEffect)((function(){var e;return d&&(e=setInterval((function(){N({r:h(),g:h(),b:h()}),A({r:h(),g:h(),b:h()})}),5e3)),function(){clearInterval(e)}}),[d]);var L=Object(c.useCallback)((function(){return sessionStorage.twitchOAuthState=E(15),"https://id.twitch.tv/oauth2/authorize?response_type=token&client_id="+u+"&redirect_uri=https://lormanlau.github.io/twitch-background/&state="+sessionStorage.twitchOAuthState+"&scope=channel:read:redemptions%20user:read:email"}),[]),E=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=0;c<e;c++)t+=n.charAt(Math.floor(Math.random()*n.length));return t},F=function(){C.current.send(JSON.stringify({type:"PING"}))},R=Object(c.useCallback)((function(){var e;C.current=new WebSocket("wss://pubsub-edge.twitch.tv"),C.current.onopen=function(t){console.log((new Date).toLocaleString(),"INFO: Socket Opened"),F(),e=setInterval(F,6e4)},C.current.onerror=function(e){console.error((new Date).toLocaleString(),"ERR:",e)},C.current.onmessage=function(e){var t=JSON.parse(e.data);if(console.log((new Date).toLocaleString(),"RECV:",t),"PONG"===t.type&&(f||fetch("https://api.twitch.tv/helix/users",{headers:{Authorization:"Bearer ".concat(sessionStorage.twitchOAuthToken),"Client-Id":u}}).then((function(e){return e.json()})).then((function(e){return e.data[0].id})).then((function(e){!function(e){var t={type:"LISTEN",nonce:E(15),data:{topics:["channel-points-channel-v1.".concat(e)],auth_token:sessionStorage.twitchOAuthToken}};console.log(new Date.toLocaleString,"SENT:",t),C.send(JSON.stringify(t))}(e),O(!0)}))),"RECONNECT"===t.type&&(console.log((new Date).toLocaleString(),"INFO: Reconnecting..."),setTimeout(R,3e3)),"reward-redeemed"===t.type){var n=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:{r:0,g:0,b:0}}(t.data.redemption.user_input);t.data.reward.title.includes("left")?N(n):t.reward.title.includes("right")&&A(n)}},C.current.onclose=function(){console.log((new Date).toLocaleString(),"INFO: Socket Closed"),clearInterval(e),console.log((new Date).toLocaleString(),"INFO: Reconnecting..."),setTimeout(R,3e3),O(!1)}}),[C]);return Object(c.useEffect)((function(){document.location.hash.match(/access_token=(\w+)/)&&function(e){var t=function(t){var n=e.match(t);return n?n[1]:null},n=t(/state=(\w+)/);sessionStorage.twitchOAuthState===n&&(sessionStorage.twitchOAuthToken=t(/access_token=(\w+)/))}(document.location.hash),sessionStorage.twitchOAuthToken?(R(),a(!0),g(!1)):(S(L()),a(!1))}),[L,R]),Object(l.jsxs)("div",{className:"header",style:{background:"linear-gradient(60deg, rgba(".concat(k.r,",").concat(k.g,",").concat(k.b,") 0%, rgba(").concat(T.r,",").concat(T.g,",").concat(T.b,") 100%)")},children:[Object(l.jsx)("div",{className:"inner-header flex",children:Object(l.jsx)("div",{className:"container",children:Object(l.jsx)("div",{className:"row",children:Object(l.jsxs)("div",{style:{display:n?"none":"block"},className:"auth text-center",children:[Object(l.jsx)("p",{children:"First, connect with your Twitch Account:"}),Object(l.jsx)("a",{id:"auth-link",href:p,children:Object(l.jsx)("img",{src:i,alt:"logo"})})]})})})}),Object(l.jsx)("div",{children:Object(l.jsxs)("svg",{className:"waves",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 24 150 28",preserveAspectRatio:"none",shapeRendering:"auto",children:[Object(l.jsx)("defs",{children:Object(l.jsx)("path",{id:"gentle-wave",d:"M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"})}),Object(l.jsxs)("g",{className:"parallax",children:[Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"0",fill:"rgba(255,255,255,0.7"}),Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"3",fill:"rgba(255,255,255,0.5)"}),Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"5",fill:"rgba(255,255,255,0.3)"}),Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"7",fill:"#fff"})]})]})})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))};o.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(d,{})}),document.getElementById("root")),g()},9:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.72f79223.chunk.js.map