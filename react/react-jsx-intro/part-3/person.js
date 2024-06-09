const Person = (props) => (
    <div>
        <p>Learn more info about this person</p>
        <h3>{props.age >= 18 ? "Please go vote." : "You must be 18."}</h3>
        <h3>{props.name.length > 8 ? props.name.slice(0,7) : props.name}</h3>
        <ol>
            {props.hobbies.map(hob => <li>{hob}</li>)}
        </ol>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'));