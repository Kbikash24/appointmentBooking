// Get appointment data from API
axios.get("https://crudcrud.com/api/e9b6e1f4e8074ea0b4e7b0d5677df3b7/appointmentData")
  .then(response => {
    const appointments = response.data;
    const tableBody = document.getElementById('appointment-table-body');

    // Populate table with appointment data
    appointments.forEach(appointment => {
      const row = tableBody.insertRow();
      row.dataset.appointmentId = appointment._id; // Add appointment ID as data attribute
      row.innerHTML = `
        <td>${appointment.name}</td>
        <td>${appointment.email}</td>
        <td>${appointment.mobile}</td>
        <td>${appointment.date}</td>
        <td>${appointment.time}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary edit-button">Edit</button>
          <button class="btn btn-sm btn-outline-danger delete-button">Delete</button>
        </td>
      `;
    });
  })
  .catch(error => {
    console.log(error);
  });

const form = document.getElementById('appointment-form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from submitting normally

  // Get form data
  const formData = new FormData(form);

  // Create object from form data
  const appointment = Object.fromEntries(formData.entries());

  // Send appointment data to API
  axios.post("https://crudcrud.com/api/e9b6e1f4e8074ea0b4e7b0d5677df3b7/appointmentData", appointment)
    .then(response => {
      console.log(response);
      alert('Appointment saved successfully!');
    })
    .catch(error => {
      console.log(error);
      alert('Error saving appointment');
    });

  // Add appointment data to table
  const tableBody = document.getElementById('appointment-table-body');

  const row = tableBody.insertRow();
  row.dataset.appointmentId = ''; // Set appointment ID to empty string for new appointments
  row.innerHTML = `
    <td>${appointment.name}</td>
    <td>${appointment.email}</td>
    <td>${appointment.mobile}</td>
    <td>${appointment.date}</td>
    <td>${appointment.time}</td>
    <td>
      <button class="btn btn-sm btn-outline-primary edit-button">Edit</button>
      <button class="btn btn-sm btn-outline-danger delete-button">Delete</button>
    </td>
  `;

  // Reset form
  form.reset();
});

const tableBody = document.getElementById('appointment-table-body');

tableBody.addEventListener('click', (event) => {
  const target = event.target;

  // Handle delete button click
  if (target.classList.contains('delete-button')) {
    const row = target.closest('tr');
    const appointmentId = row.dataset.appointmentId;

    // Send delete request to API
    const deleteUrl = `https://crudcrud.com/api/e9b6e1f4e8074ea0b4e7b0d5677df3b7/appointmentData/${appointmentId}`;
    axios.delete(deleteUrl)
      .then(response => {
        console.log('Delete response:', response);
        alert('Appointment deleted successfully!');
        // Remove appointment from table
        row.remove();
      })
      .catch(error => {
        console.log('Delete error:', error);
        alert('Error deleting appointment');
      });
  }
});
