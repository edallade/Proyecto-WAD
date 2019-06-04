import SortableList from './SortableList'

class Sequencing extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.state = {
            sequencing: "",
            array: [],
            v: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const inputSequencing = this.state.sequencing
        let SequencingArray = inputSequencing.split('&');
        console.log("Array " + SequencingArray)
        this.setState({
            array: SequencingArray,
            v: true
        })

    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            sequencing: event.target.value
        })
    }

    handleToggle = () => {
        const el = findDOMNode(this.refs.toggle);
        $(el).slideToggle();
    }

    render() {
        const { sequencing } = this.state
        var res = [];

        { this.state.array.map((item, i) => (res.push(item))) }

        console.log("RES: ", res);

        if (!this.state.v) {
            return (
                <div>
                    <h1>Sequencing</h1>
                    <p>Sequencing: {sequencing}</p>
                    <p ref='toggle'>Split: {res}</p>
                    <form onSubmit={this.handleSubmit}>
                        <p><input type='text' placeholder='Enunciado' value={sequencing} name='sequencing' onChange={this.handleInputChange} /></p>
                        <p><button onSubmit={this.handleSubmit}>Continuar</button></p>
                    </form>
                    <button onClick={this.handleToggle}>Hide</button>
                </div>
            )
        } else {
            return (
                <div>
                    <SortableList data={res.sort()} />
                    <button ></button>
                </div>
            )
        }
    }
}


ReactDOM.render (<Component />,document.getElementById('app'));