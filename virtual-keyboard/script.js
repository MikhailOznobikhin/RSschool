const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?","done",
      "space"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "p", "enter", "done"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;
        
        case "shift":
          keyElement.innerHTML = "Shift"

          keyElement.addEventListener("click", () => {
            this._toggleShift(true);
          });
  
          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            const symbolEn = [ ")", "!",  "@", "#", "$", "%", "^", "&", "*", "("];
            const symbolRu = [")", "!", "\"", "№", ";", "%", ":", "?", "*", "("];
            
            if(!isNaN(parseInt(key)) && this.properties.shift){
              this.properties.value += symbolEn[parseInt(key)]
            }else{
              this.properties.value += this.properties.capsLock !== this.properties.shift ? key.toUpperCase() : key.toLowerCase();
            } 
            this._toggleShift(false)
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
    if(document.querySelectorAll(".use-keyboard-input")[0].value.length !== 0){
      document.querySelectorAll(".use-keyboard-input")[0].focus()
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock !== this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        if(key.textContent.toUpperCase() === 'SHIFT'){
          key.textContent = 'Shift'
        }
      } 
    }
  },

  _toggleShift(s = false) {
    const symbolEn = ["!",  "@", "#", "$", "%", "^", "&", "*", "(", ")"];
    const symbolRu = ["!", "\"", "№", ";", "%", ":", "?", "*", "(", ")"];
    const orgigin = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    let i = 0;
    this.properties.shift = s ? !this.properties.shift : false;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if(this.properties.capsLock !== this.properties.shift){
          key.textContent = key.textContent.toUpperCase();
          if(i < 10){
            key.textContent = symbolEn[i];
          }          
        }else{
          key.textContent = key.textContent.toLowerCase();
          if(i < 10){
            key.textContent = orgigin[i];
          }
        }
        if(key.textContent.toUpperCase() === 'SHIFT'){
          key.textContent = 'Shift'
        }
      } 
      i += 1;
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});