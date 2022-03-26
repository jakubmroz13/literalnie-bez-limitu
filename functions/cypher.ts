type polishLetters = {
  [index: string]: string
}

export const encrypt = (text: string) => {
  let res = ''
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  for(let i =0;i<8;++i) {
    res += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  
  const polishLetters: polishLetters = {
    'ą': '0',
    'ć': '1',
    'ę': '2',
    'ł': '3',
    'ń': '4',
    'ó': '5',
    'ś': '6',
    'ź': '7',
    'ż': '8'
  }

  for (let i = 0; i < text.length; i++) {
    if (alphabet.includes(text[i])) {
      let num = (alphabet.indexOf(text[i]) + 13) % alphabet.length
      res += alphabet[num]
    } else {
      res += polishLetters[text[i]]
    }
  }

  for(let i =0;i<3;++i) {
    res += alphabet[Math.floor(Math.random() * alphabet.length)]
  }

  return res
}

export const decrypt = (text: string) => {
  let res = ''
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  const polishLetters: polishLetters = {
    '0': 'ą',
    '1': 'ć',
    '2': 'ę',
    '3': 'ł',
    '4': 'ń',
    '5': 'ó',
    '6': 'ś',
    '7': 'ź',
    '8': 'ż'
  }

  text = text.slice(8, -3)

  for (let i = 0; i < text.length; i++) {
    if (alphabet.includes(text[i])) {
      let num = (alphabet.indexOf(text[i]) - 13 + alphabet.length) % alphabet.length
      res += alphabet[num]
    } else {
      res += polishLetters[text[i]]
    }
  }

  return res
}
