var selectedOptions = []; // Variable to store the selected options
let dummydata = ['Apple', 'Pear', 'Banana'];

//localStorage.clear();


        function openModal(modalId) {
            var modal = document.getElementById(modalId);
            modal.style.display = 'block';
            if (modalId==='loadRace') {
                populateListbox('listbox');
            }
        }

        function closeModal(modalId) {
            var modal = document.getElementById(modalId);
            modal.style.display = 'none';
        }

        function loadSelectedRace(modalId) {
            var listbox = document.getElementById('listbox');
            selectedOptions = Array.from(listbox.options)
                .filter(function(option) {
                    return option.selected && option.value !== '';
                })
                .map(function(option) {
                    return option.value;
                });
            closeModal(modalId);
            loadRaceTable(selectedOptions[0]);
        }

        function deleteSelectedRace(modalId) {
            const result = confirm("Supprimer les données ?");
            if (result === false) {
                return
            } else {
            removeItem();
            populateListbox('listbox');
            }
        }


        function populateListbox(selectId) {
            let select = document.getElementById(selectId);
            select.innerHTML = ''; // first erase the listBox 
            var defaultElement = document.createElement("option");
            defaultElement.disabled = true;
            defaultElement.selected = true;
            defaultElement.value = "";
            defaultElement.textContent = "Sélectionnez un parcours";
            select.appendChild(defaultElement);
            if (localStorage.length>0){
                for (var i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key(i);
                    let newOption = document.createElement("option");
                    newOption.text = key;
                    select.appendChild(newOption);
                } 
            }
        }

            
      function addItem(modalId) {
        let itemName = document.getElementById("inputField").value;
        if (itemName==="") {return;}
        let arrayString = JSON.stringify(dummydata);
        localStorage.setItem(itemName, arrayString);
        closeModal(modalId);
        document.getElementById("inputField").value="";
      }

      function removeItem() {
        let select = document.getElementById("listbox");
        let selectedOption = select.options[select.selectedIndex];
        let itemName = selectedOption.textContent;
        select.remove(select.selectedIndex);
        localStorage.removeItem(itemName);
      }

    function loadRaceTable(key) {
        let storedArrayString = localStorage.getItem(key);
        let storedArray = JSON.parse(storedArrayString);
        data = storedArray;
        console.log(data);
    }


      function listFiles() {
        let listFiles = [];
        for (var i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            listFiles.push(key);
        } 
        //return listFiles;
        console.log(listFiles);
      }
      