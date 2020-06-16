function dateHelper(date) {
  const arr1 = date.split('-');
  console.log(arr1);
  const arr2 = arr1[2].split(':');
  console.log(arr2);
  const arr3 = arr2[0].split('T');
  console.log(arr3);
  return `postado dia ${arr3[0]} do ${arr1[1]} de ${arr1[0]} às ${
    arr3[1] - 3
  }:${arr2[1]}`;
}

export default dateHelper;
