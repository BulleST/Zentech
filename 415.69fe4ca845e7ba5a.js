"use strict";(self.webpackChunkZenTech=self.webpackChunkZenTech||[]).push([[415],{1005:(F,v,i)=>{i.d(v,{sB:()=>x,th:()=>m});var u=i(5219),c=i(2832);class m{constructor(){this.id=0,this.nome="",this.cidade="",this.cep="",this.numero="",this.logradouro="",this.pais_Id=void 0,this.codigoSwift="",this.bairro="",this.complemento="",this.estado=""}}var x=[{field:"nome",header:"Nome",maskType:c.O.undefined,filterType:c.vA.text,filterDisplay:c.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,showOperator:!1,filterMatchMode:u.a6.CONTAINS},{field:"cidade",header:"Cidade",maskType:c.O.undefined,filterType:c.vA.text,filterDisplay:c.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,showOperator:!1,filterMatchMode:u.a6.EQUALS},{field:"estado",header:"UF",maskType:c.O.undefined,filterType:c.vA.text,filterDisplay:c.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,showOperator:!1,filterMatchMode:u.a6.EQUALS},{field:"pais",header:"Pa\xeds",maskType:c.O.undefined,filterType:c.vA.text,filterDisplay:c.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,showOperator:!1,filterMatchMode:u.a6.EQUALS}]},6011:(F,v,i)=>{i.r(v),i.d(v,{ContratoModule:()=>ft});var u=i(132),c=i(5861),_=i(5254),m=i(708),x=i(342),p=i(2855),t=i(9291),T=i(2400),h=i(2667),C=i(2425),E=i(7397),s=i(4527),g=i(1208),Z=i(3337),I=i(6814),f=i(6223),U=i(5219),N=i(2352),y=i(6044),j=i(2916);const S=["template"],P=["icon"];function R(r,d){1&r&&(t.TgZ(0,"span",3),t.O4$(),t.TgZ(1,"svg",4),t._UZ(2,"path",5),t.qZA()())}function J(r,d){1&r&&(t.TgZ(0,"span",92),t._uU(1,"Voc\xea deve primeiro salvar os dados para baixar o PDF"),t.qZA())}function D(r,d){1&r&&(t.TgZ(0,"p",16),t._uU(1,"Este campo \xe9 obrigat\xf3 rio."),t.qZA())}function O(r,d){if(1&r&&(t.TgZ(0,"div"),t.YNc(1,D,2,0,"p",93),t.qZA()),2&r){t.oxw();const o=t.MAs(21);t.xp6(1),t.Q6J("ngIf",o.errors.required)}}function L(r,d){if(1&r&&(t.TgZ(0,"div",10)(1,"span"),t._uU(2),t.qZA()()),2&r){const o=d.$implicit;t.xp6(2),t.hij("",o.nome," ")}}function H(r,d){1&r&&(t.TgZ(0,"p",16),t._uU(1,"Este campo \xe9 obrigat\xf3rio."),t.qZA())}function q(r,d){if(1&r&&(t.TgZ(0,"div"),t.YNc(1,H,2,0,"p",93),t.qZA()),2&r){t.oxw();const o=t.MAs(29);t.xp6(1),t.Q6J("ngIf",o.errors.required)}}function K(r,d){if(1&r&&(t.TgZ(0,"div",10)(1,"span"),t._uU(2),t.qZA()()),2&r){const o=d.$implicit;t.xp6(2),t.hij("",o.nome," ")}}function V(r,d){1&r&&(t.TgZ(0,"p",16),t._uU(1,"Este campo \xe9 obrigat\xf3rio."),t.qZA())}function Q(r,d){if(1&r&&(t.TgZ(0,"div"),t.YNc(1,V,2,0,"p",93),t.qZA()),2&r){t.oxw();const o=t.MAs(38);t.xp6(1),t.Q6J("ngIf",o.errors.required)}}function G(r,d){1&r&&(t.TgZ(0,"p",16),t._uU(1,"Valor inv\xe1lido"),t.qZA())}function B(r,d){if(1&r&&(t.TgZ(0,"div"),t.YNc(1,G,2,0,"p",93),t.qZA()),2&r){t.oxw();const o=t.MAs(77);t.xp6(1),t.Q6J("ngIf",o.errors.mask)}}function Y(r,d){if(1&r&&(t.TgZ(0,"p",16),t._uU(1),t.qZA()),2&r){const o=t.oxw(3);t.xp6(1),t.Oqu(o.erro)}}function z(r,d){1&r&&(t.TgZ(0,"p",16),t._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar."),t.qZA())}function W(r,d){if(1&r&&(t.TgZ(0,"div",94),t.YNc(1,Y,2,1,"p",93),t.YNc(2,z,2,0,"p",93),t.qZA()),2&r){t.oxw();const o=t.MAs(1),a=t.oxw();t.xp6(1),t.Q6J("ngIf",a.erro),t.xp6(1),t.Q6J("ngIf",o.invalid&&!a.erro)}}function $(r,d){1&r&&t._UZ(0,"span",95)}const X=function(){return["nome","cnpj"]};function k(r,d){if(1&r){const o=t.EpF();t.TgZ(0,"form",6,7),t.NdJ("ngSubmit",function(){t.CHM(o);const e=t.MAs(1),n=t.oxw();return t.KtG(n.send(e))}),t.TgZ(2,"div",8)(3,"div",9)(4,"div",10)(5,"button",11),t.NdJ("click",function(){t.CHM(o);const e=t.oxw();return t.KtG(e.contratoDownload())}),t._uU(6,"Baixar PDF"),t.qZA(),t.YNc(7,J,2,0,"span",12),t.qZA()(),t.TgZ(8,"div",13)(9,"div",14)(10,"label",15),t._uU(11,"Data do contrato: "),t.TgZ(12,"span",16),t._uU(13,"*"),t.qZA()(),t.TgZ(14,"app-input-date",17),t.NdJ("valueChanges",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.data=e)}),t.qZA()(),t.TgZ(15,"div",18)(16,"label",19),t._uU(17,"N\xba do Contrato de C\xe2mbio: "),t.TgZ(18,"span",16),t._uU(19,"*"),t.qZA()(),t.TgZ(20,"input",20,21),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.numContrato=e)})("change",function(){t.CHM(o);const e=t.MAs(21),n=t.oxw();return t.KtG(n.objeto.numContrato=e.value.trim())}),t.qZA(),t.YNc(22,O,2,1,"div",22),t.qZA(),t.TgZ(23,"div",23)(24,"label",24),t._uU(25,"Tipo do Contrato de C\xe2mbio: "),t.TgZ(26,"span",16),t._uU(27,"*"),t.qZA()(),t.TgZ(28,"p-dropdown",25,26),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.tipo_Id=e)}),t.YNc(30,L,3,1,"ng-template",27),t.qZA(),t.YNc(31,q,2,1,"div",22),t.qZA(),t.TgZ(32,"div",28)(33,"label",29),t._uU(34,"Eventos: "),t.TgZ(35,"span",16),t._uU(36,"*"),t.qZA()(),t.TgZ(37,"p-dropdown",30,31),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.evento_Id=e)}),t.YNc(39,K,3,1,"ng-template",27),t.qZA(),t.YNc(40,Q,2,1,"div",22),t.qZA()(),t.TgZ(41,"div",13)(42,"div",32)(43,"label",33),t._uU(44,"Taxa Cambial: "),t.TgZ(45,"small"),t._uU(46,"(USD)"),t.qZA(),t._uU(47,"\xa0"),t.TgZ(48,"span",16),t._uU(49,"*"),t.qZA()(),t.TgZ(50,"app-input-number",34),t.NdJ("valueChanges",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.taxa=e)}),t.qZA()(),t.TgZ(51,"div",35)(52,"label",36),t._uU(53,"Valor Moeda Nacional: "),t.TgZ(54,"small"),t._uU(55,"(R$)"),t.qZA(),t._uU(56,"\xa0"),t.TgZ(57,"span",16),t._uU(58,"*"),t.qZA()(),t.TgZ(59,"app-input-number",37),t.NdJ("valueChanges",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.valorNacional=e)}),t.qZA()(),t.TgZ(60,"div",38)(61,"label",39),t._uU(62,"Percentual de Adiantamento: "),t.TgZ(63,"small"),t._uU(64,"(%)"),t.qZA(),t._uU(65,"\xa0"),t.qZA(),t.TgZ(66,"app-input-number",40),t.NdJ("valueChanges",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.percentualAdiantamento=e)}),t.qZA()(),t.TgZ(67,"div",41)(68,"label",42),t._uU(69,"RDE:"),t.qZA(),t.TgZ(70,"input",43,44),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.rde=e)})("change",function(){t.CHM(o);const e=t.MAs(71),n=t.oxw();return t.KtG(n.objeto.rde=e.value.trim())}),t.qZA()()(),t.TgZ(72,"div",13)(73,"div",45)(74,"label",46),t._uU(75,"Valor Efetivo Total (VET):"),t.qZA(),t.TgZ(76,"input",47,48),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.vet=e)}),t.qZA(),t.YNc(78,B,2,1,"div",22),t.qZA(),t.TgZ(79,"div",49)(80,"label",50),t._uU(81,"Descri\xe7\xe3o da Forma de Entrega da moeda estrangeira:"),t.qZA(),t.TgZ(82,"input",51,52),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.descricaoFormaEntrega=e)})("change",function(){t.CHM(o);const e=t.MAs(83),n=t.oxw();return t.KtG(n.objeto.descricaoFormaEntrega=e.value.trim())}),t.qZA()(),t.TgZ(84,"div",53)(85,"label",54),t._uU(86,"Liquida\xe7\xe3o At\xe9: "),t.TgZ(87,"span",16),t._uU(88,"*"),t.qZA()(),t.TgZ(89,"app-input-date",55),t.NdJ("valueChanges",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.dataLiquidacao=e)}),t.qZA()()(),t.TgZ(90,"div",13)(91,"div",56)(92,"label",57),t._uU(93,"C\xf3digo da Natureza:"),t.qZA(),t.TgZ(94,"app-input-number",58),t.NdJ("valueChanges",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.codigoNatureza=e)}),t.qZA()(),t.TgZ(95,"div",59)(96,"label",60),t._uU(97,"Descri\xe7\xe3o da Natureza do Fato:"),t.qZA(),t.TgZ(98,"input",61,62),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.descricaoNaturezaFato=e)})("change",function(){t.CHM(o);const e=t.MAs(99),n=t.oxw();return t.KtG(n.objeto.descricaoNaturezaFato=e.value.trim())}),t.qZA()()(),t.TgZ(100,"div",63)(101,"div",64)(102,"label",65),t._uU(103,"Pa\xeds do Pagador/Recebedor no Exterior:"),t.qZA(),t.TgZ(104,"p-dropdown",66,67),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.pais_Id=e)}),t.qZA()(),t.TgZ(106,"div",68)(107,"label",69),t._uU(108,"Pagador/Recebedor no Exterior:"),t.qZA(),t.TgZ(109,"input",70,71),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.pagRecExterior=e)})("change",function(){t.CHM(o);const e=t.MAs(110),n=t.oxw();return t.KtG(n.objeto.pagRecExterior=e.value.trim())}),t.qZA()(),t.TgZ(111,"div",72)(112,"label",73),t._uU(113,"C\xf3digo da Rela\xe7\xe3o de V\xednculo entre cliente e o Pagador/Recebedor:"),t.qZA(),t.TgZ(114,"input",74,75),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.codigoVinculoPagRecExterior=e)})("change",function(){t.CHM(o);const e=t.MAs(115),n=t.oxw();return t.KtG(n.objeto.codigoVinculoPagRecExterior=e.value.trim())}),t.qZA()()(),t.TgZ(116,"div",13)(117,"div",76)(118,"label",77),t._uU(119,"Especifica\xe7\xf5es: "),t.qZA(),t.TgZ(120,"textarea",78,79),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.especificacoes=e)})("change",function(){t.CHM(o);const e=t.MAs(121),n=t.oxw();return t.KtG(n.objeto.especificacoes=e.value.trim())}),t._uU(122,"                "),t.qZA()(),t.TgZ(123,"div",80)(124,"label",81),t._uU(125,"Cl\xe1usulas: "),t.qZA(),t.TgZ(126,"textarea",82,83),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.clausulas=e)})("change",function(){t.CHM(o);const e=t.MAs(127),n=t.oxw();return t.KtG(n.objeto.clausulas=e.value.trim())}),t._uU(128,"                "),t.qZA()(),t.TgZ(129,"div",84)(130,"label",85),t._uU(131,"Instru\xe7\xf5es de Recebimento/Pagamento: "),t.qZA(),t.TgZ(132,"textarea",86,87),t.NdJ("ngModelChange",function(e){t.CHM(o);const n=t.oxw();return t.KtG(n.objeto.instrucoesRecebimentoPagamento=e)})("change",function(){t.CHM(o);const e=t.MAs(133),n=t.oxw();return t.KtG(n.objeto.instrucoesRecebimentoPagamento=e.value.trim())}),t._uU(134,"                "),t.qZA()()(),t.TgZ(135,"div",88)(136,"div",10),t.YNc(137,W,3,2,"div",89),t.TgZ(138,"button",90),t.YNc(139,$,1,0,"span",91),t.TgZ(140,"span"),t._uU(141,"Salvar"),t.qZA()()()()()()}if(2&r){const o=t.MAs(1),a=t.MAs(21),e=t.MAs(29),n=t.MAs(38),b=t.MAs(77),l=t.oxw();t.xp6(5),t.Q6J("disabled",0==l.objeto.id),t.xp6(2),t.Q6J("ngIf",0==l.objeto.id),t.xp6(7),t.Q6J("valueInput",l.objeto.data)("inputId","data")("showErrorMessage",!0)("required",!0),t.xp6(6),t.Q6J("ngModel",l.objeto.numContrato),t.xp6(2),t.Q6J("ngIf",a.touched&&a.errors),t.xp6(6),t.Q6J("options",l.tipos)("ngModel",l.objeto.tipo_Id)("styleClass","form-control "+(l.loadingTipo?"form-control-loading":""))("showClear",!0)("filter",!0)("required",!0)("showClear",!0),t.xp6(3),t.Q6J("ngIf",e.touched&&e.errors),t.xp6(6),t.Q6J("options",l.eventos)("ngModel",l.objeto.evento_Id)("styleClass","form-control "+(l.loadingEvento?"form-control-loading":""))("showClear",!0)("filter",!0)("filterFields",t.DdM(88,X))("required",!0)("showClear",!0),t.xp6(3),t.Q6J("ngIf",n.touched&&n.errors),t.xp6(10),t.Q6J("valueInput",l.objeto.taxa)("inputId","taxa")("mask","separator.2")("showErrorMessage",!0)("allowNegativeNumbers",!1)("required",!0)("min",.1)("max",999999999)("autoReplaceValue",!1),t.xp6(9),t.Q6J("valueInput",l.objeto.valorNacional)("inputId","valorNacional")("mask","separator.2")("showErrorMessage",!0)("allowNegativeNumbers",!1)("required",!0)("min",.1)("max",999999999)("autoReplaceValue",!1),t.xp6(7),t.Q6J("valueInput",l.objeto.percentualAdiantamento)("inputId","percentualAdiantamento")("mask","separator.2")("showErrorMessage",!1)("allowNegativeNumbers",!1)("required",!1)("autoReplaceValue",!1)("min",0)("max",100)("suffix","%"),t.xp6(4),t.Q6J("ngModel",l.objeto.rde),t.xp6(6),t.Q6J("ngModel",l.objeto.vet),t.xp6(2),t.Q6J("ngIf",b.errors&&b.touched),t.xp6(4),t.Q6J("ngModel",l.objeto.descricaoFormaEntrega),t.xp6(7),t.Q6J("valueInput",l.objeto.dataLiquidacao)("inputId","dataLiquidacao")("showErrorMessage",!0)("required",!0),t.xp6(5),t.Q6J("valueInput",l.objeto.codigoNatureza)("inputId","codigoNatureza")("mask","00000-00-A-00-00")("showErrorMessage",!1)("allowNegativeNumbers",!1)("required",!1)("readonly",!0)("autoReplaceValue",!1),t.xp6(4),t.Q6J("ngModel",l.objeto.descricaoNaturezaFato),t.xp6(6),t.Q6J("styleClass","form-control "+(l.loadingPais?"form-control-loading":""))("showClear",!0)("options",l.paises)("ngModel",l.objeto.pais_Id)("placeholder","Selecione")("disabled",l.loadingPais)("virtualScroll",!0)("virtualScrollItemSize",10)("filter",!0),t.xp6(5),t.Q6J("ngModel",l.objeto.pagRecExterior),t.xp6(5),t.Q6J("ngModel",l.objeto.codigoVinculoPagRecExterior)("readonly",!0),t.xp6(6),t.Q6J("ngModel",l.objeto.especificacoes),t.xp6(6),t.Q6J("ngModel",l.objeto.clausulas),t.xp6(6),t.Q6J("ngModel",l.objeto.instrucoesRecebimentoPagamento),t.xp6(5),t.Q6J("ngIf",l.erro||o.invalid),t.xp6(1),t.Q6J("disabled",o.invalid||l.loading),t.xp6(1),t.Q6J("ngIf",l.loading)}}let tt=(()=>{class r{constructor(o,a,e,n,b,l,M,vt,xt,Ct){this.activatedRoute=o,this.modalService=a,this.contratoService=e,this.crypto=n,this.toastr=b,this.paisesService=l,this.loadingService=M,this.contratoTipoService=vt,this.contratoEventoService=xt,this.datepipe=Ct,this.objeto=new _.hi,this.erro="",this.loading=!1,this.subscription=[],this.contratos=[],this.isEditPage=!0,this.id=0,this.item="",this.modal=new p.u,this.tipos=[],this.loadingTipo=!0,this.eventos=[],this.loadingEvento=!0,this.instituicoes=[],this.loadingInstituicao=!0,this.paises=[],this.loadingPais=!0,this.loadingContratoFile=!1,(0,m.n)(this.paisesService.getList()).then(A=>{this.loadingPais=!1,this.paises=A}),(0,m.n)(this.contratoTipoService.getList()).then(A=>{this.tipos=A,this.loadingTipo=!1}),(0,m.n)(this.contratoEventoService.getList()).then(A=>{this.eventos=A,this.loadingEvento=!1})}encryptId(o){const a=this.crypto.encrypt(o);return null!==a?a:""}ngAfterViewInit(){this.modal.id=0,this.modal.template=this.template,this.modal.icon=this.icon,this.modal.style={"max-width":"950px",overflow:"visible"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute};var o=this.activatedRoute.params.subscribe(a=>{a.contrato_id?(this.objeto.id=this.crypto.decrypt(a.contrato_id),this.modal.title="Editar Contrato",this.modal.routerBack=["../../"],this.isEditPage=!0,(0,m.n)(this.contratoService.get(this.objeto.id)).then(e=>{this.objeto=new _.hi(e),this.objeto.dataLiquidacao=this.datepipe.transform(this.objeto.dataLiquidacao,"yyyy-MM-dd"),this.objeto.data=this.datepipe.transform(this.objeto.data,"yyyy-MM-ddTHH:mm"),setTimeout(()=>{this.modal=this.modalService.addModal(this.modal,"contrato")},200)}).catch(e=>{this.voltar()})):this.voltar()});this.subscription.push(o)}ngOnDestroy(){this.subscription.forEach(o=>o.unsubscribe())}voltar(){this.modalService.removeModal(this.modal)}contratoDownload(){var o=this;return(0,c.Z)(function*(){0!=o.objeto.id?(o.loadingContratoFile=!0,o.loadingService.message.next("Carregando Contrato."),yield(0,m.n)(o.contratoService.file(o.objeto.id)).then(a=>{o.loadingContratoFile=!1}).catch(a=>{o.loadingContratoFile=!1}),o.loadingService.message.next("")):o.toastr.error("Voc\xea deve primeiro salvar os dados para fazer o download.")})()}send(o){var a=this;return o.invalid?(this.toastr.error("Campos inv\xe1lidos"),void(this.erro="Campos inv\xe1lidos")):(this.erro="",this.loading=!0,(0,m.n)(this.contratoService.post(this.objeto)).then(function(){var e=(0,c.Z)(function*(n){0!=n.sucesso?(yield(0,m.n)(a.contratoService.getList()),a.voltar()):(a.erro=n.mensagem,a.toastr.error(n.mensagem)),a.loading=!1});return function(n){return e.apply(this,arguments)}}()).catch(e=>{this.loading=!1,this.erro=(0,x.b)(e)}))}static#t=this.\u0275fac=function(a){return new(a||r)(t.Y36(u.gz),t.Y36(p.Z),t.Y36(T.d),t.Y36(h.w),t.Y36(C._W),t.Y36(E.Z),t.Y36(s.b),t.Y36(g.M),t.Y36(Z.n),t.Y36(I.uU))};static#e=this.\u0275cmp=t.Xpm({type:r,selectors:[["app-form"]],viewQuery:function(a,e){if(1&a&&(t.Gf(S,5),t.Gf(P,5)),2&a){let n;t.iGM(n=t.CRH())&&(e.template=n.first),t.iGM(n=t.CRH())&&(e.icon=n.first)}},decls:5,vars:0,consts:[["class","align-items-center"],["icon",""],["template",""],[1,"title-icon"],["xmlns","http://www.w3.org/2000/svg","height","16","width","16","viewBox","0 0 512 512","fill","currentColor"],["d","M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],[3,"ngSubmit"],["form","ngForm"],[1,"px-3"],[1,"my-3","row"],[1,"d-flex","align-items-center"],["type","button",1,"btn","btn-dark",3,"disabled","click"],["class","ms-2 text-danger mt-1",4,"ngIf"],[1,"row"],["title","Data do Contrato",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-6","col-12"],["for","data"],[1,"text-danger"],["type","datetime-local",3,"valueInput","inputId","showErrorMessage","required","valueChanges"],["title","N\xba do Contrato de C\xe2mbio",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-6","col-12"],["for","numContrato"],["type","text","name","numContrato","id","numContrato","required","","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange","change"],["numContrato","ngModel"],[4,"ngIf"],["title","Tipos",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-6","col-12"],["for","tipo_Id"],["name","tipo_Id","inputId","tipo_Id","optionLabel","nome","optionValue","id","placeholder","Selecione um tipo",3,"options","ngModel","styleClass","showClear","filter","required","ngModelChange"],["tipo_Id","ngModel"],["pTemplate","item"],["title","Eventos",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-6","col-12"],["for","evento_Id"],["name","evento_Id","inputId","evento_Id","optionLabel","nome","optionValue","id","placeholder","Selecione um evento",3,"options","ngModel","styleClass","showClear","filter","filterFields","required","ngModelChange"],["evento_Id","ngModel"],["title","Taxa Cambial",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-12","col-12"],["for","taxa"],["suffix"," USD",3,"valueInput","inputId","mask","showErrorMessage","allowNegativeNumbers","required","min","max","autoReplaceValue","valueChanges"],["title","Valor Moeda Nacional",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-12","col-12"],["for","valorNacional"],["prefix","R$ ",3,"valueInput","inputId","mask","showErrorMessage","allowNegativeNumbers","required","min","max","autoReplaceValue","valueChanges"],["title","Percentual de Adiantamento",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-12","col-12"],["for","percentualAdiantamento"],[3,"valueInput","inputId","mask","showErrorMessage","allowNegativeNumbers","required","autoReplaceValue","min","max","suffix","valueChanges"],["title","RDE",1,"form-group","col-xl-3","col-lg-3","col-md-6","col-sm-12","col-12"],["for","rde"],["type","text","name","rde","id","rde","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange","change"],["rde","ngModel"],["title","Valor Efetivo Total (VET)",1,"form-group","col-xl-3","col-lg-3","col-md-3","col-sm-12","col-12"],["for","vet"],["type","text","name","vet","id","vet","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange"],["vet","ngModel"],["title","Descri\xe7\xe3o da Forma de Entrega da moeda estrangeira",1,"form-group","col-xl-5","col-lg-5","col-md-5","col-sm-12","col-12"],["for","descricaoFormaEntrega"],["type","text","name","descricaoFormaEntrega","id","descricaoFormaEntrega","required","","pattern","\\S(.*\\S)?","readonly","",1,"form-control",3,"ngModel","ngModelChange","change"],["descricaoFormaEntrega","ngModel"],["title","Liquida\xe7\xe3o At\xe9",1,"form-group","col-xl-4","col-lg-4","col-md-4","col-sm-12","col-12"],["for","dataLiquidacao"],["type","date",3,"valueInput","inputId","showErrorMessage","required","valueChanges"],["title","C\xf3digo da Natureza",1,"form-group","col-xl-4","col-lg-4","col-md-4","col-sm-12","col-12"],["for","codigoNatureza"],[3,"valueInput","inputId","mask","showErrorMessage","allowNegativeNumbers","required","readonly","autoReplaceValue","valueChanges"],["title","Descri\xe7\xe3o da Natureza do Fato",1,"form-group","col-xl-8","col-lg-8","col-md-8","col-sm-12","col-12"],["for","descricaoNaturezaFato"],["type","text","name","descricaoNaturezaFato","id","descricaoNaturezaFato","required","","pattern","\\S(.*\\S)?","readonly","",1,"form-control",3,"ngModel","ngModelChange","change"],["descricaoNaturezaFato","ngModel"],[1,"row","align-items-end"],["title","Pa\xeds do Pagador/Recebedor no Exterior",1,"form-group","col-xl-3","col-lg-3","col-md-3","col-sm-12","col-12"],["for","pais_Id"],["optionLabel","nome","optionValue","id","name","pais_Id","id","pais_Id","optionValue","id","filterBy","nome",3,"styleClass","showClear","options","ngModel","placeholder","disabled","virtualScroll","virtualScrollItemSize","filter","ngModelChange"],["pais_Id","ngModel"],["title","Pagador/Recebedor no Exterior",1,"form-group","col-xl-5","col-lg-5","col-md-5","col-sm-12","col-12"],["for","pagRecExterior"],["type","text","name","pagRecExterior","id","pagRecExterior","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange","change"],["pagRecExterior","ngModel"],["title","C\xf3digo da Rela\xe7\xe3o de V\xednculo entre cliente e o Pagador/Recebedor",1,"form-group","col-xl-4","col-lg-4","col-md-4","col-sm-12","col-12"],["for","codigoVinculoPagRecExterior"],["type","text","name","codigoVinculoPagRecExterior","id","codigoVinculoPagRecExterior","required","",1,"form-control",3,"ngModel","readonly","ngModelChange","change"],["codigoVinculoPagRecExterior","ngModel"],["title","Especifica\xe7\xf5es",1,"form-group","col-xl-12","col-lg-12","col-md-12","col-sm-12","col-12"],["for","especificacoes"],["name","especificacoes","id","especificacoes","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange","change"],["especificacoes","ngModel"],["title","Cl\xe1usulas",1,"form-group","col-xl-12","col-lg-12","col-md-12","col-sm-12","col-12"],["for","clausulas"],["name","clausulas","id","clausulas","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange","change"],["clausulas","ngModel"],["title","Instru\xe7\xf5es de Recebimento/Pagamento",1,"form-group","col-xl-12","col-lg-12","col-md-12","col-sm-12","col-12"],["for","instrucoesRecebimentoPagamento"],["name","instrucoesRecebimentoPagamento","id","instrucoesRecebimentoPagamento","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngModelChange","change"],["instrucoesRecebimentoPagamento","ngModel"],[1,"row","mt-2","mb-2"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","me-0","ms-auto",3,"disabled"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"ms-2","text-danger","mt-1"],["class","text-danger",4,"ngIf"],[1,"m-0"],[1,"spinner-border","spinner-border-sm","me-1"]],template:function(a,e){1&a&&(t.YNc(0,R,3,0,"ng-template",0,1,t.W1O),t.YNc(2,k,142,89,"ng-template",null,2,t.W1O),t._UZ(4,"router-outlet"))},dependencies:[I.O5,f._Y,f.Fj,f.JJ,f.JL,f.Q7,f.c5,f.On,f.F,u.lC,U.jx,N.Lt,y.l,j.K]})}return r})();var et=i(2854),ot=i(2832),nt=i(590),w=i(674),at=i(8787),rt=i(6599);function it(r,d){}let lt=(()=>{class r{constructor(o,a,e){this.table=o,this.contratoService=a,this.isMobile=e,this.faFilePdf=nt.gSj,this.maskType=ot.O,this.list=[],this.tableLinks=[],this.columns=_.SC,this.subscription=[],this.screen=w.I.lg;var n=this.contratoService.list.subscribe(M=>{this.list=Object.assign([],M)});this.subscription.push(n);var b=this.isMobile.value.subscribe(M=>this.screen=M);this.subscription.push(b),(0,m.n)(this.contratoService.getList());var l=this.table.selected.subscribe(M=>{M&&(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]}],this.tableLinks=this.table.encryptParams(this.tableLinks))});this.subscription.push(l)}ngOnDestroy(){this.subscription.forEach(o=>o.unsubscribe())}static#t=this.\u0275fac=function(a){return new(a||r)(t.Y36(at.i),t.Y36(T.d),t.Y36(w.h))};static#e=this.\u0275cmp=t.Xpm({type:r,selectors:[["app-list"]],decls:13,vars:10,consts:[[1,"page"],[1,"page__header"],[1,"title-icon","align-items-center"],["xmlns","http://www.w3.org/2000/svg","height","16","width","16","viewBox","0 0 512 512","fill","currentColor"],["d","M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],[1,"me-auto"],[1,"page__header-title"],[1,"page__body"],["topActions",""],[3,"list","topActions","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"]],template:function(a,e){if(1&a&&(t.TgZ(0,"section",0)(1,"div",1)(2,"span",2),t.O4$(),t.TgZ(3,"svg",3),t._UZ(4,"path",4),t.qZA()(),t.kcU(),t.TgZ(5,"div",5)(6,"h3",6),t._uU(7,"Contratos"),t.qZA()()(),t.TgZ(8,"div",7),t.YNc(9,it,0,0,"ng-template",null,8,t.W1O),t._UZ(11,"app-list-shared",9),t.qZA()(),t._UZ(12,"router-outlet")),2&a){const n=t.MAs(10);t.xp6(11),t.Q6J("list",e.list)("topActions",n)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",!0)("columns",e.columns)("tableLinks",e.tableLinks)("selectable",!0)}},dependencies:[u.lC,rt.o]})}return r})();var st=i(1353),ct=i(7280);const dt=[{path:"",component:lt,children:[{path:"editar/:contrato_id",component:tt,data:{modalOrder:1},children:[{path:"invoice",component:et.U,data:{modalOrder:2},children:[{path:"moeda",component:st.U,data:{modalOrder:3}}]}]},ct.D]}];let ut=(()=>{class r{static#t=this.\u0275fac=function(a){return new(a||r)};static#e=this.\u0275mod=t.oAB({type:r});static#o=this.\u0275inj=t.cJS({imports:[u.Bz.forChild(dt),u.Bz]})}return r})();var mt=i(5597),pt=i(8839),gt=i(4685),_t=i(1532),ht=i(6208);let ft=(()=>{class r{static#t=this.\u0275fac=function(a){return new(a||r)};static#e=this.\u0275mod=t.oAB({type:r});static#o=this.\u0275inj=t.cJS({imports:[I.ez,ut,mt.uH,N.kW,f.u5,pt.yI.forChild(),ht.m,gt.U$,_t._8]})}return r})()},4809:(F,v,i)=>{i.d(v,{r:()=>h});var u=i(9862),c=i(5619),_=i(9397),m=i(2096),x=i(553),p=i(9291),t=i(8787),T=i(2425);let h=(()=>{class C{constructor(s,g,Z){this.table=s,this.http=g,this.toastr=Z,this.url=x.N.url,this.list=new c.X([]),this.cidades=new c.X([])}getList(s=!1){return this.table.loading.next(!0),this.http.get(`${this.url}/banco`,{headers:new u.WM({loading:"false"})}).pipe((0,_.b)({next:g=>(g=g.map(Z=>Z),this.list.next(Object.assign([],g)),(0,m.of)(g)),error:g=>this.toastr.error("N\xe3o foi poss\xedvel carregar listagem de bancos.")}))}get(s){return this.http.get(`${this.url}/banco/${s}`,{headers:new u.WM({loading:"false"})})}create(s){return this.http.post(`${this.url}/banco`,s)}edit(s){return this.http.put(`${this.url}/banco`,s)}delete(s){return this.http.delete(`${this.url}/banco/${s}`)}getCidade(){return this.http.get(`${this.url}/cidade/`,{headers:new u.WM({loading:"false"})}).pipe((0,_.b)({next:s=>(this.cidades.next(s),(0,m.of)(s)),error:s=>this.toastr.error("N\xe3o foi poss\xedvel carregar listagem de cidades.")}))}static#t=this.\u0275fac=function(g){return new(g||C)(p.LFG(t.i),p.LFG(u.eN),p.LFG(T._W))};static#e=this.\u0275prov=p.Yz7({token:C,factory:C.\u0275fac,providedIn:"root"})}return C})()},7397:(F,v,i)=>{i.d(v,{Z:()=>T});var u=i(9862),c=i(5619),_=i(9397),m=i(2096),x=i(553),p=i(9291),t=i(2425);let T=(()=>{class h{constructor(E,s){this.http=E,this.toastr=s,this.url=x.N.url,this.list=new c.X([])}getList(E=!1){return this.http.get(`${this.url}/pais/`,{headers:new u.WM({loading:"false"})}).pipe((0,_.b)({next:s=>(this.list.next(s),(0,m.of)(s)),error:s=>this.toastr.error("N\xe3o foi poss\xedvel carregar listagem de paises.")}))}static#t=this.\u0275fac=function(s){return new(s||h)(p.LFG(u.eN),p.LFG(t._W))};static#e=this.\u0275prov=p.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"})}return h})()}}]);