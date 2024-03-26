"use strict";(self.webpackChunkZenTech=self.webpackChunkZenTech||[]).push([[901],{2901:($,O,l)=>{l.r(O),l.d(O,{UsuariosModule:()=>pt});var T=l(6814),Y=l(5592),f=l(490),e=l(9291),n=l(6434),F=l(9862),U=l(5619),N=l(9397),L=l(2096),u=l(2832),C=l(5219);class y{constructor(){this.id=0,this.perfilAcesso=void 0,this.perfilAcesso_Id=void 0,this.name="",this.email="",this.telefoneCelular="",this.empresa_Id=0}}var R=[{field:"id",header:"Id",maskType:u.O.undefined,filterType:u.vA.text,filterDisplay:u.w2.menu,showAddButton:!1,showMatchMode:!1,showOperator:!1,filterMatchMode:C.a6.EQUALS},{field:"name",header:"Nome",filterType:u.vA.text,filterDisplay:u.w2.menu,maskType:u.O.substring,substringLength:22,showAddButton:!1,showMatchMode:!1,showOperator:!1,filterMatchMode:C.a6.CONTAINS},{field:"email",header:"E-mail",filterType:u.vA.text,filterDisplay:u.w2.menu,maskType:u.O.substring,substringLength:30,showAddButton:!1,showMatchMode:!1,showOperator:!1,filterMatchMode:C.a6.CONTAINS},{field:"telefoneCelular",header:"Telefone/Celular",filterType:u.vA.text,filterDisplay:u.w2.menu,maskType:u.O.undefined,showAddButton:!1,showMatchMode:!1,showOperator:!1,filterMatchMode:C.a6.CONTAINS},{field:"perfilAcesso.perfil",header:"Tipo de Acesso",maskType:u.O.options,filterType:u.vA.text,filterDisplay:u.w2.menu,showAddButton:!1,showMatchMode:!1,showOperator:!1,filterMatchMode:C.a6.EQUALS,values:[{value:"Admin",output:"Admin",class:"flag-yellow"},{value:"Master",output:"Master",class:"flag-info"},{value:"Consultor",output:"Consultor",class:"flag-warning"}]},{field:"ativo",header:"Ativo",maskType:u.O.options,filterType:u.vA.text,filterDisplay:u.w2.menu,showAddButton:!1,showMatchMode:!1,showOperator:!1,filterMatchMode:C.a6.EQUALS,values:[{value:!0,output:"Ativo",class:"flag-green"},{value:!1,output:"Inativo",class:"flag-danger"}]}],j=l(553),J=l(697),D=l(8787),m=l(2425),A=l(2667),p=l(5038);let _=(()=>{class i{constructor(t,s,o,a,c,E){this.table=t,this.http=s,this.toastr=o,this.crypto=a,this.accountService=c,this.empresaService=E,this.url=j.N.url,this.list=new U.X([]),this.objeto=new U.X(void 0),this.account=new J.mR,this.perfilAcesso=new U.X([]),this.loading=new U.X(!1),this.accountService.account.subscribe(S=>this.account=S??new J.mR)}getObject(){var t=localStorage.getItem("usuario");return t&&this.setObject(this.crypto.decrypt(t)??new y),this.objeto}setObject(t){localStorage.setItem("usuario",this.crypto.encrypt(t)??""),this.objeto.next(t)}getList(t=!1){this.loading.next(t),this.table.loading.next(!0);var s=this.empresaService.getEmpresa().value.id;return this.http.get(`${this.url}/usuario/list/${s}`).pipe((0,N.b)({next:o=>(o=o.map(a=>(a.ativo=!a.dataDesativado,a)),this.list.next(o),this.loading.next(!1),(0,L.of)(o)),error:o=>this.toastr.error("N\xe3o foi poss\xedvel carregar usu\xe1rios."),finalize:()=>{this.loading.next(!1),this.table.loading.next(!1)}}))}get(t){return this.http.get(`${this.url}/usuario/${t}`,{headers:new F.WM({loading:"true"})})}getPerfilAcesso(){return this.http.get(`${this.url}/perfilAcesso/getAll`).pipe((0,N.b)({next:t=>(this.perfilAcesso.next(t),t),error:t=>this.toastr.error("N\xe3o foi poss\xedvel carregar perfil.")}))}create(t){return t.empresa_Id=this.empresaService.getEmpresa().value.id,this.http.post(`${this.url}/usuario`,t)}edit(t){return this.http.put(`${this.url}/usuario`,t)}delete(t){return this.http.delete(`${this.url}/usuario/${t}`)}deactivated(t,s){return this.http.patch(`${this.url}/usuario/${t}/${s}`,{})}resetPassword(t){return this.http.patch(`${this.url}/usuario/reset-password/${t}`,{})}static#e=this.\u0275fac=function(s){return new(s||i)(e.LFG(D.i),e.LFG(F.eN),e.LFG(m._W),e.LFG(A.w),e.LFG(n.B),e.LFG(p.P))};static#t=this.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var d=l(132);let v=(()=>{class i{constructor(t,s,o,a){this.accountService=t,this.userService=s,this.router=o,this.toastr=a}canActivate(t,s){return new Y.y(o=>{this.userService.objeto.subscribe(a=>{var c=this.accountService.accountValue;o.next(c?.perfilAcesso_Id!=f.uU.Master||a?.perfilAcesso_Id!=f.uU.Admin)})})}static#e=this.\u0275fac=function(s){return new(s||i)(e.LFG(n.B),e.LFG(_),e.LFG(d.F0),e.LFG(m._W))};static#t=this.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var Z=l(5861),w=l(590),h=l(708),P=l(6599),M=l(9901),x=l(5597);function z(i,r){1&i&&e._UZ(0,"span",12)}const X=function(){return["cadastrar"]};function k(i,r){1&i&&(e.TgZ(0,"div",13)(1,"a",14)(2,"span",15),e._uU(3," Cadastrar Usu\xe1rio"),e.qZA()()()),2&i&&(e.xp6(1),e.Q6J("routerLink",e.DdM(1,X)))}let ee=(()=>{class i{constructor(t,s,o,a){var c=this;this.table=t,this.userService=s,this.accountService=o,this.empresaService=a,this.faUsers=w.FVb,this.list=[],this.tableLinks=[],this.columns=R,this.subscription=[],this.loading=!1;var E=this.userService.list.subscribe(g=>this.list=Object.assign([],g));this.subscription.push(E);var S=this.userService.loading.subscribe(g=>this.loading=g);this.subscription.push(S);var q=this.empresaService.getEmpresa().subscribe(function(){var g=(0,Z.Z)(function*(Q){c.empresaSelected=Q.empresa,Q&&Q.id&&(yield(0,h.n)(c.userService.getList(!0)))});return function(Q){return g.apply(this,arguments)}}());this.subscription.push(q),(0,h.n)(this.userService.getList(!0));var B=this.table.selected.subscribe(g=>{g&&(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]},{label:g.ativo?"Desabilitar":"Habilitar",routePath:[g.ativo?"desabilitar":"habilitar"],paramsFieldName:["id"]},{label:"Resetar senha",routePath:["reset-password"],paramsFieldName:["id"]}],1==this.accountService.accountValue?.perfilAcesso_Id&&this.tableLinks.push({label:"Excluir",routePath:["excluir"],paramsFieldName:["id"]}),this.tableLinks=this.table.encryptParams(this.tableLinks))});this.subscription.push(B)}ngOnDestroy(){this.subscription.forEach(t=>t.unsubscribe())}getList(){(0,h.n)(this.userService.getList(!0))}static#e=this.\u0275fac=function(s){return new(s||i)(e.Y36(D.i),e.Y36(_),e.Y36(n.B),e.Y36(p.P))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-list"]],decls:17,vars:13,consts:[[1,"page"],[1,"page__header"],[1,"title-icon","align-items-center"],[3,"icon"],[1,"me-auto"],[1,"page__header-title"],[1,"ms-auto","mt-auto",2,"margin-bottom","7px"],[1,"btn","btn-dark",3,"disabled","click"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"page__body"],["topActions",""],[3,"list","topActions","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"],[1,"spinner-border","spinner-border-sm","me-1"],[1,"col-xl-4","col-lg-4","col-md-4","col-sm-6","col-12","mb-2","me-md-2","mx-md-1","px-0","ng-star-inserted"],[1,"btn","btn-primary","d-flex","align-items-center","align-baseline","justify-content-center","me-md-0","me-sm-1",3,"routerLink"],[2,"margin-top","-1px","margin-bottom","1px"]],template:function(s,o){if(1&s&&(e.TgZ(0,"section",0)(1,"div",1)(2,"span",2),e._UZ(3,"fa-icon",3),e.qZA(),e.TgZ(4,"div",4)(5,"h3",5),e._uU(6,"Usu\xe1rios"),e.qZA()(),e.TgZ(7,"div",6)(8,"button",7),e.NdJ("click",function(){return o.getList()}),e.YNc(9,z,1,0,"span",8),e._uU(10,"Atualizar"),e.qZA()(),e._UZ(11,"app-empresa-selected"),e.qZA(),e.TgZ(12,"div",9),e.YNc(13,k,4,2,"ng-template",null,10,e.W1O),e._UZ(15,"app-list-shared",11),e.qZA()(),e._UZ(16,"router-outlet")),2&s){const a=e.MAs(14);e.xp6(3),e.Q6J("icon",o.faUsers),e.xp6(5),e.Q6J("disabled",o.loading),e.xp6(1),e.Q6J("ngIf",o.loading),e.xp6(6),e.Q6J("list",o.list)("topActions",a)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",!0)("columns",o.columns)("tableLinks",o.tableLinks)("selectable",!0)}},dependencies:[T.O5,d.lC,d.rH,P.o,M.j,x.BN]})}return i})();var I=l(2855),V=l(342),b=l(6223),H=l(2352);const te=["template"],ie=["icon"];function se(i,r){if(1&i&&e._UZ(0,"fa-icon",2),2&i){const t=e.oxw();e.Q6J("icon",t.faUser)}}function oe(i,r){1&i&&(e.TgZ(0,"p",9),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function ae(i,r){1&i&&(e.TgZ(0,"span"),e._uU(1,"Remova os espa\xe7os antes e depois do texto."),e.qZA())}function ne(i,r){if(1&i&&(e.TgZ(0,"p",9),e.YNc(1,ae,2,0,"span",12),e.qZA()),2&i){e.oxw(2);const t=e.MAs(10);e.xp6(1),e.Q6J("ngIf","^\\S(.*\\S)?$"==t.errors.pattern.requiredPattern)}}function re(i,r){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,oe,2,0,"p",27),e.YNc(2,ne,2,1,"p",27),e.qZA()),2&i){e.oxw();const t=e.MAs(10);e.xp6(1),e.Q6J("ngIf",t.errors.required),e.xp6(1),e.Q6J("ngIf",t.errors.pattern)}}function le(i,r){1&i&&(e.TgZ(0,"p",9),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function ce(i,r){1&i&&(e.TgZ(0,"p",9),e._uU(1,"Telefone/celular inv\xe1lido"),e.qZA())}function pe(i,r){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,le,2,0,"p",27),e.YNc(2,ce,2,0,"p",27),e.qZA()),2&i){e.oxw();const t=e.MAs(18);e.xp6(1),e.Q6J("ngIf",t.errors.required),e.xp6(1),e.Q6J("ngIf",t.errors.mask)}}function de(i,r){if(1&i&&(e.TgZ(0,"option",28),e._uU(1),e.qZA()),2&i){const t=r.$implicit;e.Q6J("ngValue",t.id)("disabled",t.disabled),e.xp6(1),e.Oqu(t.perfil)}}function ue(i,r){1&i&&(e.TgZ(0,"p",9),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function me(i,r){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,ue,2,0,"p",27),e.qZA()),2&i){e.oxw();const t=e.MAs(26);e.xp6(1),e.Q6J("ngIf",t.errors.required)}}function _e(i,r){if(1&i&&(e.TgZ(0,"div",33)(1,"div",34)(2,"p",35),e._uU(3),e.qZA(),e.TgZ(4,"p",35)(5,"strong"),e._uU(6,"C\xf3digo:"),e.qZA(),e._uU(7),e.qZA()()()),2&i){const t=r.$implicit;e.xp6(3),e.Oqu(t.nome),e.xp6(4),e.hij(" ",t.codigoRegistro,"")}}function he(i,r){1&i&&(e.TgZ(0,"p",9),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function fe(i,r){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,he,2,0,"p",27),e.qZA()),2&i){e.oxw();const t=e.MAs(6);e.xp6(1),e.Q6J("ngIf",t.errors.required)}}const ge=function(){return["nome","codigoRegistro","socioDiretor","ativo"]};function ve(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"div",7)(1,"label",29),e._uU(2,"Empresa: "),e.TgZ(3,"span",9),e._uU(4,"*"),e.qZA()(),e.TgZ(5,"p-dropdown",30,31),e.NdJ("ngModelChange",function(o){e.CHM(t);const a=e.oxw(2);return e.KtG(a.objeto.empresa_Id=o)}),e.YNc(7,_e,8,2,"ng-template",32),e.qZA(),e.YNc(8,fe,2,1,"div",12),e.qZA()}if(2&i){const t=e.MAs(6),s=e.oxw(2);e.xp6(5),e.Q6J("styleClass","form-control "+(s.loadingEmpresas?"form-control-loading":""))("options",s.empresas)("ngModel",s.objeto.empresa_Id)("placeholder","Selecione")("disabled",s.loadingEmpresas)("filter",!0)("filterFields",e.DdM(10,ge))("showClear",!0)("required",!0),e.xp6(3),e.Q6J("ngIf",t.touched&&t.errors)}}function xe(i,r){1&i&&(e.TgZ(0,"p",9),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function be(i,r){1&i&&(e.TgZ(0,"p",9),e._uU(1,"E-mail inv\xe1lido"),e.qZA())}function Te(i,r){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,xe,2,0,"p",27),e.YNc(2,be,2,0,"p",27),e.qZA()),2&i){e.oxw();const t=e.MAs(38);e.xp6(1),e.Q6J("ngIf",t.errors.required),e.xp6(1),e.Q6J("ngIf",t.errors.email)}}function Ae(i,r){if(1&i&&(e.TgZ(0,"p",9),e._uU(1),e.ALo(2,"json"),e.qZA()),2&i){const t=r.$implicit;e.xp6(1),e.Oqu(e.lcZ(2,1,t))}}function Ze(i,r){1&i&&(e.TgZ(0,"p",9),e._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar"),e.qZA())}function Ce(i,r){if(1&i&&(e.TgZ(0,"div",40),e.YNc(1,Ae,3,3,"p",41),e.YNc(2,Ze,2,0,"p",27),e.qZA()),2&i){e.oxw(2);const t=e.MAs(1),s=e.oxw();e.xp6(1),e.Q6J("ngForOf",s.erro),e.xp6(1),e.Q6J("ngIf",t.invalid&&0==s.erro.length)}}function Ee(i,r){1&i&&e._UZ(0,"span",42)}function Me(i,r){if(1&i&&(e.TgZ(0,"div",36),e.YNc(1,Ce,3,2,"div",37),e.TgZ(2,"button",38),e.YNc(3,Ee,1,0,"span",39),e.TgZ(4,"span"),e._uU(5,"Salvar"),e.qZA()()()),2&i){e.oxw();const t=e.MAs(1),s=e.oxw();e.xp6(1),e.Q6J("ngIf",s.erro||t.invalid),e.xp6(1),e.Q6J("disabled",t.invalid||s.loading||!s.podeEditar),e.xp6(1),e.Q6J("ngIf",s.loading)}}function Ie(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"form",3,4),e.NdJ("ngSubmit",function(){e.CHM(t);const o=e.MAs(1),a=e.oxw();return e.KtG(a.send(o))}),e.TgZ(2,"div",5)(3,"div",6)(4,"div",7)(5,"label",8),e._uU(6,"Nome: "),e.TgZ(7,"span",9),e._uU(8,"*"),e.qZA()(),e.TgZ(9,"input",10,11),e.NdJ("ngModelChange",function(o){e.CHM(t);const a=e.oxw();return e.KtG(a.objeto.name=o)})("change",function(){e.CHM(t);const o=e.MAs(10),a=e.oxw();return e.KtG(a.objeto.name=o.value.trim().toUpperCase())}),e.qZA(),e.YNc(11,re,3,2,"div",12),e.qZA(),e.TgZ(12,"div",7)(13,"label",13),e._uU(14,"Telefone/Celular: "),e.TgZ(15,"span",9),e._uU(16,"*"),e.qZA()(),e.TgZ(17,"input",14,15),e.NdJ("ngModelChange",function(o){e.CHM(t);const a=e.oxw();return e.KtG(a.objeto.telefoneCelular=o)}),e.qZA(),e.YNc(19,pe,3,2,"div",12),e.qZA(),e.TgZ(20,"div")(21,"label",16),e._uU(22,"Perfil: "),e.TgZ(23,"span",9),e._uU(24,"*"),e.qZA()(),e.TgZ(25,"select",17,18),e.NdJ("ngModelChange",function(o){e.CHM(t);const a=e.oxw();return e.KtG(a.objeto.perfilAcesso_Id=o)}),e.TgZ(27,"option",19),e._uU(28,"Selecione"),e.qZA(),e.YNc(29,de,2,3,"option",20),e.qZA(),e.YNc(30,me,2,1,"div",12),e.qZA(),e.YNc(31,ve,9,11,"div",21),e.TgZ(32,"div",22)(33,"label",23),e._uU(34,"E-mail: "),e.TgZ(35,"span",9),e._uU(36,"*"),e.qZA()(),e.TgZ(37,"input",24,25),e.NdJ("ngModelChange",function(o){e.CHM(t);const a=e.oxw();return e.KtG(a.objeto.email=o)}),e.qZA(),e.YNc(39,Te,3,2,"div",12),e.qZA()(),e.TgZ(40,"div",6),e.YNc(41,Me,6,3,"div",26),e.qZA()()()}if(2&i){const t=e.MAs(10),s=e.MAs(18),o=e.MAs(26),a=e.MAs(38),c=e.oxw();e.xp6(9),e.Q6J("ngModel",c.objeto.name)("disabled",!c.podeEditar),e.xp6(2),e.Q6J("ngIf",t.touched&&t.errors),e.xp6(6),e.Q6J("ngModel",c.objeto.telefoneCelular)("disabled",!c.podeEditar),e.xp6(2),e.Q6J("ngIf",s.touched&&s.errors),e.xp6(1),e.Tol(1==(null==c.account?null:c.account.perfilAcesso_Id)&&c.isEditPage?"form-group col-xl-6 col-lg-4 col-md-6 col-sm-6 col-12":"col-12"),e.xp6(5),e.Q6J("ngModel",c.objeto.perfilAcesso_Id)("disabled",!c.podeEditar),e.xp6(2),e.Q6J("ngValue",void 0),e.xp6(2),e.Q6J("ngForOf",c.perfil),e.xp6(1),e.Q6J("ngIf",o.touched&&o.errors),e.xp6(1),e.Q6J("ngIf",1==(null==c.account?null:c.account.perfilAcesso_Id)&&c.isEditPage),e.xp6(6),e.Q6J("email",!0)("ngModel",c.objeto.email)("readonly",c.isEditPage)("pattern",c.emailPattern)("disabled",!c.podeEditar),e.xp6(2),e.Q6J("ngIf",a.touched&&a.errors),e.xp6(2),e.Q6J("ngIf",c.podeEditar)}}let W=(()=>{class i{constructor(t,s,o,a,c,E,S){this.usuarioService=t,this.accountService=s,this.empresaService=o,this.modalService=a,this.activatedRoute=c,this.crypto=E,this.toastr=S,this.faUser=w.ILF,this.objeto=new y,this.loading=!1,this.erro="",this.isEditPage=!1,this.empresas=[],this.loadingEmpresas=!1,this.perfil=[],this.subscription=[],this.emailPattern=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,this.modal=new I.u,this.podeEditar=!0,this.perfil=f.JH,this.account=this.accountService.accountValue;var q=this.empresaService.getEmpresa().subscribe(g=>{this.perfil=[{id:1,perfil:"Admin",disabled:this.account?.perfilAcesso_Id!=f.uU.Admin||27!=g.id},{id:2,perfil:"Master",disabled:!1},{id:3,perfil:"Consultor",disabled:!1}]});this.subscription.push(q),0==this.empresaService.list.value.length&&(this.loadingEmpresas=!0,(0,h.n)(this.empresaService.getList()).then(g=>{this.loadingEmpresas=!1}));var B=this.empresaService.list.subscribe(g=>this.empresas=g);this.subscription.push(B)}ngOnDestroy(){this.subscription.forEach(t=>t.unsubscribe())}ngAfterViewInit(){var t=this;return(0,Z.Z)(function*(){t.modal.id=0,t.modal.template=t.template,t.modal.icon=t.icon,t.modal.style={"max-width":"500px",overflow:"visible"},t.modal.activatedRoute=t.activatedRoute,t.modal.routerBackOptions={relativeTo:t.activatedRoute};var s=t.activatedRoute.params.subscribe(o=>{o.usuario_id?(t.objeto.id=t.crypto.decrypt(o.usuario_id),t.modal.title="Editar Usu\xe1rio",t.modal.routerBack=["../../"],t.isEditPage=!0,(0,h.n)(t.usuarioService.get(t.objeto.id)).then(a=>{t.objeto=a,t.account?.perfilAcesso_Id==f.uU.Master&&a.perfilAcesso_Id==f.uU.Admin&&(t.podeEditar=!1,t.toastr.info("Voc\xea n\xe3o tem permiss\xe3o para editar uma conta administradora.")),setTimeout(()=>{t.modal=t.modalService.addModal(t.modal,"usuario")},200)}).catch(a=>{t.voltar()})):(t.modal.title="Cadastrar Usu\xe1rio",t.modal.routerBack=["../"],t.isEditPage=!1,setTimeout(()=>{t.modal=t.modalService.addModal(t.modal,"usuario")},200))});t.subscription.push(s)})()}voltar(){this.modalService.removeModal(this.modal)}send(t){var s=this;this.loading=!0,this.erro="",this.request().then(function(){var o=(0,Z.Z)(function*(a){yield(0,h.n)(s.usuarioService.getList()),s.voltar()});return function(a){return o.apply(this,arguments)}}()).catch(o=>{this.erro=(0,V.b)(o)}).finally(()=>this.loading=!1)}request(){return(0,h.n)(0==this.objeto.id?this.usuarioService.create(this.objeto):this.usuarioService.edit(this.objeto))}static#e=this.\u0275fac=function(s){return new(s||i)(e.Y36(_),e.Y36(n.B),e.Y36(p.P),e.Y36(I.Z),e.Y36(d.gz),e.Y36(A.w),e.Y36(m._W))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-form"]],viewQuery:function(s,o){if(1&s&&(e.Gf(te,5),e.Gf(ie,5)),2&s){let a;e.iGM(a=e.CRH())&&(o.template=a.first),e.iGM(a=e.CRH())&&(o.icon=a.first)}},decls:5,vars:0,consts:[["icon",""],["template",""],[3,"icon"],[3,"ngSubmit"],["form","ngForm"],[1,"px-2"],[1,"row"],[1,"form-group","col-xl-6","col-lg-4","col-md-6","col-sm-6","col-12"],["for","name"],[1,"text-danger"],["type","text","name","name","id","name","required","","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","disabled","ngModelChange","change"],["name","ngModel"],[4,"ngIf"],["for","telefoneCelular"],["type","text","name","telefoneCelular","id","telefoneCelular","required","",1,"form-control",3,"ngModel","disabled","ngModelChange"],["telefoneCelular","ngModel"],["for","perfilAcesso_Id"],["name","perfilAcesso_Id","id","perfilAcesso_Id","required","",1,"form-control",3,"ngModel","disabled","ngModelChange"],["perfilAcesso_Id","ngModel"],[3,"ngValue"],[3,"ngValue","disabled",4,"ngFor","ngForOf"],["class","form-group col-xl-6 col-lg-4 col-md-6 col-sm-6 col-12",4,"ngIf"],[1,"form-group","col","email-container"],["for","email"],["type","email","name","email","id","email","placeholder","example@hotmail.com","required","",1,"form-control",3,"email","ngModel","readonly","pattern","disabled","ngModelChange"],["email","ngModel"],["class","d-flex align-items-start flex-wrap mt-2 mb-1",4,"ngIf"],["class","text-danger",4,"ngIf"],[3,"ngValue","disabled"],["for","empresa_Id"],["optionLabel","nome","optionValue","id","name","empresa_Id","id","empresa_Id","appendTo","body",3,"styleClass","options","ngModel","placeholder","disabled","filter","filterFields","showClear","required","ngModelChange"],["empresa_Id","ngModel"],["pTemplate","item"],[1,"d-flex","justify-content-between"],[1,"w-100"],[1,"text-ellipsis"],[1,"d-flex","align-items-start","flex-wrap","mt-2","mb-1"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","me-0","ms-auto",3,"disabled"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"m-0"],["class","text-danger",4,"ngFor","ngForOf"],[1,"spinner-border","spinner-border-sm","me-1"]],template:function(s,o){1&s&&(e.YNc(0,se,1,1,"ng-template",null,0,e.W1O),e.YNc(2,Ie,42,21,"ng-template",null,1,e.W1O),e._UZ(4,"router-outlet"))},dependencies:[T.sg,T.O5,d.lC,C.jx,x.BN,b._Y,b.YN,b.Kr,b.Fj,b.EJ,b.JJ,b.JL,b.Q7,b.c5,b.on,b.On,b.F,H.Lt,T.Ts]})}return i})();const Se=["template"],Ue=["icon"];function ye(i,r){if(1&i&&e._UZ(0,"fa-icon",2),2&i){const t=e.oxw();e.Q6J("icon",t.faTrash)}}function we(i,r){if(1&i&&(e.TgZ(0,"div",8),e._UZ(1,"p",9),e.qZA()),2&i){const t=e.oxw(2);e.xp6(1),e.Q6J("innerHTML",t.erro,e.oJD)}}function Oe(i,r){1&i&&e._UZ(0,"span",10)}function Ye(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"div")(1,"p",3),e._uU(2,"Tem certeza que deseja excluir esse registro? Ele n\xe3o poder\xe1 ser recuperado."),e.qZA(),e.TgZ(3,"p"),e._uU(4,"O usu\xe1rio n\xe3o ter\xe1 acesso mais \xe0 plataforma."),e.qZA(),e.TgZ(5,"p",4),e._uU(6,"Obs.: Se esse usu\xe1rio estiver relacionado a um outro registro, n\xe3o poder\xe1 ser exclu\xeddo."),e.qZA(),e.YNc(7,we,2,1,"div",5),e.TgZ(8,"button",6),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.send())}),e.YNc(9,Oe,1,0,"span",7),e.TgZ(10,"span"),e._uU(11,"Excluir"),e.qZA()()()}if(2&i){const t=e.oxw();e.xp6(7),e.Q6J("ngIf",t.erro),e.xp6(2),e.Q6J("ngIf",t.loading)}}let Fe=(()=>{class i{constructor(t,s,o,a){this.activatedRoute=t,this.modalService=s,this.usuarioService=o,this.crypto=a,this.faTrash=w.$aW,this.id=0,this.erro="",this.loading=!1,this.subscription=[],this.modal=new I.u}ngAfterViewInit(){this.modal.id=0,this.modal.template=this.template,this.modal.icon=this.icon,this.modal.style={"max-width":"400px",overflow:"visible"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute},this.modal.routerBack=["../../"],this.modal.title="Excluir registro";var t=this.activatedRoute.params.subscribe(s=>{if(s.usuario_id)try{this.id=this.crypto.decrypt(s.usuario_id),setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"delete usuario")},200)}catch{this.voltar()}else this.voltar()});this.subscription.push(t)}ngOnDestroy(){this.subscription.forEach(t=>t.unsubscribe())}voltar(){this.modalService.removeModal(this.modal)}send(){this.loading=!0,this.erro="",(0,h.n)(this.usuarioService.delete(this.id)).then(t=>{this.loading=!1,(0,h.n)(this.usuarioService.getList()),this.voltar()}).catch(t=>{this.loading=!1,this.erro=(0,V.b)(t)})}static#e=this.\u0275fac=function(s){return new(s||i)(e.Y36(d.gz),e.Y36(I.Z),e.Y36(_),e.Y36(A.w))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-delete"]],viewQuery:function(s,o){if(1&s&&(e.Gf(Se,5),e.Gf(Ue,5)),2&s){let a;e.iGM(a=e.CRH())&&(o.template=a.first),e.iGM(a=e.CRH())&&(o.icon=a.first)}},decls:4,vars:0,consts:[["icon",""],["template",""],[3,"icon"],[1,"mt-2"],[1,"text-info"],["class","m-0  mt-1",4,"ngIf"],[1,"btn","btn-grey","ms-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"m-0","mt-1"],[1,"text-danger",3,"innerHTML"],[1,"spinner-border","spinner-border-sm","me-1"]],template:function(s,o){1&s&&(e.YNc(0,ye,1,1,"ng-template",null,0,e.W1O),e.YNc(2,Ye,12,2,"ng-template",null,1,e.W1O))},dependencies:[T.O5,x.BN]})}return i})();var Ne=l(7280),Je=l(9336);const De=["template"],Qe=["icon"];function Le(i,r){if(1&i&&e._UZ(0,"fa-icon",2),2&i){const t=e.oxw();e.Q6J("icon",t.faKey)}}function Re(i,r){1&i&&(e.TgZ(0,"div")(1,"p"),e._uU(2,"Tem certeza que deseja resetar sua senha?"),e.qZA(),e.TgZ(3,"p",7)(4,"small"),e._uU(5,"Voc\xea receber\xe1 um email com o link de altera\xe7\xe3o de senha."),e.qZA()(),e.TgZ(6,"p"),e._uU(7,"Ao resetar sua senha, voc\xea ser\xe1 automaticamente deslogado para realizar novo login."),e.qZA()())}function je(i,r){1&i&&(e.TgZ(0,"div")(1,"p"),e._uU(2,"Tem certeza que deseja resetar a senha desse usu\xe1rio? "),e.qZA(),e.TgZ(3,"p",7)(4,"small"),e._uU(5,"Esse usu\xe1rio receber\xe1 um email com o link de altera\xe7\xe3o de senha."),e.qZA()()())}function Pe(i,r){if(1&i&&(e.TgZ(0,"p",7),e._uU(1),e.qZA()),2&i){const t=e.oxw(3);e.xp6(1),e.Oqu(t.erro)}}function qe(i,r){1&i&&e._UZ(0,"span",8)}function Be(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"div"),e.YNc(1,Re,8,0,"div",3),e.YNc(2,je,6,0,"div",3),e.YNc(3,Pe,2,1,"p",4),e.TgZ(4,"button",5),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2);return e.KtG(o.send())}),e.YNc(5,qe,1,0,"span",6),e.TgZ(6,"span"),e._uU(7," Resetar"),e.qZA()()()}if(2&i){const t=e.oxw(2);e.xp6(1),e.Q6J("ngIf",(null==t.userLogado?null:t.userLogado.email)==t.objeto.email),e.xp6(1),e.Q6J("ngIf",(null==t.userLogado?null:t.userLogado.email)!=t.objeto.email),e.xp6(1),e.Q6J("ngIf",t.erro),e.xp6(2),e.Q6J("ngIf",t.loading)}}function Ge(i,r){1&i&&(e.TgZ(0,"div")(1,"p",7),e._uU(2,"Voc\xea n\xe3o tem permiss\xe3o para resetar a senha de uma conta administradora."),e.qZA()())}function Ve(i,r){if(1&i&&(e.YNc(0,Be,8,4,"div",3),e.YNc(1,Ge,3,0,"div",3)),2&i){const t=e.oxw();e.Q6J("ngIf",t.podeResetar),e.xp6(1),e.Q6J("ngIf",!t.podeResetar)}}let He=(()=>{class i{constructor(t,s,o,a,c,E,S){this.activatedRoute=t,this.usuarioService=s,this.accountService=o,this.crypto=a,this.toastr=c,this.modalService=E,this.alertService=S,this.faKey=w.DD4,this.objeto=new y,this.loading=!1,this.erro="",this.subscription=[],this.modal=new I.u,this.podeResetar=!0}ngOnDestroy(){this.subscription.forEach(t=>t.unsubscribe())}ngAfterViewInit(){this.modal.id=0,this.modal.template=this.template,this.modal.icon=this.icon,this.modal.style={"max-width":"500px",overflow:"visible"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute},this.modal.title="Resetar Senha",this.modal.routerBack=["../../"];var t=this.activatedRoute.params.subscribe(s=>{s.usuario_id?(this.objeto.id=this.crypto.decrypt(s.usuario_id),(0,h.n)(this.usuarioService.get(this.objeto.id)).then(o=>{this.objeto=o;var a=this.accountService.accountValue;a?.perfilAcesso_Id==f.uU.Master&&o.perfilAcesso_Id==f.uU.Admin&&(this.toastr.info("Voc\xea n\xe3o tem permiss\xe3o para resetar a senha de uma conta administradora."),this.erro="Voc\xea n\xe3o tem permiss\xe3o para resetar a senha de uma conta administradora.",this.podeResetar=!1),setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"usuario")},200)}).catch(o=>{this.voltar()})):this.voltar()});this.subscription.push(t)}voltar(){this.modalService.removeModal(this.modal)}send(){this.loading=!0,(0,h.n)(this.usuarioService.resetPassword(this.objeto.id)).then(t=>{this.voltar(),this.toastr.success("Opera\xe7\xe3o conclu\xedda com sucesso"),this.alertService.success("O usu\xe1rio deve verificar a caixa de e-mail para seguir as instru\xe7\xf5es."),this.objeto.email==this.userLogado?.email&&this.accountService.logout()}).catch().finally(()=>this.loading=!1)}static#e=this.\u0275fac=function(s){return new(s||i)(e.Y36(d.gz),e.Y36(_),e.Y36(n.B),e.Y36(A.w),e.Y36(m._W),e.Y36(I.Z),e.Y36(Je.c))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-reset-password"]],viewQuery:function(s,o){if(1&s&&(e.Gf(De,5),e.Gf(Qe,5)),2&s){let a;e.iGM(a=e.CRH())&&(o.template=a.first),e.iGM(a=e.CRH())&&(o.icon=a.first)}},decls:5,vars:0,consts:[["icon",""],["template",""],[3,"icon"],[4,"ngIf"],["class","text-danger",4,"ngIf"],[1,"btn","btn-grey","ms-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","me-1"]],template:function(s,o){1&s&&(e.YNc(0,Le,1,1,"ng-template",null,0,e.W1O),e.YNc(2,Ve,2,2,"ng-template",null,1,e.W1O),e._UZ(4,"router-outlet"))},dependencies:[T.O5,d.lC,x.BN]})}return i})();const We=["template"];function Ke(i,r){1&i&&(e.TgZ(0,"span",7),e._uU(1,"habilitar"),e.qZA())}function $e(i,r){1&i&&(e.TgZ(0,"span",7),e._uU(1,"desabilitar"),e.qZA())}function ze(i,r){1&i&&(e.TgZ(0,"p",8),e._uU(1,"Voc\xea automaticamente ser\xe1 deslogado e n\xe3o poder\xe1 acessar o Planner."),e.qZA())}function Xe(i,r){1&i&&(e.TgZ(0,"p",8),e._uU(1,"Ap\xf3s isso, o usu\xe1rio n\xe3o poder\xe1 acessar o Planner."),e.qZA())}function ke(i,r){if(1&i&&(e.TgZ(0,"p",8),e._uU(1),e.qZA()),2&i){const t=e.oxw(3);e.xp6(1),e.Oqu(t.erro)}}function et(i,r){1&i&&e._UZ(0,"span",9)}function tt(i,r){1&i&&(e.TgZ(0,"span"),e._uU(1,"Desabilitar"),e.qZA())}function it(i,r){1&i&&(e.TgZ(0,"span"),e._uU(1,"Habilitar"),e.qZA())}function st(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"div")(1,"p"),e._uU(2,"Tem certeza que deseja "),e.YNc(3,Ke,2,0,"span",3),e.YNc(4,$e,2,0,"span",3),e._uU(5," esse registro? "),e.qZA(),e.YNc(6,ze,2,0,"p",4),e.YNc(7,Xe,2,0,"p",4),e.YNc(8,ke,2,1,"p",4),e.TgZ(9,"button",5),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2);return e.KtG(o.send())}),e.YNc(10,et,1,0,"span",6),e.YNc(11,tt,2,0,"span",1),e.YNc(12,it,2,0,"span",1),e.qZA()()}if(2&i){const t=e.oxw(2);e.xp6(3),e.Q6J("ngIf",t.habilitar),e.xp6(1),e.Q6J("ngIf",!t.habilitar),e.xp6(2),e.Q6J("ngIf",t.isUser&&t.habilitar&&t.objeto.email==(null==t.account?null:t.account.email)),e.xp6(1),e.Q6J("ngIf",t.isUser&&t.habilitar&&t.objeto.email!=(null==t.account?null:t.account.email)),e.xp6(1),e.Q6J("ngIf",t.erro),e.xp6(2),e.Q6J("ngIf",t.loading),e.xp6(1),e.Q6J("ngIf",!t.habilitar),e.xp6(1),e.Q6J("ngIf",t.habilitar)}}function ot(i,r){if(1&i&&(e.TgZ(0,"div",10)(1,"p",8),e._uU(2),e.qZA()()),2&i){const t=e.oxw(2);e.xp6(2),e.Oqu(t.erro)}}function at(i,r){if(1&i&&(e.YNc(0,st,13,8,"div",1),e.YNc(1,ot,3,1,"div",2)),2&i){const t=e.oxw();e.Q6J("ngIf",t.podeAtivar),e.xp6(1),e.Q6J("ngIf",!t.podeAtivar)}}let K=(()=>{class i{constructor(t,s,o,a,c,E){this.usuarioService=t,this.modalService=s,this.activatedRoute=o,this.crypto=a,this.accountService=c,this.toastr=E,this.objeto=new y,this.loading=!1,this.erro="",this.subscription=[],this.modal=new I.u,this.podeAtivar=!0,this.habilitar=!1,this.isUser=!1,this.account=this.accountService.accountValue}ngOnDestroy(){this.subscription.forEach(t=>t.unsubscribe())}ngAfterViewInit(){this.modal.id=0,this.modal.template=this.template,this.modal.style={"max-width":"400px",overflow:"visible"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute};var t=this.activatedRoute.params.subscribe(s=>{s.usuario_id?(this.objeto.id=this.crypto.decrypt(s.usuario_id),this.isUser=this.account?.id==this.objeto.id,this.modal.routerBack=["../../"],(0,h.n)(this.usuarioService.get(this.objeto.id)).then(o=>{this.objeto=o,this.habilitar=!(null==this.objeto.dataDesativado||null==this.objeto.dataDesativado),this.objeto.ativo=!this.habilitar;var a=this.accountService.accountValue;if(this.modal.title=this.habilitar?"Habilitar Usu\xe1rio":"Desabilitar Usu\xe1rio",a?.perfilAcesso_Id==f.uU.Master&&o.perfilAcesso_Id==f.uU.Admin){this.podeAtivar=!1;var c=this.habilitar?"habilitar":"desabilitar";this.toastr.info(`Voc\xea n\xe3o tem permiss\xe3o para ${c} uma conta administradora.`),this.erro=`Voc\xea n\xe3o tem permiss\xe3o para ${c} uma conta administradora.`}setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"usuario")},200)}).catch(o=>{this.voltar()})):this.voltar()});this.subscription.push(t)}voltar(){this.modalService.removeModal(this.modal)}send(){var t=this;this.loading=!0,this.erro="",(0,h.n)(this.usuarioService.deactivated(this.objeto.id,this.habilitar)).then(function(){var s=(0,Z.Z)(function*(o){!t.habilitar&&t.isUser&&t.accountService.logout(),yield(0,h.n)(t.usuarioService.getList()),t.voltar()});return function(o){return s.apply(this,arguments)}}()).finally(()=>this.loading=!1)}static#e=this.\u0275fac=function(s){return new(s||i)(e.Y36(_),e.Y36(I.Z),e.Y36(d.gz),e.Y36(A.w),e.Y36(n.B),e.Y36(m._W))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-deactivated"]],viewQuery:function(s,o){if(1&s&&e.Gf(We,5),2&s){let a;e.iGM(a=e.CRH())&&(o.template=a.first)}},decls:3,vars:0,consts:[["template",""],[4,"ngIf"],["class","mb-2",4,"ngIf"],["class","font-weight-bold",4,"ngIf"],["class","text-danger",4,"ngIf"],[1,"btn","btn-grey","ms-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"font-weight-bold"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","me-1"],[1,"mb-2"]],template:function(s,o){1&s&&(e.YNc(0,at,2,2,"ng-template",null,0,e.W1O),e._UZ(2,"router-outlet"))},dependencies:[T.O5,d.lC]})}return i})();var nt=l(9742);const rt=[{path:"",component:ee,children:[{path:"cadastrar",component:W,data:{modalOrder:1},title:"Zentech - Cadastrar usu\xe1rio"},{path:"editar/:usuario_id",component:W,data:{modalOrder:1},title:"Zentech - Editar usu\xe1rio",canActivate:[v]},{path:"excluir/:usuario_id",component:Fe,data:{modalOrder:1,roles:[f.uU.Admin,f.uU.Master]},title:"Zentech - Excluir usu\xe1rio",canActivate:[v,nt.p]},{path:"reset-password/:usuario_id",component:He,data:{modalOrder:1},title:"Zentech - Resetar senha",canActivate:[v]},{path:"habilitar/:usuario_id",component:K,data:{modalOrder:1},title:"Zentech - Habilitar usu\xe1rio",canActivate:[v]},{path:"desabilitar/:usuario_id",component:K,data:{modalOrder:1},title:"Zentech - Desabilitar usu\xe1rio",canActivate:[v]},Ne.D]}];let lt=(()=>{class i{static#e=this.\u0275fac=function(s){return new(s||i)};static#t=this.\u0275mod=e.oAB({type:i});static#i=this.\u0275inj=e.cJS({imports:[d.Bz.forChild(rt),d.Bz]})}return i})();var ct=l(5805);let pt=(()=>{class i{static#e=this.\u0275fac=function(s){return new(s||i)};static#t=this.\u0275mod=e.oAB({type:i});static#i=this.\u0275inj=e.cJS({imports:[T.ez,lt,ct.m,x.uH,b.u5,H.kW]})}return i})()},9901:($,O,l)=>{l.d(O,{j:()=>D});var T=l(5861),Y=l(708),f=l(490),e=l(5038),n=l(9291),F=l(6434),U=l(4939),N=l(8787),L=l(6814),u=l(6223),C=l(5219),y=l(2352);function G(m,A){if(1&m&&(n.TgZ(0,"span"),n._uU(1),n.qZA()),2&m){const p=n.oxw(3);n.xp6(1),n.Oqu(null==p.empresaSelected.empresa?null:p.empresaSelected.empresa.nome)}}function R(m,A){if(1&m&&n.YNc(0,G,2,1,"span",7),2&m){const p=n.oxw(2);n.Q6J("ngIf",p.empresaSelected.id)}}function j(m,A){if(1&m&&(n.TgZ(0,"p"),n._uU(1),n.qZA(),n.TgZ(2,"p"),n._uU(3),n.qZA()),2&m){const p=A.$implicit;n.xp6(1),n.Oqu(p.nome),n.xp6(2),n.Oqu(p.logo)}}function J(m,A){if(1&m){const p=n.EpF();n.TgZ(0,"div",1)(1,"label",2),n._uU(2,"Selecione a Empresa para carregar dados"),n.qZA(),n.TgZ(3,"p-dropdown",3,4),n.NdJ("ngModelChange",function(d){n.CHM(p);const v=n.oxw();return n.KtG(v.empresaChange(d))})("ngModelChange",function(d){n.CHM(p);const v=n.oxw();return n.KtG(v.empresaSelected.id=d)}),n.YNc(5,R,1,1,"ng-template",5),n.YNc(6,j,4,2,"ng-template",6),n.qZA()()}if(2&m){const p=n.oxw();n.xp6(3),n.Q6J("options",p.empresas)("ngModel",p.empresaSelected.id)("filter",!0)("showClear",!1)("required",!0)}}let D=(()=>{class m{constructor(p,_,d,v){var Z=this;this.empresaService=p,this.accountService=_,this.colors=d,this.table=v,this.empresaSelected=new e.I,this.empresas=[],this.loading=!1,this.Role=f.uU,this.subscription=[];var w=this.accountService.accountSubject.subscribe(function(){var M=(0,T.Z)(function*(x){Z.account=x,x&&(1==x.perfilAcesso_Id&&0==Z.empresaService.list.value.length&&(yield(0,Y.n)(Z.empresaService.getList())),(1!=x.perfilAcesso_Id||!Z.empresaService.getEmpresa().value.empresa)&&Z.empresaService.setEmpresa({id:x.empresa_Id,empresa:x.empresa}))});return function(x){return M.apply(this,arguments)}}());this.subscription.push(w);var h=this.empresaService.getEmpresa().subscribe(M=>{this.empresaSelected=M,this.table.selected.next(void 0),this.table.selectedItems.next([]),M&&this.setColorsJquery()});this.subscription.push(h);var P=this.empresaService.list.subscribe(M=>{this.empresas=M});this.subscription.push(P)}ngOnDestroy(){this.subscription.forEach(p=>p.unsubscribe())}empresaChange(p){var _=this;return(0,T.Z)(function*(){if(_.accountService.accountValue&&1==_.accountService.accountValue?.perfilAcesso_Id&&p){0==_.empresas.length&&(yield(0,Y.n)(_.empresaService.getList()));var d=_.empresas.find(v=>v.id==p);_.empresaService.setEmpresa({empresa:d,id:p})}})()}setColorsJquery(){this.colors.setColorsJquery(this.empresaSelected.empresa)}static#e=this.\u0275fac=function(_){return new(_||m)(n.Y36(e.P),n.Y36(F.B),n.Y36(U.w),n.Y36(N.i))};static#t=this.\u0275cmp=n.Xpm({type:m,selectors:[["app-empresa-selected"]],decls:1,vars:1,consts:[["class","form-group ms-2",4,"ngIf"],[1,"form-group","ms-2"],["for","empresa_Id"],["name","empresa_Id","id","empresa_Id","optionValue","id","filterBy","nome","styleClass","form-control","placeholder","Selecione uma empresa",3,"options","ngModel","filter","showClear","required","ngModelChange"],["empresa_Id","ngModel"],["pTemplate","selectedItem"],["pTemplate","item"],[4,"ngIf"]],template:function(_,d){1&_&&n.YNc(0,J,7,5,"div",0),2&_&&n.Q6J("ngIf",d.account&&1==(null==d.account?null:d.account.perfilAcesso_Id))},dependencies:[L.O5,u.JJ,u.Q7,u.On,C.jx,y.Lt]})}return m})()}}]);