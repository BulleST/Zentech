"use strict";(self.webpackChunkZenTech=self.webpackChunkZenTech||[]).push([[576],{9045:(T,p,t)=>{t.r(p),t.d(p,{RepresentanteModule:()=>R});var d=t(6814),v=t(6223),c=t(5597),i=t(2352),n=t(132),l=t(2832),h=t(708),E=t(590),L=t(674),m=t(2898),e=t(9291),r=t(8787),a=t(3416),f=t(6599);const P=function(){return["cadastrar"]};function D(s,B){1&s&&(e.TgZ(0,"div",10)(1,"a",11)(2,"span",12),e._uU(3," Cadastrar Representante"),e.qZA()()()),2&s&&(e.xp6(1),e.Q6J("routerLink",e.DdM(1,P)))}let A=(()=>{class s{constructor(u,o){this.table=u,this.representanteService=o,this.faFilePdf=E.gSj,this.maskType=l.O,this.list=[],this.tableLinks=[],this.columns=m.T,this.subscription=[],this.screen=L.I.lg;var g=this.representanteService.list.subscribe(O=>this.list=O);this.subscription.push(g),(0,h.n)(this.representanteService.getList());var M=this.table.selected.subscribe(O=>{O&&(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]},{label:"Excluir",routePath:["excluir"],paramsFieldName:["id"]}],this.tableLinks=this.table.encryptParams(this.tableLinks))});this.subscription.push(M)}ngOnDestroy(){this.subscription.forEach(u=>u.unsubscribe())}static#t=this.\u0275fac=function(o){return new(o||s)(e.Y36(r.i),e.Y36(a.Z))};static#e=this.\u0275cmp=e.Xpm({type:s,selectors:[["app-list"]],decls:13,vars:10,consts:[[1,"page"],[1,"page__header"],[1,"title-icon","align-items-center"],["xmlns","http://www.w3.org/2000/svg","height","16","width","16","viewBox","0 0 512 512","fill","currentColor"],["d","M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],[1,"me-auto"],[1,"page__header-title"],[1,"page__body"],["topActions",""],[3,"list","topActions","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"],[1,"col-xl-5","col-lg-5","col-md-5","col-sm-6","col-12","mb-2","me-md-2","mx-md-1","px-0","ng-star-inserted"],[1,"btn","btn-primary","d-flex","align-items-center","align-baseline","justify-content-center","me-md-0","me-sm-1",3,"routerLink"],[2,"margin-top","-1px","margin-bottom","1px"]],template:function(o,g){if(1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"span",2),e.O4$(),e.TgZ(3,"svg",3),e._UZ(4,"path",4),e.qZA()(),e.kcU(),e.TgZ(5,"div",5)(6,"h3",6),e._uU(7,"Representantes"),e.qZA()()(),e.TgZ(8,"div",7),e.YNc(9,D,4,2,"ng-template",null,8,e.W1O),e._UZ(11,"app-list-shared",9),e.qZA()(),e._UZ(12,"router-outlet")),2&o){const M=e.MAs(10);e.xp6(11),e.Q6J("list",g.list)("topActions",M)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",!0)("columns",g.columns)("tableLinks",g.tableLinks)("selectable",!0)}},dependencies:[n.lC,n.rH,f.o]})}return s})();var x=t(2951),b=t(8410),C=t(7280);const U=[{path:"",component:A,children:[{path:"cadastrar",component:x.U,data:{modalOrder:1}},{path:"editar/:representante_id",component:x.U,data:{modalOrder:1}},{path:"excluir/:representante_id",component:b.T,data:{modalOrder:1}},C.D]}];let Z=(()=>{class s{static#t=this.\u0275fac=function(o){return new(o||s)};static#e=this.\u0275mod=e.oAB({type:s});static#s=this.\u0275inj=e.cJS({imports:[n.Bz.forChild(U),n.Bz]})}return s})();var y=t(6208);let R=(()=>{class s{static#t=this.\u0275fac=function(o){return new(o||s)};static#e=this.\u0275mod=e.oAB({type:s});static#s=this.\u0275inj=e.cJS({imports:[d.ez,Z,v.u5,c.uH,y.m,i.kW]})}return s})()},3416:(T,p,t)=>{t.d(p,{Z:()=>L});var d=t(9862),v=t(5619),c=t(9397),i=t(2096),n=t(553),l=t(9291),h=t(8787),E=t(2425);let L=(()=>{class m{constructor(r,a,f){this.table=r,this.http=a,this.toastr=f,this.url=n.N.url,this.list=new v.X([])}getList(r=!1){return this.table.loading.next(!0),this.http.get(`${this.url}/representante`,{headers:new d.WM({loading:"false"})}).pipe((0,c.b)({next:a=>(a=a.map(f=>f),this.list.next(Object.assign([],a)),(0,i.of)(a)),error:a=>this.toastr.error("N\xe3o foi poss\xedvel carregar listagem de representante.")}))}get(r){return this.http.get(`${this.url}/representante/${r}`,{headers:new d.WM({loading:"false"})})}create(r){return this.http.post(`${this.url}/representante`,r)}edit(r){return this.http.put(`${this.url}/representante`,r)}delete(r){return this.http.delete(`${this.url}/representante/${r}`)}static#t=this.\u0275fac=function(a){return new(a||m)(l.LFG(h.i),l.LFG(d.eN),l.LFG(E._W))};static#e=this.\u0275prov=l.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"})}return m})()},5556:(T,p,t)=>{function d(c,i){var n=c.list.value,l=n.findIndex(h=>h.id==i.id);n.splice(l,1),c.list.next(n)}function v(c,i){var n=c.list.value;if(i.id){var l=n.findIndex(h=>h.id==i.id);n.splice(l,1,i)}else n.push(i);c.list.next(n)}t.d(p,{O:()=>d,f:()=>v})}}]);