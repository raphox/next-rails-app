(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[827],{8775:(s,e,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/users/new",function(){return r(5094)}])},6936:(s,e,r)=>{"use strict";r.d(e,{A:()=>p,L:()=>d});var a=r(4848),n=r(9785),t=r(8871),i=r(4476);let o=i.Ik({email_address:i.Yj().min(1,{message:"can't be blank"}),password:i.Yj(),password_confirmation:i.Yj()}).refine(s=>s.password===s.password_confirmation,{message:"Passwords don't match",path:["password_confirmation"]}),d=(0,t.u)(o);function p(){let{register:s,formState:{errors:e}}=(0,n.xW)();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("label",{htmlFor:"email_address",children:"Email:"}),(0,a.jsx)("input",{type:"email",...s("email_address")}),e.email_address&&(0,a.jsx)("span",{children:e.email_address.message})]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("label",{htmlFor:"password",children:"Password:"}),(0,a.jsx)("input",{type:"password",...s("password")}),e.password&&(0,a.jsx)("span",{children:e.password.message})]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("label",{htmlFor:"password_confirmation",children:"Password confirmation:"}),(0,a.jsx)("input",{type:"password",...s("password_confirmation")}),e.password_confirmation&&(0,a.jsx)("span",{children:e.password_confirmation.message})]})]})}},5094:(s,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>l});var a=r(4848),n=r(1106),t=r.n(n),i=r(6715),o=r(7665),d=r(2309),p=r(3770),c=r(1075),u=r(6936);function l(){let s=(0,i.useRouter)(),e=(0,o.jE)(),{isPending:r,mutateAsync:n}=(0,d.n)({mutationFn:s=>p.F.post("/users",s),onSuccess:r=>{let{data:a}=r;e.invalidateQueries({queryKey:["users"]}),s.push({pathname:"/users/".concat(a.id),query:{notice:"Created with success."}})}});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h1",{children:"New user"}),(0,a.jsxs)(c.O,{resolver:u.L,values:{},onSubmit:n,children:[(0,a.jsx)(u.A,{}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{disabled:r,type:"submit",children:"Create"})})]}),(0,a.jsx)("br",{}),(0,a.jsx)("div",{children:(0,a.jsx)(t(),{href:"/users",children:"Back to users"})})]})}},3770:(s,e,r)=>{"use strict";r.d(e,{F:()=>a});let a=r(4335).A.create({baseURL:"https://automatic-engine-gx67pjpwv29jjr-3000.app.github.dev/api",timeout:5e3,headers:{Accept:"application/json"}});a.interceptors.request.use(function(s){return s.params={...s.params,token:"***"},s},function(s){return 401===s.response.status&&(window.location.href="https://automatic-engine-gx67pjpwv29jjr-3000.app.github.dev/api"),Promise.reject(s)})},6715:(s,e,r)=>{s.exports=r(8440)}},s=>{var e=e=>s(s.s=e);s.O(0,[204,190,636,593,792],()=>e(8775)),_N_E=s.O()}]);