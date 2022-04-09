(this["webpackJsonptwitch-background"]=this["webpackJsonptwitch-background"]||[]).push([[0],{10:function(t,e,n){},12:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n.n(c),o=n(4),r=n.n(o),i=(n(9),n(2)),s=n.p+"static/media/logo.6ce24c58.svg",u=(n(10),n(1)),l="5styqm5roq5f90rfyylk9fezdiu1mm";var d=function(){var t=Object(c.useState)(!1),e=Object(i.a)(t,2),n=e[0],a=e[1],o=Object(c.useState)(!0),r=Object(i.a)(o,2),d=(r[0],r[1]),h=Object(c.useState)("/twitch-background"),b=Object(i.a)(h,2),g=b[0],O=b[1],j=Object(c.useState)({r:0,g:255,b:0}),f=Object(i.a)(j,2),S=(f[0],f[1]),w=Object(c.useState)({r:255,g:255,b:255}),p=Object(i.a)(w,2),k=(p[0],p[1]),m=Object(c.useState)({r:0,g:255,b:0}),v=Object(i.a)(m,2),N=v[0],y=v[1],x=Object(c.useState)({r:255,g:255,b:255}),I=Object(i.a)(x,2),T=I[0],C=I[1],A=Object(c.useState)({r:0,g:255,b:0}),L=Object(i.a)(A,2),D=L[0],F=L[1],E=Object(c.useState)({r:255,g:255,b:255}),R=Object(i.a)(E,2),_=R[0],J=R[1],z=Object(c.useRef)(),P=Object(c.useCallback)((function(){return sessionStorage.twitchOAuthState=B(15),"https://id.twitch.tv/oauth2/authorize?response_type=token&client_id="+l+"&redirect_uri=https://samkitkat.github.io/twitch-background/&state="+sessionStorage.twitchOAuthState+"&scope=channel:read:redemptions%20user:read:email"}),[]),B=function(t){for(var e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=0;c<t;c++)e+=n.charAt(Math.floor(Math.random()*n.length));return e},M=Object(c.useCallback)((function(t){var e={type:"LISTEN",nonce:B(15),data:{topics:["channel-points-channel-v1.".concat(t)],auth_token:sessionStorage.twitchOAuthToken}};console.log((new Date).toLocaleString(),"SENT:",e),z.current.send(JSON.stringify(e))}),[]),q=function(){z.current.send(JSON.stringify({type:"PING"}))},G=Object(c.useCallback)((function(){var t,e=!1;z.current=new WebSocket("wss://pubsub-edge.twitch.tv"),z.current.onopen=function(e){console.log((new Date).toLocaleString(),"INFO: Socket Opened"),q(),t=setInterval(q,6e4)},z.current.onerror=function(t){console.error((new Date).toLocaleString(),"ERR:",t)},z.current.onmessage=function(t){var n=JSON.parse(t.data);if(console.log((new Date).toLocaleString(),"RECV:",n),"PONG"===n.type&&(e||fetch("https://api.twitch.tv/helix/users",{headers:{Authorization:"Bearer ".concat(sessionStorage.twitchOAuthToken),"Client-Id":l}}).then((function(t){return t.json()})).then((function(t){return t.data[0].id})).then((function(t){e=!0,M(t)}))),"RECONNECT"===n.type&&(console.log((new Date).toLocaleString(),"INFO: Reconnecting..."),setTimeout(G,3e3)),"reward-redeemed"===n.type){var c=function(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:0,g:0,b:0}}(n.data.redemption.user_input),a=0;n.data.reward.title.includes("left")?S(c):n.reward.title.includes("right")?k(c):n.reward.title.includes("gradient")&&(0===a?y(c):1===a?C(c):2===a?F(c):3===a&&J(c),++a>3&&(a=0))}},z.current.onclose=function(){console.log((new Date).toLocaleString(),"INFO: Socket Closed"),clearInterval(t),console.log((new Date).toLocaleString(),"INFO: Reconnecting..."),setTimeout(G,3e3),e=!1}}),[z,M]);return Object(c.useEffect)((function(){document.location.hash.match(/access_token=(\w+)/)&&function(t){var e=function(e){var n=t.match(e);return n?n[1]:null},n=e(/state=(\w+)/);sessionStorage.twitchOAuthState===n&&(sessionStorage.twitchOAuthToken=e(/access_token=(\w+)/))}(document.location.hash),sessionStorage.twitchOAuthToken?(G(),a(!0),d(!1)):(O(P()),a(!1))}),[P,G]),Object(u.jsx)("div",{className:"header",style:{background:"linear-gradient(60deg, rgba(".concat(N.r,",").concat(N.g,",").concat(N.b,") 0%, rgba(").concat(T.r,",").concat(T.g,",").concat(T.b,"), \n        rgba(").concat(D.r,",").concat(D.g,",").concat(D.b,"), rgba(").concat(_.r,",").concat(_.g,",").concat(_.b,") 100%)"),backgroundSize:"400% 400%",animation:"gradient 20s ease infinite",animationDirection:"alternate"},children:Object(u.jsx)("div",{className:"inner-header flex",children:Object(u.jsx)("div",{className:"container",children:Object(u.jsx)("div",{className:"row",children:Object(u.jsxs)("div",{style:{display:n?"none":"block"},className:"auth text-center",children:[Object(u.jsx)("p",{children:"First, connect with your Twitch Account:"}),Object(u.jsx)("a",{id:"auth-link",href:g,children:Object(u.jsx)("img",{src:s,alt:"logo"})})]})})})})})},h=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(e){var n=e.getCLS,c=e.getFID,a=e.getFCP,o=e.getLCP,r=e.getTTFB;n(t),c(t),a(t),o(t),r(t)}))};r.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(d,{})}),document.getElementById("root")),h()},9:function(t,e,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.27c36026.chunk.js.map