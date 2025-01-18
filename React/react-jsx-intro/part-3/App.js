const App = () => (
    <div>
        <Person age={26} name='luke' hobbies={['running', 'biking', 'hiking']}/>
        <Person age={18} name='luke' hobbies={['running', 'biking', 'hiking']}/>
        <Person age={15} name='luke' hobbies={['running', 'biking', 'hiking']}/>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'));