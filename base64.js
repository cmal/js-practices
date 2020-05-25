// TODO: support unicode

const charTable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

const base64 = (str) => {
  if(!str) return ''
  const res = []
  const binStr = strToBin(str)
  return binToStr(binStr)
}

const strToBin = (str) => {
  let res = ''
  let i = 0
  for(; i < str.length; i ++) {
    let code = parseInt('' + str.charCodeAt(i)).toString(2);
    while (code.length < 8) {
      code = '0' + code
    }
    res += code;
  }
  return res
}

const binToStr = (str) => {
  let res = ''
  while (str.length > 0) {
    let code = str.slice(0, 6)
    if (code.length == 6) {
      res += charTable[parseInt(code, 2)]
      str = str.slice(6)
    } else {
      // code.length only has TWO cases: 2, or 4
      // if 2, suffix = '=='
      // if 4, suffix = '='
      let suffix = '='
      if (code.length == 2) {
        suffix = '=='
      }
      while(code.length < 6) {
        code = code + '0'
      }
      res += charTable[parseInt(code, 2)] + suffix
      str = ''
    }
  }
  return res
}

exports.base64 = base64;
