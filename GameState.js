const params = new URLSearchParams(window.location.search);

// Add any items or states here, the value will be the key used in the query parameters and should be
// as short as possible to save space.
const inventoryKey = {
  hasScratchOff: "a",
  hasHat: "b"
};

// Pass in a `inventoryKey` to see if it exists for the current game state.
// eg if(valueForKey(inventoryKey.hasShovel) != null) { ... }
function valueForKey(itemKey) {
  return params.get(itemKey);
}

function makeUpdate(key, value) {
  const updates = new Map();
  updates[key] = value;
  return updates;
}

// Title will be the link title, href should be the name of the html page, without ext
// inventoryUpdate should be a Map with inventoryKey keys and values. A `null` value
// will remove the key from the query.
//
// Values for the keys can be any standard text. For example, you can track a number of
// wishes, a word, or just a 1 to indicate a state exists.
//
// const updates = new Map(); 
// updates[inventoryKey.hasShovel] = 1; <- adding a shovel
// updates[inventoryKey.hasHat] = null; <- removing a hat
// addLink("Link Name", "htmlFileName", updates);
//
function addLink(title, href, inventoryUpdate) {
  const paramsCopy = new URLSearchParams(params.toString());
  for (key in inventoryUpdate) {
    if (inventoryUpdate[key] == null) {
      paramsCopy.delete(key);
    } else {
      paramsCopy.set(key, inventoryUpdate[key]);
    }
  }
  var a = document.createElement("a");
  var linkText = document.createTextNode(title);
  a.appendChild(linkText);
  a.title = title;
  a.href = "./" + href + ".html" + "?" + paramsCopy.toString();

  var links = document.getElementById("links");
  links.appendChild(a);

  var br = document.createElement("br");
  links.appendChild(br);
}
