"use strict";(self.webpackChunkZenTech=self.webpackChunkZenTech||[]).push([[289],{6953:(M,p,e)=>{e.r(p),e.d(p,{BancoModule:()=>z});var r=e(132),v=e(2832),d=e(708),l=e(590),f=e(674),c=e(1005),t=e(9291),E=e(8787),b=e(4809),m=e(6599);const L=function(){return["cadastrar"]};function o(s,T){1&s&&(t.TgZ(0,"div",10)(1,"a",11)(2,"span",12),t._uU(3," Cadastrar Banco"),t.qZA()()()),2&s&&(t.xp6(1),t.Q6J("routerLink",t.DdM(1,L)))}let u=(()=>{class s{constructor(i,n,a){this.table=i,this.bancoService=n,this.isMobile=a,this.faFilePdf=l.gSj,this.maskType=v.O,this.list=[],this.tableLinks=[],this.columns=c.sB,this.subscription=[],this.screen=f.I.lg;var h=this.bancoService.list.subscribe(g=>{this.list=Object.assign([],g)});this.subscription.push(h);var V=this.isMobile.value.subscribe(g=>this.screen=g);this.subscription.push(V),(0,d.n)(this.bancoService.getList());var G=this.table.selected.subscribe(g=>{g&&(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]},{label:"Excluir",routePath:["excluir"],paramsFieldName:["id"]}],this.tableLinks=this.table.encryptParams(this.tableLinks))});this.subscription.push(G)}ngOnDestroy(){this.subscription.forEach(i=>i.unsubscribe())}static#t=this.\u0275fac=function(n){return new(n||s)(t.Y36(E.i),t.Y36(b.r),t.Y36(f.h))};static#e=this.\u0275cmp=t.Xpm({type:s,selectors:[["app-list"]],decls:14,vars:10,consts:[[1,"page"],[1,"page__header"],[1,"title-icon","align-items-center"],["xmlns","http://www.w3.org/2000/svg","height","16","width","16","viewBox","0 0 512 512","fill","currentColor"],["d","M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],[1,"me-auto"],[1,"page__header-title"],[1,"page__body"],["topActions",""],[3,"list","topActions","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"],[1,"col-xl-3","col-lg-3","col-md-4","col-sm-6","col-12","mb-2","me-md-2","mx-md-1","px-0","ng-star-inserted"],[1,"btn","btn-primary","d-flex","align-items-center","align-baseline","justify-content-center","me-md-0","me-sm-1",3,"routerLink"],[2,"margin-top","-1px","margin-bottom","1px"]],template:function(n,a){if(1&n&&(t.TgZ(0,"section",0)(1,"div",1)(2,"span",2),t.O4$(),t.TgZ(3,"svg",3),t._UZ(4,"path",4),t.qZA()(),t.kcU(),t.TgZ(5,"div",5)(6,"h3",6),t._uU(7,"Bancos"),t.qZA()(),t._uU(8,"__ "),t.qZA(),t.TgZ(9,"div",7),t.YNc(10,o,4,2,"ng-template",null,8,t.W1O),t._UZ(12,"app-list-shared",9),t.qZA()(),t._UZ(13,"router-outlet")),2&n){const h=t.MAs(11);t.xp6(12),t.Q6J("list",a.list)("topActions",h)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",!0)("columns",a.columns)("tableLinks",a.tableLinks)("selectable",!0)}},dependencies:[r.lC,r.rH,m.o]})}return s})();var x=e(2996),O=e(2855),y=e(342),Z=e(2667),C=e(6814),D=e(366);const A=["template"],U=["icon"];function B(s,T){if(1&s&&t._UZ(0,"fa-icon",2),2&s){const i=t.oxw();t.Q6J("icon",i.faTrash)}}function P(s,T){if(1&s&&(t.TgZ(0,"div",7)(1,"p",8),t._uU(2),t.qZA()()),2&s){const i=t.oxw(2);t.xp6(2),t.Oqu(i.erro)}}function I(s,T){1&s&&t._UZ(0,"span",9)}function W(s,T){if(1&s){const i=t.EpF();t.TgZ(0,"div")(1,"p",3),t._uU(2,"Tem certeza que deseja excluir esse registro? "),t.qZA(),t.TgZ(3,"p"),t._uU(4,"Ele n\xe3o poder\xe1 ser recuperado."),t.qZA(),t.YNc(5,P,3,1,"div",4),t.TgZ(6,"button",5),t.NdJ("click",function(){t.CHM(i);const a=t.oxw();return t.KtG(a.send())}),t.YNc(7,I,1,0,"span",6),t.TgZ(8,"span"),t._uU(9,"Excluir"),t.qZA()()()}if(2&s){const i=t.oxw();t.xp6(5),t.Q6J("ngIf",i.erro),t.xp6(2),t.Q6J("ngIf",i.loading)}}let _=(()=>{class s{constructor(i,n,a,h){this.activatedRoute=i,this.modalService=n,this.bancoService=a,this.crypto=h,this.faTrash=l.$aW,this.id=0,this.erro="",this.loading=!1,this.subscription=[],this.modal=new O.u}ngAfterViewInit(){this.modal.id=0,this.modal.template=this.template,this.modal.icon=this.icon,this.modal.style={"max-width":"400px",overflow:"visible"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute},this.modal.routerBack=["../../"],this.modal.title="Excluir registro";var i=this.activatedRoute.params.subscribe(n=>{if(n.banco_id)try{this.id=this.crypto.decrypt(n.banco_id),setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"delete banco")},200)}catch{this.voltar()}else this.voltar()});this.subscription.push(i)}ngOnDestroy(){this.subscription.forEach(i=>i.unsubscribe())}voltar(){this.modalService.removeModal(this.modal.id)}send(){this.loading=!0,this.erro="",(0,d.n)(this.bancoService.delete(this.id)).then(i=>{this.loading=!1,i.sucesso?((0,d.n)(this.bancoService.getList()),this.voltar()):this.erro=i.mensagem}).catch(i=>{this.loading=!1,this.erro=(0,y.b)(i)})}static#t=this.\u0275fac=function(n){return new(n||s)(t.Y36(r.gz),t.Y36(O.Z),t.Y36(b.r),t.Y36(Z.w))};static#e=this.\u0275cmp=t.Xpm({type:s,selectors:[["app-delete"]],viewQuery:function(n,a){if(1&n&&(t.Gf(A,5),t.Gf(U,5)),2&n){let h;t.iGM(h=t.CRH())&&(a.template=h.first),t.iGM(h=t.CRH())&&(a.icon=h.first)}},decls:4,vars:0,consts:[["icon",""],["template",""],[3,"icon"],[1,"mt-2"],["class","m-0  mt-1",4,"ngIf"],[1,"btn","btn-grey","ms-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"m-0","mt-1"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(n,a){1&n&&(t.YNc(0,B,1,1,"ng-template",null,0,t.W1O),t.YNc(2,W,10,2,"ng-template",null,1,t.W1O))},dependencies:[C.O5,D.BN]})}return s})();var R=e(7280);const F=[{path:"",component:u,children:[{path:"cadastrar",component:x.U,data:{modalOrder:1}},{path:"editar/:banco_id",component:x.U,data:{modalOrder:1}},{path:"excluir/:banco_id",component:_,data:{modalOrder:1}},R.D]}];let H=(()=>{class s{static#t=this.\u0275fac=function(n){return new(n||s)};static#e=this.\u0275mod=t.oAB({type:s});static#s=this.\u0275inj=t.cJS({imports:[r.Bz.forChild(F),r.Bz]})}return s})();var N=e(2352),S=e(6223),Y=e(8839),$=e(6208),j=e(4685),K=e(1532);let z=(()=>{class s{static#t=this.\u0275fac=function(n){return new(n||s)};static#e=this.\u0275mod=t.oAB({type:s});static#s=this.\u0275inj=t.cJS({imports:[C.ez,H,D.uH,N.kW,S.u5,Y.yI.forChild(),$.m,j.U$,K._8]})}return s})()},4809:(M,p,e)=>{e.d(p,{r:()=>b});var r=e(9862),v=e(5619),d=e(9397),l=e(2096),f=e(553),c=e(9291),t=e(8787),E=e(2425);let b=(()=>{class m{constructor(o,u,x){this.table=o,this.http=u,this.toastr=x,this.url=f.N.url,this.list=new v.X([]),this.cidades=new v.X([])}getList(){return this.table.loading.next(!0),this.http.get(`${this.url}/banco`,{headers:new r.WM({loading:"false"})}).pipe((0,d.b)({next:o=>(o=o.map(u=>u),this.list.next(Object.assign([],o)),(0,l.of)(o)),error:o=>this.toastr.error("N\xe3o foi poss\xedvel carregar listagem de bancos.")}))}get(o){return this.http.get(`${this.url}/banco/${o}`,{headers:new r.WM({loading:"false"})})}create(o){return this.http.post(`${this.url}/banco`,o)}edit(o){return this.http.put(`${this.url}/banco`,o)}delete(o){return this.http.delete(`${this.url}/banco/${o}`)}getCidade(){return this.http.get(`${this.url}/cidade/`,{headers:new r.WM({loading:"false"})}).pipe((0,d.b)({next:o=>(this.cidades.next(o),(0,l.of)(o)),error:o=>this.toastr.error("N\xe3o foi poss\xedvel carregar listagem de cidades.")}))}static#t=this.\u0275fac=function(u){return new(u||m)(c.LFG(t.i),c.LFG(r.eN),c.LFG(E._W))};static#e=this.\u0275prov=c.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"})}return m})()},8487:(M,p,e)=>{e.d(p,{q:()=>d});var r=e(9291),v=e(9862);let d=(()=>{class l{constructor(c){this.http=c}buscar(c){return this.http.get(`https://viacep.com.br/ws/${c}/json/`)}static#t=this.\u0275fac=function(t){return new(t||l)(r.LFG(v.eN))};static#e=this.\u0275prov=r.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"})}return l})()}}]);