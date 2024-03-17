document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('calculate').addEventListener('click', function() {
    var selectedDate = document.getElementById('workday').value;
    var selectedDayOfSchedule = document.getElementById('dayofschedule').value;
    let workingDays = getWorkingDays(selectedDate, selectedDayOfSchedule);
    var resultsDiv = document.getElementById('results');
    var resultsText = workingDays.map(group => group.map(date => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })).join('<br>')).join('<br><br>');
    resultsDiv.innerHTML = "Leah will work on the following days: <br>" + resultsText;
    document.body.appendChild(resultsDiv);
  });
});


function getWorkingDays(lastWorkDay, dayOfSchedule) {
  let date = new Date(lastWorkDay);
  date.setDate(date.getDate() - dayOfSchedule + 1);

  let workingDays = [];
  let group = [];

  while ((date - new Date(lastWorkDay)) / (1000 * 60 * 60 * 24) <= 365) {
    for (let i = 0; i < 4; i++) {
      date.setDate(date.getDate() + 1);
      if ((date - new Date(lastWorkDay)) / (1000 * 60 * 60 * 24) <= 365) {
        group.push(new Date(date));
      }
    }
    workingDays.push(group);
    group = [];
    date.setDate(date.getDate() + 5);
  }

  return workingDays;
}
