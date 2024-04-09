(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{8393:function(e,t,s){Promise.resolve().then(s.bind(s,4216)),Promise.resolve().then(s.bind(s,3933)),Promise.resolve().then(s.bind(s,3066)),Promise.resolve().then(s.bind(s,1051)),Promise.resolve().then(s.bind(s,362)),Promise.resolve().then(s.bind(s,6012)),Promise.resolve().then(s.bind(s,4360)),Promise.resolve().then(s.t.bind(s,23,23)),Promise.resolve().then(s.t.bind(s,2445,23))},4790:function(e,t,s){"use strict";s.d(t,{z:function(){return r}});var n=s(7437);let r=e=>{let{onClick:t,children:s,disabled:r=!1,className:o}=e;return(0,n.jsx)("button",{className:"whitespace-nowrap rounded-md px-3.5 py-2.5 text-sm font-semibold text-white ".concat(r?"bg-gray-400":"bg-main hover:bg-sub"," focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ").concat(o),disabled:r,onClick:t,children:s})}},2194:function(e,t,s){"use strict";s.d(t,{V:function(){return a}});var n=s(7437),r=s(2265),o=s(129),i=s(8324);let a=e=>{let{open:t,onClose:s,children:a}=e;return(0,n.jsx)(o.u.Root,{show:t,as:r.Fragment,children:(0,n.jsxs)(i.V,{as:"div",className:"relative z-10",onClose:s,children:[(0,n.jsx)(o.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,n.jsx)("div",{className:"fixed inset-0 bg-gray-500/75 transition-opacity"})}),(0,n.jsx)("div",{className:"fixed inset-0 z-10 w-screen overflow-y-auto",children:(0,n.jsx)("div",{className:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",children:(0,n.jsx)(o.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:(0,n.jsx)(i.V.Panel,{className:"relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",children:a})})})})]})})}},3818:function(e,t,s){"use strict";s.d(t,{I:function(){return o}});var n=s(7437),r=s(2265);let o=e=>{let{className:t,variant:s,onChange:o,onFocus:i,onBlur:a,value:l,...c}=e,[u,d]=(0,r.useState)("");return(0,r.useEffect)(()=>{"amount"===s?d(l?Number(l).toLocaleString():""):d(void 0===l?"":"".concat(l))},[s,l]),(0,n.jsx)("input",{value:u,onChange:e=>{d(e.target.value)},onBlur:e=>{if("amount"===s){let t=e.target.value,s=t.replace(/[０-９]/g,e=>String.fromCharCode(e.charCodeAt(0)-65248));""!==t&&isFinite(Number(s))?(d(Number(s).toLocaleString()),o(s)):d("")}else o(e.target.value);null==a||a(e)},onFocus:e=>{d(u.replace(/,/g,"")),null==i||i(e)},...c,className:"block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 ".concat(t)})}},4216:function(e,t,s){"use strict";s.r(t),s.d(t,{AuthButton:function(){return v}});var n=s(7437),r=s(2265);let o=()=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"})});var i=s(8324),a=s(4360);let l=()=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"})});var c=s(5903),u=s(3818),d=s(4790),m=s(6263),h=s(2194),x=s(6012);let v=()=>{let e=(0,r.useContext)(a.UserContext),t=(0,r.useContext)(a.UserDispatchContext),{showToast:s}=(0,x.useToast)(),[v,p]=(0,r.useState)(!1),[f,g]=(0,r.useState)(!1),[j,w]=(0,r.useState)(""),[b,y]=(0,r.useState)("");return void 0!==e?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",{className:"rounded-md p-1 text-sm text-gray-300 hover:bg-sub hover:text-white",onClick:()=>{g(null!==e),p(!0)},children:e?(0,n.jsx)(l,{}):(0,n.jsx)(o,{})}),(0,n.jsx)(h.V,{open:v,onClose:()=>p(!1),children:f?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"px-4 pb-4 pt-5 sm:p-6 sm:pb-4",children:(0,n.jsxs)("div",{className:"sm:flex sm:items-start",children:[(0,n.jsx)("div",{className:"mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-main text-white sm:mx-0 sm:size-10",children:(0,n.jsx)(l,{})}),(0,n.jsx)("div",{className:"mt-3 grow text-center sm:ml-4 sm:mt-0 sm:text-left",children:(0,n.jsx)(i.V.Title,{as:"h3",className:"font-semibold leading-6 text-black",children:"ログアウトしますか"})})]})}),(0,n.jsxs)("div",{className:"flex justify-center space-x-2 bg-base px-4 py-3 sm:flex sm:flex-row sm:px-6",children:[(0,n.jsx)(d.z,{onClick:()=>{(0,c.w7)((0,c.v0)(m.l)).then(()=>{t({type:"logout"}),p(!1)}).catch(e=>{e.code,e.message})},children:"ログアウト"}),(0,n.jsx)(d.z,{onClick:()=>p(!1),children:"キャンセル"})]})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"px-4 pb-4 pt-5 sm:p-6 sm:pb-4",children:(0,n.jsxs)("div",{className:"sm:flex sm:items-start",children:[(0,n.jsx)("div",{className:"mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-main text-white sm:mx-0 sm:size-10",children:(0,n.jsx)(o,{})}),(0,n.jsxs)("div",{className:"mt-3 grow text-center sm:ml-4 sm:mt-0 sm:text-left",children:[(0,n.jsx)(i.V.Title,{as:"h3",className:"font-semibold leading-6 text-black",children:"ログイン"}),(0,n.jsx)("div",{className:"mt-2",children:(0,n.jsxs)("div",{className:"my-4 flex flex-col",children:["ID:",(0,n.jsx)(u.I,{type:"email",value:j,onChange:e=>w(e)}),"PASS:",(0,n.jsx)(u.I,{type:"password",value:b,onChange:e=>y(e)})]})})]})]})}),(0,n.jsxs)("div",{className:"justify-end space-x-2 bg-base px-4 py-3 sm:flex sm:flex-row sm:px-6",children:[(0,n.jsx)(d.z,{onClick:()=>{(0,c.e5)((0,c.v0)(m.l),j,b).then(e=>{e.user,p(!1)}).catch(e=>{let t=e.code,n=e.message;s("errorCode: ".concat(t," errorMessage: ").concat(n),"error")})},children:"ログイン"}),(0,n.jsx)(d.z,{onClick:()=>p(!1),children:"キャンセル"})]})]})})]}):null}},3933:function(e,t,s){"use strict";s.r(t),s.d(t,{MobileMenu:function(){return c}});var n=s(7437),r=s(2265);let o=Object.values({planningPoker:{path:"/planning-poker",name:"プランニングポーカー"},timer:{path:"/timer",name:"タイマー"},householdAccount:{path:"/household-account",name:"家計簿",limit:"7lMj8JqKnSbxoNnIMxfGKteGfvs1"}});var i=s(4216),a=s(7907);let l=e=>{var t;let s=null===(t=e.current)||void 0===t?void 0:t.getBoundingClientRect().height;return"number"==typeof s?s:2e3},c=()=>{let[e,t]=(0,r.useState)({show:!1,enableAnimate:!1,height:2e3}),s=(0,r.useRef)(null),c=(0,a.usePathname)();(0,r.useEffect)(()=>{t(e=>({...e,enableAnimate:!1,height:l(s)}))},[]),(0,r.useEffect)(()=>{let e="resize",n="orientationchange",r=()=>{t(e=>({...e,enableAnimate:!1,height:l(s)}))};return window.addEventListener(e,r),window.addEventListener(n,r),()=>{window.removeEventListener(e,r),window.removeEventListener(n,r)}},[]);let u=(0,r.useCallback)(()=>{t(e=>({...e,show:!e.show,enableAnimate:!0}))},[]);return(0,n.jsxs)("div",{className:"absolute w-full sm:hidden",children:[(0,n.jsxs)("div",{className:"inset-y-0 left-0 flex items-center justify-between px-2",children:[(0,n.jsxs)("button",{type:"button",className:"relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white",onClick:u,"aria-controls":"mobile-menu","aria-expanded":"false",children:[(0,n.jsx)("span",{className:"absolute -inset-0.5"}),(0,n.jsx)("span",{className:"sr-only",children:"Open main menu"}),(0,n.jsx)("svg",{className:"block size-6",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor","aria-hidden":"true",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"})}),(0,n.jsx)("svg",{className:"hidden size-6",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor","aria-hidden":"true",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})]}),(0,n.jsx)(i.AuthButton,{})]}),(0,n.jsx)("div",{className:"pointer-events-none relative",children:(0,n.jsx)("div",{className:"absolute mt-1 w-full bg-gray-800 sm:hidden ".concat(e.enableAnimate?"transition-all delay-75 ease-in ":" ").concat(e.show?"pointer-events-auto opacity-100":"pointer-events-none opacity-0"),id:"mobile-menu",ref:s,style:e.show?{marginTop:0}:{marginTop:-(.1*e.height)},children:(0,n.jsx)("div",{className:"space-y-1 px-2 pb-3 pt-2",children:o.map(e=>(0,n.jsx)("a",{href:e.path,className:"block rounded-md px-3 py-2 text-base font-medium ".concat(e.path===c?"bg-gray-900 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"),...e.path===c?{"aria-current":"page"}:{},children:e.name},e.path))})})})]})}},3066:function(e,t,s){"use strict";s.r(t),s.d(t,{NavigationButton:function(){return l}});var n=s(7437),r=s(8792),o=s(7907),i=s(2265),a=s(4360);let l=e=>{let{route:t}=e,s=(0,i.useContext)(a.UserContext),l=(0,o.usePathname)();return void 0===t.limit||t.limit===(null==s?void 0:s.uid)?(0,n.jsx)(r.default,{href:t.path,className:"rounded-md px-3 py-2 text-sm font-medium ".concat(t.path===l?"bg-gray-900 text-white":"text-gray-300 hover:bg-sub hover:text-white"),...t.path===l?{"aria-current":"page"}:{},children:t.name}):null}},1051:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return o}});var n=s(7907),r=s(2265);function o(){let e=(0,n.usePathname)();return(0,r.useEffect)(()=>{s.e(949).then(s.t.bind(s,4949,23))},[]),(0,r.useEffect)(()=>{setTimeout(()=>{window.HSStaticMethods.autoInit()},400)},[e]),null}},362:function(e,t,s){"use strict";s.r(t),s.d(t,{UserObserver:function(){return a}});var n=s(2265),r=s(5903),o=s(4360),i=s(6263);let a=()=>{let e=(0,n.useContext)(o.UserDispatchContext);return(0,n.useEffect)(()=>{(0,r.Aj)((0,r.v0)(i.l),t=>{t?e({type:"login",payload:{user:t}}):e({type:"logout"})})},[e]),null}},6012:function(e,t,s){"use strict";s.r(t),s.d(t,{ToastContext:function(){return u},ToastProvider:function(){return m},useToast:function(){return d}});var n=s(7437),r=s(2265);let o=()=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})}),i=e=>{let{message:t,onCloseToast:s}=e;return(0,n.jsxs)("div",{className:"pointer-events-auto absolute bottom-5 left-5 flex w-72 animate-fade-out items-center rounded-xl border-green-700 bg-green-200 px-2 py-4 text-green-700",children:[(0,n.jsx)("div",{children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"})})}),(0,n.jsx)("p",{className:"p-1",children:t}),(0,n.jsx)("div",{className:"ml-auto cursor-pointer",onClick:s,children:(0,n.jsx)(o,{})})]})},a=e=>{let{message:t,onCloseToast:s}=e;return(0,n.jsxs)("div",{className:" absolute bottom-5 left-5 flex w-72 animate-fade-out items-center rounded-xl border-yellow-700 bg-yellow-200 px-2 py-4 text-yellow-700 ",children:[(0,n.jsx)("div",{children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"})})}),(0,n.jsx)("p",{className:"pl-1",children:t}),(0,n.jsx)("div",{className:"ml-auto cursor-pointer",onClick:s,children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]})},l=e=>{let{message:t,onCloseToast:s}=e;return(0,n.jsxs)("div",{className:" absolute bottom-5 left-5 flex w-72 animate-fade-out items-center rounded-xl border-red-700 bg-red-200 px-2 py-4 text-red-700",children:[(0,n.jsx)("div",{children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"})})}),(0,n.jsx)("p",{className:"pl-1",children:t}),(0,n.jsx)("div",{className:"ml-auto cursor-pointer",onClick:s,children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]})},c=e=>{let{message:t,toastType:s}=e,{closeToast:r}=d();switch(s){case"success":return(0,n.jsx)("div",{className:"pointer-events-none",children:(0,n.jsx)(i,{message:t,onCloseToast:r})});case"warning":return(0,n.jsx)("div",{className:"pointer-events-none",children:(0,n.jsx)(a,{message:t,onCloseToast:r})});case"error":return(0,n.jsx)("div",{className:"pointer-events-none",children:(0,n.jsx)(l,{message:t,onCloseToast:r})})}},u=(0,r.createContext)({showToast:()=>{},closeToast:()=>{}}),d=()=>(0,r.useContext)(u),m=e=>{let{children:t}=e,[s,o]=(0,r.useState)(""),[i,a]=(0,r.useState)("success"),[l,d]=(0,r.useState)(!1),m=(0,r.useRef)(),h=(0,r.useCallback)((e,t)=>{window.clearTimeout(m.current),o(e),a(t),d(!0),m.current=window.setTimeout(()=>{d(!1)},5e3)},[]),x=(0,r.useCallback)(()=>{window.clearTimeout(m.current),d(!1)},[]);return(0,n.jsxs)(u.Provider,{value:{showToast:h,closeToast:x},children:[l&&(0,n.jsx)(c,{message:s,toastType:i}),t]})}},4360:function(e,t,s){"use strict";s.r(t),s.d(t,{UserContext:function(){return o},UserDispatchContext:function(){return i},UserProvider:function(){return l}});var n=s(7437),r=s(2265);let o=(0,r.createContext)(void 0),i=(0,r.createContext)({}),a=(e,t)=>{switch(t.type){case"login":return t.payload.user;case"logout":return null}},l=e=>{let{children:t}=e,[s,l]=(0,r.useReducer)(a,void 0);return(0,n.jsx)(o.Provider,{value:s,children:(0,n.jsx)(i.Provider,{value:l,children:t})})}},6263:function(e,t,s){"use strict";s.d(t,{l:function(){return n}});let n=(0,s(5723).ZF)({apiKey:"AIzaSyDsUy4aZjHV6H3vyEKBcblcGFPmpk6skS8",authDomain:"caravan-f.firebaseapp.com",databaseURL:"https://caravan-f.firebaseio.com",projectId:"caravan-f",storageBucket:"caravan-f.appspot.com",messagingSenderId:"425810777948",appId:"1:425810777948:web:9383b15670df83004b1399",measurementId:"G-BTDWXL1FC2"})},2445:function(){}},function(e){e.O(0,[807,254,876,971,69,744],function(){return e(e.s=8393)}),_N_E=e.O()}]);