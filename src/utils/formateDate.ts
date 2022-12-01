export function formateDate(data: Date) {
  return data.toLocaleDateString('pt-br', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formateDateString(date: string) {
  const data = new Date(date)
  return data.toLocaleDateString()
}
