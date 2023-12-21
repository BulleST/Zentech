"use strict";(self.webpackChunkZenTech=self.webpackChunkZenTech||[]).push([[290],{5891:(M,h,a)=>{a.d(h,{_l:()=>g,sK:()=>f});var m=a(5219),_=a(2832);class g{constructor(){this.id=0,this.nome="",this.cnpj=void 0,this.cidade_Id=void 0,this.logradouro="",this.numero="",this.cep=""}}var f=[{field:"nomeInstituicao",header:"Nome",maskType:_.O.undefined,filterType:_.vA.text,filterDisplay:_.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,showOperator:!1,filterMatchMode:m.a6.CONTAINS},{field:"cnpj",header:"CNPJ",maskType:_.O.cnpj,mask:"0000",filterType:_.vA.text,filterDisplay:_.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,showOperator:!1,filterMatchMode:m.a6.EQUALS},{field:"nomeCidade",header:"Cidade",maskType:_.O.undefined,filterType:_.vA.text,filterDisplay:_.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,showOperator:!1,filterMatchMode:m.a6.EQUALS},{field:"uf",header:"UF",maskType:_.O.undefined,filterType:_.vA.text,filterDisplay:_.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,showOperator:!1,filterMatchMode:m.a6.EQUALS}]},4290:(M,h,a)=>{a.d(h,{U:()=>ee});var m=a(5891),_=a(708),C=a(342),g=a(2855),v=a(6687),f=a(9411),e=a(9291),T=a(132),E=a(3977),x=a(2667),A=a(2425),Z=a(8487),P=a(5462),b=a(6814),c=a(6223),I=a(8839),F=a(2352);const j=["template"],O=["icon"],N=["cep"],J=["cnpj"];function S(o,l){1&o&&(e.TgZ(0,"span",3),e.O4$(),e.TgZ(1,"svg",4),e._UZ(2,"path",5),e.qZA()())}function U(o,l){1&o&&(e.TgZ(0,"p",12),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function w(o,l){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,U,2,0,"p",40),e.qZA()),2&o){e.oxw();const t=e.MAs(10);e.xp6(1),e.Q6J("ngIf",t.errors.required)}}function D(o,l){1&o&&(e.TgZ(0,"p",12),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function q(o,l){1&o&&(e.TgZ(0,"p",12),e._uU(1,"CNPJ inv\xe1lido."),e.qZA())}function y(o,l){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,D,2,0,"p",40),e.YNc(2,q,2,0,"p",40),e.qZA()),2&o){e.oxw();const t=e.MAs(18);e.xp6(1),e.Q6J("ngIf",t.errors.required),e.xp6(1),e.Q6J("ngIf",t.errors.mask||t.errors.invalid)}}function K(o,l){1&o&&(e.TgZ(0,"p",12),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function L(o,l){1&o&&(e.TgZ(0,"p",12),e._uU(1,"CEP inv\xe1lido."),e.qZA())}function Q(o,l){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,K,2,0,"p",40),e.YNc(2,L,2,0,"p",40),e.qZA()),2&o){e.oxw();const t=e.MAs(25);e.xp6(1),e.Q6J("ngIf",t.errors.required),e.xp6(1),e.Q6J("ngIf",t.errors.mask||t.errors.invalid)}}function R(o,l){1&o&&(e.TgZ(0,"p",12),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function B(o,l){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,R,2,0,"p",40),e.qZA()),2&o){e.oxw();const t=e.MAs(33);e.xp6(1),e.Q6J("ngIf",t.errors.required)}}function Y(o,l){1&o&&(e.TgZ(0,"p",12),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function H(o,l){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,Y,2,0,"p",40),e.qZA()),2&o){e.oxw();const t=e.MAs(41);e.xp6(1),e.Q6J("ngIf",t.errors.required)}}function W(o,l){1&o&&(e.TgZ(0,"p",12),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function G(o,l){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,W,2,0,"p",40),e.qZA()),2&o){e.oxw();const t=e.MAs(50);e.xp6(1),e.Q6J("ngIf",t.errors.required)}}function V(o,l){if(1&o&&(e.TgZ(0,"p",12),e._uU(1),e.qZA()),2&o){const t=e.oxw(3);e.xp6(1),e.Oqu(t.erro)}}function z(o,l){1&o&&(e.TgZ(0,"p",12),e._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar."),e.qZA())}function X(o,l){if(1&o&&(e.TgZ(0,"div",41),e.YNc(1,V,2,1,"p",40),e.YNc(2,z,2,0,"p",40),e.qZA()),2&o){e.oxw();const t=e.MAs(1),i=e.oxw();e.xp6(1),e.Q6J("ngIf",i.erro),e.xp6(1),e.Q6J("ngIf",t.invalid&&!i.erro)}}function $(o,l){1&o&&e._UZ(0,"span",42)}function k(o,l){if(1&o){const t=e.EpF();e.TgZ(0,"form",6,7),e.NdJ("ngSubmit",function(){e.CHM(t);const n=e.MAs(1),r=e.oxw();return e.KtG(r.send(n))}),e.TgZ(2,"div",8)(3,"div",9)(4,"div",10)(5,"label",11),e._uU(6,"Nome: "),e.TgZ(7,"span",12),e._uU(8,"*"),e.qZA()(),e.TgZ(9,"input",13,14),e.NdJ("ngModelChange",function(n){e.CHM(t);const r=e.oxw();return e.KtG(r.objeto.nome=n)})("change",function(){e.CHM(t);const n=e.MAs(10),r=e.oxw();return e.KtG(r.objeto.nome=n.value.trim())}),e.qZA(),e.YNc(11,w,2,1,"div",15),e.qZA(),e.TgZ(12,"div",16)(13,"label",17),e._uU(14,"CNPJ: "),e.TgZ(15,"span",18),e._uU(16,"*"),e.qZA()(),e.TgZ(17,"input",19,20),e.NdJ("ngModelChange",function(n){e.CHM(t);const r=e.oxw();return e.KtG(r.objeto.cnpj=n)})("ngModelChange",function(){e.CHM(t);const n=e.MAs(18),r=e.oxw();return e.KtG(r.validaCNPJ(n))}),e.qZA(),e.YNc(19,y,3,2,"div",15),e.qZA()(),e.TgZ(20,"div",9)(21,"div",21)(22,"label",22),e._uU(23,"CEP:"),e.qZA(),e.TgZ(24,"input",23,24),e.NdJ("ngModelChange",function(n){e.CHM(t);const r=e.oxw();return e.KtG(r.objeto.cep=n)})("ngModelChange",function(){e.CHM(t);const n=e.MAs(25),r=e.oxw();return e.KtG(r.buscaCEP(n))}),e.qZA(),e.YNc(26,Q,3,2,"div",15),e.qZA(),e.TgZ(27,"div",25)(28,"label",26),e._uU(29,"Logradouro: "),e.TgZ(30,"span",12),e._uU(31,"*"),e.qZA()(),e.TgZ(32,"input",27,28),e.NdJ("ngModelChange",function(n){e.CHM(t);const r=e.oxw();return e.KtG(r.objeto.logradouro=n)})("change",function(){e.CHM(t);const n=e.MAs(33),r=e.oxw();return e.KtG(r.objeto.logradouro=n.value.trim())}),e.qZA(),e.YNc(34,B,2,1,"div",15),e.qZA(),e.TgZ(35,"div",29)(36,"label",30),e._uU(37,"N\xb0: "),e.TgZ(38,"span",12),e._uU(39,"*"),e.qZA()(),e.TgZ(40,"input",31,32),e.NdJ("ngModelChange",function(n){e.CHM(t);const r=e.oxw();return e.KtG(r.objeto.numero=n)})("change",function(){e.CHM(t);const n=e.MAs(41),r=e.oxw();return e.KtG(r.objeto.numero=n.value.trim())}),e.qZA(),e.YNc(42,H,2,1,"div",15),e.qZA()(),e.TgZ(43,"div",9)(44,"div",25)(45,"label",33),e._uU(46,"Cidade: "),e.TgZ(47,"span",12),e._uU(48,"*"),e.qZA()(),e.TgZ(49,"p-dropdown",34,35),e.NdJ("ngModelChange",function(n){e.CHM(t);const r=e.oxw();return e.KtG(r.objeto.cidade_Id=n)}),e.qZA(),e.YNc(51,G,2,1,"div",15),e.qZA()(),e.TgZ(52,"div",9)(53,"div",36),e.YNc(54,X,3,2,"div",37),e.TgZ(55,"button",38),e.YNc(56,$,1,0,"span",39),e.TgZ(57,"span"),e._uU(58,"Salvar"),e.qZA()()()()()()}if(2&o){const t=e.MAs(1),i=e.MAs(10),n=e.MAs(18),r=e.MAs(25),p=e.MAs(33),d=e.MAs(41),u=e.MAs(50),s=e.oxw();e.xp6(9),e.Q6J("ngModel",s.objeto.nome),e.xp6(2),e.Q6J("ngIf",i.touched&&i.errors),e.xp6(6),e.Q6J("ngModel",s.objeto.cnpj),e.xp6(2),e.Q6J("ngIf",n.touched&&n.errors),e.xp6(5),e.Q6J("ngModel",s.objeto.cep)("disabled",s.loadingCep),e.xp6(2),e.Q6J("ngIf",r.touched&&r.errors),e.xp6(6),e.Q6J("ngModel",s.objeto.logradouro)("disabled",s.loadingCep||s.cepPreenchido),e.xp6(2),e.Q6J("ngIf",p.touched&&p.errors),e.xp6(6),e.Q6J("ngModel",s.objeto.numero)("disabled",s.loadingCep),e.xp6(2),e.Q6J("ngIf",d.touched&&d.errors),e.xp6(7),e.Q6J("options",s.cidades)("ngModel",s.objeto.cidade_Id)("styleClass","form-control"+(s.loadingCidades?"form-control-loading":""))("placeholder","Selecione")("disabled",s.loadingCidades)("virtualScroll",!0)("virtualScrollItemSize",10)("required",!0)("filter",!0)("showClear",!0)("disabled",s.loadingCep||s.cepPreenchido),e.xp6(2),e.Q6J("ngIf",u.touched&&u.errors),e.xp6(3),e.Q6J("ngIf",s.erro||t.invalid),e.xp6(1),e.Q6J("disabled",t.invalid||s.loading),e.xp6(1),e.Q6J("ngIf",s.loading)}}let ee=(()=>{class o{constructor(t,i,n,r,p,d,u){this.activatedRoute=t,this.modalService=i,this.instituicaoFinanceiraService=n,this.crypto=r,this.toastr=p,this.cepService=d,this.cidadesService=u,this.objeto=new m._l,this.erro="",this.loading=!1,this.subscription=[],this.isEditPage=!0,this.modal=new g.u,this.cidades=[],this.loadingCidades=!0,this.cepPreenchido=!1,this.loadingCNPJ=!1,this.loadingCep=!1,(0,_.n)(this.cidadesService.getCidade()).then(s=>{this.loadingCidades=!1,this.cidades=s})}ngAfterViewInit(){this.modal.id=0,this.modal.template=this.template,this.modal.icon=this.icon,this.modal.style={"max-width":"600px",overflow:"visible"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute};var t=this.activatedRoute.params.subscribe(i=>{i.instituicaoFinanceira_id?(this.objeto.id=this.crypto.decrypt(i.instituicaoFinanceira_id),this.modal.title="Editar Institui\xe7\xe3o Financeira",this.modal.routerBack=["../../"],this.isEditPage=!0,console.log(1),(0,_.n)(this.instituicaoFinanceiraService.get(this.objeto.id)).then(n=>{n.cnpj=n.cnpj.toString().padStart(14,"0"),n.cep=n.cep.padStart(8,"0"),this.objeto=n,setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"instituicao financeira")},200)}).catch(n=>{console.log(2,n),this.voltar()})):(this.modal.title="Cadastrar Institui\xe7\xe3o Financeira",this.modal.routerBack=["../"],this.isEditPage=!1,this.objeto.cidade_Id=5270,setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"instituicao financeira")},200))});this.subscription.push(t)}ngOnDestroy(){this.subscription.forEach(t=>t.unsubscribe())}voltar(){this.modalService.removeModal(this.modal.id)}buscaCEP(t){if(this.loadingCep=!0,t.control.setErrors(null),this.cepPreenchido=!1,!this.validaCEP(t))return this.toastr.error("CEP inv\xe1lido."),void t.control.setErrors({invalid:!0});(0,_.n)(this.cepService.buscar(this.objeto.cep)).then(i=>{if(1==i.erro)return this.toastr.error("CEP inv\xe1lido."),void t.control.setErrors({invalid:!0});this.objeto.logradouro=i.logradouro+" , "+i.bairro+" - "+i.uf;var n=i.localidade.toLowerCase(),r=this.cidades.find(p=>{var d=p.nomeCidade.toLowerCase(),u=p.sigla.toLowerCase();return(d==n||n.includes(d)||d.includes(n))&&i.uf.toLowerCase()==u});r&&(this.objeto.cidade_Id=r.id),this.cepPreenchido=!0}).catch(i=>{this.toastr.error("N\xe3o foi poss\xedvel carregar CEP")}).finally(()=>this.loadingCep=!1)}validaCEP(t){return this.loadingCep=!0,this.objeto.cep.trim()?this.objeto.cep.toString().length<8?(t.control.setErrors({invalid:!0}),this.loadingCep=!1,!1):(0,v.c)(this.objeto.cep)?(this.loadingCep=!1,t.control.setErrors(null),!0):(t.control.setErrors({invalid:!0}),this.loadingCep=!1,!1):(t.control.setErrors({required:!0}),this.loadingCep=!1,!1)}validaCNPJ(t){return this.erro="",this.loadingCNPJ=!0,this.objeto.cnpj.toString().length<14?(t.control.setErrors({invalid:!0}),this.loadingCNPJ=!1,!1):this.objeto.cnpj&&0!=this.objeto.cnpj?(0,f.V)(this.objeto.cnpj)?(this.loadingCNPJ=!1,t.control.setErrors(null),!0):(t.control.setErrors({invalid:!0}),this.loadingCNPJ=!1,!1):(t.control.setErrors({required:!0}),this.loadingCNPJ=!1,!1)}send(t){return this.erro="",t.invalid?(this.toastr.error("Campos inv\xe1lidos"),void(this.erro="Campos inv\xe1lidos")):this.validaCNPJ(this.cnpj)?this.validaCEP(this.cnpj)?(0,_.n)(this.instituicaoFinanceiraService.post(this.objeto)).then(i=>{0!=i.sucesso?((0,_.n)(this.instituicaoFinanceiraService.getList()),this.voltar()):(this.erro=i.mensagem,this.toastr.error(i.mensagem)),this.loading=!1}).catch(i=>{this.loading=!1,this.erro=(0,C.b)(i)}):(this.toastr.error("CEP inv\xe1lido"),void(this.erro="CEP inv\xe1lido")):(this.toastr.error("CNPJ inv\xe1lido"),void(this.erro="CNPJ inv\xe1lido"))}static#e=this.\u0275fac=function(i){return new(i||o)(e.Y36(T.gz),e.Y36(g.Z),e.Y36(E.e),e.Y36(x.w),e.Y36(A._W),e.Y36(Z.q),e.Y36(P.j))};static#t=this.\u0275cmp=e.Xpm({type:o,selectors:[["app-form"]],viewQuery:function(i,n){if(1&i&&(e.Gf(j,5),e.Gf(O,5),e.Gf(N,5),e.Gf(J,5)),2&i){let r;e.iGM(r=e.CRH())&&(n.template=r.first),e.iGM(r=e.CRH())&&(n.icon=r.first),e.iGM(r=e.CRH())&&(n.cep=r.first),e.iGM(r=e.CRH())&&(n.cnpj=r.first)}},decls:4,vars:0,consts:[["class","align-items-center"],["icon",""],["template",""],[1,"title-icon"],["xmlns","http://www.w3.org/2000/svg","height","16","width","16","viewBox","0 0 512 512","fill","currentColor"],["d","M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],[1,"needs-validation",3,"ngSubmit"],["form","ngForm"],[1,"px-2"],[1,"row"],[1,"form-group","col-xl-8","col-lg-8","col-md-8","col-sm-12","col-12"],["for","nome"],[1,"text-danger"],["type","text","name","nome","id","nome","pattern","\\S(.*\\S)?","required","",1,"form-control",3,"ngModel","ngModelChange","change"],["nome","ngModel"],[4,"ngIf"],[1,"form-group","col-xl-4","col-lg-4","col-md-4","col-sm-12","col-12"],["for","cnpj"],[1,"tect-danger"],["type","text","name","cnpj","id","cnpj","required","","mask","00.000.000/0000-00","placeholder","00.000.000/0000-00",1,"form-control",3,"ngModel","ngModelChange"],["cnpj","ngModel"],[1,"form-group","col-md-3","col-sm-3"],["for","cep"],["type","text","name","cep","id","cep","mask","00000-000","placeholder","00000-000","required","",1,"form-control",3,"ngModel","disabled","ngModelChange"],["cep","ngModel"],[1,"form-group","col-md-6","col-sm-12"],["for","logradouro"],["type","text","name","logradouro","id","logradouro","required","","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","disabled","ngModelChange","change"],["logradouro","ngModel"],[1,"form-group","col-md-3","col-sm-12"],["for","cNumero"],["type","text","name","cNumero","id","cNumero","required","","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","disabled","ngModelChange","change"],["cNumero","ngModel"],["for","cidade_Id"],["optionLabel","nomeCidade","optionValue","id","name","cidade_Id","inputId","cidade_Id","filterBy","nomeCidade",3,"options","ngModel","styleClass","placeholder","disabled","virtualScroll","virtualScrollItemSize","required","filter","showClear","ngModelChange"],["cidade_Id","ngModel"],[1,"d-flex","align-items-center","mt-1"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","mr-0","ms-auto",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["class","text-danger",4,"ngIf"],[1,"m-0"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(i,n){1&i&&(e.YNc(0,S,3,0,"ng-template",0,1,e.W1O),e.YNc(2,k,59,28,"ng-template",null,2,e.W1O))},dependencies:[b.O5,c._Y,c.Fj,c.JJ,c.JL,c.Q7,c.c5,c.On,c.F,I.hx,F.Lt]})}return o})()}}]);