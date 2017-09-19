$(document).ready(function() {
  $('button').on('click', () => {
    const zip = $('input').val();
    window.location.replace(`/legislators/${zip}`);
  })
});
