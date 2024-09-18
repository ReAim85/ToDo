let todos = [];
        function addTodo() {
            todos.push({
                title: document.querySelector("#input1").value,
                description: document.querySelector("#input2").value,
                need: document.querySelector("#need").value,
                location: 'droppableSpace1'
            })
            render();
        }

        function deleteTodo(index) {
            todos.splice(index, 1);
            render();
        }

        function render(){
            let todoContainer = document.querySelector("#droppableSpace1");
            todoContainer.innerHTML = "";

        const today = new Date();
        const month = today.toLocaleString('default', { month: 'long' });
        const day = today.getDate();
        const year = today.getFullYear();
        const formattedDate = `${month} ${day}, ${year}`;

            todos.forEach ((todo, index) => {
                if(todo.location === 'droppableSpace1'){
                let div = document.createElement("div");
                div.setAttribute("id", `card-${todos.indexOf(todo)}`)
                div.setAttribute("draggable", "true")
                let h3 = document.createElement("h3");
                h3.textContent = todo.title;
                let P = document.createElement("p");
                P.textContent = todo.description;
                let span = document.createElement("span");
                let dateSpan = document.createElement("span")
                let timeIcon = document.createElement("i")
                let closeIcon = document.createElement("i")

                closeIcon.classList.add("fas", "fa-times")
                closeIcon.setAttribute("onClick", `deleteTodo(${index})`)
                
                span.textContent = todo.need;
                span.setAttribute("id", "difficulty")
                
                dateSpan.setAttribute("id", 'date');
                dateSpan.textContent = formattedDate;

                timeIcon.classList.add("fas", "fa-clock");

                if(span.innerHTML === "easy") {
                    span.setAttribute("style", "background-color: green;")
                }else if(span.innerHTML === "medium") {
                    span.setAttribute("style", "background-color: #ffbd59;")
                }else if(span.innerHTML === "hard") {
                    span.setAttribute("style", "background-color: red;")
                }

                div.appendChild(h3);
                div.appendChild(P);
                div.appendChild(span);
                div.appendChild(timeIcon);
                div.appendChild(dateSpan);
                div.appendChild(closeIcon)
                document.querySelector("#droppableSpace1").appendChild(div);
                

                div.addEventListener('dragstart', (event) => {
                    event.dataTransfer.setData('text/plain', event.currentTarget.id);
                });
                }
                
            })
        }


        //code for drag and drop function
        function updateTodoLocation(todoId, newLocation) {
            const todo = todos.find(t => `card-${todos.indexOf(t)}` === todoId);
            if (todo) {
                todo.location = newLocation;
            }
        }

        function setupDroppableArea(areaId) {
            const droppableArea = document.getElementById(areaId);
        
            droppableArea.addEventListener('drop', (event) => {
                event.preventDefault();
                const data = event.dataTransfer.getData('text/plain');
                const draggableElement = document.getElementById(data);
                if (draggableElement) {
                    droppableArea.appendChild(draggableElement);
                    updateTodoLocation(data, areaId)
                }
            });
        
            droppableArea.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
        }


    setupDroppableArea('droppableSpace1');
    setupDroppableArea('droppableSpace2');
    setupDroppableArea('droppableSpace3');
    setupDroppableArea('droppableSpace4');