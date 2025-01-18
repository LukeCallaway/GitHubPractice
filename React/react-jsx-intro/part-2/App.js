const App = () => (
    <div>
        <Tweet username="lukas" name="luke" date="01-02-2024" message="hello everyone!"/>
        <Tweet username="__luke__" name="luke" date="01-02-2024" message="new here!"/>
        <Tweet username="lucas" name="luke" date="01-02-2024" message="have a good day everyone :)"/>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'));