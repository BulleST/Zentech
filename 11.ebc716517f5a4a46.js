"use strict";(self.webpackChunkZenTech=self.webpackChunkZenTech||[]).push([[11],{6011:(fe,v,l)=>{l.r(v),l.d(v,{ContratoModule:()=>_e});var g=l(132),x=l(5861),h=l(5254),u=l(708),T=l(342),C=l(2855),M=l(9324),e=l(9291),b=l(2400),A=l(2667),E=l(2425),F=l(4527),N=l(1208),w=l(3337),_=l(6814),c=l(6223),q=l(5219),Z=l(2352),I=l(6044),j=l(2916);const J=["template"],U=["icon"];function y(r,s){1&r&&(e.TgZ(0,"span",3),e.O4$(),e.TgZ(1,"svg",4),e._UZ(2,"path",5),e.qZA()())}function S(r,s){1&r&&(e.TgZ(0,"span",90),e._uU(1,"Voc\xea deve primeiro salvar os dados para baixar o PDF"),e.qZA())}function H(r,s){1&r&&(e.TgZ(0,"p",16),e._uU(1,"Este campo \xe9 obrigat\xf3 rio."),e.qZA())}function R(r,s){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,H,2,0,"p",91),e.qZA()),2&r){e.oxw();const o=e.MAs(21);e.xp6(1),e.Q6J("ngIf",o.errors.required)}}function V(r,s){if(1&r&&(e.TgZ(0,"div",10)(1,"span"),e._uU(2),e.qZA()()),2&r){const o=s.$implicit;e.xp6(2),e.hij("",o.nome," ")}}function Q(r,s){1&r&&(e.TgZ(0,"p",16),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function P(r,s){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,Q,2,0,"p",91),e.qZA()),2&r){e.oxw();const o=e.MAs(29);e.xp6(1),e.Q6J("ngIf",o.errors.required)}}function L(r,s){if(1&r&&(e.TgZ(0,"div",10)(1,"span"),e._uU(2),e.qZA()()),2&r){const o=s.$implicit;e.xp6(2),e.hij("",o.nome," ")}}function G(r,s){1&r&&(e.TgZ(0,"p",16),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function Y(r,s){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,G,2,0,"p",91),e.qZA()),2&r){e.oxw();const o=e.MAs(38);e.xp6(1),e.Q6J("ngIf",o.errors.required)}}function K(r,s){1&r&&(e.TgZ(0,"p",16),e._uU(1,"Valor inv\xe1lido"),e.qZA())}function z(r,s){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,K,2,0,"p",91),e.qZA()),2&r){e.oxw();const o=e.MAs(77);e.xp6(1),e.Q6J("ngIf",o.errors.mask)}}function D(r,s){if(1&r&&(e.TgZ(0,"p",16),e._uU(1),e.qZA()),2&r){const o=e.oxw(3);e.xp6(1),e.Oqu(o.erro)}}function O(r,s){1&r&&(e.TgZ(0,"p",16),e._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar."),e.qZA())}function B(r,s){if(1&r&&(e.TgZ(0,"div",92),e.YNc(1,D,2,1,"p",91),e.YNc(2,O,2,0,"p",91),e.qZA()),2&r){e.oxw();const o=e.MAs(1),a=e.oxw();e.xp6(1),e.Q6J("ngIf",a.erro),e.xp6(1),e.Q6J("ngIf",o.invalid&&!a.erro)}}function $(r,s){1&r&&e._UZ(0,"span",93)}const k=function(){return["nome"]};function W(r,s){if(1&r){const o=e.EpF();e.TgZ(0,"form",6,7),e.NdJ("ngSubmit",function(){e.CHM(o);const t=e.MAs(1),n=e.oxw();return e.KtG(n.send(t))}),e.TgZ(2,"div",8)(3,"div",9)(4,"div",10)(5,"button",11),e.NdJ("click",function(){e.CHM(o);const t=e.oxw();return e.KtG(t.contratoDownload())}),e._uU(6,"Baixar PDF"),e.qZA(),e.YNc(7,S,2,0,"span",12),e.qZA()(),e.TgZ(8,"div",13)(9,"div",14)(10,"label",15),e._uU(11,"Data do contrato: "),e.TgZ(12,"span",16),e._uU(13,"*"),e.qZA()(),e.TgZ(14,"app-input-date",17),e.NdJ("valueChanges",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.data=t)}),e.qZA()(),e.TgZ(15,"div",18)(16,"label",19),e._uU(17,"N\xba do Contrato de C\xe2mbio: "),e.TgZ(18,"span",16),e._uU(19,"*"),e.qZA()(),e.TgZ(20,"input",20,21),e.NdJ("ngModelChange",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.numContrato=t)})("change",function(){e.CHM(o);const t=e.MAs(21),n=e.oxw();return e.KtG(n.objeto.numContrato=t.value.trim())}),e.qZA(),e.YNc(22,R,2,1,"div",22),e.qZA(),e.TgZ(23,"div",23)(24,"label",24),e._uU(25,"Tipo do Contrato de C\xe2mbio: "),e.TgZ(26,"span",16),e._uU(27,"*"),e.qZA()(),e.TgZ(28,"p-dropdown",25,26),e.NdJ("ngModelChange",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.tipo_Id=t)}),e.YNc(30,V,3,1,"ng-template",27),e.qZA(),e.YNc(31,P,2,1,"div",22),e.qZA(),e.TgZ(32,"div",28)(33,"label",29),e._uU(34,"Eventos: "),e.TgZ(35,"span",16),e._uU(36,"*"),e.qZA()(),e.TgZ(37,"p-dropdown",30,31),e.NdJ("ngModelChange",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.evento_Id=t)}),e.YNc(39,L,3,1,"ng-template",27),e.qZA(),e.YNc(40,Y,2,1,"div",22),e.qZA()(),e.TgZ(41,"div",13)(42,"div",32)(43,"label",33),e._uU(44,"Taxa Cambial: "),e.TgZ(45,"small"),e._uU(46,"(USD)"),e.qZA(),e._uU(47,"\xa0"),e.TgZ(48,"span",16),e._uU(49,"*"),e.qZA()(),e.TgZ(50,"app-input-number",34),e.NdJ("valueChanges",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.taxa=t)}),e.qZA()(),e.TgZ(51,"div",35)(52,"label",36),e._uU(53,"Valor Moeda Nacional: "),e.TgZ(54,"small"),e._uU(55,"(R$)"),e.qZA(),e._uU(56,"\xa0"),e.TgZ(57,"span",16),e._uU(58,"*"),e.qZA()(),e.TgZ(59,"app-input-number",37),e.NdJ("valueChanges",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.valorNacional=t)}),e.qZA()(),e.TgZ(60,"div",38)(61,"label",39),e._uU(62,"Percentual de Adiantamento: "),e.TgZ(63,"small"),e._uU(64,"(%)"),e.qZA(),e._uU(65,"\xa0"),e.qZA(),e.TgZ(66,"app-input-number",40),e.NdJ("valueChanges",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.percentualAdiantamento=t)}),e.qZA()(),e.TgZ(67,"div",41)(68,"label",42),e._uU(69,"RDE:"),e.qZA(),e.TgZ(70,"input",43,44),e.NdJ("ngModelChange",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.rde=t)})("change",function(){e.CHM(o);const t=e.MAs(71),n=e.oxw();return e.KtG(n.objeto.rde=t.value.trim())}),e.qZA()()(),e.TgZ(72,"div",13)(73,"div",45)(74,"label",46),e._uU(75,"Valor Efetivo Total (VET):"),e.qZA(),e.TgZ(76,"input",47,48),e.NdJ("ngModelChange",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.vet=t)}),e.qZA(),e.YNc(78,z,2,1,"div",22),e.qZA(),e.TgZ(79,"div",49)(80,"label",50),e._uU(81,"Descri\xe7\xe3o da Forma de Entrega da moeda estrangeira:"),e.qZA(),e.TgZ(82,"input",51,52),e.NdJ("ngModelChange",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.descricaoFormaEntrega=t)})("change",function(){e.CHM(o);const t=e.MAs(83),n=e.oxw();return e.KtG(n.objeto.descricaoFormaEntrega=t.value.trim())}),e.qZA()(),e.TgZ(84,"div",53)(85,"label",54),e._uU(86,"Liquida\xe7\xe3o At\xe9: "),e.TgZ(87,"span",16),e._uU(88,"*"),e.qZA()(),e.TgZ(89,"app-input-date",55),e.NdJ("valueChanges",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.dataLiquidacao=t)}),e.qZA()()(),e.TgZ(90,"div",13)(91,"div",56)(92,"label",57),e._uU(93,"C\xf3digo da Natureza:"),e.qZA(),e.TgZ(94,"app-input-number",58),e.NdJ("valueChanges",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.codigoNatureza=t)}),e.qZA()(),e.TgZ(95,"div",59)(96,"label",60),e._uU(97,"Descri\xe7\xe3o da Natureza do Fato:"),e.qZA(),e.TgZ(98,"input",61,62),e.NdJ("ngModelChange",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.descricaoNaturezaFato=t)})("change",function(){e.CHM(o);const t=e.MAs(99),n=e.oxw();return e.KtG(n.objeto.descricaoNaturezaFato=t.value.trim())}),e.qZA()()(),e.TgZ(100,"div",63)(101,"div",64)(102,"label",65),e._uU(103,"Pa\xeds do Pagador/Recebedor no Exterior:"),e.qZA(),e._UZ(104,"input",66),e.qZA(),e.TgZ(105,"div",67)(106,"label",68),e._uU(107,"Pagador/Recebedor no Exterior:"),e.qZA(),e._UZ(108,"input",69),e.qZA(),e.TgZ(109,"div",70)(110,"label",71),e._uU(111,"C\xf3digo da Rela\xe7\xe3o de V\xednculo entre cliente e o Pagador/Recebedor:"),e.qZA(),e.TgZ(112,"input",72,73),e.NdJ("ngModelChange",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.codigoVinculoPagRecExterior=t)})("change",function(){e.CHM(o);const t=e.MAs(113),n=e.oxw();return e.KtG(n.objeto.codigoVinculoPagRecExterior=t.value.trim())}),e.qZA()()(),e.TgZ(114,"div",13)(115,"div",74)(116,"label",75),e._uU(117,"Especifica\xe7\xf5es: "),e.qZA(),e.TgZ(118,"textarea",76,77),e.NdJ("ngModelChange",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.especificacoes=t)})("change",function(){e.CHM(o);const t=e.MAs(119),n=e.oxw();return e.KtG(n.objeto.especificacoes=t.value.trim())}),e._uU(120,"                "),e.qZA()(),e.TgZ(121,"div",78)(122,"label",79),e._uU(123,"Cl\xe1usulas: "),e.qZA(),e.TgZ(124,"textarea",80,81),e.NdJ("ngModelChange",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.clausulas=t)})("change",function(){e.CHM(o);const t=e.MAs(125),n=e.oxw();return e.KtG(n.objeto.clausulas=t.value.trim())}),e._uU(126,"                "),e.qZA()(),e.TgZ(127,"div",82)(128,"label",83),e._uU(129,"Instru\xe7\xf5es de Recebimento/Pagamento: "),e.qZA(),e.TgZ(130,"textarea",84,85),e.NdJ("ngModelChange",function(t){e.CHM(o);const n=e.oxw();return e.KtG(n.objeto.instrucoesRecebimentoPagamento=t)})("change",function(){e.CHM(o);const t=e.MAs(131),n=e.oxw();return e.KtG(n.objeto.instrucoesRecebimentoPagamento=t.value.trim())}),e._uU(132,"                "),e.qZA()()(),e.TgZ(133,"div",86)(134,"div",10),e.YNc(135,B,3,2,"div",87),e.TgZ(136,"button",88),e.YNc(137,$,1,0,"span",89),e.TgZ(138,"span"),e._uU(139,"Salvar"),e.qZA()()()()()()}if(2&r){const o=e.MAs(1),a=e.MAs(21),t=e.MAs(29),n=e.MAs(38),d=e.MAs(77),i=e.oxw();let m,p;e.xp6(5),e.Q6J("disabled",0==i.objeto.id),e.xp6(2),e.Q6J("ngIf",0==i.objeto.id),e.xp6(7),e.Q6J("valueInput",i.objeto.data)("inputId","data")("showErrorMessage",!0)("required",!0),e.xp6(6),e.Q6J("ngModel",i.objeto.numContrato),e.xp6(2),e.Q6J("ngIf",a.touched&&a.errors),e.xp6(6),e.Q6J("options",i.tipos)("ngModel",i.objeto.tipo_Id)("styleClass","form-control "+(i.loadingTipo?"form-control-loading":""))("showClear",!0)("filter",!0)("required",!0)("showClear",!0),e.xp6(3),e.Q6J("ngIf",t.touched&&t.errors),e.xp6(6),e.Q6J("options",i.eventos)("ngModel",i.objeto.evento_Id)("styleClass","form-control "+(i.loadingEvento?"form-control-loading":""))("showClear",!0)("filter",!0)("filterFields",e.DdM(80,k))("required",!0)("showClear",!0),e.xp6(3),e.Q6J("ngIf",n.touched&&n.errors),e.xp6(10),e.Q6J("valueInput",i.objeto.taxa)("inputId","taxa")("mask","separator.2")("showErrorMessage",!0)("allowNegativeNumbers",!1)("required",!0)("min",.1)("max",999999999)("autoReplaceValue",!1),e.xp6(9),e.Q6J("valueInput",i.objeto.valorNacional)("inputId","valorNacional")("mask","separator.2")("showErrorMessage",!0)("allowNegativeNumbers",!1)("required",!0)("min",.1)("max",999999999)("autoReplaceValue",!1),e.xp6(7),e.Q6J("valueInput",i.objeto.percentualAdiantamento)("inputId","percentualAdiantamento")("mask","separator.2")("showErrorMessage",!1)("allowNegativeNumbers",!1)("required",!1)("autoReplaceValue",!1)("min",0)("max",100)("suffix","%"),e.xp6(4),e.Q6J("ngModel",i.objeto.rde),e.xp6(6),e.Q6J("ngModel",i.objeto.vet),e.xp6(2),e.Q6J("ngIf",d.errors&&d.touched),e.xp6(4),e.Q6J("ngModel",i.objeto.descricaoFormaEntrega),e.xp6(7),e.Q6J("valueInput",i.objeto.dataLiquidacao)("inputId","dataLiquidacao")("showErrorMessage",!0)("required",!0),e.xp6(5),e.Q6J("valueInput",i.objeto.codigoNatureza)("inputId","codigoNatureza")("mask","00000-00-A-00-00")("showErrorMessage",!1)("allowNegativeNumbers",!1)("required",!1)("readonly",!0)("autoReplaceValue",!1),e.xp6(4),e.Q6J("ngModel",i.objeto.descricaoNaturezaFato),e.xp6(6),e.Q6J("value",null!==(m=i.objeto.paisPagRecExterior)&&void 0!==m?m:"N/A"),e.xp6(4),e.Q6J("value",null!==(p=i.objeto.pagRecExterior)&&void 0!==p?p:"N/A"),e.xp6(4),e.Q6J("ngModel",i.objeto.codigoVinculoPagRecExterior)("readonly",!0),e.xp6(6),e.Q6J("ngModel",i.objeto.especificacoes),e.xp6(6),e.Q6J("ngModel",i.objeto.clausulas),e.xp6(6),e.Q6J("ngModel",i.objeto.instrucoesRecebimentoPagamento),e.xp6(5),e.Q6J("ngIf",i.erro||o.invalid),e.xp6(1),e.Q6J("disabled",o.invalid||i.loading),e.xp6(1),e.Q6J("ngIf",i.loading)}}let X=(()=>{class r{constructor(o,a,t,n,d,i,m,p,he){this.activatedRoute=o,this.modalService=a,this.contratoService=t,this.crypto=n,this.toastr=d,this.loadingService=i,this.contratoTipoService=m,this.contratoEventoService=p,this.datepipe=he,this.objeto=new h.hi,this.erro="",this.loading=!1,this.subscription=[],this.contratos=[],this.isEditPage=!0,this.id=0,this.item="",this.modal=new C.u,this.tipos=[],this.loadingTipo=!0,this.eventos=[],this.loadingEvento=!0,this.instituicoes=[],this.loadingInstituicao=!0,this.loadingContratoFile=!1,(0,u.n)(this.contratoTipoService.getList()).then(f=>{this.tipos=f,this.loadingTipo=!1}),(0,u.n)(this.contratoEventoService.getList()).then(f=>{this.eventos=f,this.loadingEvento=!1})}encryptId(o){const a=this.crypto.encrypt(o);return null!==a?a:""}ngAfterViewInit(){this.modal.id=0,this.modal.template=this.template,this.modal.icon=this.icon,this.modal.style={"max-width":"950px",overflow:"visible"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute};var o=this.activatedRoute.params.subscribe(a=>{a.contrato_id?(this.objeto.id=this.crypto.decrypt(a.contrato_id),this.modal.title="Editar Contrato",this.modal.routerBack=["../../"],this.isEditPage=!0,(0,u.n)(this.contratoService.get(this.objeto.id)).then(t=>{this.objeto=new h.hi(t),this.objeto.dataLiquidacao=this.datepipe.transform(this.objeto.dataLiquidacao,"yyyy-MM-dd"),this.objeto.data=this.datepipe.transform(this.objeto.data,"yyyy-MM-ddTHH:mm"),setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"contrato")},200)}).catch(t=>{this.voltar()})):this.voltar()});this.subscription.push(o)}ngOnDestroy(){this.subscription.forEach(o=>o.unsubscribe())}voltar(){this.modalService.removeModal(this.modal)}contratoDownload(){var o=this;return(0,x.Z)(function*(){0!=o.objeto.id?(o.loadingContratoFile=!0,o.loadingService.message.next("Carregando Contrato."),yield(0,u.n)(o.contratoService.file(o.objeto.id)).then(a=>{o.loadingContratoFile=!1}).catch(a=>{o.loadingContratoFile=!1}),o.loadingService.message.next("")):o.toastr.error("Voc\xea deve primeiro salvar os dados para fazer o download.")})()}send(o){var a=this;return o.invalid?(this.toastr.error("Campos inv\xe1lidos"),void(this.erro="Campos inv\xe1lidos")):(this.erro="",this.loading=!0,(0,u.n)(this.contratoService.post(this.objeto)).then(function(){var t=(0,x.Z)(function*(n){0!=n.sucesso?(n.objeto?(0,M.f)(a.contratoService,n.objeto):(0,u.n)(a.contratoService.getList()),a.voltar()):a.erro=n.mensagem,a.loading=!1});return function(n){return t.apply(this,arguments)}}()).catch(t=>{this.loading=!1,this.erro=(0,T.b)(t)}))}static#e=this.\u0275fac=function(a){return new(a||r)(e.Y36(g.gz),e.Y36(C.Z),e.Y36(b.d),e.Y36(A.w),e.Y36(E._W),e.Y36(F.b),e.Y36(N.M),e.Y36(w.n),e.Y36(_.uU))};static#t=this.\u0275cmp=e.Xpm({type:r,selectors:[["app-form"]],viewQuery:function(a,t){if(1&a&&(e.Gf(J,5),e.Gf(U,5)),2&a){let n;e.iGM(n=e.CRH())&&(t.template=n.first),e.iGM(n=e.CRH())&&(t.icon=n.first)}},decls:4,vars:0,consts:[["class","align-items-center"],["icon",""],["template",""],[1,"title-icon"],["xmlns","http://www.w3.org/2000/svg","height","16","width","16","viewBox","0 0 512 512","fill","currentColor"],["d","M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],[3,"ngSubmit"],["form","ngForm"],[1,"px-2"],[1,"my-3","row"],[1,"d-flex","align-items-center"],["type","button",1,"btn","btn-dark",3,"disabled","click"],["class","ms-2 text-danger mt-1",4,"ngIf"],[1,"row"],["title","Data do Contrato",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-6","col-12"],["for","data"],[1,"text-danger"],["type","datetime-local",3,"valueInput","inputId","showErrorMessage","required","valueChanges"],["title","N\xba do Contrato de C\xe2mbio",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-6","col-12"],["for","numContrato"],["type","text","name","numContrato","id","numContrato","required","","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange","change"],["numContrato","ngModel"],[4,"ngIf"],["title","Tipos",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-6","col-12"],["for","tipo_Id"],["name","tipo_Id","inputId","tipo_Id","optionLabel","nome","optionValue","id","placeholder","Selecione um tipo",3,"options","ngModel","styleClass","showClear","filter","required","ngModelChange"],["tipo_Id","ngModel"],["pTemplate","item"],["title","Eventos",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-6","col-12"],["for","evento_Id"],["name","evento_Id","inputId","evento_Id","optionLabel","nome","optionValue","id","placeholder","Selecione um evento",3,"options","ngModel","styleClass","showClear","filter","filterFields","required","ngModelChange"],["evento_Id","ngModel"],["title","Taxa Cambial",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-12","col-12"],["for","taxa"],["suffix"," USD",3,"valueInput","inputId","mask","showErrorMessage","allowNegativeNumbers","required","min","max","autoReplaceValue","valueChanges"],["title","Valor Moeda Nacional",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-12","col-12"],["for","valorNacional"],["prefix","R$ ",3,"valueInput","inputId","mask","showErrorMessage","allowNegativeNumbers","required","min","max","autoReplaceValue","valueChanges"],["title","Percentual de Adiantamento",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-12","col-12"],["for","percentualAdiantamento"],[3,"valueInput","inputId","mask","showErrorMessage","allowNegativeNumbers","required","autoReplaceValue","min","max","suffix","valueChanges"],["title","RDE",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-12","col-12"],["for","rde"],["type","text","name","rde","id","rde","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange","change"],["rde","ngModel"],["title","Valor Efetivo Total (VET)",1,"form-group","col-xl-3","col-lg-3","col-md-3","col-sm-12","col-12"],["for","vet"],["type","text","name","vet","id","vet","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange"],["vet","ngModel"],["title","Descri\xe7\xe3o da Forma de Entrega da moeda estrangeira",1,"form-group","col-xl-5","col-lg-5","col-md-5","col-sm-12","col-12"],["for","descricaoFormaEntrega"],["type","text","name","descricaoFormaEntrega","id","descricaoFormaEntrega","required","","pattern","\\S(.*\\S)?","readonly","",1,"form-control",3,"ngModel","ngModelChange","change"],["descricaoFormaEntrega","ngModel"],["title","Liquida\xe7\xe3o At\xe9",1,"form-group","col-xl-4","col-lg-4","col-md-4","col-sm-12","col-12"],["for","dataLiquidacao"],["type","date",3,"valueInput","inputId","showErrorMessage","required","valueChanges"],["title","C\xf3digo da Natureza",1,"form-group","col-xl-4","col-lg-4","col-md-4","col-sm-12","col-12"],["for","codigoNatureza"],[3,"valueInput","inputId","mask","showErrorMessage","allowNegativeNumbers","required","readonly","autoReplaceValue","valueChanges"],["title","Descri\xe7\xe3o da Natureza do Fato",1,"form-group","col-xl-8","col-lg-8","col-md-8","col-sm-12","col-12"],["for","descricaoNaturezaFato"],["type","text","name","descricaoNaturezaFato","id","descricaoNaturezaFato","required","","pattern","\\S(.*\\S)?","readonly","",1,"form-control",3,"ngModel","ngModelChange","change"],["descricaoNaturezaFato","ngModel"],[1,"row","align-items-end"],["title","Pa\xeds do Pagador/Recebedor no Exterior",1,"form-group","col-xl-3","col-lg-3","col-md-3","col-sm-12","col-12"],["for","pais_Id"],["type","text","id","pais_Id","disabled","",1,"form-control",3,"value"],["title","Pagador/Recebedor no Exterior",1,"form-group","col-xl-5","col-lg-5","col-md-5","col-sm-12","col-12"],["for","pagRecExterior"],["type","text","id","pagRecExterior","disabled","",1,"form-control",3,"value"],["title","C\xf3digo da Rela\xe7\xe3o de V\xednculo entre cliente e o Pagador/Recebedor",1,"form-group","col-xl-4","col-lg-4","col-md-4","col-sm-12","col-12"],["for","codigoVinculoPagRecExterior"],["type","text","name","codigoVinculoPagRecExterior","id","codigoVinculoPagRecExterior","required","",1,"form-control",3,"ngModel","readonly","ngModelChange","change"],["codigoVinculoPagRecExterior","ngModel"],["title","Especifica\xe7\xf5es",1,"form-group","col-xl-12","col-lg-12","col-md-12","col-sm-12","col-12"],["for","especificacoes"],["name","especificacoes","id","especificacoes","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange","change"],["especificacoes","ngModel"],["title","Cl\xe1usulas",1,"form-group","col-xl-12","col-lg-12","col-md-12","col-sm-12","col-12"],["for","clausulas"],["name","clausulas","id","clausulas","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange","change"],["clausulas","ngModel"],["title","Instru\xe7\xf5es de Recebimento/Pagamento",1,"form-group","col-xl-12","col-lg-12","col-md-12","col-sm-12","col-12"],["for","instrucoesRecebimentoPagamento"],["name","instrucoesRecebimentoPagamento","id","instrucoesRecebimentoPagamento","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange","change"],["instrucoesRecebimentoPagamento","ngModel"],[1,"row","mt-2","mb-1"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","me-0","ms-auto",3,"disabled"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"ms-2","text-danger","mt-1"],["class","text-danger",4,"ngIf"],[1,"m-0"],[1,"spinner-border","spinner-border-sm","me-1"]],template:function(a,t){1&a&&(e.YNc(0,y,3,0,"ng-template",0,1,e.W1O),e.YNc(2,W,140,81,"ng-template",null,2,e.W1O))},dependencies:[_.O5,c._Y,c.Fj,c.JJ,c.JL,c.Q7,c.c5,c.On,c.F,q.jx,Z.Lt,I.l,j.K]})}return r})();var ee=l(2832),te=l(590),oe=l(8787),ne=l(6599);function ae(r,s){1&r&&e._UZ(0,"span",13)}function re(r,s){}const se=[{path:"",component:(()=>{class r{constructor(o,a){this.table=o,this.contratoService=a,this.faFilePdf=te.gSj,this.maskType=ee.O,this.list=[],this.tableLinks=[],this.columns=h.SC,this.subscription=[],this.loading=!1;var t=this.contratoService.list.subscribe(i=>this.list=i);this.subscription.push(t);var n=this.contratoService.loading.subscribe(i=>this.loading=i);this.subscription.push(n),(0,u.n)(this.contratoService.getList(!0));var d=this.table.selected.subscribe(i=>{i&&(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]}],this.tableLinks=this.table.encryptParams(this.tableLinks))});this.subscription.push(d)}ngOnDestroy(){this.subscription.forEach(o=>o.unsubscribe())}getList(){(0,u.n)(this.contratoService.getList(!0))}static#e=this.\u0275fac=function(a){return new(a||r)(e.Y36(oe.i),e.Y36(b.d))};static#t=this.\u0275cmp=e.Xpm({type:r,selectors:[["app-list"]],decls:17,vars:12,consts:[[1,"page"],[1,"page__header"],[1,"title-icon","align-items-center"],["xmlns","http://www.w3.org/2000/svg","height","16","width","16","viewBox","0 0 512 512","fill","currentColor"],["d","M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],[1,"me-auto"],[1,"page__header-title"],[1,"ms-auto"],[1,"btn","btn-dark",3,"disabled","click"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"page__body"],["topActions",""],[3,"list","topActions","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"],[1,"spinner-border","spinner-border-sm","me-1"]],template:function(a,t){if(1&a&&(e.TgZ(0,"section",0)(1,"div",1)(2,"span",2),e.O4$(),e.TgZ(3,"svg",3),e._UZ(4,"path",4),e.qZA()(),e.kcU(),e.TgZ(5,"div",5)(6,"h3",6),e._uU(7,"Contratos"),e.qZA()(),e.TgZ(8,"div",7)(9,"button",8),e.NdJ("click",function(){return t.getList()}),e.YNc(10,ae,1,0,"span",9),e._uU(11,"Atualizar"),e.qZA()()(),e.TgZ(12,"div",10),e.YNc(13,re,0,0,"ng-template",null,11,e.W1O),e._UZ(15,"app-list-shared",12),e.qZA()(),e._UZ(16,"router-outlet")),2&a){const n=e.MAs(14);e.xp6(9),e.Q6J("disabled",t.loading),e.xp6(1),e.Q6J("ngIf",t.loading),e.xp6(5),e.Q6J("list",t.list)("topActions",n)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",!0)("columns",t.columns)("tableLinks",t.tableLinks)("selectable",!0)}},dependencies:[_.O5,g.lC,ne.o]})}return r})(),title:"Zentech - Contratos",children:[{path:"editar/:contrato_id",component:X,title:"Zentech - Editar Contrato",data:{modalOrder:1}},l(7280).D]}];let ce=(()=>{class r{static#e=this.\u0275fac=function(a){return new(a||r)};static#t=this.\u0275mod=e.oAB({type:r});static#o=this.\u0275inj=e.cJS({imports:[g.Bz.forChild(se),g.Bz]})}return r})();var ue=l(5597),de=l(8839),me=l(4685),pe=l(1532),ge=l(6208);let _e=(()=>{class r{static#e=this.\u0275fac=function(a){return new(a||r)};static#t=this.\u0275mod=e.oAB({type:r});static#o=this.\u0275inj=e.cJS({imports:[_.ez,ce,ue.uH,Z.kW,c.u5,de.yI.forChild(),ge.m,me.U$,pe._8]})}return r})()}}]);