document.querySelector('button').addEventListener('click', () => {
  const place = document.querySelector('input').value;

  if (place === '') {
    console.error('Please enter the place name');
    return;
  }

  // API request to get the weather information

  fetch(`/weather/?address=${place}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector('h4').textContent = data.message;
    });
});
