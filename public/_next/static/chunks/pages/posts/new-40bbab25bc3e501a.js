(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[566],{4409:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/new",function(){return n(6641)}])},2778:function(t,e,n){"use strict";n.d(e,{U:function(){return c},Z:function(){return a}});var s=n(5893),r=n(7536),i=n(6312),o=n(1604);let u=o.Ry({title:o.Z_().min(1,{message:"can't be blank"}),body:o.Z_()}),c=(0,i.F)(u);function a(){let{register:t,formState:{errors:e}}=(0,r.Gc)();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:[(0,s.jsx)("label",{htmlFor:"title",children:"Title:"}),(0,s.jsx)("input",{type:"string",...t("title")}),e.title&&(0,s.jsx)("span",{children:e.title.message})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("label",{htmlFor:"body",children:"Body:"}),(0,s.jsx)("input",{type:"text",...t("body")}),e.body&&(0,s.jsx)("span",{children:e.body.message})]})]})}},6641:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return p}});var s=n(5893),r=n(1664),i=n.n(r),o=n(1163),u=n(202),c=n(8029),a=n(3332),l=n(7693),d=n(2778);function p(){let t=(0,o.useRouter)(),e=(0,u.NL)(),{isPending:n,mutateAsync:r}=(0,c.D)({mutationFn:t=>a.h.post("/posts",t),onSuccess:n=>{let{data:s}=n;e.invalidateQueries({queryKey:["posts"]}),t.push({pathname:"/posts/".concat(s.id),query:{notice:"Created with success."}})}});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("h1",{children:"New post"}),(0,s.jsxs)(l.R,{resolver:d.U,values:{},onSubmit:r,children:[(0,s.jsx)(d.Z,{}),(0,s.jsx)("div",{children:(0,s.jsx)("button",{disabled:n,type:"submit",children:"Create"})})]}),(0,s.jsx)("br",{}),(0,s.jsx)("div",{children:(0,s.jsx)(i(),{href:"/posts",children:"Back to posts"})})]})}},3332:function(t,e,n){"use strict";n.d(e,{h:function(){return r}});var s=n(5121);let r=s.Z.create({baseURL:"http://127.0.0.1:3000/api",timeout:5e3,headers:{Accept:"application/json"}});r.interceptors.request.use(function(t){return t.params={...t.params,token:"***"},t},function(t){return 401===t.response.status&&(window.location.href="http://127.0.0.1:3000/api"),Promise.reject(t)})},1163:function(t,e,n){t.exports=n(9974)}},function(t){t.O(0,[129,841,774,888,179],function(){return t(t.s=4409)}),_N_E=t.O()}]);