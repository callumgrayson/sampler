export default {
  RangeSample: (min, max, size) => {
    let len = 0
    let rand = 0
    let digitsArr = []
    let sampleDigits = []

    // make an array of digits min to max
    for (let i = min; i <= max; i++) {
      digitsArr.push(i)
    }

    len = digitsArr.length

    // Cut digits from Array one-by-one
    for (let i = 0; i < size; i++) {
      // generate rand * len
      rand = Math.floor(Math.random() * len)
      // remove items from digits array
      let cutDigit = digitsArr.splice(rand, 1)[0]
      sampleDigits.push(cutDigit)
      len--
    }

    return sampleDigits
  }
}