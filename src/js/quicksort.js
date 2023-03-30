// Funcao para ordenar um array - QuickSort

// Complexidade é de O(nlogn), uma vez que o
// array é dividido em um pivô, para referência,
// e em outras partes, sucessivamente.

export default function quickSortAlgo(origArray) {
  if (origArray.length <= 1) {
    return origArray
  } else {
    var left = []
    var right = []
    var newArray = []
    var pivot = origArray.pop()
    var length = origArray.length
    for (var i = 0; i < length; i++) {
      if (origArray[i] <= pivot) {
        left.push(origArray[i])
      } else {
        right.push(origArray[i])
      }
    }
    return newArray.concat(quickSortAlgo(left), pivot, quickSortAlgo(right))
  }
}
