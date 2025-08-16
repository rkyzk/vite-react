const Test = () => {
  const str = "John Smith";
  if (str.match(/^[a-zA-Z\s-]{1,20}$/)) console.log(str);
};

export default Test;
