'use strict';


let empty = ['', '', '', '', '', '', '',''];
let outputArray = [];
let tabPressed = false;

/***************************************************************************************                   
 * 
 *                                        INPUT  
 * 
 ***************************************************************************************/

window.onload = function() {
  // add the first line of the table
  addLine('inputTable',empty);
  clearTableContainer('resultTableContainer');
  document.getElementById("printButton").style.display = "none";
  document.getElementById("exportButton").style.display = "none";
  document.getElementById("analyseButton").style.display = "none";
};

document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('startTime');
  input.addEventListener('input', function(e) {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, ''); // -> removes non-numerical characters
    e.target.value = inputValue;
  });
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Tab') {
      tabPressed = true;
  } else {
      tabPressed = false;
  }
});

function addLine(tableId, dataArray) {
  var table = document.getElementById(tableId);
  var tbodyRowCount = table.tBodies[0].rows.length;
  var row = table.insertRow(tbodyRowCount);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);
  cell1.innerHTML = "<input type='text' placeholder='Désignation' maxlength='20' required onblur='checkAllRequiredFields(this)' value='" + dataArray[0] + "'>";
  cell2.innerHTML = "<input type='text' class='distanceInput' placeholder='km' maxlength='6'required onblur='checkAllRequiredFields(this)' value='" + dataArray[1] + "'>";
  cell3.innerHTML = "<input type='text' class='elevationInput' placeholder='m' maxlength='6' required onblur='checkAllRequiredFields(this)' value='" + dataArray[2] + "'>";
  cell4.innerHTML = "<input type='text' class='elevationInput' placeholder='m' maxlength='6' required onblur='checkAllRequiredFields(this)' value='" + dataArray[3] + "'>";
  cell5.innerHTML = "<input type='text' placeholder='Liquide/Solide/Autre' maxlength='20' value='" + dataArray[4] + "'>";
  cell6.innerHTML = "<input type='text' class='timeInput' placeholder='hhmm' maxlength='4' onblur='formatTimeInput(this)' value='" + dataArray[5] + "'>";
  cell7.innerHTML = "<input type='text' class='numericalInput' placeholder='min' maxlength='3' value='" + dataArray[6] + "'>";
  cell8.innerHTML = "<input type='text' class='numericalInput' placeholder='kme/h' maxlength='2' required onblur='checkAllRequiredFields(this)' value='" + dataArray[7] + "'>";
  insertButtonCell(row);
  // Attach an event listener to each newly created 'timeInput' element
  var newTimeInput = row.querySelector('.timeInput');
  newTimeInput.addEventListener('input', function(e) {
    let input = e.target.value;
    input = input.replace(/\D/g, ''); // -> removes non numerical characters
    e.target.value = input;
  });
  // Attach an event listener to each newly created 'distanceInput' element
  var newDistanceInputs = row.querySelectorAll('.distanceInput');
  newDistanceInputs.forEach(function(input) {
    input.addEventListener('input', function(e) {
      let input = e.target.value;
      input = input.replace(/[^0-9.]/g, ''); // -> removes non numerical characters except dot
      if (input.length>1) {
        input = input.replace(/^0+/, ''); // -> remove leading 0
      }
      e.target.value = input;
    });
  });
  // Attach an event listener to each newly created 'elevationInput' element
  var newElevationInputs = row.querySelectorAll('.elevationInput');
  newElevationInputs.forEach(function(input) {
    input.addEventListener('input', function(e) {
      let input = e.target.value;
      input = input.replace(/\D/g, ''); // -> removes non numerical characters
      if (input.length>1) {
        input = input.replace(/^0+/, ''); // -> remove leading 0
        input = input.replace(/\B(?=(\d{3})+(?!\d))/g, " "); // -> add a space separator between groups of 3 digits
      }
      e.target.value = input;
    });
  });
 // Attach an event listener to each newly created 'numericalInput' element
 var newNumericalInputs = row.querySelectorAll('.numericalInput');
 newNumericalInputs.forEach(function(input) {
   input.addEventListener('input', function(e) {
     let input = e.target.value;
     input = input.replace(/\D/g, ''); // -> removes non numerical characters
     if (input.length>1) {
      input = input.replace(/^0+/, ''); // -> remove leading 0
     }
     e.target.value = input;
   });
 });
  // Set focus to the new line (after a short delay to ensure the new element is fully rendered and accessible)
  setTimeout(function() {
    cell1.querySelector('input').focus();
  }, 100);
}
        
function deleteLine(tableId) {
  const table = document.getElementById(tableId);
  const tbodyRowCount = table.tBodies[0].rows.length;
  if (tbodyRowCount > 2) {
    table.deleteRow(tbodyRowCount-1);
  }
  if (tbodyRowCount === 2) {
    addLine('inputTable',empty);
  }
  clearTableContainer('resultTableContainer');
}

function checkAllRequiredFields(input) {
  if (tabPressed) {
    const row = input.closest('tr');
    const cells = row.cells;
    for (let i = 0; i < cells.length; i++) {
      const cellInput = cells[i].querySelector('input');
      // check if the cell is empty and if the input is required
      if (cellInput && (cellInput.value.trim() === '' && cellInput.hasAttribute('required'))) {
        return; // -> exit function if a single required cell in the current row is empty
      }
    }
    // add line
    const table = input.closest('table');
    if (table.tBodies[0].rows.length - row.rowIndex == 1) {
      addLine('inputTable',empty);
    }
  }
}

function formatTimeInput(timeField) {
  if (timeField.value.length>0) {
    const paddedDigits = timeField.value.padStart(4, '0');
    const hrs = paddedDigits.substring(0, 2);
    const min = paddedDigits.substring(2,4);
    formattedTime = hrs + ':' + min;
    if (parseInt(hrs)>23 || parseInt(min)>59) {
      alert(formattedTime + " n'est pas un format d'heure valide");
      formattedTime="";
    }
    timeField.value = formattedTime;
  }
}

function checkInputTable(tableId) {
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName("tr");
  if (rows.length < 3){
    return true;
    console.log("input table has less than 2 rows including header")
  }
  let incompleteRows = [];
  for (let i = rows.length - 1; i >= 2; i--) {
    const cells = rows[i].getElementsByTagName("td");
    let missingRequiredField = false;
    for (let j = 0; j < cells.length-1; j++) {
      const cellInput = cells[j].querySelector("input");
      if (cellInput.value.trim() === '' && cellInput.hasAttribute('required')) {
        missingRequiredField = true;
        incompleteRows = incompleteRows + ", " + (i-1);
        break;
      }
    }
    if (missingRequiredField) {
      alert("Des champs obligatoires sont manquants à la ligne: " + incompleteRows);
      return true;
    }
  }
  return false;
}


function deleteEmptyRows(tableId) {
  const table = document.getElementById(tableId);
  let rows = table.getElementsByTagName("tr");
  for (let i = rows.length - 1; i >= 2; i--) { // table starts at row 2 because there are 2 header rows and stop at rows-1 because there is a footer row
    const cells = rows[i].getElementsByTagName("td");
    let isEmptyRow = true;
    for (let j = 0; j < cells.length; j++) {
      const cellInput = cells[j].querySelector("input");
      if (cellInput && (cellInput.value.trim() !== "" || cellInput.value === undefined)) { 
        isEmptyRow = false;
        break;
      }
    }
    if (isEmptyRow) {
      table.deleteRow(i);
    }
  }
  rows = table.getElementsByTagName("tr");
}

function loadTable(tableId, raceData){
  const table = document.getElementById(tableId);
  const tbodyRowCount = table.tBodies[0].rows.length;
  for (let i = tbodyRowCount - 1; i >= 2; i--) {
    table.tBodies[0].deleteRow(i); // clear table
  }
  for (let i = 0; i < raceData.length; i++) {
    let row = table.insertRow(2 + i);
    let rowData = raceData[i];
    addLine(tableId, rowData)
  }
  deleteEmptyRows(tableId);
  clearTableContainer('resultTableContainer');
}


function addColumn(tableId) {
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName('tr');

  for (let i = 2; i < rows.length; i++) {
    const cell = document.createElement('td');
    cell.className = 'icon-buttons-container';
    const buttonsContainer = document.createElement('div');

    for (let j = 0; j < 3; j++) {
      const iconButton = document.createElement('button');
      iconButton.className = 'icon-button';
      if (j===0) {
        iconButton.innerHTML = '<i class="material-icons">move_up</i>';
        iconButton.title = 'Monter';
      } else if (j===1) {
        iconButton.innerHTML = '<i class="material-icons">move_down</i>';
        iconButton.title = 'Descendre';
      } else if (j===2) {
        iconButton.innerHTML = '<i class="material-icons">delete</i>';
        iconButton.title = 'Supprimer';
      }
      
      buttonsContainer.appendChild(iconButton);
    }
    cell.appendChild(buttonsContainer);
    rows[i].appendChild(cell);
  }
}

function insertButtonCell(row) {
  const buttonCell = document.createElement('td');
  buttonCell.className = 'buttonCell';
  const buttonsContainer = document.createElement('div');
  for (let j = 0; j < 3; j++) {
    const iconButton = document.createElement('button');
    switch (j) {
      case 0:
        iconButton.className = 'move-icon-button';
        iconButton.innerHTML = '<i class="material-icons">move_up</i>';
        iconButton.title = 'Monter';
        iconButton.onclick = function() {
          moveUpRow(this);
        };
        break;
      case 1:
        iconButton.className = 'move-icon-button';
        iconButton.innerHTML = '<i class="material-icons">move_down</i>';
        iconButton.title = 'Descendre';
        iconButton.onclick = function() {
          moveDownRow(this);
        };
        break;
      case 2:
        iconButton.className = 'delete-icon-button';
        iconButton.innerHTML = '<i class="material-icons">delete</i>';
        iconButton.title = 'Supprimer';
        iconButton.onclick = function() {
          deleteRow(this);
        };
        break;
      default:
        console.log("Erreur, seulement 3 boutons");
        break;
    }
    buttonsContainer.appendChild(iconButton);
  }
  buttonCell.appendChild(buttonsContainer);
  row.appendChild(buttonCell);
}


function deleteRow(input) {
  const row = input.closest('tr');
  const rowIndex = row.rowIndex; 
  const table = document.getElementById('inputTable');
  const tbody = table.tBodies[0];
  tbody.deleteRow(rowIndex); 
  const rowCount = tbody.rows.length;
  if (rowCount === 2) {
    addLine('inputTable', empty);
  }
  clearTableContainer('resultTableContainer');
}


function moveUpRow(input) {
  const table = document.getElementById('inputTable');
  const row = input.closest('tr');
  const rowIndex = row.rowIndex;
  if (rowIndex > 2) { // starts at row 2 because there are 2 header rows above
    table.tBodies[0].insertBefore(row, table.rows[rowIndex - 1]);
  }
}

function moveDownRow(input) {
  const table = document.getElementById('inputTable');
  const row = input.closest('tr');
  const rowIndex = row.rowIndex; 
  if (rowIndex < table.rows.length - 1) {
    table.tBodies[0].insertBefore(row, table.rows[rowIndex + 2]);
  }
}
  
function addFooterRow(tableId) {
  const table = document.getElementById(tableId);
  const tfootElement = document.createElement('tfoot');
  const footerRow = tfootElement.insertRow();
  for (let i = 0; i < 1; i++) {
    const footerCell = footerRow.insertCell();
    footerCell.className = 'footerCell';
    footerCell.textContent = '\u2191' + 'Sélectionnez les colonnes à imprimer' + '\u2191';
    footerCell.style.color = '#4c6baf';
    footerCell.setAttribute('colspan', table.rows[0].cells.length);
  }
  table.appendChild(tfootElement);
}

/***************************************************************************************                   
 * 
 *                                        OUTPUT  
 * 
 ***************************************************************************************/


function createOutputTable(tableId, outputTableContainerId) {
 /*Takes an input table id and an output table container id as parameters and creates the output table */
  deleteEmptyRows('inputTable');
  if (checkInputTable('inputTable')) {
    let messageElement = document.getElementById('message');
    //messageElement.innerText = 'Remplissez tous les champs';
    //messageElement.textContent = 'This is a message written using JavaScript.';
    return;
  }
  const tableValues = createArrayFromTable(tableId);
  outputArray = calculateCPTime(tableValues);
  const diplayTable = createTableFromArray(outputArray);
  const tableContainer = document.getElementById(outputTableContainerId);
  clearTableContainer(outputTableContainerId); // -> clears the container before displaying the table
  tableContainer.appendChild(diplayTable); 
  addFooterRow('outputTable');
  tableContainer.style.backgroundColor = "white";
  document.getElementById("printButton").style.display = "inline-block";
  document.getElementById("exportButton").style.display = "inline-block";
  document.getElementById("analyseButton").style.display = "inline-block";
}

function clearTableContainer(TableContainerId) {
  const tableContainer = document.getElementById(TableContainerId);
  tableContainer.innerHTML = ""; 
  tableContainer.style.backgroundColor = "transparent";
  document.getElementById("printButton").style.display = "none";
  document.getElementById("exportButton").style.display = "none";
  document.getElementById("analyseButton").style.display = "none";
}

function createArrayFromTable(tableId){
  let table = document.getElementById(tableId);
  let rows = table.getElementsByTagName("tr");
  let array = []; // -> array containing all input table values
  for (var i = 2; i < rows.length; i++) { // data starts at row 2 because there are 2 header rows above
    var cells = rows[i].getElementsByTagName("td");
    var rowValues = []; // -> temporary array containing all values from a single row
    for (var j = 0; j < cells.length-1; j++) { // loop through all the cells in a row and copy their values into rowValues[], ignore last column becaus it contains buttons
      var cellValue = cells[j].querySelector("input").value;
      cellValue = cellValue.replace(/\s/g, ""); // -> removes thousand space separators from the string
      rowValues.push(cellValue);
    }
    array.push(rowValues);
  }
  //console.log("création d'un tableau de " + array.length + " lignes à partir de " + rows.length);
  return array;
}


function calculateCPTime(data){
  // Takes an array as parameter and return an array 
  var longresults = []; // -> array containing the calculation result
  const startTime = document.getElementById('startTime').value;
  for (var i = 0; i < data.length; i++) {
    var longRow =[];
    longRow[0]= data[i][0]; // check point
    longRow[5]= parseFloat(data[i][7]); // inter speed
    longRow[7]= parseFloat(data[i][1]); // cumulated distance
    longRow[8]= parseInt(data[i][2]); // cumulated positive elevation
    longRow[9]= parseInt(data[i][3]); // cumulated negative elevation
    longRow[10]= longRow[7] + longRow[8]/100 + longRow[9]/300; // cumulated kme 
      longRow[10]= longRow[10].toFixed(2); // 2 decimals
    longRow[12]= data[i][6]; // stop
    if (longRow[12] !== null) {
      var formatedStop = longRow[12] / 60;
    } else {
      var formatedStop = 0;
    }
    longRow[13]= data[i][4]; // check point type
    longRow[14]= data[i][5]; // cut-off time
    longRow[1] = parseFloat(data[i][1]) - (i === 0 ? 0 : parseFloat(data[i-1][1])); // inter distance (only if i>0 otherwise returns distance)
      longRow[1] = trimDecimals(longRow[1]); // 2 decimals 
    if (longRow[1]<0) {
      alert("Erreur à la ligne " + (i+1) + ": les distances cumulées doivent être croissantes");
      return;
    }
    longRow[2]= parseInt(data[i][2]) - (i === 0 ? 0 : parseInt(data[i-1][2])); // inter positive elevation
    if (longRow[2]<0) {
      alert("Erreur à la ligne " + (i+1) + ": les D+ cumulés doivent être croissants");
      return;
    }
    longRow[3]= parseInt(data[i][3]) - (i === 0 ? 0 : parseInt(data[i-1][3])); // inter negative elevation
    if (longRow[3]<0) {
      alert("Erreur à la ligne " + (i+1) + ": les D- cumulés doivent être croissants");
      return;
    }
    longRow[4]= longRow[1] + longRow[2]/100 + longRow[3]/300; // inter kme
      longRow[4] = trimDecimals(longRow[4]); // 2 decimals 
    longRow[17]= (longRow[4] / longRow[5]);// inter race time (decimal=hidden)
    longRow[6]= convertToTimeString(longRow[17]); // inter race time (formated=visible)
    longRow[18] = longRow[17] + (i === 0 ? 0 : parseFloat(longresults[i-1][18])) + formatedStop;// cumulated race time (decimal=hidden)
    longRow[11]= convertToTimeString(longRow[18]); // cumulated race time (formated=visible)
    longRow[19]= longRow[18] + decTime(startTime) - formatedStop; // arrival time (decimal=hidden)
    longRow[15]= convertToTimeString(longRow[19]); // arrival time (formated=visible)
    longRow[20]= longRow[18] + decTime(startTime); // departure time (decimal=hidden)
    longRow[16]= convertToTimeString(longRow[20]); // departure time (formated=visible)
    if (startTime == "") {
      longRow[15]="";
      longRow[16]="";
    }
    longresults.push([...longRow]);
  }
  return longresults;
}

function decTime(timeString){
  const hrs = timeString.substring(0,2);
  const min = timeString.substring(3,5);
  const decimalTime = parseInt(hrs) + (parseInt(min)/60)
  return decimalTime;
}

function convertToTimeString(decimalTime){
  const integerPart = parseInt(decimalTime);
  const decimalPart = parseFloat(decimalTime)-integerPart;
  const modulo = integerPart % 24;
  const days = parseInt(integerPart / 24);
  let hrs = modulo.toString();
  hrs = hrs.padStart(2, '0'); // -> add leading 0
  let min = parseInt(decimalPart*60);
  min = min.toString();
  min = min.padStart(2, '0'); // -> add leading 0
  let timeString = hrs + ':' + min;
  if (days>0){
    timeString = timeString + " (J+" + days + ")";
  }
  return timeString;
}

function trimDecimals(number){
  var result = parseInt(number *100) / 100;
  return result;
}

function createTableFromArray(data){
  if (data.length===0){
    console.log("pas de données");
  }
  // Takes an array as parameter and return a table object 
  const table = document.createElement('table');
  table.setAttribute("id", "outputTable"); 
  const headerRow = document.createElement('tr');
  // Create table header row
  var headers = ["Passage", "inter km", "inter D+", "inter D-", "inter kme", "inter V", "inter temps", 
                 "cumul km", "cumul D+", "cumul D-", "cumul kme", "cumul temps",
                 "stop (min)", "ravito", "BH", "arrivée", "départ"];
  for (var i = 0; i < headers.length; i++) {
    var headerCell = document.createElement("th");
    headerCell.textContent = headers[i];
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);
  // Create table data rows
  for (const obj of data) {
    const dataRow = document.createElement('tr');
    const keys = Object.keys(data[0]);
    //console.log(keys.length);
    for (const key of keys) {
      const dataCell = document.createElement('td');
      dataCell.textContent = obj[key];
      dataRow.appendChild(dataCell);
    }
    table.appendChild(dataRow);
  }
  // hide the last four columns
  var rows = table.rows;
  for (var i = 1; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var numCells = cells.length;
    for (var j = numCells - 1; j >= numCells - 4; j--) {
      cells[j].style.display = "none";
    }
  }
  // Add a row with checkboxes
  let checkboxRow = document.createElement("tr");
  for (let i = 0; i < 17; i++) {
      let checkboxCell = document.createElement("td");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkboxCell.classList.add("checkbox-cell");
      checkboxCell.appendChild(checkbox);
      checkboxRow.appendChild(checkboxCell);
  }
  table.appendChild(checkboxRow);
  return table;
}

/***************************************************************************************                   
 * 
 *                                          PRINT  
 * 
 ***************************************************************************************/

function printContent() {
  getCheckedColumnIndices('outputTable');
  const printContents = document.querySelector('.printable').innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
}




function getCheckedColumnIndices(tableId) {
  var table = document.getElementById(tableId);
  var checkedColumns = [];

  // Loop through rows
  for (var i = 0; i < table.rows.length; i++) {
      var row = table.rows[i];

      // Loop through cells in the row
      for (var j = 0; j < row.cells.length; j++) {
          var cell = row.cells[j];
          var checkbox = cell.querySelector('input[type="checkbox"]');

          // Check if the checkbox is checked
          if (checkbox && checkbox.checked) {
              checkedColumns.push(j); // Store the column index
          }
      }
  }

  // Your code here: Perform actions with the checkedColumns array
  console.log("Checked Columns: ", checkedColumns);
}




/***************************************************************************************                   
 * 
 *                                        MODAL DIALOG  
 * 
 ***************************************************************************************/


let selectedOptions = []; // Variable to store the selected options (data to be loaded)
let cptTime = []; 
//localStorage.clear();

        function openModal(modalId) {
            var modal = document.getElementById(modalId);
            modal.style.display = 'block';
            if (modalId==='loadRace') {
                populateListbox('listbox');
            } else if (modalId==='analyseRace') {
              createInputBoxes('analyseForm');
          }
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.style.display = 'none';
            //const formElement = document.getElementById('analysisForm');
            //formElement.innerHTML = ''; 
        }

        function loadSelectedRace(modalId) {
            let listbox = document.getElementById('listbox');
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

            
      function addItem(modalId, tableId) {
        let itemName = document.getElementById("inputField").value;
        if (itemName==="") {
          return;
          console.log("nom de fichier vide");
        }
        deleteEmptyRows(tableId);
        const tableValues = createArrayFromTable(tableId);
        //console.log("enregistrement de " + tableValues.length + " lignes");
        let arrayString = JSON.stringify(tableValues);
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
        //console.log("lecture de " + storedArray.length + " lignes");
        loadTable('inputTable', storedArray);
    }

    function createInputBoxes(formId) {
      const formElement = document.getElementById(formId);
      for (let i = 0; i <= outputArray.length-1; i++) { // last row contains checkboxes
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('modal-input-container');
        const label = document.createElement('label');
        label.textContent = outputArray[i][0];
        label.classList.add('modal-label');
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `input${i}`;
        input.classList.add('modal-input'); 
        inputContainer.appendChild(label);
        inputContainer.appendChild(input);
        formElement.appendChild(inputContainer);
      }
    }
    

    function analyseRaceTime(modalId){
      const modal = document.getElementById(modalId);
      const inputs = modal.getElementsByClassName('modal-input');
      cptTime = Array.from(inputs).map(input => input.value);
      closeModal(modalId);
    }

/***************************************************************************************                   
 * 
 *                                        SAVE CSV  
 * 
 ***************************************************************************************/

    
  function saveToCsv(){
    const csvData = arrayToCSV(outputArray);
    downloadCSVFile(csvData, 'temps2passage.csv');
  }

  function arrayToCSV(arr) {
    if (!Array.isArray(arr)) {
      throw new Error("Input should be an array.");
    }
    const csvContent = arr.map(row => row.join(',')).join('\n');
    return csvContent;
  }

  function downloadCSVFile(data, filename) {
    // Create a Blob with the data and specify the content type
    const blob = new Blob([data], { type: 'text/csv' });
    // Create an anchor element and set its properties
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    // Append the link to the body and simulate a click event to trigger the download
    document.body.appendChild(link);
    link.click();
    // Remove the link from the body after the download is initiated
    document.body.removeChild(link);
  }




 


