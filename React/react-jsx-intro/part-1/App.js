const App = () => (
    <div>
        <FirstComp />
        <NamedComp name="luke" />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'));