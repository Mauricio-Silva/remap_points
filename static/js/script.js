const originalImage = document.getElementById('original-image');
const processedImage = document.getElementById('processed-image');
const sendButton = document.getElementById('send-button');
const originalWidth = originalImage.naturalWidth;
const originalHeight = originalImage.naturalHeight;
const webviewWidth = originalImage.clientWidth;
const webviewHeight = originalImage.clientHeight;
const src = 'static/images/processed-draw.jpeg';
const url = '/proccess';
let points = [];


originalImage.addEventListener('mousedown', capturePoints, false);

// originalImage.addEventListener('mousedown', () => {
//   originalImage.addEventListener('mousemove', capturePoints, false);
// }, false);
// originalImage.addEventListener('mouseup', () => {
//   originalImage.removeEventListener('mousemove', capturePoints, false);
// }, false);


function capturePoints(event) {
  const bounds = this.getBoundingClientRect();
  const x = event.pageX - bounds.left;
  const y = event.pageY - bounds.top;
  const px = x / this.clientWidth * this.naturalWidth
  const py = y / this.clientHeight * this.naturalHeight
  console.log(`Coordinates: (${px}, ${py})`);
  points.push([px, py])
}


sendButton.addEventListener('click', () => {
  console.log(`Data: ${points}`);
  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(points)
  }).then(function (response) {
    if (response.status !== 200) {
      console.error('Error in remapping points');
    } else {
      console.log(`Response status: ${response.status}`);
      points = [];
      processedImage.src = `${src}?t=${new Date().getTime()}`;
    }
  }).catch((error) => {
    console.error(error);
  })
});
