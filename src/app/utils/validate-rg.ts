export function validateRG(doc: number | string) {
  var rg: string = doc.toString();

  var tryparse = parseInt(rg);
  if (Number.isNaN(tryparse))
      return false;

  // Coloque aqui a lógica específica de validação do RG

  // Exemplo de validação simples:
  // Verificar se o RG possui uma quantidade mínima de caracteres
  // Neste exemplo, consideraremos que um RG válido tenha pelo menos 7 caracteres
  if (rg.length < 7)
      return false;

  // Se a função chegar até aqui sem retornar false, significa que o RG é válido
  return true;
}
