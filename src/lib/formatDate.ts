export function formatDate(string: string) {
  const month = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const date = new Date(string);

  const dd = date.getDate();
  const mm = date.getMonth();
  const yyyy = date.getFullYear();

  return `${dd} de ${month[mm]} de ${yyyy}`;
}
