(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[566],{4300:(e,t,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/new",function(){return s(6249)}])},3201:(e,t,s)=>{"use strict";s.d(t,{A:()=>c,L:()=>l});var n=s(4848);s(6540);var r=s(9785),i=s(8871),o=s(4476);let a=o.Ik({title:o.Yj(),body:o.Yj()}),l=(0,i.u)(a);function c(){let{register:e,formState:{errors:t}}=(0,r.xW)();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("p",{children:[(0,n.jsx)("label",{htmlFor:"title",children:"Title:"}),(0,n.jsx)("input",{type:"string",...e("title")}),t.title&&(0,n.jsx)("span",{children:t.title.message})]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("label",{htmlFor:"body",children:"Body:"}),(0,n.jsx)("input",{type:"text",...e("body")}),t.body&&(0,n.jsx)("span",{children:t.body.message})]})]})}},6249:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>p});var n=s(4848);s(6540);var r=s(1106),i=s.n(r),o=s(6715),a=s(7665),l=s(2309),c=s(9636),u=s(528),d=s(3201);function p(){let e=(0,o.useRouter)(),t=(0,a.jE)(),{isPending:s,mutateAsync:r}=(0,l.n)({mutationFn:e=>c.F.post("/posts",e),onSuccess:s=>{let{data:n}=s;t.invalidateQueries({queryKey:["posts"]}),e.push({pathname:"/posts/".concat(n.id),query:{notice:"Created with success."}})}});return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h1",{children:"New post"}),(0,n.jsxs)(u.O,{resolver:d.L,values:{},onSubmit:r,children:[(0,n.jsx)(d.A,{}),(0,n.jsx)("div",{children:(0,n.jsx)("button",{disabled:s,type:"submit",children:"Create"})})]}),(0,n.jsx)("br",{}),(0,n.jsx)("div",{children:(0,n.jsx)(i(),{href:"/posts",children:"Back to posts"})})]})}},9636:(e,t,s)=>{"use strict";s.d(t,{F:()=>n});let n=s(4335).A.create({baseURL:"http://127.0.0.1:3000/api",timeout:5e3,headers:{Accept:"application/json"}});n.interceptors.request.use(function(e){return e.params={...e.params,token:"***"},e},function(e){return 401===e.response.status&&(window.location.href="http://127.0.0.1:3000/api"),Promise.reject(e)})},6715:(e,t,s)=>{e.exports=s(8440)}},e=>{var t=t=>e(e.s=t);e.O(0,[515,190,636,593,792],()=>t(4300)),_N_E=e.O()}]);