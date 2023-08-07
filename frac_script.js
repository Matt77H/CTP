function calculateLapTimes(){
    const vmaInput = document.getElementById('myVMA');
    const myVMA = parseFloat(vmaInput.value);
    if (myVMA == null || myVMA=='' || isNaN(myVMA) || myVMA <=0 || myVMA >30) {
        vmaInput.value = '';
        return
    } else {
        vmaInput.value = myVMA;
    }
    const tables = document.querySelectorAll('.Pyramid-Table');
    tables.forEach(table => {
        const tbody = table.querySelector('tbody');
        const rows = tbody.querySelectorAll('tr');
        const lastRow = rows[rows.length - 1];
        const numRows = rows.length;
        const numColumns = lastRow.querySelectorAll('td').length;
        for (let i = 0; i < numRows; i++) {
            const row = rows[i];
            const cells = row.querySelectorAll('td');
            for (let j = 2; j < numColumns; j++) { // first two columns contain dist and VMA
                const dist = (j-1)*400;
                if (dist <= parseInt(cells[0].textContent)) {
                    let lapTime = dist * 6 / myVMA / parseInt(cells[1].textContent);
                    cells[j].textContent = decimalMinutesToTimeString(lapTime);
                } else {
                    cells[j].textContent ="";
                }
            }
        }
        table.rows[0].cells[0].textContent="VMA=" + myVMA;
    });
}

function decimalMinutesToTimeString(decimalMinutes) {
    const totalSeconds = Math.round(decimalMinutes * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}






