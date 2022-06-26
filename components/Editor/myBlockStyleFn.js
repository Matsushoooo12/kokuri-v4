const myBlockStyleFn = (contentBlock) => {
  const type = contentBlock?.getType();
  switch (type) {
    case "header-one":
      return "h1";
    case "header-two":
      return "h2";
    case "unstyled":
      return "unstyled";
    case "blockquote":
      return "blockquote";
    case "code-block":
      return "code-block";
  }
  return "";
};

export default myBlockStyleFn;
