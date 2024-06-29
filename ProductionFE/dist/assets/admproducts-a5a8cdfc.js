import{j as e,x as U,T as P,P as i,r as g,S as O,I as v,e as j,f as V,M as C,B as G,a7 as w,a0 as J,$ as K,a1 as I,i as Q,h as X,W as Y}from"./index-616d04fa.js";import{T,a as h,b as Z,c as ee,d as te,e as ne,f as se,g as re}from"./TableSortLabel-e0786fb5.js";import{C as R}from"./Checkbox-09f139d7.js";import{a as ie}from"./axios-9cbf0d09.js";import{O as oe}from"./Select-6f5489b0.js";import{C as ce}from"./Container-7e43c108.js";import{C as ae}from"./Card-adf44836.js";import"./Menu-7f489778.js";function F({query:t}){return e.jsx(T,{children:e.jsx(h,{align:"center",colSpan:6,sx:{py:3},children:e.jsxs(U,{sx:{textAlign:"center"},children:[e.jsx(P,{variant:"h6",paragraph:!0,children:"Not found"}),e.jsxs(P,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',t,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}F.propTypes={query:i.string};function N({emptyRows:t,height:s}){return t?e.jsx(T,{sx:{...s&&{height:s*t}},children:e.jsx(h,{colSpan:9})}):null}N.propTypes={emptyRows:i.number,height:i.number};function M({selected:t,code:s,description:n,packweight:a,market:r,type:p,exp:l,handleClick:f}){const[c,b]=g.useState(null),y=m=>{b(m.currentTarget)},k=()=>{b(null)};return e.jsxs(e.Fragment,{children:[e.jsxs(T,{hover:!0,tabIndex:-1,role:"checkbox",selected:t,children:[e.jsx(h,{padding:"checkbox",children:e.jsx(R,{disableRipple:!0,checked:t,onChange:f})}),e.jsx(h,{component:"th",scope:"row",padding:"none",children:e.jsx(O,{direction:"row",alignItems:"center",spacing:2,children:e.jsx(P,{variant:"subtitle2",noWrap:!0,children:s})})}),e.jsx(h,{children:n}),e.jsx(h,{children:a}),e.jsx(h,{children:l}),e.jsx(h,{children:r}),e.jsx(h,{children:p}),e.jsx(h,{align:"right",children:e.jsx(v,{onClick:y,children:e.jsx(j,{icon:"eva:more-vertical-fill"})})})]}),e.jsxs(V,{open:!!c,anchorEl:c,onClose:k,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{sx:{width:140}},children:[e.jsxs(C,{onClick:k,children:[e.jsx(j,{icon:"eva:edit-fill",sx:{mr:2}}),"Edit"]}),e.jsxs(C,{onClick:k,sx:{color:"error.main"},children:[e.jsx(j,{icon:"eva:trash-2-outline",sx:{mr:2}}),"Delete"]})]})]})}M.propTypes={code:i.any,description:i.any,handleClick:i.func,packweight:i.any,market:i.any,type:i.any,selected:i.any,exp:i.any};const le={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function de(t,s,n){return t?Math.max(0,(1+t)*s-n):0}function A(t,s,n){return t[n]===null?1:s[n]===null||s[n]<t[n]?-1:s[n]>t[n]?1:0}function he(t,s){return t==="desc"?(n,a)=>A(n,a,s):(n,a)=>-A(n,a,s)}function pe({inputData:t,comparator:s,filterName:n}){const a=t.map((r,p)=>[r,p]);return a.sort((r,p)=>{const l=s(r[0],p[0]);return l!==0?l:r[1]-p[1]}),t=a.map(r=>r[0]),n&&(t=t.filter(r=>r.code.toLowerCase().indexOf(n.toLowerCase())!==-1)),t}function E({order:t,orderBy:s,rowCount:n,headLabel:a,numSelected:r,onRequestSort:p,onSelectAllClick:l}){const f=c=>b=>{p(b,c)};return e.jsx(Z,{children:e.jsxs(T,{children:[e.jsx(h,{padding:"checkbox",children:e.jsx(R,{indeterminate:r>0&&r<n,checked:n>0&&r===n,onChange:l})}),a.map(c=>e.jsx(h,{align:c.align||"left",sortDirection:s===c.id?t:!1,sx:{width:c.width,minWidth:c.minWidth},children:e.jsxs(ee,{hideSortIcon:!0,active:s===c.id,direction:s===c.id?t:"asc",onClick:f(c.id),children:[c.label,s===c.id?e.jsx(G,{sx:{...le},children:t==="desc"?"sorted descending":"sorted ascending"}):null]})},c.id))]})})}E.propTypes={order:i.oneOf(["asc","desc"]),orderBy:i.string,rowCount:i.number,headLabel:i.array,numSelected:i.number,onRequestSort:i.func,onSelectAllClick:i.func};const ue=async()=>{const t="http://127.0.0.1:8000/api/products/",s=localStorage.getItem("accessToken");if(!s)return console.error("No access token found in localStorage"),[];try{const n=await ie.get(t,{headers:{Authorization:`Bearer ${s}`}});!n.status==="ok"&&w.error(`HTTP error! Status: ${n.status}`);const a=n.data.results.map(r=>({id:r.id,code:r.prod_code,description:r.prod_fullname,packweight:r.pack_size,type:r.barcode,exp:r.exp,market:r.market}));return w.success("Load Products successful!",{autoClose:500}),a}catch(n){return w.error("Error fetching product:",n),[]}};function L({numSelected:t,filterName:s,onFilterName:n}){return e.jsxs(J,{sx:{height:96,display:"flex",justifyContent:"space-between",p:a=>a.spacing(0,1,0,3),...t>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[t>0?e.jsxs(P,{component:"div",variant:"subtitle1",children:[t," selected"]}):e.jsx(oe,{value:s,onChange:n,placeholder:"Search product...",startAdornment:e.jsx(K,{position:"start",children:e.jsx(j,{icon:"eva:search-fill",sx:{color:"text.disabled",width:20,height:20}})})}),t>0?e.jsx(I,{title:"Delete",children:e.jsx(v,{children:e.jsx(j,{icon:"eva:trash-2-fill"})})}):e.jsx(I,{title:"Filter list",children:e.jsx(v,{children:e.jsx(j,{icon:"ic:round-filter-list"})})})]})}L.propTypes={numSelected:i.number,filterName:i.string,onFilterName:i.func};function xe(){const[t,s]=g.useState([]);g.useEffect(()=>{async function o(){const d=await ue();s(d)}o()},[]);const[n,a]=g.useState(0),[r,p]=g.useState("asc"),[l,f]=g.useState([]),[c,b]=g.useState("name"),[y,k]=g.useState(""),[m,W]=g.useState(5),z=(o,d)=>{d!==""&&(p(c===d&&r==="asc"?"desc":"asc"),b(d))},q=o=>{if(o.target.checked){const d=t.map(u=>u.name);f(d);return}f([])},D=(o,d)=>{const u=l.indexOf(d);let x=[];u===-1?x=x.concat(l,d):u===0?x=x.concat(l.slice(1)):u===l.length-1?x=x.concat(l.slice(0,-1)):u>0&&(x=x.concat(l.slice(0,u),l.slice(u+1))),f(x)},H=(o,d)=>{a(d)},_=o=>{a(0),W(parseInt(o.target.value,10))},$=o=>{a(0),k(o.target.value)},S=pe({inputData:t,comparator:he(r,c),filterName:y}),B=!S.length&&!!y;return e.jsxs(ce,{children:[e.jsxs(O,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[e.jsx(P,{variant:"h4",children:"ADM Products"}),e.jsx(Q,{variant:"contained",color:"inherit",startIcon:e.jsx(j,{icon:"eva:plus-fill"}),children:"New Product"})]}),e.jsxs(ae,{children:[e.jsx(L,{numSelected:l.length,filterName:y,onFilterName:$}),e.jsx(X,{children:e.jsx(te,{sx:{overflow:"unset"},children:e.jsxs(ne,{sx:{minWidth:800},children:[e.jsx(E,{order:r,orderBy:c,rowCount:t.length,numSelected:l.length,onRequestSort:z,onSelectAllClick:q,headLabel:[{id:"code",label:"Code"},{id:"description",label:"FullName"},{id:"packweight",label:"Pack Weight"},{id:"exp",label:"Exp"},{id:"market",label:"Market"},{id:"type",label:"Type"},{id:""}]}),e.jsxs(se,{children:[S.slice(n*m,n*m+m).map(o=>e.jsx(M,{code:o.code,description:o.description,packweight:o.packweight,market:o.market,type:o.type,exp:o.exp,selected:l.indexOf(o.code)!==-1,handleClick:d=>D(d,o.code)},o.id)),e.jsx(N,{height:77,emptyRows:de(n,m,t.length)}),B&&e.jsx(F,{query:y})]})]})})}),e.jsx(re,{page:n,component:"div",count:t.length,rowsPerPage:m,onPageChange:H,rowsPerPageOptions:[5,10,25],onRowsPerPageChange:_})]})]})}function Te(){return e.jsxs(e.Fragment,{children:[e.jsx(Y,{children:e.jsx("title",{children:" ADM Products List "})}),e.jsx(xe,{})]})}export{Te as default};
