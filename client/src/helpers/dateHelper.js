function dateHelper(date) {
  const currDate = new Date(date);
  return `postado dia ${currDate.getDate()} do ${
    (currDate.getMonth() < 10 ? '0' : '') + (currDate.getMonth() + 1)
  } de ${currDate.getFullYear()} às ${currDate.getHours()}:${
    (currDate.getMinutes() < 10 ? '0' : '') + currDate.getMinutes()
  }`;
}

export default dateHelper;
