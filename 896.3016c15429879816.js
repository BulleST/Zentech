"use strict";(self.webpackChunkZenTech=self.webpackChunkZenTech||[]).push([[896],{1064:(P,C,r)=>{r.d(C,{V:()=>n}),r(5219),r(2832);class n{constructor(){this.id=0,this.nome="",this.simbolo="",this.codigo=""}}},896:(P,C,r)=>{r.r(C),r.d(C,{LogModule:()=>ia});var u=r(132),d=r(5219),n=r(2832);class A{constructor(){this.id=0,this.data=new Date,this.acao="",this.objeto="",this.entidade="",this.usuarioNome="",this.usuarioEmail=""}}class b{constructor(){this.id=0,this.inputs=[],this.data=new Date,this.acao="",this.objeto="",this.entidade="",this.usuarioNome="",this.usuarioEmail="",this.usuario_Id=void 0}}var k=[{field:"id",header:"Id",maskType:n.O.undefined,filterType:n.vA.text,filterDisplay:n.w2.menu,showAddButton:!1,showMatchMode:!0,showOperator:!1,filterMatchMode:d.a6.CONTAINS},{field:"data",header:"Data",maskType:n.O.dateTime,filterType:n.vA.datetime,filterDisplay:n.w2.menu,showAddButton:!1,showMatchMode:!0,showOperator:!1,filterMatchMode:d.a6.CONTAINS},{field:"entidade",header:"Entidade",maskType:n.O.undefined,filterType:n.vA.text,filterDisplay:n.w2.menu,showAddButton:!1,showMatchMode:!1,showOperator:!1,filterMatchMode:d.a6.CONTAINS},{field:"acao",header:"A\xe7\xe3o",maskType:n.O.options,filterType:n.vA.text,filterDisplay:n.w2.menu,showAddButton:!1,showMatchMode:!1,showOperator:!1,filterMatchMode:d.a6.EQUALS,values:[{value:"Cadastro",output:"Cadastro",class:"flag-green"},{value:"Exclus\xe3o",output:"Exclus\xe3o",class:"flag-danger"},{value:"Edi\xe7\xe3o",output:"Edi\xe7\xe3o",class:"flag-warning"},{value:"Reset de Senha",output:"Reset de Senha",class:"flag-dark"},{value:"Desabilitar Conta",output:"Desabilitar Conta",class:"flag-dark"},{value:"Habilitar Conta",output:"Habilitar Conta",class:"flag-dark"},{value:"Cadastro de Nova senha",output:"Cadastro de Nova senha",class:"flag-dark"},{value:"BR Consulta",output:"BR Consulta",class:"flag-dark"},{value:"Atribui\xe7\xe3o",output:"Atribui\xe7\xe3o",class:"flag-dark"},{value:"Importa\xe7\xe3o",output:"Importa\xe7\xe3o",class:"flag-dark"},{value:"Importa\xe7\xe3o de Opera\xe7\xf5es",output:"Importa\xe7\xe3o de Opera\xe7\xf5es",class:"flag-dark"},{value:"Importa\xe7\xe3o de Pessoas",output:"Importa\xe7\xe3o de Pessoas",class:"flag-dark"},{value:"Verifica\xe7\xe3o de Conta",output:"Verifica\xe7\xe3o de Conta",class:"flag-dark"},{value:"Esqueci minha senha",output:"Esqueci minha senha",class:"flag-dark"}]},{field:"usuarioNome",header:"Nome",colgroup:"Usu\xe1rio",maskType:n.O.undefined,filterType:n.vA.text,filterDisplay:n.w2.menu,showAddButton:!1,showMatchMode:!1,showOperator:!1,filterMatchMode:d.a6.CONTAINS},{field:"usuarioEmail",header:"E-mail",colgroup:"Usu\xe1rio",maskType:n.O.undefined,filterType:n.vA.text,filterDisplay:n.w2.menu,showAddButton:!1,showMatchMode:!1,showOperator:!1,filterMatchMode:d.a6.CONTAINS}],h=r(708),E=r(1449),a=r(9291),D=r(8787),m=r(9862),y=r(5619),f=r(9397),p=r(553),x=r(2425);let B=(()=>{class i{constructor(o,e,t){this.table=o,this.http=e,this.toastr=t,this.url=p.N.url,this.list=new y.X([]),this.loading=new y.X(!1)}getList(o=!1){return this.loading.next(o),this.table.loading.next(!0),this.http.get(`${this.url}/log-acoes`).pipe((0,f.b)(e=>{this.list.next(e),this.loading.next(!1)},e=>{this.toastr.error("N\xe3o foi poss\xedvel carregar listagem de logs.")}))}get(o){return this.http.get(`${this.url}/log-acoes/${o}`,{headers:new m.WM({loading:"true"})})}static#a=this.\u0275fac=function(e){return new(e||i)(a.LFG(D.i),a.LFG(m.eN),a.LFG(x._W))};static#t=this.\u0275prov=a.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var M=r(6814),L=r(5597),_=r(6599);function F(i,O){1&i&&a._UZ(0,"span",11)}let Z=(()=>{class i{constructor(o,e){this.table=o,this.logService=e,this.faClock=E.SZw,this.maskType=n.O,this.list=[],this.tableLinks=[],this.columns=k,this.subscription=[],this.objeto=new A,this.loading=!1;var t=this.logService.list.subscribe(c=>this.list=Object.assign([],c));this.subscription.push(t);var s=this.logService.loading.subscribe(c=>this.loading=c);this.subscription.push(s),(0,h.n)(this.logService.getList(!0));var l=this.table.selected.subscribe(c=>{c&&(this.tableLinks=[{label:"Detalhes",routePath:["detalhes"],paramsFieldName:["id"]}],this.tableLinks=this.table.encryptParams(this.tableLinks))});this.subscription.push(l)}ngOnDestroy(){this.subscription.forEach(o=>o.unsubscribe())}getList(){(0,h.n)(this.logService.getList(!0))}static#a=this.\u0275fac=function(e){return new(e||i)(a.Y36(D.i),a.Y36(B))};static#t=this.\u0275cmp=a.Xpm({type:i,selectors:[["app-list"]],decls:14,vars:12,consts:[[1,"page"],[1,"page__header"],[1,"title-icon","align-items-center"],[3,"icon"],[1,"me-auto"],[1,"page__header-title"],[1,"ms-auto"],[1,"btn","btn-dark",3,"disabled","click"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"page__body"],[3,"list","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"],[1,"spinner-border","spinner-border-sm","me-1"]],template:function(e,t){1&e&&(a.TgZ(0,"section",0)(1,"div",1)(2,"span",2),a._UZ(3,"fa-icon",3),a.qZA(),a.TgZ(4,"div",4)(5,"h3",5),a._uU(6,"Logs"),a.qZA()(),a.TgZ(7,"div",6)(8,"button",7),a.NdJ("click",function(){return t.getList()}),a.YNc(9,F,1,0,"span",8),a._uU(10,"Atualizar"),a.qZA()()(),a.TgZ(11,"div",9),a._UZ(12,"app-list-shared",10),a.qZA()(),a._UZ(13,"router-outlet")),2&e&&(a.xp6(3),a.Q6J("icon",t.faClock),a.xp6(5),a.Q6J("disabled",t.loading),a.xp6(1),a.Q6J("ngIf",t.loading),a.xp6(3),a.Q6J("list",t.list)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",!0)("columns",t.columns)("tableLinks",t.tableLinks)("selectable",!0))},dependencies:[M.O5,u.lC,L.BN,_.o]})}return i})();var w=r(5861),R=r(2855),j=r(2667),H=r(1208),W=r(3337),V=r(7397),Y=r(1433),U=r(8839);const K=["template"],z=["icon"];function J(i,O){if(1&i&&(a.TgZ(0,"span",3),a._UZ(1,"fa-icon",4),a.qZA()),2&i){const o=a.oxw();a.xp6(1),a.Q6J("icon",o.faClock)}}function G(i,O){if(1&i&&(a.TgZ(0,"tr")(1,"td",12)(2,"strong"),a._uU(3),a.qZA()(),a._UZ(4,"td",13),a.qZA()),2&i){const o=O.$implicit;a.xp6(3),a.Oqu(o[0]),a.xp6(1),a.Q6J("innerHTML",o[1],a.oJD)}}function $(i,O){if(1&i&&(a.TgZ(0,"h6",5),a._uU(1),a.qZA(),a.TgZ(2,"div",6)(3,"table",7)(4,"tbody")(5,"tr")(6,"td")(7,"strong"),a._uU(8,"Data:"),a.qZA(),a._uU(9),a.ALo(10,"date"),a.qZA(),a.TgZ(11,"td")(12,"strong"),a._uU(13,"A\xe7\xe3o:"),a.qZA(),a._uU(14),a.qZA(),a.TgZ(15,"td")(16,"strong"),a._uU(17,"Objeto da A\xe7\xe3o:"),a.qZA(),a._uU(18),a.qZA()(),a.TgZ(19,"tr")(20,"td",8)(21,"strong"),a._uU(22,"Usu\xe1rio:"),a.qZA(),a._uU(23),a.qZA()()()(),a.TgZ(24,"table",9)(25,"tbody",10),a.YNc(26,G,5,2,"tr",11),a.qZA()()()),2&i){const o=a.oxw();a.xp6(1),a.AsE("",o.obj.acao," de ",o.obj.entidade,""),a.xp6(8),a.hij(" ",a.xi3(10,8,o.obj.data,"dd/MM/yyyy '\xe0s' HH:mm"),""),a.xp6(5),a.hij(" ",o.obj.acao,""),a.xp6(4),a.hij(" ",o.obj.entidade,""),a.xp6(5),a.AsE(" ",o.obj.usuarioNome," - ",o.obj.usuarioEmail,""),a.xp6(3),a.Q6J("ngForOf",o.values)}}const q=[{path:"",component:Z,children:[{path:"detalhes/:log_id",component:(()=>{class i{constructor(o,e,t,s,l,c,v,T,g,I,S){this.activatedRoute=o,this.modalService=e,this.crypto=t,this.logService=s,this.currency=l,this.date=c,this.contratoTipoService=v,this.contratoEventoService=T,this.paisService=g,this.moedaService=I,this.mask=S,this.faClock=E.SZw,this.obj=new b,this.erro="",this.loading=!1,this.subscription=[],this.isEditPage=!1,this.modal=new R.u,this.values=[],(0,h.n)(this.paisService.getList()),(0,h.n)(this.contratoTipoService.getList()),(0,h.n)(this.contratoEventoService.getList()),(0,h.n)(this.moedaService.getList())}ngAfterViewInit(){var o=this;this.modal.id=0,this.modal.template=this.template,this.modal.icon=this.icon,this.modal.style={"max-width":"650px"},this.modal.activatedRoute=this.activatedRoute,this.modal.routerBackOptions={relativeTo:this.activatedRoute};var e=this.activatedRoute.params.subscribe(function(){var t=(0,w.Z)(function*(s){if(s.log_id){o.obj.id=o.crypto.decrypt(s.log_id),o.modal.title="Log de A\xe7\xe3o",o.modal.routerBack=["../../"],o.isEditPage=!0,0==o.logService.list.value.length&&(yield(0,h.n)(o.logService.getList()));var l=o.logService.list.value.find(c=>c.id==o.obj.id);if(!l)return void o.voltar();"string"==typeof l.objeto&&(l.objeto=JSON.parse(l.objeto)),o.obj=l,o.insereDados(o.obj.objeto),o.ordenaArray(),setTimeout(()=>{o.modal=o.modalService.addModal(o.modal,"log-acoes")},200)}});return function(s){return t.apply(this,arguments)}}());this.subscription.push(e)}formataCampos(o,e){var t=o,s=e,l=!0;switch(o){case"Id":t="Id";break;case"CodigoSwift":t="C\xf3digo Swift";break;case"Pais_Id":t="Pa\xeds";var c=this.paisService.list.value.find(N=>N.id==parseInt(s));s=c?c.nome:"Id: "+s;break;case"Invoice_Id":t="Id do Invoice";break;case"Tipo_Id":t="Tipo do Contrato";var v=this.contratoTipoService.list.value.find(N=>N.id==parseInt(s));s=v?v.nome:"Id: "+s;break;case"Evento_Id":t="Evendo do Contrato";var T=this.contratoEventoService.list.value.find(N=>N.id==parseInt(s));s=T?T.nome:"Id: "+s;break;case"Beneficiario_Id":t="Id do Benefici\xe1rio";break;case"InstituicaoFinanceira_Id":t="Id da Institui\xe7\xe3o Financeira";break;case"Moeda_Id":t="Moeda";var I=this.moedaService.list.value.find(N=>N.id==parseInt(s));s=I?I.nome:"Id: "+s;break;case"Usuario_Cadastro_Id":t="Id do Usu\xe1rio de Cadastro",l=!1;break;case"Operacao_Status_Id":t="Id do Status da Opera\xe7\xe3o";break;case"Pessoa_Id":t="Id da Pessoa";break;case"Lote_Id":t="Excel - Lote Id";break;case"Logradouro":t="Endere\xe7o";break;case"CodigoRegistro":t="C\xf3digo de Registro";break;case"DataLiquidacao":t="Data de Liquida\xe7\xe3o",s=null!=e?this.date.transform(e,"dd/MM/yyyy")??"N/A":"N/A";break;case"ValorNacional":t="Valor Nacional",s=null!=e?this.currency.transform(e,"BRL","R$ ","1.2")??"N/A":"N/A";break;case"Taxa":t="Taxa",s=null!=e?this.currency.transform(e,"BRL"," ","1.0-10")??"N/A":"N/A";break;case"NumContrato":t="N\xba do Contrato";break;case"PagRecExterior":t="Pagador/Recebedor no Exterior";break;case"PercentualAdiantamento":t="Percentual de Adiantamento",s=null!=e?this.currency.transform(e,"BRL"," ","1.0-2")+"%":"N/A";break;case"Especificacoes":t="Especifica\xe7\xf5es";break;case"Clausulas":t="Cl\xe1usulas";break;case"InstrucoesRecebimentoPagamento":t="Instru\xe7\xf5es de Recebimento/Pagamento";break;case"NumContrato":t="N\xba Contrato";break;case"Simbolo":case"Simbolo":t="S\xedmbolo";break;case"Codigo":t="C\xf3digo";break;case"DataTransacao":t="Data de Transa\xe7\xe3o",s=null!=e?this.date.transform(e,"dd/MM/yyyy")??"N/A":"N/A";break;case"Data":t="Data",s=null!=e?this.date.transform(e,"dd/MM/yyyy '\xe0s ' HH:mm")??"N/A":"N/A";break;case"DataCadastro":t="Data de Cadastro",s=null!=e?this.date.transform(e,"dd/MM/yyyy '\xe0s ' HH:mm")??"N/A":"N/A";break;case"NomeComprador":t="Nome do Comprador";break;case"PaisComprador":t="Pa\xeds do Comprador";break;case"TipoTransacao":t="Tipo de Transa\xe7\xe3o";break;case"FormaPagamento":t="Forma de Pagamento";break;case"ValorMoedaEstrangeira":t="Valor em Moeda Estrangeira",s=null!=e?this.currency.transform(e,"BRL"," ","1.2")??"N/A":"N/A";break;case"Num_Op":t="N\xba Opera\xe7\xe3o";break;case"Situacao":t="Situa\xe7\xe3o";break;case"DataInscricao":t="Excel - Data de Inscri\xe7\xe3o",s=null!=e?this.date.transform(e,"dd/MM/yyyy")??"N/A":"N/A";break;case"DataNascimento":t="Data de Nascimento",s=null!=e?this.date.transform(e,"dd/MM/yyyy")??"N/A":"N/A";break;case"NomeMae":t="Nome da M\xe3e";break;case"Email":t="E-mail";break;case"Obs":t="Observa\xe7\xf5es";break;case"Digito":t="Excel - D\xedgito";break;case"AnoObito":t="Excel - Ano \xd3bito";break;case"Excel_Status":t="Excel - Status";break;case"Excel_Data_Cap":t="Excel - Data de Capta\xe7\xe3o",s=null!=e?this.date.transform(e,"dd/MM/yyyy")??"N/A":"N/A";break;case"Excel_Hora_Cap":t="Excel - Hora de Capta\xe7\xe3o",s=null!=e?this.date.transform(e,"HH:mm")??"N/A":"N/A";break;case"Excel_IdNum":t="Excel - Id Num";break;case"Excel_Controle":t="Excel - Controle";break;case"Excel_Erro":t="Excel - Tipo Erro";break;case"BRConsulta_Status":t="BR Consulta - Status";break;case"BRConsulta_Data_Cap":t="BR Consulta - Data de Capta\xe7\xe3o",s=null!=e?this.date.transform(e,"dd/MM/yyyy")??"N/A":"N/A";break;case"BRConsulta_Hora_Cap":t="BR Consulta - Hora de Capta\xe7\xe3o",s=null!=e?this.date.transform(e,"HH:mm")??"N/A":"N/A";break;case"BRConsulta_Id_Consulta":t="BR Consulta - Id Consulta";break;case"BRConsulta_Controle":t="BR Consulta - Controle";break;case"BRConsulta_Erro":t="BR Consulta - Erro";break;case"DataAtualizacaoExcel":t="Data de Atualiza\xe7\xe3o pelo Excel",s=null!=e?this.date.transform(e,"dd/MM/yyyy '\xe0s' HH:mm")??"N/A":"N/A";break;case"DataAtualizacaoBRConsulta":t="Data de Atualiza\xe7\xe3o pelo BR Consulta",s=null!=e?this.date.transform(e,"dd/MM/yyyy '\xe0s' HH:mm")??"N/A":"N/A";break;case"PEP":t="Excel - PEP";break;case"DataConcessao":t="Data de Concess\xe3o",s=null!=e?this.date.transform(e,"dd/MM/yyyy '\xe0s' HH:mm")??"N/A":"N/A";break;case"ValorConcedido":t="Valor Concedido",s=null!=e?this.currency.transform(e,"BRL"," ","1.2")??"N/A":"N/A";break;case"Valor":t="Valor",s=null!=e?this.currency.transform(e,"BRL"," ","1.2")??"N/A":"N/A";break;case"NomeCliente":t="Nome do Cliente";break;case"CPFCliente":t="CPF do CLiente";break;case"StatusOperacao":t="Status da Opera\xe7\xe3o";break;case"LimiteConcedido":t="Limite Concedido",s=null!=e?this.currency.transform(e,"BRL"," ","1.2")??"N/A":"N/A";break;case"LimiteUtilizado":t="Limite Utilizado",s=null!=e?this.currency.transform(e,"BRL"," ","1.2")??"N/A":"N/A";break;case"LimiteAtual":t="Limite Atual",s=null!=e?this.currency.transform(e,"BRL"," ","1.2")??"N/A":"N/A";break;case"SaldoAnterior":t="Saldo Anterior",s=null!=e?this.currency.transform(e,"BRL"," ","1.2")??"N/A":"N/A";break;case"ValorOpera\xe7\xe3o":t="Valor Opera\xe7\xe3o",s=null!=e?this.currency.transform(e,"BRL"," ","1.2")??"N/A":"N/A";break;case"SaldoAtual":case"SaldoAtual":t="Saldo Atual",s=null!=e?this.currency.transform(e,"BRL"," ","1.2")??"N/A":"N/A";break;case"UsuarioCadastroNome":t="Nome do Usu\xe1rio de Cadastro";break;case"UsuarioCadastroEmail":t="E-mail do Usu\xe1rio de Cadastro";break;case"NomeBanco":t="Banco";break;case"NomePais":case"Pais":t="Pa\xeds";break;case"PerfilAcesso_Id":case"usuario_Id":l=!1;break;case"PerfilAcesso":t="Perfil";var S=JSON.parse(JSON.stringify(e));s=e&&""!=e?S.Perfil:"N/A";break;case"Name":t="Nome";break;case"TelefoneCelular":t="Telefone/Celular";break;case"StatusSaldo":t="Status Saldo";break;case"IsVerified":t="Conta Verificada pelo Usu\xe1rio",s=e?"Sim":"N\xe3o";break;case"Created":t="Data de Cadastro",s=null!=e?this.date.transform(e,"dd/MM/yyyy '\xe0s' HH:mm")??"N/A":"N/A";break;case"Updated":t="Data de \xdaltima Atualiza\xe7\xe3o",s=null!=e?this.date.transform(e,"dd/MM/yyyy '\xe0s' HH:mm")??"N/A":"N/A";break;case"DataDesativado":t="Data Desativado",s=null!=e?this.date.transform(e,"dd/MM/yyyy '\xe0s' HH:mm")??"N/A":"N/A";break;case"dataNasc":t="Data de Nascimento";break;case"cpf":t="CPF",s=null!=e?this.mask.applyMask(e.toString().padStart(11,"0"),"000.000.000-00")??"N/A":"N/A";break;case"NomeBeneficiario":case"Beneficiario":t="Benefici\xe1rio";break;case"Instituicao":t="Institui\xe7\xe3o Financeira";break;case"SituacaoCPF":t="Situa\xe7\xe3o CPF";break;default:t=o,s=null!=e&&""!=e?e:"N/A"}return[t,s=null!=s&&""!=s?s:"N/A",l]}insereDados(o){for(const[c,v]of Object.entries(o)){var e=o[c];if(null!=e&&"object"==typeof e&&"PerfilAcesso"!=c)this.insereDados(e);else{var[t,s,l]=this.formataCampos(c,v);l&&this.values.push([t,s])}}}ordenaArray(){var o=[];switch(this.obj.entidade){case"Pessoa":o=["Id","Nome","CPF","Data de Nascimento","Data de Cadastro","Situa\xe7\xe3o CPF","Saldo Atual","Status Saldo","Nome da M\xe3e","Situa\xe7\xe3o","Telefone","E-mail","Observa\xe7\xf5es","Nome do Usu\xe1rio de Cadastro","E-mail do Usu\xe1rio de Cadastro","Excel - Data de Inscri\xe7\xe3o","Excel - D\xedgito","Excel - Ano \xd3bito","Excel - Status","Excel - Data de Capta\xe7\xe3o","Excel - Hora de Capta\xe7\xe3o","Excel - Id Num","Excel - Controle","Excel - Tipo Erro","Excel - Lote Id","Excel - PEP","Data de Atualiza\xe7\xe3o pelo Excel","BR Consulta - Status","BR Consulta - Data de Capta\xe7\xe3o","BR Consulta - Hora de Capta\xe7\xe3o","BR Consulta - Id Consulta","BR Consulta - Controle","BR Consulta - Erro","Data de Atualiza\xe7\xe3o pelo BR Consulta"];break;case"Opera\xe7\xe3o":o=["Id","Nome","CPF","Data de Transa\xe7\xe3o","Data de Cadastro","Status","Valor Opera\xe7\xe3o","Saldo Anterior","Saldo Atual","N\xba Opera\xe7\xe3o","Nome do Usu\xe1rio de Cadastro","E-mail do Usu\xe1rio de Cadastro","Moeda","Valor em Moeda Estrangeira","Nome do Comprador","Pa\xeds do Comprador","Tipo de Transa\xe7\xe3o","Forma de Pagamento"];break;case"Saldo":o=["Nome","CPF","Data de Concess\xe3o","Valor Concedido","Saldo Anterior","Saldo Atual"];break;case"Banco":o=["Id","Nome","C\xf3digo Swift","Endere\xe7o","Cidade","Estado","Pa\xeds"];break;case"Benefici\xe1rio":o=["Id","Nome","C\xf3digo de Registro","Conta","Representante","Banco","C\xf3digo Swift","Endere\xe7o","Cidade","Estado","Pa\xeds"];break;case"Representante":o=["Id","Nome","C\xf3digo"];break;case"Institui\xe7\xe3o Financeira":o=["Id","Nome","C\xf3digo de Registro","Endere\xe7o","Cidade","Estado","Pa\xeds"];break;case"Invoice":o=["Id","Data","Valor","Benefici\xe1rio","Representante","Banco","Conta"];break;case"Usu\xe1rio":o=["Id","Nome","E-mail","Telefone/Celular","Perfil","Data de Cadastro","Data Desativado","Data de \xdaltima Atualiza\xe7\xe3o","Conta Verificada pelo Usu\xe1rio"];break;case"Contrato":o=["Id","Tipo","Evento","N\xba do Contrato","Data","Valor Nacional","Institui\xe7\xe3o Financeira","Benefici\xe1rio","Banco","Percentual de Adiantamento","Pagador/Recebedor no Exterior","Pa\xeds","Taxa","Data de Liquida\xe7\xe3o"]}return this.values=this.values.sort(function(e,t){return o.indexOf(e[0])-o.indexOf(t[0])}),this.values}ngOnDestroy(){this.subscription.forEach(o=>o.unsubscribe())}voltar(){this.modalService.removeModal(this.modal)}static#a=this.\u0275fac=function(e){return new(e||i)(a.Y36(u.gz),a.Y36(R.Z),a.Y36(j.w),a.Y36(B),a.Y36(M.H9),a.Y36(M.uU),a.Y36(H.M),a.Y36(W.n),a.Y36(V.Z),a.Y36(Y.g),a.Y36(U.KD))};static#t=this.\u0275cmp=a.Xpm({type:i,selectors:[["app-form"]],viewQuery:function(e,t){if(1&e&&(a.Gf(K,5),a.Gf(z,5)),2&e){let s;a.iGM(s=a.CRH())&&(t.template=s.first),a.iGM(s=a.CRH())&&(t.icon=s.first)}},decls:4,vars:0,consts:[["class","align-items-center"],["icon",""],["template",""],[1,"title-icon",2,"translate","0px 6px"],[3,"icon"],[1,"mb-2","mt-2","ms-2"],[1,"table-responsive"],[1,"table","table-striped","mt-2"],["colspan","3"],[1,"table","table-striped","mb-3"],[1,"padding-tr"],[4,"ngFor","ngForOf"],[2,"white-space","nowrap"],["colspan","2",3,"innerHTML"]],template:function(e,t){1&e&&(a.YNc(0,J,2,1,"ng-template",0,1,a.W1O),a.YNc(2,$,27,11,"ng-template",null,2,a.W1O))},dependencies:[M.sg,L.BN,M.uU],styles:[".table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{color:#433f3f;padding-top:7px;padding-bottom:7px}tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{white-space:unset;text-wrap:wrap}.table[_ngcontent-%COMP%]   .padding-tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding-top:7px;padding-bottom:7px}"]})}return i})(),data:{modalOrder:1}},r(7280).D]}];let aa=(()=>{class i{static#a=this.\u0275fac=function(e){return new(e||i)};static#t=this.\u0275mod=a.oAB({type:i});static#e=this.\u0275inj=a.cJS({imports:[u.Bz.forChild(q),u.Bz]})}return i})();var ta=r(2352),ea=r(6223),oa=r(6208),sa=r(4685),ra=r(1532);let ia=(()=>{class i{static#a=this.\u0275fac=function(e){return new(e||i)};static#t=this.\u0275mod=a.oAB({type:i});static#e=this.\u0275inj=a.cJS({imports:[M.ez,aa,L.uH,ta.kW,ea.u5,U.yI.forChild(),oa.m,sa.U$,ra._8]})}return i})()},1433:(P,C,r)=>{r.d(C,{g:()=>D});var u=r(9862),d=r(5619),n=r(9397),A=r(2096),b=r(553),k=r(1064),h=r(9291),E=r(8787),a=r(2425);let D=(()=>{class m{constructor(f,p,x){this.table=f,this.http=p,this.toastr=x,this.url=b.N.url,this.list=new d.X([]),this.object=new d.X(new k.V),this.loading=new d.X(!1)}getList(f=!1){return this.http.get(`${this.url}/moeda/`).pipe((0,n.b)({next:p=>(this.list.next(p),(0,A.of)(p)),error:p=>this.toastr.error("N\xe3o foi poss\xedvel carregar listagem de moedas.")}))}get(f){return this.http.get(`${this.url}/moeda/${f}`,{headers:new u.WM({loading:"true"})}).pipe((0,n.b)({next:p=>(this.object.next(Object.assign({},p)),(0,A.of)(p)),error:p=>this.toastr.error("N\xe3o foi poss\xedvel carregar listagem de moedas.")}))}send(f){return this.http.post(`${this.url}/moeda`,f)}delete(f){return this.http.delete(`${this.url}/moeda/${f}`)}static#a=this.\u0275fac=function(p){return new(p||m)(h.LFG(E.i),h.LFG(u.eN),h.LFG(a._W))};static#t=this.\u0275prov=h.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"})}return m})()},7397:(P,C,r)=>{r.d(C,{Z:()=>E});var u=r(5619),d=r(9397),n=r(2096),A=r(553),b=r(9291),k=r(9862),h=r(2425);let E=(()=>{class a{constructor(m,y){this.http=m,this.toastr=y,this.url=A.N.url,this.list=new u.X([]),this.loading=new u.X(!1)}getList(){return this.http.get(`${this.url}/pais/`).pipe((0,d.b)({next:m=>(this.list.next(m),(0,n.of)(m)),error:m=>this.toastr.error("N\xe3o foi poss\xedvel carregar listagem de paises.")}))}static#a=this.\u0275fac=function(y){return new(y||a)(b.LFG(k.eN),b.LFG(h._W))};static#t=this.\u0275prov=b.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})()}}]);