(this["webpackJsonptwitch-background"]=this["webpackJsonptwitch-background"]||[]).push([[0],{10:function(t,e,n){},12:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n.n(c),o=n(4),r=n.n(o),i=(n(9),n(2)),s=n.p+"static/media/logo.6ce24c58.svg",d=(n(10),"CANCELED"),u="FULFILLED",l=function(t,e,n,c,a){fetch("https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=".concat(e,"&reward_id=").concat(n,"&id=").concat(c,"}"),{method:"PATCH",body:JSON.stringify({status:a}),headers:{"client-id":t,Authorization:"Bearer ".concat(sessionStorage.twitchOAuthToken),"Content-type":"application/json;"}}).then((function(t){return t.json()})).then((function(t){return console.log(t)}))},h=n(1),g="5styqm5roq5f90rfyylk9fezdiu1mm";var b=function(){var t=Object(c.useState)(!1),e=Object(i.a)(t,2),n=e[0],a=e[1],o=Object(c.useState)("/twitch-background"),r=Object(i.a)(o,2),b=r[0],O=r[1],f=Object(c.useState)(),p=Object(i.a)(f,2),j=p[0],w=p[1],S=Object(c.useState)({r:102,g:0,b:204}),m=Object(i.a)(S,2),v=m[0],k=m[1],N=Object(c.useState)({r:255,g:255,b:255}),y=Object(i.a)(N,2),x=y[0],C=y[1],I=Object(c.useState)({r:255,g:255,b:255}),A=Object(i.a)(I,2),L=A[0],T=A[1],D=Object(c.useState)({r:255,g:255,b:255}),E=Object(i.a)(D,2),F=E[0],_=E[1],J=0,R=Object(c.useRef)(),P=Object(c.useCallback)((function(){return sessionStorage.twitchOAuthState=z(15),"https://id.twitch.tv/oauth2/authorize?response_type=token&client_id="+g+"&redirect_uri=https://samkitkat.github.io/twitch-background/&state="+sessionStorage.twitchOAuthState+"&scope=channel:read:redemptions%20user:read:email"}),[]),z=function(t){for(var e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=0;c<t;c++)e+=n.charAt(Math.floor(Math.random()*n.length));return e},B=Object(c.useCallback)((function(t){var e={type:"LISTEN",nonce:z(15),data:{topics:["channel-points-channel-v1.".concat(t)],auth_token:sessionStorage.twitchOAuthToken}};console.log((new Date).toLocaleString(),"SENT:",e),R.current.send(JSON.stringify(e))}),[]),M=function(){R.current.send(JSON.stringify({type:"PING"}))},q=Object(c.useCallback)((function(){var t,e=!1;R.current=new WebSocket("wss://pubsub-edge.twitch.tv"),R.current.onopen=function(e){console.log((new Date).toLocaleString(),"INFO: Socket Opened"),M(),t=setInterval(M,6e4)},R.current.onerror=function(t){console.error((new Date).toLocaleString(),"ERR:",t)},R.current.onmessage=function(t){var n=JSON.parse(t.data),c=n.data&&n.data.message;if(c&&(n=JSON.parse(c)),console.log((new Date).toLocaleString(),"RECV:",n),"PONG"===n.type&&(e||fetch("https://api.twitch.tv/helix/users",{headers:{Authorization:"Bearer ".concat(sessionStorage.twitchOAuthToken),"Client-Id":g}}).then((function(t){return t.json()})).then((function(t){return w(t.data[0].id),t.data[0].id})).then((function(t){e=!0,B(t)}))),"RECONNECT"===n.type&&(console.log((new Date).toLocaleString(),"INFO: Reconnecting..."),setTimeout(q,3e3)),"reward-redeemed"===n.type){var a=function(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16),valid:!0}:{r:0,g:0,b:0,valid:!1}}(n.data.redemption.user_input);if(!j){if(!a.valid)return void l(g,j,n.data.redemption.reward.id,n.data.redemption.id,d);n.data.redemption.reward.title.includes("gradient")&&(0===J?k(a):1===J?C(a):2===J?T(a):3===J&&_(a),++J>3&&(J=0),l(g,j,n.data.redemption.reward.id,n.data.redemption.id,u))}}},R.current.onclose=function(){console.log((new Date).toLocaleString(),"INFO: Socket Closed"),clearInterval(t),console.log((new Date).toLocaleString(),"INFO: Reconnecting..."),setTimeout(q,3e3),e=!1}}),[R,B]);return Object(c.useEffect)((function(){document.location.hash.match(/access_token=(\w+)/)&&function(t){var e=function(e){var n=t.match(e);return n?n[1]:null},n=e(/state=(\w+)/);sessionStorage.twitchOAuthState===n&&(sessionStorage.twitchOAuthToken=e(/access_token=(\w+)/))}(document.location.hash),sessionStorage.twitchOAuthToken?(q(),a(!0)):(O(P()),a(!1))}),[P,q]),Object(h.jsx)("div",{className:"header",style:{background:"linear-gradient(60deg, rgba(".concat(v.r,",").concat(v.g,",").concat(v.b,") 0%, rgba(").concat(x.r,",").concat(x.g,",").concat(x.b,"), \n        rgba(").concat(L.r,",").concat(L.g,",").concat(L.b,"), rgba(").concat(F.r,",").concat(F.g,",").concat(F.b,") 100%) 0% 0% / 400% 400%"),animation:"gradient 20s ease infinite",animationDirection:"alternate"},children:Object(h.jsx)("div",{className:"inner-header flex",children:Object(h.jsx)("div",{className:"container",children:Object(h.jsx)("div",{className:"row",children:Object(h.jsxs)("div",{style:{display:n?"none":"block"},className:"auth text-center",children:[Object(h.jsx)("p",{children:"First, connect with your Twitch Account:"}),Object(h.jsx)("a",{id:"auth-link",href:b,children:Object(h.jsx)("img",{src:s,alt:"logo"})})]})})})})})},O=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(e){var n=e.getCLS,c=e.getFID,a=e.getFCP,o=e.getLCP,r=e.getTTFB;n(t),c(t),a(t),o(t),r(t)}))};r.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(b,{})}),document.getElementById("root")),O()},9:function(t,e,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.8902136f.chunk.js.map