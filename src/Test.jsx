const Test = () => {
  let newElem = "<p>new element!</p>";
  const handleChange = () => {
    let box = document.getElementById("test");
    let newElem = document.createElement("div");
    let newElemChild1 = document.createChild("input");
    let newElemChild2 = document.createChild("input");
    let newElemChild3 = document.createChild("input");
  };
  return (
    <div id="test">
      <h1>hi</h1>
      <button onClick="handleChange">click</button>
    </div>
  );
};

export default Test;
