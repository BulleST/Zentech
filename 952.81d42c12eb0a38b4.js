"use strict";(self.webpackChunkZenTech=self.webpackChunkZenTech||[]).push([[952],{9952:(Y,O,i)=>{i.r(O),i.d(O,{BeneficiarioModule:()=>se});var _=i(6814),b=i(5597),M=i(2352),p=i(6223),t=i(4685),u=i(1532),o=i(132),h=i(5861),x=i(9296),U=i(2832),S=i(708),y=i(590),e=i(9291),B=i(8787),I=i(6793),P=i(6434),J=i(5038),l=i(6599),Z=i(9901);function a(s,A){1&s&&e._UZ(0,"span",12)}const m=function(){return["cadastrar"]};function d(s,A){1&s&&(e.TgZ(0,"div",13)(1,"a",14)(2,"span",15),e._uU(3," Cadastrar Benefici\xe1rio"),e.qZA()()()),2&s&&(e.xp6(1),e.Q6J("routerLink",e.DdM(1,m)))}let v=(()=>{class s{constructor(n,r,c,f){var F=this;this.table=n,this.beneficiarioService=r,this.accountService=c,this.empresaService=f,this.faUsers=y.FVb,this.maskType=U.O,this.list=[],this.tableLinks=[],this.columns=x.XM,this.subscription=[],this.loading=!1;var ne=this.beneficiarioService.list.subscribe(C=>this.list=Object.assign([],C));this.subscription.push(ne);var ae=this.beneficiarioService.loading.subscribe(C=>this.loading=C);this.subscription.push(ae);var oe=this.empresaService.getEmpresa().subscribe(function(){var C=(0,h.Z)(function*(L){F.empresaSelected=L.empresa,L&&L.id&&(yield(0,S.n)(F.beneficiarioService.getList(!0)))});return function(L){return C.apply(this,arguments)}}());this.subscription.push(oe);var re=this.table.selected.subscribe(C=>{C&&(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]}],3!=this.accountService.accountValue?.perfilAcesso_Id&&this.tableLinks.push({label:"Excluir",routePath:["excluir"],paramsFieldName:["id"]}),this.tableLinks=this.table.encryptParams(this.tableLinks))});this.subscription.push(re)}ngOnDestroy(){this.subscription.forEach(n=>n.unsubscribe())}getList(){(0,S.n)(this.beneficiarioService.getList(!0))}static#e=this.\u0275fac=function(r){return new(r||s)(e.Y36(B.i),e.Y36(I.i),e.Y36(P.B),e.Y36(J.P))};static#t=this.\u0275cmp=e.Xpm({type:s,selectors:[["app-list"]],decls:17,vars:13,consts:[[1,"page"],[1,"page__header"],[1,"title-icon","align-items-center"],[3,"icon"],[1,"me-auto"],[1,"page__header-title"],[1,"ms-auto","mt-auto",2,"margin-bottom","7px"],[1,"btn","btn-dark",3,"disabled","click"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"page__body"],["topActions",""],[3,"list","topActions","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"],[1,"spinner-border","spinner-border-sm","me-1"],[1,"col-xl-4","col-lg-4","col-md-7","col-sm-6","col-12","mb-2","me-md-2","mx-md-1","px-0","ng-star-inserted"],[1,"btn","btn-primary","d-flex","align-items-center","align-baseline","justify-content-center","me-md-0","me-sm-1",2,"width","-1px",3,"routerLink"],[2,"margin-top","-1px","margin-bottom","1px"]],template:function(r,c){if(1&r&&(e.TgZ(0,"section",0)(1,"div",1)(2,"span",2),e._UZ(3,"fa-icon",3),e.qZA(),e.TgZ(4,"div",4)(5,"h3",5),e._uU(6,"Benefici\xe1rios"),e.qZA()(),e.TgZ(7,"div",6)(8,"button",7),e.NdJ("click",function(){return c.getList()}),e.YNc(9,a,1,0,"span",8),e._uU(10,"Atualizar"),e.qZA()(),e._UZ(11,"app-empresa-selected"),e.qZA(),e.TgZ(12,"div",9),e.YNc(13,d,4,2,"ng-template",null,10,e.W1O),e._UZ(15,"app-list-shared",11),e.qZA()(),e._UZ(16,"router-outlet")),2&r){const f=e.MAs(14);e.xp6(3),e.Q6J("icon",c.faUsers),e.xp6(5),e.Q6J("disabled",c.loading),e.xp6(1),e.Q6J("ngIf",c.loading),e.xp6(6),e.Q6J("list",c.list)("topActions",f)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",!0)("columns",c.columns)("tableLinks",c.tableLinks)("selectable",!0)}},dependencies:[_.O5,o.lC,o.rH,b.BN,l.o,Z.j]})}return s})();var E=i(8902),D=i(2855),R=i(342),N=i(9324),T=i(2667);const g=["template"],G=["icon"];function j(s,A){if(1&s&&e._UZ(0,"fa-icon",2),2&s){const n=e.oxw();e.Q6J("icon",n.faTrash)}}function H(s,A){if(1&s&&(e.TgZ(0,"div",7)(1,"p",8),e._uU(2),e.qZA()()),2&s){const n=e.oxw(2);e.xp6(2),e.Oqu(n.erro)}}function V(s,A){1&s&&e._UZ(0,"span",9)}function z(s,A){if(1&s){const n=e.EpF();e.TgZ(0,"div")(1,"p",3),e._uU(2,"Tem certeza que deseja excluir esse registro? "),e.qZA(),e.TgZ(3,"p"),e._uU(4,"Ele n\xe3o poder\xe1 ser recuperado."),e.qZA(),e.YNc(5,H,3,1,"div",4),e.TgZ(6,"button",5),e.NdJ("click",function(){e.CHM(n);const c=e.oxw();return e.KtG(c.send())}),e.YNc(7,V,1,0,"span",6),e.TgZ(8,"span"),e._uU(9,"Excluir"),e.qZA()()()}if(2&s){const n=e.oxw();e.xp6(5),e.Q6J("ngIf",n.erro),e.xp6(2),e.Q6J("ngIf",n.loading)}}let X=(()=>{class s{constructor(n,r,c,f){this.activatedRoute=n,this.modalService=r,this.beneficiarioService=c,this.crypto=f,this.faTrash=y.$aW,this.id=0,this.erro="",this.loading=!1,this.subscription=[],this.modal=new D.u}ngAfterViewInit(){this.modal.id=0,this.modal.template=this.template,this.modal.icon=this.icon,this.modal.style={"max-width":"400px",overflow:"visible"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute},this.modal.routerBack=["../../"],this.modal.title="Excluir registro";var n=this.activatedRoute.params.subscribe(r=>{if(r.beneficiario_id)try{this.id=this.crypto.decrypt(r.beneficiario_id),setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"delete beneficiario")},200)}catch{this.voltar()}else this.voltar()});this.subscription.push(n)}ngOnDestroy(){this.subscription.forEach(n=>n.unsubscribe())}voltar(){this.modalService.removeModal(this.modal)}send(){this.loading=!0,this.erro="",(0,S.n)(this.beneficiarioService.delete(this.id)).then(n=>{this.loading=!1,n.sucesso?(n.objeto?(0,N.Od)(this.beneficiarioService,n.objeto):(0,S.n)(this.beneficiarioService.getList()),this.voltar()):this.erro=n.mensagem}).catch(n=>{this.loading=!1,this.erro=(0,R.b)(n)})}static#e=this.\u0275fac=function(r){return new(r||s)(e.Y36(o.gz),e.Y36(D.Z),e.Y36(I.i),e.Y36(T.w))};static#t=this.\u0275cmp=e.Xpm({type:s,selectors:[["app-delete"]],viewQuery:function(r,c){if(1&r&&(e.Gf(g,5),e.Gf(G,5)),2&r){let f;e.iGM(f=e.CRH())&&(c.template=f.first),e.iGM(f=e.CRH())&&(c.icon=f.first)}},decls:4,vars:0,consts:[["icon",""],["template",""],[3,"icon"],[1,"mt-2"],["class","m-0  mt-1",4,"ngIf"],[1,"btn","btn-grey","ms-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"m-0","mt-1"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","me-1"]],template:function(r,c){1&r&&(e.YNc(0,j,1,1,"ng-template",null,0,e.W1O),e.YNc(2,z,10,2,"ng-template",null,1,e.W1O))},dependencies:[_.O5,b.BN]})}return s})();var W=i(2996),K=i(2951),$=i(7280),Q=i(490),w=i(9742);const k=[{path:"",component:v,title:"Zentech - Benefici\xe1rios",children:[{path:"cadastrar",component:E.U,title:"Zentech - Cadastrar Benefici\xe1rio",data:{modalOrder:1},children:[{path:"banco",component:W.U,title:"Zentech - Cadastrar Banco",data:{modalOrder:2}},{path:"representante",component:K.U,title:"Zentech - Cadastrar Representante",data:{modalOrder:2}}]},{path:"editar/:beneficiario_id",title:"Zentech - Editar Benefici\xe1rio",component:E.U,data:{modalOrder:1},children:[{path:"banco",component:W.U,title:"Zentech - Cadastrar Banco",data:{modalOrder:2}},{path:"representante",component:K.U,title:"Zentech - Cadastrar Representante",data:{modalOrder:2}}]},{path:"excluir/:beneficiario_id",title:"Zentech - Excluir Benefici\xe1rio",component:X,data:{modalOrder:1,data:[Q.uU.Admin,Q.uU.Master]},canActivate:[w.p]},$.D]}];let q=(()=>{class s{static#e=this.\u0275fac=function(r){return new(r||s)};static#t=this.\u0275mod=e.oAB({type:s});static#i=this.\u0275inj=e.cJS({imports:[o.Bz.forChild(k),o.Bz]})}return s})();var ee=i(5805),te=i(3735),ie=i(5096);let se=(()=>{class s{static#e=this.\u0275fac=function(r){return new(r||s)};static#t=this.\u0275mod=e.oAB({type:s});static#i=this.\u0275inj=e.cJS({providers:[(0,te.e$)()],imports:[_.ez,q,b.uH,M.kW,p.u5,ee.m,t.U$,u._8,ie.O]})}return s})()},9901:(Y,O,i)=>{i.d(O,{j:()=>J});var _=i(5861),b=i(708),M=i(490),p=i(5038),t=i(9291),u=i(6434),o=i(4939),h=i(8787),x=i(6814),U=i(6223),S=i(5219),y=i(2352);function e(l,Z){if(1&l&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&l){const a=t.oxw(3);t.xp6(1),t.Oqu(null==a.empresaSelected.empresa?null:a.empresaSelected.empresa.nome)}}function B(l,Z){if(1&l&&t.YNc(0,e,2,1,"span",7),2&l){const a=t.oxw(2);t.Q6J("ngIf",a.empresaSelected.id)}}function I(l,Z){if(1&l&&(t.TgZ(0,"p"),t._uU(1),t.qZA(),t.TgZ(2,"p"),t._uU(3),t.qZA()),2&l){const a=Z.$implicit;t.xp6(1),t.Oqu(a.nome),t.xp6(2),t.Oqu(a.logo)}}function P(l,Z){if(1&l){const a=t.EpF();t.TgZ(0,"div",1)(1,"label",2),t._uU(2,"Selecione a Empresa para carregar dados"),t.qZA(),t.TgZ(3,"p-dropdown",3,4),t.NdJ("ngModelChange",function(d){t.CHM(a);const v=t.oxw();return t.KtG(v.empresaChange(d))})("ngModelChange",function(d){t.CHM(a);const v=t.oxw();return t.KtG(v.empresaSelected.id=d)}),t.YNc(5,B,1,1,"ng-template",5),t.YNc(6,I,4,2,"ng-template",6),t.qZA()()}if(2&l){const a=t.oxw();t.xp6(3),t.Q6J("options",a.empresas)("ngModel",a.empresaSelected.id)("filter",!0)("showClear",!1)("required",!0)}}let J=(()=>{class l{constructor(a,m,d,v){var E=this;this.empresaService=a,this.accountService=m,this.colors=d,this.table=v,this.empresaSelected=new p.I,this.empresas=[],this.loading=!1,this.Role=M.uU,this.subscription=[];var D=this.accountService.accountSubject.subscribe(function(){var T=(0,_.Z)(function*(g){E.account=g,g&&(1==g.perfilAcesso_Id&&0==E.empresaService.list.value.length&&(yield(0,b.n)(E.empresaService.getList())),(1!=g.perfilAcesso_Id||!E.empresaService.getEmpresa().value.empresa)&&E.empresaService.setEmpresa({id:g.empresa_Id,empresa:g.empresa}))});return function(g){return T.apply(this,arguments)}}());this.subscription.push(D);var R=this.empresaService.getEmpresa().subscribe(T=>{this.empresaSelected=T,this.table.selected.next(void 0),this.table.selectedItems.next([]),T&&this.setColorsJquery()});this.subscription.push(R);var N=this.empresaService.list.subscribe(T=>{this.empresas=T});this.subscription.push(N)}ngOnDestroy(){this.subscription.forEach(a=>a.unsubscribe())}empresaChange(a){var m=this;return(0,_.Z)(function*(){if(m.accountService.accountValue&&1==m.accountService.accountValue?.perfilAcesso_Id&&a){0==m.empresas.length&&(yield(0,b.n)(m.empresaService.getList()));var d=m.empresas.find(v=>v.id==a);m.empresaService.setEmpresa({empresa:d,id:a})}})()}setColorsJquery(){this.colors.setColorsJquery(this.empresaSelected.empresa)}static#e=this.\u0275fac=function(m){return new(m||l)(t.Y36(p.P),t.Y36(u.B),t.Y36(o.w),t.Y36(h.i))};static#t=this.\u0275cmp=t.Xpm({type:l,selectors:[["app-empresa-selected"]],decls:1,vars:1,consts:[["class","form-group ms-2",4,"ngIf"],[1,"form-group","ms-2"],["for","empresa_Id"],["name","empresa_Id","id","empresa_Id","optionValue","id","filterBy","nome","styleClass","form-control","placeholder","Selecione uma empresa",3,"options","ngModel","filter","showClear","required","ngModelChange"],["empresa_Id","ngModel"],["pTemplate","selectedItem"],["pTemplate","item"],[4,"ngIf"]],template:function(m,d){1&m&&t.YNc(0,P,7,5,"div",0),2&m&&t.Q6J("ngIf",d.account&&1==(null==d.account?null:d.account.perfilAcesso_Id))},dependencies:[x.O5,U.JJ,U.Q7,U.On,S.jx,y.Lt]})}return l})()},9324:(Y,O,i)=>{function _(p,t,u="list"){var o=JSON.parse(JSON.stringify(p[u].value));o=o.filter(h=>!t.includes(h.id)),p[u].next(o)}function b(p,t,u="list"){var o=JSON.parse(JSON.stringify(p[u].value)),h=o.findIndex(x=>x.id==t.id);o.splice(h,1),p[u].next(o)}function M(p,t,u="list"){var o=JSON.parse(JSON.stringify(p[u].value));if(console.log("list",o),console.log("id",t.id),t.id){var h=o.findIndex(x=>x.id==t.id);console.log("index",h),-1==h&&o.push(t),o.splice(h,1,t)}else o.push(t);console.log("list",o),p[u].next(o)}i.d(O,{Od:()=>b,UB:()=>_,fb:()=>M})}}]);