(function(){"use strict";var e={964:function(e,o,n){var t=n(751),r=n(641);const a={id:"app"};function i(e,o,n,t,i,u){const l=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.CE)("div",a,[(0,r.bF)(l)])}var u={name:"App"},l=n(262);const s=(0,l.A)(u,[["render",i]]);var c=s,d=n(220),f=n(33);const p=e=>((0,r.Qi)("data-v-55e3f555"),e=e(),(0,r.jt)(),e),m=p((()=>(0,r.Lk)("h1",null,"ようこそ",-1))),g={key:0},v={key:1};function h(e,o,n,t,a,i){const u=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",null,[m,a.isLoggedIn?((0,r.uX)(),(0,r.CE)("div",g,[(0,r.Lk)("p",null,"Welcome, "+(0,f.v_)(a.username)+"!",1),(0,r.Lk)("button",{onClick:o[0]||(o[0]=(...e)=>i.logout&&i.logout(...e))},"Logout")])):((0,r.uX)(),(0,r.CE)("div",v,[(0,r.Lk)("p",null,[(0,r.eW)("Please "),(0,r.bF)(u,{to:"/login"},{default:(0,r.k6)((()=>[(0,r.eW)("login")])),_:1}),(0,r.eW)(" or "),(0,r.bF)(u,{to:"/register"},{default:(0,r.k6)((()=>[(0,r.eW)("register")])),_:1}),(0,r.eW)(".")])]))])}var b=n(335),k={name:"HomePage",data(){return{isLoggedIn:!1,username:""}},async mounted(){const e=localStorage.getItem("token");if(e)try{const o=await b.A.get("http://localhost:8000/api/user/",{headers:{Authorization:`Token ${e}`}});this.isLoggedIn=!0,this.username=o.data.username}catch(o){console.error("Failed to fetch user information",o),localStorage.removeItem("token")}},methods:{logout(){localStorage.removeItem("token"),this.isLoggedIn=!1,this.username=""}}};const y=(0,l.A)(k,[["render",h],["__scopeId","data-v-55e3f555"]]);var L=y;const w=(0,r.Lk)("h1",null,"Register Page",-1),O=[w];function P(e,o,n,t,a,i){return(0,r.uX)(),(0,r.CE)("div",null,O)}var E={name:"RegisterPage"};const j=(0,l.A)(E,[["render",P]]);var A=j;const C=(0,r.Lk)("h1",null,"Login Page",-1),S=(0,r.Lk)("label",{for:"email"},"Email:",-1),I=(0,r.Lk)("label",{for:"password"},"Password:",-1),_=(0,r.Lk)("button",{type:"submit"},"Login",-1);function W(e,o,n,a,i,u){return(0,r.uX)(),(0,r.CE)("div",null,[C,(0,r.Lk)("form",{onSubmit:o[2]||(o[2]=(0,t.D$)(((...e)=>u.login&&u.login(...e)),["prevent"]))},[(0,r.Lk)("div",null,[S,(0,r.bo)((0,r.Lk)("input",{type:"email",id:"email",name:"email","onUpdate:modelValue":o[0]||(o[0]=e=>i.email=e),autocomplete:"email",required:""},null,512),[[t.Jo,i.email]])]),(0,r.Lk)("div",null,[I,(0,r.bo)((0,r.Lk)("input",{type:"password",id:"password",name:"password","onUpdate:modelValue":o[1]||(o[1]=e=>i.password=e),autocomplete:"current-password",required:""},null,512),[[t.Jo,i.password]])]),_],32)])}var X={name:"LoginPage",data(){return{email:"",password:""}},methods:{async login(){try{const e=await b.A.post("http://localhost:8000/api/login/",{email:this.email,password:this.password});console.log(e.data)}catch(e){console.error(e)}}}};const F=(0,l.A)(X,[["render",W]]);var T=F;const x=[{path:"/",name:"Home",component:L},{path:"/register",name:"Register",component:A},{path:"/login",name:"Login",component:T}],R=(0,d.aE)({history:(0,d.LA)("/static/"),routes:x});var q=R;(0,t.Ef)(c).use(q).mount("#app")}},o={};function n(t){var r=o[t];if(void 0!==r)return r.exports;var a=o[t]={exports:{}};return e[t](a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(o,t,r,a){if(!t){var i=1/0;for(c=0;c<e.length;c++){t=e[c][0],r=e[c][1],a=e[c][2];for(var u=!0,l=0;l<t.length;l++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](t[l])}))?t.splice(l--,1):(u=!1,a<i&&(i=a));if(u){e.splice(c--,1);var s=r();void 0!==s&&(o=s)}}return o}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[t,r,a]}}(),function(){n.d=function(e,o){for(var t in o)n.o(o,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};n.O.j=function(o){return 0===e[o]};var o=function(o,t){var r,a,i=t[0],u=t[1],l=t[2],s=0;if(i.some((function(o){return 0!==e[o]}))){for(r in u)n.o(u,r)&&(n.m[r]=u[r]);if(l)var c=l(n)}for(o&&o(t);s<i.length;s++)a=i[s],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(c)},t=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))}();var t=n.O(void 0,[504],(function(){return n(964)}));t=n.O(t)})();
//# sourceMappingURL=app.18e3f5f6.js.map