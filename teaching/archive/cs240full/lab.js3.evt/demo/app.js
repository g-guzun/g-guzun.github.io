// add an event for keypress
let inputNode = document.querySelector("input[name='itemName']");
inputNode.addEventListener("keydown", function (evt) {
  if (evt.code === "Enter" && inputNode.value !== "") {
    // try to find existing item (case insensitive)
    let ul = document.querySelector("#list");

    // convert list of children to an array of children
    // add item only if it doesn't already exist
    let itemsArr = Array.from(ul.children);
    if (!itemsArr.some((li) => li.lastChild.innerHTML === inputNode.value)) {
      // create children of item node
      let itemName = document.createElement("span");
      itemName.innerHTML = inputNode.value;

      // make a new checkbox, with an event listener for checking
      let chkbox = document.createElement("input");
      chkbox.type = "checkbox";
      chkbox.addEventListener("change", function () {
        // if checked, add '.itemChecked' css class style
        if (chkbox.checked) {
          chkbox.parentElement.classList.add("itemChecked");
        } else {
          chkbox.parentElement.classList.remove("itemChecked");
        }
      });

      // create the new list item element <li>
      let newListItem = document.createElement("li");

      // append the <input type="checkbox"> and the <span>
      newListItem.appendChild(chkbox);
      newListItem.appendChild(itemName);

      // append to the list
      // find position to insert into
      let pos = 0;
      while (
        pos < ul.children.length &&
        inputNode.value.toLowerCase() >
          ul.children[pos].lastChild.innerHTML.toLowerCase()
      ) {
        pos++;
      }
      if (pos > ul.children.length - 1) {
        ul.appendChild(newListItem);
      } else {
        ul.insertBefore(newListItem, ul.children[pos]);
      }
    }
    // clear out input field
    inputNode.value = "";
  }
});
