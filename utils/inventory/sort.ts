export const naturalSort = (a: string, b: string) => {
  const leadingNonNumeric = /^\D+/;
  const leadingNumeric = /^\d+/;

  const aLeadingNonNumeric = leadingNonNumeric.exec(a);
  const bLeadingNonNumeric = leadingNonNumeric.exec(b);

  if (aLeadingNonNumeric && bLeadingNonNumeric) {
    const aNonNumeric = aLeadingNonNumeric[0];
    const bNonNumeric = bLeadingNonNumeric[0];

    if (aNonNumeric === bNonNumeric) {
      const aRemaining = a.slice(aNonNumeric.length);
      const bRemaining = b.slice(bNonNumeric.length);
      const aNumeric = leadingNumeric.exec(aRemaining);
      const bNumeric = leadingNumeric.exec(bRemaining);

      if (aRemaining === "" && bRemaining !== "") return -1;
      if (aRemaining !== "" && bRemaining === "") return 1;
      if (!aNumeric && bNumeric) return -1;
      if (aNumeric && !bNumeric) return 1;
    }
  }

  const re = /(\d+)|(\D+)/g;
  const aMatch = a.match(re);
  const bMatch = b.match(re);

  while (!!aMatch && aMatch.length && !!bMatch && bMatch.length) {
    const aChunk = aMatch.shift();
    const bChunk = bMatch.shift();

    if (aChunk === undefined || bChunk === undefined) {
      return (
        aMatch.length + (aChunk ? 1 : 0) - (bMatch.length + (bChunk ? 1 : 0))
      );
    }

    let cmpResult = 0;
    if (isNaN(parseFloat(aChunk)) || isNaN(parseFloat(bChunk))) {
      cmpResult = aChunk.localeCompare(bChunk);
    } else {
      cmpResult = parseInt(aChunk, 10) - parseInt(bChunk, 10);
    }

    if (cmpResult !== 0) return cmpResult;
  }

  return (aMatch ? aMatch.length : 0) - (bMatch ? bMatch.length : 0);
};
