function EmailList(props) {
  const { data } = props
  const styles = { display: 'block', textAlign: 'left' }

  // insert script tag as string with 'dangerouslySetInnerHTML'
  // add async calls, dom functions here
  // script will only run in static html output
  const script = `
    <script>
      var btn = document.getElementById('btn')
      var input = document.getElementById('input')
      var headline = document.getElementById('email-list-headline')

      btn.addEventListener('click', function() { return submitUser() })

      function submitUser() {
        var email = input.value
        var newUser = { email: email }
        var xhr = new XMLHttpRequest();

        function reqListener () {
          headline.innerHTML = "Thanks for joining us!"
          input.value = ''
        }

        xhr.addEventListener('load', reqListener);
        xhr.open('POST', 'https://jsonplaceholder.typicode.com/users');
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(newUser));
      }
    </script>
  `

  return (
    <div style={styles}>
      <h1
        id="email-list-headline"
        data-index={props['data-index']}
        style={{ color: data.color }}
        onClick={(e) => {props.handleClick(e)}}>
        {data.text}
      </h1>

      <input id="input" type="email" placeholder="Enter your email"/>
      <button id="btn" style={data.buttonStyle}>Join now</button>

      <div dangerouslySetInnerHTML={{ __html: script }} />
    </div>
  )
}
