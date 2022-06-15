export function formatMoney(num, decimal_count = 2) {
    if (num === undefined || num === null || num === '' || isNaN(Number(num))) return ''
  
    num = Number(num).toFixed(decimal_count)
    num = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return num
  }