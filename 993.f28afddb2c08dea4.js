"use strict";(self.webpackChunkZenTech=self.webpackChunkZenTech||[]).push([[993],{993:(bt,Z,a)=>{a.r(Z),a.d(Z,{DocumentoSwiftModule:()=>Zt});var p=a(132),r=a(2832),h=a(708),M=a(590),b=a(674),m=a(5219);class F{constructor(){this.id=0,this.data=new Date,this.invoice_Id=""}}var N=[{field:"id",header:"Id",maskType:r.O.undefined,filterType:r.vA.text,filterDisplay:r.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,showOperator:!1,filterMatchMode:m.a6.EQUALS},{field:"data",header:"Data",maskType:r.O.dateTime,filterType:r.vA.datetime,filterDisplay:r.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,showOperator:!0,filterMatchMode:m.a6.DATE_IS},{field:"dataInvoice",header:"Data Invoice",maskType:r.O.dateTime,filterType:r.vA.datetime,filterDisplay:r.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,showOperator:!0,filterMatchMode:m.a6.DATE_IS},{field:"valor",header:"Valor",maskType:r.O.number,filterType:r.vA.numeric,filterDisplay:r.w2.menu,decimal:"1.2",filterShowAddButton:!0,filterShowMatchMode:!0,showOperator:!0,filterMatchMode:m.a6.CONTAINS},{field:"nomeBanco",header:"Banco",maskType:r.O.undefined,filterType:r.vA.text,filterDisplay:r.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,showOperator:!1,filterMatchMode:m.a6.CONTAINS},{field:"nomeBeneficiario",header:"Beneficiario",maskType:r.O.undefined,filterType:r.vA.text,filterDisplay:r.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,showOperator:!1,filterMatchMode:m.a6.CONTAINS},{field:"cnpjBeneficiario",header:"CNPJ",maskType:r.O.cnpj,filterType:r.vA.text,filterDisplay:r.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,showOperator:!1,filterMatchMode:m.a6.CONTAINS}],t=a(9291),S=a(8787),v=a(9862),B=a(5619),Y=a(9397),L=a(2096),H=a(553),A=a(2425);let _=(()=>{class i{constructor(e,o,n){this.table=e,this.http=o,this.toastr=n,this.id=0,this.nome="",this.cidade_Id="",this.cep="",this.cNumero="",this.numero="",this.list=new B.X([]),this.url=H.N.url}getList(){return this.table.loading.next(!0),this.http.get(`${this.url}/DocumentoSwift`,{headers:new v.WM({loading:"false"})}).pipe((0,Y.b)({next:e=>(e=e.map(o=>o),this.list.next(Object.assign([],e)),(0,L.of)(e)),error:e=>this.toastr.error("N\xe3o foi poss\xedvel carregar listagem de pessoas.")}))}get(e){return this.http.get(`${this.url}/DocumentoSwift/${e}`,{headers:new v.WM({loading:"false"})})}post(e){return this.http.post(`${this.url}/DocumentoSwift`,e)}delete(e){return this.http.delete(`${this.url}/DocumentoSwift/${e}`)}static#t=this.\u0275fac=function(o){return new(o||i)(t.LFG(S.i),t.LFG(v.eN),t.LFG(A._W))};static#e=this.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var J=a(6599);const q=function(){return["cadastrar"]};function j(i,c){1&i&&(t.TgZ(0,"div",10)(1,"a",11)(2,"span",12),t._uU(3," Cadastrar Swift"),t.qZA()()()),2&i&&(t.xp6(1),t.Q6J("routerLink",t.DdM(1,q)))}let E=(()=>{class i{constructor(e,o,n){this.table=e,this.documentoSwiftService=o,this.isMobile=n,this.faFilePdf=M.gSj,this.maskType=r.O,this.list=[],this.tableLinks=[],this.columns=N,this.subscription=[],this.screen=b.I.lg;var s=this.documentoSwiftService.list.subscribe(u=>{this.list=Object.assign([],u)});this.subscription.push(s);var x=this.isMobile.value.subscribe(u=>this.screen=u);this.subscription.push(x),(0,h.n)(this.documentoSwiftService.getList());var T=this.table.selected.subscribe(u=>{u&&(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]},{label:"Excluir",routePath:["excluir"],paramsFieldName:["id"]}],this.tableLinks=this.table.encryptParams(this.tableLinks))});this.subscription.push(T)}ngOnDestroy(){this.subscription.forEach(e=>e.unsubscribe())}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(S.i),t.Y36(_),t.Y36(b.h))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-list"]],decls:13,vars:10,consts:[[1,"page"],[1,"page__header"],[1,"title-icon","align-items-center"],["xmlns","http://www.w3.org/2000/svg","height","16","width","16","viewBox","0 0 512 512","fill","currentColor"],["d","M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],[1,"me-auto"],[1,"page__header-title"],[1,"page__body"],["topActions",""],[3,"list","topActions","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"],[1,"col-xl-3","col-lg-3","col-md-4","col-sm-6","col-12","mb-2","me-md-2","mx-md-1","px-0","ng-star-inserted"],[1,"btn","btn-primary","d-flex","align-items-center","align-baseline","justify-content-center","me-md-0","me-sm-1",3,"routerLink"],[2,"margin-top","-1px","margin-bottom","1px"]],template:function(o,n){if(1&o&&(t.TgZ(0,"section",0)(1,"div",1)(2,"span",2),t.O4$(),t.TgZ(3,"svg",3),t._UZ(4,"path",4),t.qZA()(),t.kcU(),t.TgZ(5,"div",5)(6,"h3",6),t._uU(7,"Documentos Swift"),t.qZA()()(),t.TgZ(8,"div",7),t.YNc(9,j,4,2,"ng-template",null,8,t.W1O),t._UZ(11,"app-list-shared",9),t.qZA()(),t._UZ(12,"router-outlet")),2&o){const s=t.MAs(10);t.xp6(11),t.Q6J("list",n.list)("topActions",s)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",!0)("columns",n.columns)("tableLinks",n.tableLinks)("selectable",!0)}},dependencies:[p.lC,p.rH,J.o]})}return i})();var C=a(342),g=a(2855),y=a(2667),Q=a(8487),V=a(237),f=a(6814),l=a(6223),I=a(2352),D=a(8839);const G=["template"],R=["icon"],z=["cep"];function P(i,c){1&i&&(t.TgZ(0,"span",3),t.O4$(),t.TgZ(1,"svg",4),t._UZ(2,"path",5),t.qZA()())}function W(i,c){1&i&&(t.TgZ(0,"p",12),t._uU(1,"Este campo \xe9 obrigat\xf3rio."),t.qZA())}function $(i,c){if(1&i&&(t.TgZ(0,"div"),t.YNc(1,W,2,0,"p",27),t.qZA()),2&i){t.oxw();const e=t.MAs(10);t.xp6(1),t.Q6J("ngIf",e.errors.required)}}function k(i,c){if(1&i&&(t.TgZ(0,"div",29)(1,"p")(2,"strong"),t._uU(3,"Id: "),t.qZA(),t._uU(4),t.TgZ(5,"strong"),t._uU(6,"Data : "),t.qZA(),t._uU(7),t.ALo(8,"date"),t.qZA()()),2&i){const e=t.oxw(3);t.xp6(4),t.hij("",e.selectedInvoice.id," "),t.xp6(3),t.Oqu(t.xi3(8,2,e.selectedInvoice.dataInvoice,"dd/MM/yyyy"))}}function K(i,c){if(1&i&&t.YNc(0,k,9,5,"div",28),2&i){const e=t.oxw(2);t.Q6J("ngIf",e.selectedInvoice)}}function X(i,c){if(1&i&&(t.TgZ(0,"div")(1,"p")(2,"strong"),t._uU(3,"Id: "),t.qZA(),t._uU(4),t.qZA(),t.TgZ(5,"div",30)(6,"p")(7,"strong"),t._uU(8,"Data: "),t.qZA(),t._uU(9),t.ALo(10,"date"),t.qZA(),t.TgZ(11,"p")(12,"strong"),t._uU(13,"Valor: "),t.qZA(),t._uU(14),t.ALo(15,"currency"),t.qZA()(),t.TgZ(16,"div",30)(17,"p")(18,"strong"),t._uU(19,"Benefici\xe1rio: "),t.qZA(),t._uU(20),t.qZA(),t.TgZ(21,"p")(22,"strong"),t._uU(23,"CNPJ: "),t.qZA(),t._uU(24),t.ALo(25,"mask"),t.qZA()(),t.TgZ(26,"p")(27,"strong"),t._uU(28,"Banco: "),t.qZA(),t._uU(29),t.qZA()()),2&i){const e=c.$implicit;t.xp6(4),t.Oqu(e.id),t.xp6(5),t.Oqu(t.xi3(10,6,e.dataInvoice,"dd/MM/yyyy")),t.xp6(5),t.Oqu(t.gM2(15,9,e.valor,"BRL","","1.2")),t.xp6(6),t.Oqu(e.nomeBeneficiario),t.xp6(4),t.Oqu(t.xi3(25,14,e.cnpj,"00.000.000/0000-00")),t.xp6(5),t.Oqu(e.nomeBanco)}}const tt=function(){return["./invoice"]};function et(i,c){1&i&&(t.TgZ(0,"div",31),t._uU(1," N\xe3o encontrou? Clique para "),t.TgZ(2,"a",32),t._uU(3,"adicionar"),t.qZA()()),2&i&&(t.xp6(2),t.Q6J("routerLink",t.DdM(1,tt)))}function it(i,c){1&i&&(t.TgZ(0,"p",12),t._uU(1,"Este campo \xe9 obrigat\xf3rio."),t.qZA())}function ot(i,c){if(1&i&&(t.TgZ(0,"div"),t.YNc(1,it,2,0,"p",27),t.qZA()),2&i){t.oxw();const e=t.MAs(18);t.xp6(1),t.Q6J("ngIf",e.errors.required)}}function nt(i,c){if(1&i&&(t.TgZ(0,"p",12),t._uU(1),t.qZA()),2&i){const e=t.oxw(3);t.xp6(1),t.Oqu(e.erro)}}function st(i,c){1&i&&(t.TgZ(0,"p",12),t._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar."),t.qZA())}function at(i,c){if(1&i&&(t.TgZ(0,"div",33),t.YNc(1,nt,2,1,"p",27),t.YNc(2,st,2,0,"p",27),t.qZA()),2&i){t.oxw();const e=t.MAs(1),o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.erro),t.xp6(1),t.Q6J("ngIf",e.invalid&&!o.erro)}}function rt(i,c){1&i&&t._UZ(0,"span",34)}function ct(i,c){if(1&i){const e=t.EpF();t.TgZ(0,"form",6,7),t.NdJ("ngSubmit",function(){t.CHM(e);const n=t.MAs(1),s=t.oxw();return t.KtG(s.send(n))}),t.TgZ(2,"div",8)(3,"div",9)(4,"div",10)(5,"label",11),t._uU(6,"Data: "),t.TgZ(7,"span",12),t._uU(8,"*"),t.qZA()(),t.TgZ(9,"input",13,14),t.NdJ("ngModelChange",function(n){t.CHM(e);const s=t.oxw();return t.KtG(s.objeto.data=n)})("change",function(){t.CHM(e);const n=t.MAs(10),s=t.oxw();return t.KtG(s.objeto.data=n.value.trim())}),t.qZA(),t.YNc(11,$,2,1,"div",15),t.qZA(),t.TgZ(12,"div",16)(13,"label",17),t._uU(14,"Invoice: "),t.TgZ(15,"span",12),t._uU(16,"*"),t.qZA()(),t.TgZ(17,"p-dropdown",18,19),t.NdJ("ngModelChange",function(n){t.CHM(e);const s=t.oxw();return t.KtG(s.selectedInvoice=n)})("ngModelChange",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.invoiceChange())}),t.YNc(19,K,1,1,"ng-template",20),t.YNc(20,X,30,17,"ng-template",21),t.YNc(21,et,4,2,"ng-template",22),t.qZA(),t.YNc(22,ot,2,1,"div",15),t.qZA()(),t.TgZ(23,"div",23),t.YNc(24,at,3,2,"div",24),t.TgZ(25,"button",25),t.YNc(26,rt,1,0,"span",26),t.TgZ(27,"span"),t._uU(28,"Salvar"),t.qZA()()()()()}if(2&i){const e=t.MAs(1),o=t.MAs(10),n=t.MAs(18),s=t.oxw();t.xp6(9),t.Q6J("ngModel",s.objeto.data),t.xp6(2),t.Q6J("ngIf",o.touched&&o.errors),t.xp6(6),t.Q6J("options",s.invoices)("ngModel",s.selectedInvoice)("styleClass","form-control "+(s.loadingInvoice?"form-control-loading":""))("showClear",!0)("filter",!0)("required",!0)("showClear",!0),t.xp6(5),t.Q6J("ngIf",n.touched&&n.errors),t.xp6(2),t.Q6J("ngIf",s.erro||e.invalid),t.xp6(1),t.Q6J("disabled",e.invalid||s.loading),t.xp6(1),t.Q6J("ngIf",s.loading)}}let O=(()=>{class i{constructor(e,o,n,s,x,T,u){this.activatedRoute=e,this.modalService=o,this.documentoSwiftService=n,this.crypto=s,this.toastr=x,this.cepService=T,this.invoiceService=u,this.objeto=new F,this.erro="",this.loading=!1,this.subscription=[],this.isEditPage=!0,this.modal=new g.u,this.invoices=[],this.loadingInvoice=!0,this.cepPreenchido=!1,this.loadingCNPJ=!1,this.loadingCep=!1,(0,h.n)(this.invoiceService.getList()).then(w=>this.invoices=w).finally(()=>console.log("ok"));var Mt=this.invoiceService.list.subscribe(w=>{this.invoices=w.map(d=>(d.filter=d.id+"-"+d.nomeBanco+"-"+d.nomeBeneficiario+"-"+d.cnpjBeneficiario+"-"+d.valor+"-"+d.dataInvoice,console.log("teste",d.filter),d))});this.subscription.push(Mt)}ngAfterViewInit(){this.modal.id=0,this.modal.template=this.template,this.modal.icon=this.icon,this.modal.style={"max-width":"600px",overflow:"visible"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute};var e=this.activatedRoute.params.subscribe(o=>{o["documento-swift_id"]?(this.objeto.id=this.crypto.decrypt(o["documento-swift_id"]),this.modal.title="Editar Documento Swifti",this.modal.routerBack=["../../"],this.isEditPage=!0,(0,h.n)(this.documentoSwiftService.get(this.objeto.id)).then(n=>{this.objeto=n,this.selectedInvoice=this.invoices.find(s=>s.id==this.objeto.invoice_Id),setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"documento-swift")},200)}).catch(n=>{this.voltar()})):(this.modal.title="Cadastrar Documento Swift",this.modal.routerBack=["../"],this.isEditPage=!1,setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"documento-swift")},200))});this.subscription.push(e)}ngOnDestroy(){this.subscription.forEach(e=>e.unsubscribe())}invoiceChange(){this.objeto.invoice_Id=this.selectedInvoice?.id??void 0}voltar(){this.modalService.removeModal(this.modal.id)}send(e){return e.invalid?(this.toastr.error("Campos inv\xe1lidos"),void(this.erro="Campos inv\xe1lidos")):(this.erro="",(0,h.n)(this.documentoSwiftService.post(this.objeto)).then(o=>{0!=o.sucesso?((0,h.n)(this.documentoSwiftService.getList()),this.voltar()):(this.erro=o.mensagem,this.toastr.error(o.mensagem)),this.loading=!1}).catch(o=>{this.loading=!1,this.erro=(0,C.b)(o)}))}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(p.gz),t.Y36(g.Z),t.Y36(_),t.Y36(y.w),t.Y36(A._W),t.Y36(Q.q),t.Y36(V.q))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-form"]],viewQuery:function(o,n){if(1&o&&(t.Gf(G,5),t.Gf(R,5),t.Gf(z,5)),2&o){let s;t.iGM(s=t.CRH())&&(n.template=s.first),t.iGM(s=t.CRH())&&(n.icon=s.first),t.iGM(s=t.CRH())&&(n.cep=s.first)}},decls:4,vars:0,consts:[["class","align-items-center"],["icon",""],["template",""],[1,"title-icon"],["xmlns","http://www.w3.org/2000/svg","height","16","width","16","viewBox","0 0 512 512","fill","currentColor"],["d","M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],[1,"needs-validation",3,"ngSubmit"],["form","ngForm"],[1,"px-2"],[1,"row"],[1,"form-group","col-xl-8","col-lg-8","col-md-8","col-sm-12","col-12"],["for","data"],[1,"text-danger"],["type","datetime-local","name","data","id","data","pattern","\\S(.*\\S)?","required","",1,"form-control",3,"ngModel","ngModelChange","change"],["data","ngModel"],[4,"ngIf"],[1,"form-group","col-xl-12","xol-lg-4","col-md-6","col-sm-6","col-12"],["for","invoice_Id"],["name","invoice_Id","inputId","invoice_Id","filterBy","filter","optionLabel","dataInvoice","placeholder","Selecione um invoice",3,"options","ngModel","styleClass","showClear","filter","required","ngModelChange"],["invoice_Id","ngModel"],["pTemplate","selectedItem"],["pTemplate","item"],["pTemplate","footer"],[1,"d-flex","align-items-center"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","mr-0","ms-auto",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["class","text-danger",4,"ngIf"],["class","flex align-items-center gap-2",4,"ngIf"],[1,"flex","align-items-center","gap-2"],[1,"d-flex","justify-content-between"],[1,"py-2","px-3","border-top","bg-light"],[1,"link","text-info",3,"routerLink"],[1,"m-0"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(o,n){1&o&&(t.YNc(0,P,3,0,"ng-template",0,1,t.W1O),t.YNc(2,ct,29,13,"ng-template",null,2,t.W1O))},dependencies:[f.O5,l._Y,l.Fj,l.JJ,l.JL,l.Q7,l.c5,l.On,l.F,p.rH,m.jx,I.Lt,f.H9,f.uU,D.Iq]})}return i})();var U=a(366);const lt=["template"],dt=["icon"];function mt(i,c){if(1&i&&t._UZ(0,"fa-icon",2),2&i){const e=t.oxw();t.Q6J("icon",e.faTrash)}}function pt(i,c){if(1&i&&(t.TgZ(0,"div",7)(1,"p",8),t._uU(2),t.qZA()()),2&i){const e=t.oxw(2);t.xp6(2),t.Oqu(e.erro)}}function ht(i,c){1&i&&t._UZ(0,"span",9)}function ut(i,c){if(1&i){const e=t.EpF();t.TgZ(0,"div")(1,"p",3),t._uU(2,"Tem certeza que deseja excluir esse registro? "),t.qZA(),t.TgZ(3,"p"),t._uU(4,"Ele n\xe3o poder\xe1 ser recuperado."),t.qZA(),t.YNc(5,pt,3,1,"div",4),t.TgZ(6,"button",5),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.send())}),t.YNc(7,ht,1,0,"span",6),t.TgZ(8,"span"),t._uU(9,"Excluir"),t.qZA()()()}if(2&i){const e=t.oxw();t.xp6(5),t.Q6J("ngIf",e.erro),t.xp6(2),t.Q6J("ngIf",e.loading)}}let ft=(()=>{class i{constructor(e,o,n,s){this.activatedRoute=e,this.modalService=o,this.documentoSwiftService=n,this.crypto=s,this.faTrash=M.$aW,this.id=0,this.erro="",this.loading=!1,this.subscription=[],this.modal=new g.u}ngAfterViewInit(){this.modal.id=0,this.modal.template=this.template,this.modal.icon=this.icon,this.modal.style={"max-width":"400px",overflow:"visible"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute},this.modal.routerBack=["../../"],this.modal.title="Excluir registro";var e=this.activatedRoute.params.subscribe(o=>{if(o["documento-swift_id"])try{this.id=this.crypto.decrypt(o["documento-swift_id"]),setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"delete instituicao-financeira")},200)}catch{this.voltar()}else this.voltar()});this.subscription.push(e)}ngOnDestroy(){this.subscription.forEach(e=>e.unsubscribe())}voltar(){this.modalService.removeModal(this.modal.id)}send(){this.loading=!0,this.erro="",(0,h.n)(this.documentoSwiftService.delete(this.id)).then(e=>{this.loading=!1,e.sucesso?((0,h.n)(this.documentoSwiftService.getList()),this.voltar()):this.erro=e.mensagem}).catch(e=>{this.loading=!1,this.erro=(0,C.b)(e)})}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(p.gz),t.Y36(g.Z),t.Y36(_),t.Y36(y.w))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-delete"]],viewQuery:function(o,n){if(1&o&&(t.Gf(lt,5),t.Gf(dt,5)),2&o){let s;t.iGM(s=t.CRH())&&(n.template=s.first),t.iGM(s=t.CRH())&&(n.icon=s.first)}},decls:4,vars:0,consts:[["icon",""],["template",""],[3,"icon"],[1,"mt-2"],["class","m-0  mt-1",4,"ngIf"],[1,"btn","btn-grey","ms-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"m-0","mt-1"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(o,n){1&o&&(t.YNc(0,mt,1,1,"ng-template",null,0,t.W1O),t.YNc(2,ut,10,2,"ng-template",null,1,t.W1O))},dependencies:[f.O5,U.BN]})}return i})();const vt=[{path:"",component:E,children:[{path:"cadastrar",component:O,children:[{path:"invoice",component:a(2854).U}]},{path:"editar/:documento-swift_id",component:O},{path:"excluir/:documento-swift_id",component:ft}]}];let _t=(()=>{class i{static#t=this.\u0275fac=function(o){return new(o||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[p.Bz.forChild(vt),p.Bz]})}return i})();var xt=a(6208),Tt=a(4685),wt=a(1532);let Zt=(()=>{class i{static#t=this.\u0275fac=function(o){return new(o||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[f.ez,_t,U.uH,I.kW,l.u5,D.yI.forChild(),xt.m,Tt.U$,wt._8]})}return i})()}}]);