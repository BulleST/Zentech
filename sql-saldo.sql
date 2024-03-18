
DECLARE @BancoId INT;
IF NOT EXISTS (SELECT Id FROM Banco WHERE CodigoSwift = 'PCBCCNBJGDZ')
	BEGIN
		INSERT INTO Banco (Nome, Logradouro, CodigoSwift, Pais_Id, Empresa_Id) 
		VALUES ('Nome Banco', 'Logradouro Banco', 'PCBCCNBJGDZ', (SELECT TOP 1 Id FROM Pais WHERE Codigo LIKE '%CN%'), 27);

		-- Get the newly inserted Banco's Id
		SET @BancoId = SCOPE_IDENTITY();
	END
ELSE
	BEGIN
		-- Banco with specified CodigoSwift already exists, so just get its Id
		SET @BancoId = (SELECT TOP 1 Id FROM Banco WHERE CodigoSwift = 'PCBCCNBJGDZ')
	END

INSERT INTO Beneficiario (Nome, CodigoRegistro, Logradouro, Conta, Pais_Id, Banco_Id)
VALUES ('Nome Beneficiario'
        , 'CodigoRegistro Beneficiario'
        , 'Logradouro Beneficiario'
        , 'Conta Beneficiario'
        , ( SELECT TOP (1) Id FROM Pais Where Codigo Like '%TW%' ) -- Pais_Id
        , @BancoId
		)


=


"DECLARE @BancoId INT;
IF NOT EXISTS (SELECT Id FROM Banco WHERE CodigoSwift = 'SCSBTWTP027 ')
        BEGIN
                INSERT INTO Banco (Nome, Logradouro, CodigoSwift, Pais_Id, Empresa_Id) 
                VALUES ('SHANGHAI COMMERCIAL AND SAVINGS BANK, LTD', 'MIN CHUAN WEST ROAD, 69, FLOOR 3, ZHONGSHAN DISTRICT, TP CITY ', 'SCSBTWTP027 , (SELECT TOP 1 Id FROM Pais WHERE Codigo LIKE '%TW%'), 27);
                SET @BancoId = SCOPE_IDENTITY();
        END
ELSE
        BEGIN
                
                SET @BancoId = (SELECT TOP 1 Id FROM Banco WHERE CodigoSwift = 'SCSBTWTP027 ')
        END

INSERT INTO Beneficiario (Nome, CodigoRegistro, Logradouro, Conta, Pais_Id, Banco_Id)
VALUES ('INFINITY GROUP TRADE'
        , '12511342'
        , 'NO. 8, LN. 15, BAO` NA RD., YONG` AN DIST., KAOHSIUNG CITY'
        , '27-108-000505364'
        , ( SELECT TOP (1) Id FROM Pais Where Codigo Like '%TW%' )
        , @BancoId
                )"
                