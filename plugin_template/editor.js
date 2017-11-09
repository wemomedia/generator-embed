function EmailList(props) {
  // write inputs to edit plugin data
  // if no edits required, return <div />

  const style = { margin: '1em auto'}
  return (
    <fieldset style={style}>
      <label>
        Headline
        <input value={props.componentData.text} onChange={function(e) { return props.handleEditorChange(e, props.editingIndex, 'text') }} />
      </label>
      <label>
        Color (rgb, hex, string)
        <input value={props.componentData.color} onChange={function(e) { return props.handleEditorChange(e, props.editingIndex, 'color') }} />
      </label>
    </fieldset>
  )
}
