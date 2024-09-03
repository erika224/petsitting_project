(function(){"use strict";var e={5346:function(e,t,a){var r=a(3751),o=a(641);const n={id:"app"};function s(e,t,a,r,s,i){const l=(0,o.g2)("AppHeader"),u=(0,o.g2)("router-view");return(0,o.uX)(),(0,o.CE)("div",n,[(0,o.bF)(l),(0,o.bF)(u)])}const i={class:"app-header"},l={class:"header-content"};function u(e,t,a,r,n,s){const u=(0,o.g2)("router-link");return(0,o.uX)(),(0,o.CE)("header",i,[(0,o.Lk)("div",l,[(0,o.Lk)("nav",null,[(0,o.bF)(u,{to:"/"},{default:(0,o.k6)((()=>[(0,o.eW)("Home")])),_:1}),(0,o.bF)(u,{to:"/sitter-search"},{default:(0,o.k6)((()=>[(0,o.eW)("Search")])),_:1}),n.isAuthenticated?((0,o.uX)(),(0,o.Wv)(u,{key:0,to:"/profile"},{default:(0,o.k6)((()=>[(0,o.eW)("Profile")])),_:1})):(0,o.Q3)("",!0),n.isAuthenticated?((0,o.uX)(),(0,o.CE)("button",{key:1,onClick:t[0]||(t[0]=(...e)=>s.logout&&s.logout(...e)),class:"logout-button"},"Logout")):(0,o.Q3)("",!0)])])])}a(4114);var c={name:"AppHeader",data(){return{isAuthenticated:!1}},created(){this.checkAuthentication()},methods:{checkAuthentication(){const e=localStorage.getItem("authToken");this.isAuthenticated=!!e},logout(){localStorage.removeItem("authToken"),this.isLoggedIn=!1,this.username="",this.$router.push("/login")}},watch:{$route(){this.checkAuthentication()}}},d=a(6262);const p=(0,d.A)(c,[["render",u],["__scopeId","data-v-42b7e30c"]]);var m=p,h={name:"App",components:{AppHeader:m}};const f=(0,d.A)(h,[["render",s]]);var k=f,g=a(5220),v=a(33);const b=e=>((0,o.Qi)("data-v-3fe750fa"),e=e(),(0,o.jt)(),e),L=b((()=>(0,o.Lk)("h1",null,"シッター検索",-1))),y={class:"input-group"},C=b((()=>(0,o.Lk)("label",{for:"prefecture"},"都道府県",-1))),A=["value"],T=b((()=>(0,o.Lk)("label",{for:"city"},"市区町村",-1))),_=["value"],w={class:"input-group"},D=b((()=>(0,o.Lk)("label",{for:"startDate"},"開始日",-1))),P={class:"input-group"},S=b((()=>(0,o.Lk)("label",{for:"startTime"},"開始時間",-1))),E={class:"input-group"},I=b((()=>(0,o.Lk)("label",{for:"endDate"},"終了日",-1))),X={class:"input-group"},j=b((()=>(0,o.Lk)("label",{for:"endTime"},"終了時間",-1))),U=b((()=>(0,o.Lk)("button",{type:"submit"},"検索する",-1))),V={key:0,class:"results"},F=b((()=>(0,o.Lk)("h2",null,"検索結果",-1)));function J(e,t,a,n,s,i){const l=(0,o.g2)("AppHeader");return(0,o.uX)(),(0,o.CE)("div",null,[(0,o.bF)(l),L,(0,o.Lk)("form",{onSubmit:t[7]||(t[7]=(0,r.D$)(((...e)=>i.searchSitters&&i.searchSitters(...e)),["prevent"]))},[(0,o.Lk)("div",y,[C,(0,o.bo)((0,o.Lk)("select",{id:"prefecture","onUpdate:modelValue":t[0]||(t[0]=e=>s.selectedPrefecture=e),onChange:t[1]||(t[1]=(...e)=>i.updateCities&&i.updateCities(...e))},[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(s.prefectures,(e=>((0,o.uX)(),(0,o.CE)("option",{key:e.name,value:e.name},(0,v.v_)(e.name),9,A)))),128))],544),[[r.u1,s.selectedPrefecture]]),T,(0,o.bo)((0,o.Lk)("select",{id:"city","onUpdate:modelValue":t[2]||(t[2]=e=>s.selectedCity=e)},[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(s.cities,(e=>((0,o.uX)(),(0,o.CE)("option",{key:e,value:e},(0,v.v_)(e),9,_)))),128))],512),[[r.u1,s.selectedCity]])]),(0,o.Lk)("div",w,[D,(0,o.bo)((0,o.Lk)("input",{type:"date",id:"startDate","onUpdate:modelValue":t[3]||(t[3]=e=>s.startDate=e)},null,512),[[r.Jo,s.startDate]])]),(0,o.Lk)("div",P,[S,(0,o.bo)((0,o.Lk)("input",{type:"time",id:"startTime","onUpdate:modelValue":t[4]||(t[4]=e=>s.startTime=e)},null,512),[[r.Jo,s.startTime]])]),(0,o.Lk)("div",E,[I,(0,o.bo)((0,o.Lk)("input",{type:"date",id:"endDate","onUpdate:modelValue":t[5]||(t[5]=e=>s.endDate=e)},null,512),[[r.Jo,s.endDate]])]),(0,o.Lk)("div",X,[j,(0,o.bo)((0,o.Lk)("input",{type:"time",id:"endTime","onUpdate:modelValue":t[6]||(t[6]=e=>s.endTime=e)},null,512),[[r.Jo,s.endTime]])]),U],32),s.results.length>0?((0,o.uX)(),(0,o.CE)("div",V,[F,(0,o.Lk)("ul",null,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(s.results,(e=>((0,o.uX)(),(0,o.CE)("li",{key:e.id},(0,v.v_)(e.name)+" - "+(0,v.v_)(e.location)+" - "+(0,v.v_)(e.price)+"円/時 ",1)))),128))])])):(0,o.Q3)("",!0)])}var O=a(4335);const $=O.A.create({baseURL:"http://localhost:8000/api/",headers:{"Content-Type":"application/json"}});$.interceptors.request.use((e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Token ${t}`),e}),(e=>Promise.reject(e)));var H=$,q={name:"HomePage",components:{AppHeader:m},data(){return{isLoggedIn:!1,prefectures:[],selectedPrefecture:"",cities:[],selectedCity:"",startDate:"",endDate:"",startTime:"",endTime:"",results:[]}},async mounted(){await this.checkAuthentication(),await this.fetchPrefectures()},methods:{async checkAuthentication(){const e=localStorage.getItem("token");try{const t=await H.get("user/",{headers:{Authorization:`Token ${e}`}});console.log("API Response:",t.data),this.isLoggedIn=!0,this.name=t.data.name||"Guest"}catch(t){console.error("Failed to fetch user information",t),localStorage.removeItem("token"),this.isLoggedIn=!1}},async fetchPrefectures(){try{const e=await H.get("https://geolonia.github.io/japanese-addresses/api/ja.json"),t=e.data;this.prefectures=Object.keys(t).map((e=>({name:e,cities:t[e]}))),console.log("Processed Prefectures Data:",this.prefectures)}catch(e){console.error("都道府県データの取得に失敗しました:",e)}},updateCities(){const e=this.prefectures.find((e=>e.name===this.selectedPrefecture));this.cities=e?e.cities:[],this.selectedCity=""},async searchSitters(){try{const e=await H.get("sitters/",{params:{location:this.selectedCity,start_date:this.startDate,end_date:this.endDate,start_time:this.startTime,end_time:this.endTime}});this.results=e.data}catch(e){console.error("検索に失敗しました:",e),alert("検索に失敗しました。再度お試しください。")}}}};const Q=(0,d.A)(q,[["render",J],["__scopeId","data-v-3fe750fa"]]);var K=Q;const x=e=>((0,o.Qi)("data-v-f4134154"),e=e(),(0,o.jt)(),e),R={class:"register-container"},M=x((()=>(0,o.Lk)("h1",null,"新規登録",-1))),W={class:"input-group"},z=x((()=>(0,o.Lk)("label",{for:"email"},"メールアドレス:",-1))),G={class:"input-group"},B=x((()=>(0,o.Lk)("label",{for:"name"},"名前:",-1))),N={class:"input-group"},Y=x((()=>(0,o.Lk)("label",{for:"password"},"パスワード:",-1))),Z=x((()=>(0,o.Lk)("button",{type:"submit"},"登録する",-1)));function ee(e,t,a,n,s,i){return(0,o.uX)(),(0,o.CE)("div",R,[M,(0,o.Lk)("form",{onSubmit:t[3]||(t[3]=(0,r.D$)(((...e)=>i.register&&i.register(...e)),["prevent"]))},[(0,o.Lk)("div",W,[z,(0,o.bo)((0,o.Lk)("input",{type:"email","onUpdate:modelValue":t[0]||(t[0]=e=>s.email=e),required:""},null,512),[[r.Jo,s.email]])]),(0,o.Lk)("div",G,[B,(0,o.bo)((0,o.Lk)("input",{type:"text",id:"name","onUpdate:modelValue":t[1]||(t[1]=e=>s.name=e),required:""},null,512),[[r.Jo,s.name]])]),(0,o.Lk)("div",N,[Y,(0,o.bo)((0,o.Lk)("input",{type:"password","onUpdate:modelValue":t[2]||(t[2]=e=>s.password=e),required:""},null,512),[[r.Jo,s.password]])]),Z],32)])}var te={name:"RegisterPage",data(){return{name:"",email:"",password:""}},methods:{async register(){try{await H.post("register/",{name:this.name,email:this.email,password:this.password}),alert("登録が成功しました！"),this.$router.push("/login")}catch(e){e.response?e.response.data.email?(console.error("Registration failed: This email is already registered."),alert("このメールアドレスは既に登録されています。別のメールアドレスを使用してください。")):(console.error("Registration failed:",e.response.data),alert("登録に失敗しました。再度お試しください。")):(console.error("Registration failed:",e.message),alert("登録に失敗しました。再度お試しください。"))}}}};const ae=(0,d.A)(te,[["render",ee],["__scopeId","data-v-f4134154"]]);var re=ae;const oe=e=>((0,o.Qi)("data-v-3183ef34"),e=e(),(0,o.jt)(),e),ne={class:"login-container"},se=oe((()=>(0,o.Lk)("h1",null,"ログイン",-1))),ie={class:"input-group"},le=oe((()=>(0,o.Lk)("label",{for:"email"},"メールアドレス",-1))),ue={class:"input-group"},ce=oe((()=>(0,o.Lk)("label",{for:"password"},"パスワード",-1))),de=oe((()=>(0,o.Lk)("button",{type:"submit",class:"login-button"},"ログイン",-1))),pe={class:"register-link"};function me(e,t,a,n,s,i){const l=(0,o.g2)("router-link");return(0,o.uX)(),(0,o.CE)("div",null,[(0,o.Lk)("div",ne,[se,(0,o.Lk)("form",{onSubmit:t[2]||(t[2]=(0,r.D$)(((...e)=>i.login&&i.login(...e)),["prevent"]))},[(0,o.Lk)("div",ie,[le,(0,o.bo)((0,o.Lk)("input",{type:"email","onUpdate:modelValue":t[0]||(t[0]=e=>s.email=e),required:""},null,512),[[r.Jo,s.email]])]),(0,o.Lk)("div",ue,[ce,(0,o.bo)((0,o.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>s.password=e),required:""},null,512),[[r.Jo,s.password]])]),de],32),(0,o.Lk)("p",pe,[(0,o.bF)(l,{to:"/register"},{default:(0,o.k6)((()=>[(0,o.eW)("新規登録の方はこちら")])),_:1})])])])}var he={name:"LoginPage",data(){return{email:"",password:""}},methods:{async login(){try{const e=await H.post("login/",{email:this.email,password:this.password}),t=e.data.token;localStorage.setItem("token",t),this.$router.push("/home")}catch(e){console.error("ログインに失敗しました:",e),alert("ログインに失敗しました。再度お試しください。")}}}};const fe=(0,d.A)(he,[["render",me],["__scopeId","data-v-3183ef34"]]);var ke=fe;const ge=e=>((0,o.Qi)("data-v-ff28b13e"),e=e(),(0,o.jt)(),e),ve={class:"sitter-search-container"},be=ge((()=>(0,o.Lk)("h1",null,"シッター検索",-1))),Le={class:"input-group"},ye=ge((()=>(0,o.Lk)("label",{for:"prefecture"},"都道府県",-1))),Ce=["value"],Ae=ge((()=>(0,o.Lk)("label",{for:"city"},"市区町村",-1))),Te=["value"],_e={class:"input-group"},we=ge((()=>(0,o.Lk)("label",{for:"startDate"},"開始日",-1))),De={class:"input-group"},Pe=ge((()=>(0,o.Lk)("label",{for:"startTime"},"開始時間",-1))),Se={class:"input-group"},Ee=ge((()=>(0,o.Lk)("label",{for:"endDate"},"終了日",-1))),Ie={class:"input-group"},Xe=ge((()=>(0,o.Lk)("label",{for:"endTime"},"終了時間",-1))),je=ge((()=>(0,o.Lk)("button",{type:"submit"},"検索する",-1))),Ue={key:0,class:"results"},Ve=ge((()=>(0,o.Lk)("h2",null,"検索結果",-1)));function Fe(e,t,a,n,s,i){const l=(0,o.g2)("AppHeader");return(0,o.uX)(),(0,o.CE)(o.FK,null,[(0,o.bF)(l),(0,o.Lk)("div",ve,[be,(0,o.Lk)("form",{onSubmit:t[7]||(t[7]=(0,r.D$)(((...e)=>i.searchSitters&&i.searchSitters(...e)),["prevent"]))},[(0,o.Lk)("div",Le,[ye,(0,o.bo)((0,o.Lk)("select",{id:"prefecture","onUpdate:modelValue":t[0]||(t[0]=e=>s.selectedPrefecture=e),onChange:t[1]||(t[1]=(...e)=>i.updateCities&&i.updateCities(...e))},[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(s.prefectures,(e=>((0,o.uX)(),(0,o.CE)("option",{key:e.name,value:e.name},(0,v.v_)(e.name),9,Ce)))),128))],544),[[r.u1,s.selectedPrefecture]]),Ae,(0,o.bo)((0,o.Lk)("select",{id:"city","onUpdate:modelValue":t[2]||(t[2]=e=>s.selectedCity=e)},[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(s.cities,(e=>((0,o.uX)(),(0,o.CE)("option",{key:e,value:e},(0,v.v_)(e),9,Te)))),128))],512),[[r.u1,s.selectedCity]])]),(0,o.Lk)("div",_e,[we,(0,o.bo)((0,o.Lk)("input",{type:"date",id:"startDate","onUpdate:modelValue":t[3]||(t[3]=e=>s.startDate=e)},null,512),[[r.Jo,s.startDate]])]),(0,o.Lk)("div",De,[Pe,(0,o.bo)((0,o.Lk)("input",{type:"time",id:"startTime","onUpdate:modelValue":t[4]||(t[4]=e=>s.startTime=e)},null,512),[[r.Jo,s.startTime]])]),(0,o.Lk)("div",Se,[Ee,(0,o.bo)((0,o.Lk)("input",{type:"date",id:"endDate","onUpdate:modelValue":t[5]||(t[5]=e=>s.endDate=e)},null,512),[[r.Jo,s.endDate]])]),(0,o.Lk)("div",Ie,[Xe,(0,o.bo)((0,o.Lk)("input",{type:"time",id:"endTime","onUpdate:modelValue":t[6]||(t[6]=e=>s.endTime=e)},null,512),[[r.Jo,s.endTime]])]),je],32),s.results.length>0?((0,o.uX)(),(0,o.CE)("div",Ue,[Ve,(0,o.Lk)("ul",null,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(s.results,(e=>((0,o.uX)(),(0,o.CE)("li",{key:e.id},(0,v.v_)(e.name)+" - "+(0,v.v_)(e.location)+" - "+(0,v.v_)(e.price)+"円/時 ",1)))),128))])])):(0,o.Q3)("",!0)])],64)}var Je={name:"SitterSearch",components:{AppHeader:m},data(){return{prefectures:[],selectedPrefecture:"",cities:[],selectedCity:"",startDate:"",endDate:"",startTime:"",endTime:"",results:[]}},async mounted(){await this.fetchPrefectures()},methods:{async fetchPrefectures(){try{const e=await H.get("https://geolonia.github.io/japanese-addresses/api/ja.json"),t=e.data;this.prefectures=Object.keys(t).map((e=>({name:e,cities:t[e]}))),console.log("Processed Prefectures Data:",this.prefectures)}catch(e){console.error("都道府県データの取得に失敗しました:",e)}},updateCities(){const e=this.prefectures.find((e=>e.name===this.selectedPrefecture));this.cities=e?e.cities:[],this.selectedCity=""},async searchSitters(){try{const e=await H.get("sitters/",{params:{location:this.selectedCity,start_date:this.startDate,end_date:this.endDate,start_time:this.startTime,end_time:this.endTime}});this.results=e.data}catch(e){console.error("検索に失敗しました:",e),alert("検索に失敗しました。再度お試しください。")}}}};const Oe=(0,d.A)(Je,[["render",Fe],["__scopeId","data-v-ff28b13e"]]);var $e=Oe;const He=e=>((0,o.Qi)("data-v-6bffef92"),e=e(),(0,o.jt)(),e),qe={class:"profile-container"},Qe=He((()=>(0,o.Lk)("h1",null,"プロフィール",-1))),Ke=He((()=>(0,o.Lk)("label",{for:"email"},"メールアドレス:",-1))),xe=He((()=>(0,o.Lk)("label",{for:"name"},"名前:",-1))),Re=He((()=>(0,o.Lk)("button",{type:"submit"},"更新",-1))),Me={key:0};function We(e,t,a,n,s,i){const l=(0,o.g2)("AppHeader");return(0,o.uX)(),(0,o.CE)(o.FK,null,[(0,o.bF)(l),(0,o.Lk)("div",qe,[Qe,(0,o.Lk)("form",{onSubmit:t[2]||(t[2]=(0,r.D$)(((...e)=>i.updateProfile&&i.updateProfile(...e)),["prevent"]))},[Ke,(0,o.bo)((0,o.Lk)("input",{type:"email","onUpdate:modelValue":t[0]||(t[0]=e=>s.email=e),required:""},null,512),[[r.Jo,s.email]]),xe,(0,o.bo)((0,o.Lk)("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=e=>s.name=e),required:""},null,512),[[r.Jo,s.name]]),Re,s.successMessage?((0,o.uX)(),(0,o.CE)("p",Me,(0,v.v_)(s.successMessage),1)):(0,o.Q3)("",!0)],32)])],64)}var ze={name:"UserProfile",components:{AppHeader:m},data(){return{isLoggedIn:!1,name:"",email:"",successMessage:""}},async mounted(){const e=localStorage.getItem("token");try{const t=await O.A.get("http://localhost:8000/api/user/",{headers:{Authorization:`Token ${e}`}});this.email=t.data.email,this.name=t.data.name}catch(t){console.error("プロフィール情報の取得に失敗しました:",t)}},methods:{async updateProfile(){const e=localStorage.getItem("token");try{await O.A.put("http://localhost:8000/api/user/",{email:this.email,name:this.name},{headers:{Authorization:`Token ${e}`}}),this.successMessage="プロフィールが更新されました"}catch(t){console.error("プロフィールの更新に失敗しました:",t)}}}};const Ge=(0,d.A)(ze,[["render",We],["__scopeId","data-v-6bffef92"]]);var Be=Ge;const Ne=[{path:"/",name:"Home",component:K,meta:{requiresAuth:!0}},{path:"/register",name:"Register",component:re},{path:"/login",name:"Login",component:ke},{path:"/sitter-search",name:"SitterSearch",component:$e,meta:{requiresAuth:!0}},{path:"/profile",name:"Profile",component:Be}],Ye=(0,g.aE)({history:(0,g.LA)("/"),routes:Ne});Ye.beforeEach(((e,t,a)=>{const r=!!localStorage.getItem("authToken");e.matched.some((e=>e.meta.requiresAuth))&&!r?a("/login"):a()}));var Ze=Ye;(0,r.Ef)(k).use(Ze).mount("#app")}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var n=t[r]={exports:{}};return e[r].call(n.exports,n,n.exports,a),n.exports}a.m=e,function(){var e=[];a.O=function(t,r,o,n){if(!r){var s=1/0;for(c=0;c<e.length;c++){r=e[c][0],o=e[c][1],n=e[c][2];for(var i=!0,l=0;l<r.length;l++)(!1&n||s>=n)&&Object.keys(a.O).every((function(e){return a.O[e](r[l])}))?r.splice(l--,1):(i=!1,n<s&&(s=n));if(i){e.splice(c--,1);var u=o();void 0!==u&&(t=u)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[r,o,n]}}(),function(){a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};a.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,n,s=r[0],i=r[1],l=r[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(l)var c=l(a)}for(t&&t(r);u<s.length;u++)n=s[u],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(c)},r=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=a.O(void 0,[504],(function(){return a(5346)}));r=a.O(r)})();
//# sourceMappingURL=app.49fee959.js.map