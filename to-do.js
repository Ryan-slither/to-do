"use-strict"

class task extends HTMLElement {
    constructor(text) {
        super();
        this.text = text;
        this.className = "task";
        const checkbox = document.createElement("input");
        this.checkbox = checkbox;
        this.checkbox.type = "checkbox";
        const label = document.createElement("label");
        this.label = label;
        const br = document.createElement("br");
        this.br = br;
    }

    connectedCallback () {
        this.appendChild(this.label);
        this.label.appendChild(this.checkbox);
        this.label.append(this.text);
        this.appendChild(this.br);
    }
}

var getCheckboxes = () => {
    return document.getElementsByClassName("task");
}

var getInputText = () => {
    let inputBox = document.getElementsByName("task-input");
    let inputText = inputBox[0].value;
    inputBox[0].value = "";
    return inputText;
}

var onAdd = () => {
    let text = getInputText();
    let taskDiv = document.getElementsByClassName("tasks")[0];
    let newTask = new task(text)

    if (text.length === 0) {
        return alert("Task cannot be empty");
    } else {
        taskDiv.appendChild(newTask);
    }
}

var onRemove = () => {
    let tasks = Array.from(getCheckboxes());
    let len = tasks.length;
    for (let i = 0; i < len; ++i) {
        if (tasks[i].checkbox.checked) {
            tasks[i].remove();
        }
    }
}

customElements.define("task-label", task);

document.addEventListener("keydown", (evnt) => {
    if (evnt.key == "Enter") {
        onAdd();
    }
});