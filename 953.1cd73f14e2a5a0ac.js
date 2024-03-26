"use strict";(self.webpackChunkZenTech=self.webpackChunkZenTech||[]).push([[953],{6953:(Y,S,s)=>{s.r(S),s.d(S,{BancoModule:()=>te});var v=s(132),C=s(5861),O=s(2832),m=s(708),t=s(590),d=s(1005),e=s(9291),u=s(8787),_=s(4809),Z=s(6434),I=s(5038),M=s(6814),D=s(6599),L=s(9901);function U(i,A){1&i&&e._UZ(0,"span",13)}const B=function(){return["cadastrar"]};function P(i,A){1&i&&(e.TgZ(0,"div",14)(1,"a",15)(2,"span",16),e._uU(3," Cadastrar Banco"),e.qZA()()()),2&i&&(e.xp6(1),e.Q6J("routerLink",e.DdM(1,B)))}let r=(()=>{class i{constructor(n,o,c,h){var H=this;this.table=n,this.bancoService=o,this.accountService=c,this.empresaService=h,this.faFilePdf=t.gSj,this.maskType=O.O,this.list=[],this.tableLinks=[],this.columns=d.sB,this.subscription=[],this.loading=!1;var se=this.bancoService.list.subscribe(x=>this.list=Object.assign([],x));this.subscription.push(se);var ie=this.bancoService.loading.subscribe(x=>this.loading=x);this.subscription.push(ie);var ne=this.empresaService.getEmpresa().subscribe(function(){var x=(0,C.Z)(function*(y){H.empresaSelected=y.empresa,y&&y.id&&(yield(0,m.n)(H.bancoService.getList(!0)))});return function(y){return x.apply(this,arguments)}}());this.subscription.push(ne);var ae=this.table.selected.subscribe(x=>{x&&(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]}],3!=this.accountService.accountValue?.perfilAcesso_Id&&this.tableLinks.push({label:"Excluir",routePath:["excluir"],paramsFieldName:["id"]}),this.tableLinks=this.table.encryptParams(this.tableLinks))});this.subscription.push(ae)}ngOnDestroy(){this.subscription.forEach(n=>n.unsubscribe())}getList(){(0,m.n)(this.bancoService.getList(!0))}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(u.i),e.Y36(_.r),e.Y36(Z.B),e.Y36(I.P))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-list"]],decls:18,vars:12,consts:[[1,"page"],[1,"page__header"],[1,"title-icon","align-items-center"],["xmlns","http://www.w3.org/2000/svg","height","16","width","16","viewBox","0 0 512 512","fill","currentColor"],["d","M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],[1,"me-auto"],[1,"page__header-title"],[1,"ms-auto","mt-auto",2,"margin-bottom","7px"],[1,"btn","btn-dark",3,"disabled","click"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"page__body"],["topActions",""],[3,"list","topActions","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"],[1,"spinner-border","spinner-border-sm","me-1"],[1,"col-xl-3","col-lg-3","col-md-5","col-sm-5","col-12","mb-2","me-md-2","mx-md-1","px-0","ng-star-inserted"],[1,"btn","btn-primary","d-flex","align-items-center","align-baseline","justify-content-center","me-md-0","me-sm-1",3,"routerLink"],[2,"margin-top","-1px","margin-bottom","1px"]],template:function(o,c){if(1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"span",2),e.O4$(),e.TgZ(3,"svg",3),e._UZ(4,"path",4),e.qZA()(),e.kcU(),e.TgZ(5,"div",5)(6,"h3",6),e._uU(7,"Bancos"),e.qZA()(),e.TgZ(8,"div",7)(9,"button",8),e.NdJ("click",function(){return c.getList()}),e.YNc(10,U,1,0,"span",9),e._uU(11,"Atualizar"),e.qZA()(),e._UZ(12,"app-empresa-selected"),e.qZA(),e.TgZ(13,"div",10),e.YNc(14,P,4,2,"ng-template",null,11,e.W1O),e._UZ(16,"app-list-shared",12),e.qZA()(),e._UZ(17,"router-outlet")),2&o){const h=e.MAs(15);e.xp6(9),e.Q6J("disabled",c.loading),e.xp6(1),e.Q6J("ngIf",c.loading),e.xp6(6),e.Q6J("list",c.list)("topActions",h)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",!0)("columns",c.columns)("tableLinks",c.tableLinks)("selectable",!0)}},dependencies:[M.O5,v.lC,v.rH,D.o,L.j]})}return i})();var T=s(2996),a=s(2855),l=s(342),p=s(9324),f=s(2667),b=s(5597);const J=["template"],R=["icon"];function N(i,A){if(1&i&&e._UZ(0,"fa-icon",2),2&i){const n=e.oxw();e.Q6J("icon",n.faTrash)}}function E(i,A){if(1&i&&(e.TgZ(0,"div",7)(1,"p",8),e._uU(2),e.qZA()()),2&i){const n=e.oxw(2);e.xp6(2),e.Oqu(n.erro)}}function g(i,A){1&i&&e._UZ(0,"span",9)}function K(i,A){if(1&i){const n=e.EpF();e.TgZ(0,"div")(1,"p",3),e._uU(2,"Tem certeza que deseja excluir esse registro? "),e.qZA(),e.TgZ(3,"p"),e._uU(4,"Ele n\xe3o poder\xe1 ser recuperado."),e.qZA(),e.YNc(5,E,3,1,"div",4),e.TgZ(6,"button",5),e.NdJ("click",function(){e.CHM(n);const c=e.oxw();return e.KtG(c.send())}),e.YNc(7,g,1,0,"span",6),e.TgZ(8,"span"),e._uU(9,"Excluir"),e.qZA()()()}if(2&i){const n=e.oxw();e.xp6(5),e.Q6J("ngIf",n.erro),e.xp6(2),e.Q6J("ngIf",n.loading)}}let V=(()=>{class i{constructor(n,o,c,h){this.activatedRoute=n,this.modalService=o,this.bancoService=c,this.crypto=h,this.faTrash=t.$aW,this.id=0,this.erro="",this.loading=!1,this.subscription=[],this.modal=new a.u}ngAfterViewInit(){this.modal.id=0,this.modal.template=this.template,this.modal.icon=this.icon,this.modal.style={"max-width":"400px",overflow:"visible"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute},this.modal.routerBack=["../../"],this.modal.title="Excluir registro";var n=this.activatedRoute.params.subscribe(o=>{if(o.banco_id)try{this.id=this.crypto.decrypt(o.banco_id),setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"delete banco")},200)}catch{this.voltar()}else this.voltar()});this.subscription.push(n)}ngOnDestroy(){this.subscription.forEach(n=>n.unsubscribe())}voltar(){this.modalService.removeModal(this.modal)}send(){this.loading=!0,this.erro="",(0,m.n)(this.bancoService.delete(this.id)).then(n=>{this.loading=!1,n.sucesso?(n.objeto?(0,p.Od)(this.bancoService,n.objeto):(0,m.n)(this.bancoService.getList()),this.voltar()):this.erro=n.mensagem}).catch(n=>{this.loading=!1,this.erro=(0,l.b)(n)})}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(v.gz),e.Y36(a.Z),e.Y36(_.r),e.Y36(f.w))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-delete"]],viewQuery:function(o,c){if(1&o&&(e.Gf(J,5),e.Gf(R,5)),2&o){let h;e.iGM(h=e.CRH())&&(c.template=h.first),e.iGM(h=e.CRH())&&(c.icon=h.first)}},decls:4,vars:0,consts:[["icon",""],["template",""],[3,"icon"],[1,"mt-2"],["class","m-0  mt-1",4,"ngIf"],[1,"btn","btn-grey","ms-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"m-0","mt-1"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","me-1"]],template:function(o,c){1&o&&(e.YNc(0,N,1,1,"ng-template",null,0,e.W1O),e.YNc(2,K,10,2,"ng-template",null,1,e.W1O))},dependencies:[M.O5,b.BN]})}return i})();var Q=s(7280),W=s(490),F=s(9742);const j=[{path:"",component:r,title:"Zentech - Bancos",children:[{path:"cadastrar",component:T.U,title:"Zentech - Cadastrar Banco",data:{modalOrder:1}},{path:"editar/:banco_id",component:T.U,title:"Zentech - Editar Banco",data:{modalOrder:1}},{path:"excluir/:banco_id",component:V,title:"Zentech - Excluir Banco",data:{modalOrder:1,data:[W.uU.Admin,W.uU.Master]},canActivate:[F.p]},Q.D]}];let z=(()=>{class i{static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275mod=e.oAB({type:i});static#s=this.\u0275inj=e.cJS({imports:[v.Bz.forChild(j),v.Bz]})}return i})();var G=s(2352),$=s(6223),X=s(5805),w=s(4685),k=s(1532),q=s(3735),ee=s(7791);let te=(()=>{class i{static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275mod=e.oAB({type:i});static#s=this.\u0275inj=e.cJS({providers:[(0,q.e$)()],imports:[M.ez,z,b.uH,G.kW,$.u5,X.m,w.U$,k._8,ee.L]})}return i})()},9901:(Y,S,s)=>{s.d(S,{j:()=>P});var v=s(5861),C=s(708),O=s(490),m=s(5038),t=s(9291),d=s(6434),e=s(4939),u=s(8787),_=s(6814),Z=s(6223),I=s(5219),M=s(2352);function D(r,T){if(1&r&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&r){const a=t.oxw(3);t.xp6(1),t.Oqu(null==a.empresaSelected.empresa?null:a.empresaSelected.empresa.nome)}}function L(r,T){if(1&r&&t.YNc(0,D,2,1,"span",7),2&r){const a=t.oxw(2);t.Q6J("ngIf",a.empresaSelected.id)}}function U(r,T){if(1&r&&(t.TgZ(0,"p"),t._uU(1),t.qZA(),t.TgZ(2,"p"),t._uU(3),t.qZA()),2&r){const a=T.$implicit;t.xp6(1),t.Oqu(a.nome),t.xp6(2),t.Oqu(a.logo)}}function B(r,T){if(1&r){const a=t.EpF();t.TgZ(0,"div",1)(1,"label",2),t._uU(2,"Selecione a Empresa para carregar dados"),t.qZA(),t.TgZ(3,"p-dropdown",3,4),t.NdJ("ngModelChange",function(p){t.CHM(a);const f=t.oxw();return t.KtG(f.empresaChange(p))})("ngModelChange",function(p){t.CHM(a);const f=t.oxw();return t.KtG(f.empresaSelected.id=p)}),t.YNc(5,L,1,1,"ng-template",5),t.YNc(6,U,4,2,"ng-template",6),t.qZA()()}if(2&r){const a=t.oxw();t.xp6(3),t.Q6J("options",a.empresas)("ngModel",a.empresaSelected.id)("filter",!0)("showClear",!1)("required",!0)}}let P=(()=>{class r{constructor(a,l,p,f){var b=this;this.empresaService=a,this.accountService=l,this.colors=p,this.table=f,this.empresaSelected=new m.I,this.empresas=[],this.loading=!1,this.Role=O.uU,this.subscription=[];var J=this.accountService.accountSubject.subscribe(function(){var E=(0,v.Z)(function*(g){b.account=g,g&&(1==g.perfilAcesso_Id&&0==b.empresaService.list.value.length&&(yield(0,C.n)(b.empresaService.getList())),(1!=g.perfilAcesso_Id||!b.empresaService.getEmpresa().value.empresa)&&b.empresaService.setEmpresa({id:g.empresa_Id,empresa:g.empresa}))});return function(g){return E.apply(this,arguments)}}());this.subscription.push(J);var R=this.empresaService.getEmpresa().subscribe(E=>{this.empresaSelected=E,this.table.selected.next(void 0),this.table.selectedItems.next([]),E&&this.setColorsJquery()});this.subscription.push(R);var N=this.empresaService.list.subscribe(E=>{this.empresas=E});this.subscription.push(N)}ngOnDestroy(){this.subscription.forEach(a=>a.unsubscribe())}empresaChange(a){var l=this;return(0,v.Z)(function*(){if(l.accountService.accountValue&&1==l.accountService.accountValue?.perfilAcesso_Id&&a){0==l.empresas.length&&(yield(0,C.n)(l.empresaService.getList()));var p=l.empresas.find(f=>f.id==a);l.empresaService.setEmpresa({empresa:p,id:a})}})()}setColorsJquery(){this.colors.setColorsJquery(this.empresaSelected.empresa)}static#e=this.\u0275fac=function(l){return new(l||r)(t.Y36(m.P),t.Y36(d.B),t.Y36(e.w),t.Y36(u.i))};static#t=this.\u0275cmp=t.Xpm({type:r,selectors:[["app-empresa-selected"]],decls:1,vars:1,consts:[["class","form-group ms-2",4,"ngIf"],[1,"form-group","ms-2"],["for","empresa_Id"],["name","empresa_Id","id","empresa_Id","optionValue","id","filterBy","nome","styleClass","form-control","placeholder","Selecione uma empresa",3,"options","ngModel","filter","showClear","required","ngModelChange"],["empresa_Id","ngModel"],["pTemplate","selectedItem"],["pTemplate","item"],[4,"ngIf"]],template:function(l,p){1&l&&t.YNc(0,B,7,5,"div",0),2&l&&t.Q6J("ngIf",p.account&&1==(null==p.account?null:p.account.perfilAcesso_Id))},dependencies:[_.O5,Z.JJ,Z.Q7,Z.On,I.jx,M.Lt]})}return r})()},9324:(Y,S,s)=>{function v(m,t,d="list"){var e=JSON.parse(JSON.stringify(m[d].value));e=e.filter(u=>!t.includes(u.id)),m[d].next(e)}function C(m,t,d="list"){var e=JSON.parse(JSON.stringify(m[d].value)),u=e.findIndex(_=>_.id==t.id);e.splice(u,1),m[d].next(e)}function O(m,t,d="list"){var e=JSON.parse(JSON.stringify(m[d].value));if(console.log("list",e),console.log("id",t.id),t.id){var u=e.findIndex(_=>_.id==t.id);console.log("index",u),-1==u&&e.push(t),e.splice(u,1,t)}else e.push(t);console.log("list",e),m[d].next(e)}s.d(S,{Od:()=>C,UB:()=>v,fb:()=>O})}}]);